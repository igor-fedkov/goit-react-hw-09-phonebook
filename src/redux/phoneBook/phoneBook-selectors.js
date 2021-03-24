import { createSelector } from '@reduxjs/toolkit';

const getContacts = state => state.contacts.items;

const getLoading = state => state.contacts.loading;

const getFilter = state => state.contacts.filter;

const getEditContactId = state => state.contacts.idForEdit;

const getFilteredContacts = createSelector([getContacts, getFilter], (contacts, filter) => {
  if (contacts.length < 2) {
    return contacts;
  }

  const filteredContacts = contacts.filter(({ name }) =>
		name.toLowerCase().includes(filter.toLowerCase()));
	return filteredContacts;
})

const getEditContactName = createSelector([getContacts, getEditContactId], (contacts, id) => 
  contacts.find(contact => contact.id === id)?.name
)

const getEditContactNumber = createSelector([getContacts, getEditContactId], (contacts, id) => 
  contacts.find(contact => contact.id === id)?.number
)

const phonebookSelectors = {
  getContacts,
  getLoading,
  getEditContactId,
  getFilter,
  getFilteredContacts,
  getEditContactName,
  getEditContactNumber,
}

export default phonebookSelectors;