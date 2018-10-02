import { combineReducers } from 'redux';

import burgerReducer from './burgerBuilder'
import orderReducer from './order'

const rootReducer = combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer
})

export default rootReducer