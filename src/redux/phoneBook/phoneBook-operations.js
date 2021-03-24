import axios from 'axios';

import phonebookActions from './phoneBook-actions';

const getContacts = () => dispatch => {

  dispatch(phonebookActions.getContactsRequest());

  axios
    .get('/contacts')
    .then(({ data }) => dispatch(phonebookActions.getContactsSuccess(data)))
    .catch(error => {
      dispatch(phonebookActions.getContactsError(error.message))
    })
};

const addContact = (contact) => dispatch => {

  dispatch(phonebookActions.addContactRequest());

  axios
    .post('/contacts', contact)
    .then(({ data }) => {
      dispatch(phonebookActions.addContactSuccess(data))}
    )
    .catch(error => {
      dispatch(phonebookActions.addContactError(error.message))
    })
}

const editContact = (id, contact) => async dispatch => {

  dispatch(phonebookActions.editContactRequest());
  
  try {
    const { data } = await axios.patch(`/contacts/${id}`, contact)
    
    dispatch(phonebookActions.editContactSuccess(data))
  } catch (error) {
    dispatch(phonebookActions.editContactError(error.message))
  }

}

const deleteContact = id => dispatch => {

  dispatch(phonebookActions.deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(phonebookActions.deleteContactSuccess(id)))
    .catch(error => {dispatch(phonebookActions.deleteContactError(error.message))})
}

const phonebookOperations = {
  getContacts,
  addContact,
  editContact,
  deleteContact,
}

export default phonebookOperations;