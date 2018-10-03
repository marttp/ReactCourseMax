import { combineReducers } from 'redux';

import burgerReducer from './burgerBuilder'
import orderReducer from './order'
import authReduecer from './auth'

const rootReducer = combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer,
    auth: authReduecer
})

export default rootReducer