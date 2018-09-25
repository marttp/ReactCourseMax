import * as actionTypes from '../action';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({ 
                    id: new Date(),
                    value: action.payload
                })
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1)
            const updateArray = state.results.filter((result, index) => result.id !== action.payload)
            return {
                ...state,
                results: updateArray
            }
        default:
            return state;
    }
}

export default reducer;