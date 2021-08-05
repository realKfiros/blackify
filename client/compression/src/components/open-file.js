import React, {useContext, useEffect} from 'react';
import {observer as observerLite} from "mobx-react-lite";
import {Context} from "../store";

const {ipcRenderer} = window.require('electron');

export const OpenFile = observerLite(() =>
{
	const {setFile, file} = useContext(Context);

	useEffect(() =>
	{
		ipcRenderer.on('select-file', (_, dir) =>
		{
			setFile(dir);
		});
	}, []);

	return <>
		<label htmlFor="file-path" className="form-label">Choose file to blackify:</label>
		<div className="input-group mb-3">
			<button
				className="btn btn-secondary"
				type="button"
				id="button-addon1"
				onClick={() => window.postMessage({type: 'select-file'})}>
				Open
			</button>
			<input
				id="file-path"
				type="text"
				className="form-control"
				placeholder="File"
				aria-describedby="button-addon1"
				value={file}
				readOnly/>
		</div>
	</>;
});
