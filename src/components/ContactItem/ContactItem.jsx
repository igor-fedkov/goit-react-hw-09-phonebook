import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { phoneBookActions, phoneBookOperations } from '../../redux';

import { ButtonDelete, Li, Name, Number, NameAndBtnContainer } from './ContactItem.css';

const ContactItem = ({ id, name, number }) => {

	const dispatch = useDispatch();

	const onDoubleClick = useCallback(() => dispatch(phoneBookActions.setEditContactId(id)), [id, dispatch]);
	const onDelete = useCallback(() => dispatch(phoneBookOperations.deleteContact(id)), [id, dispatch]);

	return (
		<Li onDoubleClick={onDoubleClick}>
			<Name>{name}:</Name>
			<NameAndBtnContainer>
				<Number>{number}</Number> 
				<ButtonDelete
					type="button"
					onClick={onDelete}>
					&#x2716;
				</ButtonDelete>
			</NameAndBtnContainer>
		</Li>		
	)
}

ContactItem.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	number: PropTypes.string,
}

export default ContactItem;