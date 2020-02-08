import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'


const initialState = {}

const middleware = [thunk]


export const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)/* , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/) )


export const persistor = persistStore(store)

export default { store, persistor }