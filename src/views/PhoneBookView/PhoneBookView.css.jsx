import styled from 'styled-components';

import {globalStyles} from '../../components/GlobalStyles';

const PhoneBookEl = styled.div`
	position: relative;
	margin: 10px auto;
	padding: 10px;

	width: 500px;
	overflow: hidden;
`;

const Title = styled.h1`

	color: ${globalStyles.mainColor};
	transition: all 500ms;

	&.fade-appear {
		transform: translateX(-100%);
	}

	&.fade-appear-active {
		transform: translateX(0);
	}
`;

export { PhoneBookEl, Title };
