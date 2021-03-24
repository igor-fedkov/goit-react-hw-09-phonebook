import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import phoneBookActions from './phoneBook-actions';

const contactsListReducer = createReducer([], {
  [phoneBookActions.getContactsSuccess]: (_, { payload }) => payload,
  [phoneBookActions.addContactSuccess]: (state, { payload }) => [payload, ...state],
  [phoneBookActions.editContactSuccess]: (state, { payload }) => [ ...state, payload],
  [phoneBookActions.deleteContactSuccess]: (state, { payload }) => state.filter(({ id }) => id !== payload),
})

const contactFilterReducer = createReducer('', {
  [phoneBookActions.changeFilter]: (_, { payload }) => payload
})

const loading = createReducer(false, {
  [phoneBookActions.getContactsRequest]: () => true,
  [phoneBookActions.getContactsSuccess]: () => false,
  [phoneBookActions.getContactsError]: () => false,
  
  [phoneBookActions.addContactRequest]: () => true,
  [phoneBookActions.addContactSuccess]: () => false,
  [phoneBookActions.addContactError]: () => false,

  [phoneBookActions.editContactRequest]: () => true,
  [phoneBookActions.editContactSuccess]: () => false,
  [phoneBookActions.editContactError]: () => false,

  [phoneBookActions.deleteContactRequest]: () => true,
  [phoneBookActions.deleteContactSuccess]: () => false,
  [phoneBookActions.deleteContactError]: () => false,
})

const editContactIdReducer = createReducer(null, {
  [phoneBookActions.setEditContactId]: (_, { payload }) => payload,
  [phoneBookActions.editContactSuccess]: () => null,
})

const errorReducer = createReducer(null, {
  [phoneBookActions.getContactsError]: (_, error) => error,
  [phoneBookActions.addContactError]: (_, error) => error,
  [phoneBookActions.deleteContactError]: (_, error) => error,
})

const contactsReducer = combineReducers({
  items: contactsListReducer,
  filter: contactFilterReducer,
  loading,
	idForEdit: editContactIdReducer,
  error: errorReducer,
})

export default contactsReducer;