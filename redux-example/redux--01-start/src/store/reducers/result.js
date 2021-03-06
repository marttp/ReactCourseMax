import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.STORE_RESULT:
            // return {
            //     ...state,
            //     results: state.results.concat({ 
            //         id: new Date(),
            //         value: action.payload
            //     })
            // }
            return updateObject( state, { results: state.results.concat({ 
                        id: new Date(),
                        value: action.payload
                    }) 
                })
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1)
            const updateArray = state.results.filter((result, index) => result.id !== action.payload)
            // return {
            //     ...state,
            //     results: updateArray
            // }
            return updateObject( state, {
                results: updateArray
            })
        default:
            return state;
    }
}

export default reducer;