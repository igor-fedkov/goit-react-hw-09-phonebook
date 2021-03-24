import { connect } from 'react-redux';

import {
	phoneBookSelectors,
	phoneBookActions,
	phoneBookOperations,
	globalDataActions
} from '../../redux';

import PhoneBookView from './PhoneBookView';

const mapStateToProps = state => {
	return {
		contacts: phoneBookSelectors.getContacts(state),
		loading: phoneBookSelectors.getLoading(state),
		idForEdit: phoneBookSelectors.getEditContactId(state),
		editName: phoneBookSelectors.getEditContact(state)?.name,
		editNumber: phoneBookSelectors.getEditContact(state)?.number,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getContacts: () => dispatch(phoneBookOperations.getContacts()),
		addContact: (contact) => dispatch(phoneBookOperations.addContact(contact)),
		editContact: (id, contact) => dispatch(phoneBookOperations.editContact(id, contact)),
		setEditContactId: id => dispatch(phoneBookActions.setEditContactId(id)),
		createErrorText: (errorText) => dispatch(globalDataActions.createErrorText(errorText)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBookView);