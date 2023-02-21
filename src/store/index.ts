import { compose, applyMiddleware, createStore, configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import counterReducer from './reducers/counter'

const middlewares = [
  thunkMiddleware
]

const enhancer = compose(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)
const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store