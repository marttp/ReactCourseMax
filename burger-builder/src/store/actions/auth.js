import * as actionTypes from './actionsType'
import axios from '../../axios-orders';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAiHRo-XGrm9ainp0Yh94Vt61-GOWgya-I', authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail())
            })
    }

}