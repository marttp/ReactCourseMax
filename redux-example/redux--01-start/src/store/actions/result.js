import * as actionTypes from './actionTypes';

const saveResult = (counter) => {
    return {
        type: actionTypes.STORE_RESULT,
        payload: counter
    }
}

export const storeResult = (res) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            // const oldCounter = getState().ctr.counter
            // console.log(oldCounter)
            dispatch(saveResult(res))
        }, 2000)
    }
}

export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        payload: id
    }
}