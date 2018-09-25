import counterReducer from './reducers/counter';
import resultReducer from './reducers/result';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    count: counterReducer,
    result: resultReducer
})

export default rootReducer;