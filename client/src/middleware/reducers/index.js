import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { listReducer } from './listReducer';
import { metaReducer } from './metaReducer';
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
    list: listReducer,
    meta: metaReducer,
    auth: authReducer,
    search: searchReducer
})

export default rootReducer;