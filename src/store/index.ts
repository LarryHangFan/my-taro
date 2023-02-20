import { compose, applyMiddleware, createStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/index'

const middlewares = [
  thunkMiddleware
]

const enhancer = compose(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)
const store: any = createStore(rootReducer, enhancer)
export default store