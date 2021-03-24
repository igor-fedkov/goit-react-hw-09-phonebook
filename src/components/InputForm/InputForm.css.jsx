import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

import { globalStyles } from '../GlobalStyles';

const Form = styled.form`
	padding: 10px;
	width: 450px;
	box-shadow: ${globalStyles.boxShadow};
`;

const Input = styled(TextField)`
	width: 100%;
	z-index: 0;
`;

const InputContainer = styled.div`
	margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
	width: 100%;
`;

export { Form, Input, StyledButton, InputContainer };