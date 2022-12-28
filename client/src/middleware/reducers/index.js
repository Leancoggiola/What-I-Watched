import { combineReducers } from 'redux';
import { appsReducer } from './appsReducer';

const rootReducer = combineReducers({
    apps: appsReducer
})

export default rootReducer;