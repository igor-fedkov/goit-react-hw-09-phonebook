import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from "react-transition-group";

import fieldsForNewContactForm from './new-contact-fields';

import {
	phoneBookSelectors,
	phoneBookActions,
	phoneBookOperations,
	globalDataActions
} from '../../redux';

import {
	InputForm,
	ContactsList,
	Filter,
	LoaderSpinner,
	Modal
} from '../../components';

import { PhoneBookEl, Title } from './PhoneBookView.css';
import { useDispatch, useSelector } from 'react-redux';

function PhoneBookView() {
	const contacts = useSelector(phoneBookSelectors.getContacts);
	const idForEdit = useSelector(phoneBookSelectors.getEditContactId);
	const editName = useSelector(phoneBookSelectors.getEditContactNumber);
	const editNumber = useSelector(phoneBookSelectors.getEditContactName);
	const loading = useSelector(phoneBookSelectors.getLoading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(phoneBookOperations.getContacts());
	}, [dispatch]);

	const onSubmitAddContact = useCallback(contact => {
		const { name } = contact;

		const isNameAlreadyExists = contacts.find(contact => contact.name === name);
		if (isNameAlreadyExists !== undefined) {
			dispatch(globalDataActions.createErrorText('Такой контакт уже существует'));
			return;
		}
		dispatch(phoneBookOperations.addContact(contact));

		return true;
	}, [contacts, dispatch]);


	const onSubmitEditContact = useCallback((contact) => {
		const { name, number } = contact;

		if (name === editName && number === editNumber) {
			dispatch(phoneBookActions.setEditContactId(null));
			return;
		}

		const isNameAlreadyExists = contacts.find(contact =>
			contact.name === name && contact.id !== idForEdit
		);
		if (isNameAlreadyExists !== undefined) {
			dispatch(globalDataActions.createErrorText('Такой контакт уже существует'));
			return;
		}
		dispatch(phoneBookOperations.editContact(idForEdit, contact));

		return true;
	}, [contacts, dispatch, editName, editNumber, idForEdit]);

	const onCloseEditModal = useCallback(() => {
		dispatch(phoneBookActions.setEditContactId(null));
	}, [dispatch]);


	return (
		<PhoneBookEl>
			<CSSTransition
				in={true}
				appear={true}
				classNames="fade"
				timeout={250}>
				
					<Title>Телефонная книга</Title>
			</CSSTransition>

			<InputForm
				btnCaption='Add contact'
				fields={fieldsForNewContactForm}
				onSubmitForm={onSubmitAddContact}
			/>

			<CSSTransition
				in={contacts.length > 1}
				appear={true}
				classNames="fade"
				timeout={250}
				unmountOnExit>
				
				<Filter />
			</CSSTransition>
			
			{
				loading && !idForEdit && <LoaderSpinner />
			}
			
			<ContactsList />

			{
				idForEdit &&
				<Modal onClose={onCloseEditModal}>
					<InputForm
						btnCaption='Edit contact'
						fields={
							[
								{
									label: 'Name',
									type: 'text',
									name: 'name',
									startValue: editName,
								},
								{
									label: 'Number',
									type: 'tel',
									name: 'number',
									startValue: editNumber,
								},
							]
						}
						onSubmitForm={onSubmitEditContact}
					/>						
					{
						loading && <LoaderSpinner />
					}						
				</Modal>
			}
			
		</PhoneBookEl>
	);
}

PhoneBookView.propTypes = {
	contacts: PropTypes.array,
	idForEdit: PropTypes.string,
	editName: PropTypes.string,
	editNumber: PropTypes.string,
	loading: PropTypes.bool,
}


// class PhoneBookView extends Component {
	
// 	state = {
// 		isModalShow: false,
// 	}

// 	componentDidMount() {
// 		this.props.getContacts();
// 	}

// 	onSubmitAddContact = (contact) => {
// 		const { name } = contact;
// 		const { contacts, addContact, createErrorText } = this.props;

// 		const isNameAlreadyExists = contacts.find(contact => contact.name === name);
// 		if (isNameAlreadyExists !== undefined) {
// 			createErrorText('Такой контакт уже существует');
//       return;
// 		}
// 		addContact(contact);	

// 		return true;
// 	}

// 	onSubmitEditContact = (contact) => {
// 		const { name, number } = contact;
// 		const {
// 			contacts,
// 			idForEdit,
// 			editName,
// 			editNumber,
// 			editContact,
// 			setEditContactId,
// 			createErrorText
// 		} = this.props;

// 		if (name === editName && number === editNumber) {
// 			setEditContactId(null);
// 			return;
// 		}

// 		const isNameAlreadyExists = contacts.find(contact =>
// 			contact.name === name && contact.id !== idForEdit
// 		);
// 		if (isNameAlreadyExists !== undefined) {
// 			createErrorText('Такой контакт уже существует');
//       return;
// 		}
// 		editContact(idForEdit, contact);

// 		return true;
// 	}

// 	onCloseEditModal = () => {
// 		const { setEditContactId } = this.props;

// 		setEditContactId(null);
// 	}

// 	render() {
// 		const { contacts, loading, idForEdit, editName, editNumber } = this.props;
// 		const timeout = 250;

// 		return (
// 			<PhoneBookEl>
// 				<CSSTransition
// 					in={true}
// 					appear={true}
// 					classNames="fade"
// 					timeout={timeout}>
					
// 						<Title>Телефонная книга</Title>
// 				</CSSTransition>

// 				<InputForm
// 					btnCaption='Add contact'
// 					fields={fieldsForNewContactForm}
// 					onSubmitForm={this.onSubmitAddContact}
// 				/>

// 				<CSSTransition
// 					in={contacts.length > 1}
// 					appear={true}
// 					classNames="fade"
// 					timeout={timeout}
// 					unmountOnExit>
					
// 					<Filter />
// 				</CSSTransition>
				
// 				{
// 					loading && !idForEdit && <LoaderSpinner />
// 				}
				
// 				<ContactsList />

// 				{
// 					idForEdit &&
// 					<Modal onClose={this.onCloseEditModal}>
// 						<InputForm
// 							btnCaption='Edit contact'
// 							fields={
// 								[
// 									{
// 										label: 'Name',
// 										type: 'text',
// 										name: 'name',
// 										startValue: editName,
// 									},
// 									{
// 										label: 'Number',
// 										type: 'tel',
// 										name: 'number',
// 										startValue: editNumber,
// 									},
// 								]
// 							}
// 							onSubmitForm={this.onSubmitEditContact}
// 						/>						
// 						{
// 							loading && <LoaderSpinner />
// 						}						
// 					</Modal>
// 				}
				
// 			</PhoneBookEl>
// 		);
// 	}
// }

export default PhoneBookView;