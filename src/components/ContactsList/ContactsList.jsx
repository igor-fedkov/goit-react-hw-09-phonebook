import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { phoneBookSelectors } from '../../redux';

import ContactItem from '../ContactItem';

import { List } from './ContactsList.css';

const ContactsList = () => {

	const filteredContacts = useSelector(phoneBookSelectors.getFilteredContacts);

	const listItems = filteredContacts.map(({ name, number, id }) => {
		return (
			<CSSTransition
				key={id}
				timeout={250}
				classNames="fade"
				unmountOnExit
			>
				<ContactItem
					id={id}
					name={name}
					number={number}					
				/>
			</CSSTransition>
		)
	})

	return (
		
		<List>
			<TransitionGroup>
				{listItems}
			</TransitionGroup>
		</List>
	)
}

export default ContactsList;