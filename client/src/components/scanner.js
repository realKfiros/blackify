import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {Modal} from "./modal";

export const Scanner = ({state, onUpdate}) =>
{
	const closeModal = useRef(null);
	const [showModal, setShowModal] = state;

	const update = (res) =>
	{
		closeModal.current.click();
		onUpdate(res);
		setShowModal(false);
	}

	return showModal ? <Modal close={() => setShowModal(false)} ref={closeModal}>
		<BarcodeScannerComponent
			height={500}
			onUpdate={(err, res) => !err && update(res)}/>
	</Modal> : null;
}

Scanner.propTypes = {
	state: PropTypes.array,
	onUpdate: PropTypes.func,
	close: PropTypes.func
}
