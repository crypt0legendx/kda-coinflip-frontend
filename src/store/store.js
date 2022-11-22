import { applyMiddleware, configureStore, createStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export default createStore(rootReducer, composedEnhancer);
// configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware => [...getDefaultMiddleware(), applyMiddleware(thunkMiddleware)],
// });