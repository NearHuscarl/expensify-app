import React from 'react';
import Modal from 'react-modal';

const ConfirmModal = (props) => (
	<Modal
		isOpen={props.isOpen}
		onRequestClose={props.onRequestClose}
		contentLabel="Confirm Delete"
		closeTimeoutMS={200}
		className="modal"
		ariaHideApp={false}>
		<h3 className="modal__title">{props.prompt}</h3>
		<button className="button modal__button" onClick={props.onConfirm}>
			yes
		</button>
		<button className="button modal__button" onClick={props.onCancel}>
			no
		</button>
	</Modal>
);

export default ConfirmModal;
