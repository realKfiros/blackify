import React, {useEffect, useRef, useState} from 'react';
import {Modal as MODAL} from 'bootstrap';

export const Modal = React.forwardRef(({ title, close, children }, closeButton) =>
{
	const modalRef = useRef(null);

	useEffect(() =>
	{
		const bootstrapModal = new MODAL(modalRef.current);
		bootstrapModal.show();
		$(modalRef.current).on('hidden.bs.modal', close);
	}, []);

	return <div>
		<div className="modal fade" id="modal" ref={modalRef}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
					</div>
					<div className="modal-body">
						{children}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButton}>Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
});
