import { combineReducers } from 'redux';
import { appsReducer } from './appsReducer';
import { authReducer } from './authReducer';
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
    apps: appsReducer,
    auth: authReducer,
    search: searchReducer
})

export default rootReducer;