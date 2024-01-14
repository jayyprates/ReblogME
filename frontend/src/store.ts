// Package
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';


// Project
import sessionReducer from './reducers/session';
import homeReducer from './reducers/home';
import postReducer from './reducers/post';
import profileReducer from './reducers/profile';


const reducers = combineReducers({
  'session': sessionReducer,
  'home': homeReducer,
  'post': postReducer,
  'profile': profileReducer
})

// @ts-ignore
const store = createStore(reducers, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>
export default store;