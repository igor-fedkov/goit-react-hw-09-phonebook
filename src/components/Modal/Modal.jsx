import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import { Overlay, ModalContainer } from './Modal.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({onClose, children}) {

	useEffect(() => {
		const onKeyDown = event => {
			if (event.code === 'Escape') {
				onClose();
			}
		};
		
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		}
	}, [onClose]);

	const onkBackdropClick = ({ target, currentTarget }) => {
		if (target === currentTarget) {
			onClose();
		}
	}

	return createPortal (
		<Overlay onClick={onkBackdropClick}>
			<ModalContainer>
				{children}
			</ModalContainer>
		</Overlay>,
		modalRoot
	);

}

Modal.propTypes = {
	onClose: PropTypes.func
}

export default Modal;