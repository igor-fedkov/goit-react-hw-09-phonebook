import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import authActions from './auth-actions';

const inicialUserState = { name: null, email: null };

const user = createReducer(inicialUserState, {
  [authActions.registrationSuccess]: (_, { payload }) => payload.user,
  [authActions.loginSuccess]: (_, { payload }) => payload.user,
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
  [authActions.logoutSuccess]: () => inicialUserState,
})

const isAuthenticated = createReducer(false, {
  [authActions.registrationSuccess]: () => true,
  [authActions.loginSuccess]: () => true,
  [authActions.getCurrentUserSuccess]: () => true,
  
  [authActions.logoutSuccess]: () => false,
  [authActions.loginError]: () => false,
  [authActions.logoutError]: () => false,
  [authActions.registrationError]: () => false,
  [authActions.getCurrentUserError]: () => false,
})

const token = createReducer(null, {
  [authActions.registrationSuccess]: (_, { payload }) => payload.token,
  [authActions.loginSuccess]: (_, { payload }) => payload.token,
  [authActions.logoutSuccess]: () => null,
})

const error = createReducer(null, {
  [authActions.loginError]: (_, error) => error,
  [authActions.logoutError]: (_, error) => error,
  [authActions.registrationError]: (_, error) => error,
  [authActions.getCurrentUserError]: (_, error) => error,
})

const authReducer = combineReducers({
  user,
  isAuthenticated,
  token,
  error,
})

export default authReducer;