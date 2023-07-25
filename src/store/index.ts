import { compose, createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/wssMiddleware';
import { wsActions, wsActionsAuth } from './reducers/wssOrders';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : compose; 

const store = configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
    .concat([
      socketMiddleware(wsActions, false), 
      socketMiddleware(wsActionsAuth, true), 
      thunk,
    ]),
})

export default store

export type AppDispatch = typeof store.dispatch