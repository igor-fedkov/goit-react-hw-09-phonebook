import { combineReducers, createReducer } from '@reduxjs/toolkit';
import globalDataActions from './globalData-actions';

const errorText = createReducer(null, {
  [globalDataActions.createErrorText]: (_, { payload }) => payload,
  [globalDataActions.deleteErrorText]: () => null,
})

const globalDataReducer = combineReducers({
  errorText
})

export default globalDataReducer;