import { combineReducers  } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './reducers/userReducer'

import { DESTROY_SESSION } from "./types";

const persistConfig = {
    key: 'root',
    storage: storage
}
 
const appReducer  = combineReducers({
    state: (state = {}) => state,
    user: userReducer
})

const rootReducer = (state, action) => {
    if(action.type === DESTROY_SESSION) state = undefined
    return appReducer(state, action)
}

export default persistReducer(persistConfig, rootReducer)