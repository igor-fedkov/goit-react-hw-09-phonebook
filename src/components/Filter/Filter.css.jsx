import styled from 'styled-components';
import { TextField } from '@material-ui/core';

import {StyledComponents} from '../GlobalStyles'

const Label = styled.label`
	display: block;
	margin-bottom: 10px;
`;

const Input = styled(TextField)`
	width: 100%;
	z-index: 0;
`;

const InputContainer = styled.div`
	margin: 10px 0;
`;

const Container = styled.div`
	${StyledComponents.container}
	
	transition: all 250ms;

	&.fade-enter {
		transform: scale(0);
	}

	&.fade-enter-active {
		transform: scale(1);
	}

	&.fade-exit {
		transform: scale(1);
	}

	&.fade-exit-active {
		transform: scale(0);
	}
`;

export { Label, Input, Container, InputContainer };