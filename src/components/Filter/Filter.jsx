import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { phoneBookSelectors, phoneBookActions } from '../../redux';

import { Input, Container, InputContainer } from './Filter.css';

const Filter = () => {
	const filter = useSelector(phoneBookSelectors.getFilter);
	const dispatch = useDispatch();

	const onChangeFilter = useCallback((evn) =>
		dispatch(phoneBookActions.changeFilter(evn.target.value)), [dispatch]);

	return (
		<Container>
			<InputContainer>
				<Input
					type="text"
					name="filter"
					value={filter}
					onChange={onChangeFilter}
					label="Поиск контактов по имени"
					variant="outlined"
				/>
			</InputContainer>
		</Container>
	)
}

Filter.propTypes = {
	filter: PropTypes.string,
	changeFilter: PropTypes.func
}

export default Filter;