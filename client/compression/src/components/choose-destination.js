import React, {useContext, useEffect} from 'react';
import {observer as observerLite} from 'mobx-react-lite';
import {Context} from "../store";

const {ipcRenderer} = window.require('electron');

export const ChooseDestination = observerLite(() =>
{
	const {setDestination, destination} = useContext(Context);

	useEffect(() =>
	{
		ipcRenderer.on('select-dir', (_, dir) =>
		{
			setDestination(dir);
		});
	}, []);

	return <>
		<label htmlFor="destination-path" className="form-label">Choose destination for QR codes:</label>
		<div className="input-group mb-3">
			<button
				className="btn btn-secondary"
				type="button"
				id="button-addon1"
				onClick={() => window.postMessage({type: 'select-dir'})}>
				Open
			</button>
			<input
				type="text"
				id="destination-path"
				className="form-control"
				placeholder="Destination folder"
				aria-describedby="button-addon1"
				value={destination}
				readOnly/>
		</div>
	</>;
});
