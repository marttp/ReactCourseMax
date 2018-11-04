import {
    delay
} from 'redux-saga'
import {
    put
} from 'redux-saga/effects'

// ! Import action for use in saga
// ! redux-saga used in action it side effect something like call api
// ! and localStorage
import * as actions from '../actions'
import axios from '../../axios-orders';


export function* logoutSaga(action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    // ! If you want to working like dispatch in saga
    // ! Use put(.....)

    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAiHRo-XGrm9ainp0Yh94Vt61-GOWgya-I'

    if (!action.isSignup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAiHRo-XGrm9ainp0Yh94Vt61-GOWgya-I'
    }

    try {
        const response = yield axios.post(url, authData)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error))
    }

}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token')
    if(!token){
        yield put(actions.logout())
    } else{
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
            yield put(actions.logout())
        } else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}