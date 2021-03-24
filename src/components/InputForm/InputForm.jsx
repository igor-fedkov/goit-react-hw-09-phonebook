import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import { Form, Input, StyledButton, InputContainer } from './InputForm.css';

function InputForm({fields, btnCaption, onSubmitForm}) {

	const initialState = fields.reduce((acc, { name, startValue }) => {
		acc[name] = startValue;
		return acc;
	}, {})
	const [inputFields, setInputFields] = useState(initialState);

	const onInputChange = event => {
    const { name, value } = event.target;
		setInputFields(state => ({ ...state, [name]: value })
    )
	}

	const onSubmit = useCallback(event => {
		event.preventDefault();

		if (onSubmitForm(inputFields)) {
			setInputFields(initialState);
		}
	}, [initialState, inputFields, onSubmitForm]);

	return (
		<Form onSubmit={onSubmit}>
			{
				fields.map(({ label, type, name }, index) =>
					<InputContainer key={index}>
						<Input								
							type={type}
							name={name}
							value={inputFields[name]}
							onChange={onInputChange}
							label={label}
							variant="outlined"
						/>
					</InputContainer>
				)
			}

			<StyledButton
				type="submit"
				color="primary"
				variant="contained"
			>
				{btnCaption}
			</StyledButton>
		</Form>
		)

}

InputForm.propTypes = {
	fields: PropTypes.array, 
	onSubmit: PropTypes.func
}

export default InputForm;