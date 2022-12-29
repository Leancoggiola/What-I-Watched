import { combineReducers } from 'redux';
import { appsReducer } from './appsReducer';
import { authReducer } from './authReducer'

const rootReducer = combineReducers({
    apps: appsReducer,
    auth: authReducer
})

export default rootReducer;