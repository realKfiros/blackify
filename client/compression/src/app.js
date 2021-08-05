import React, {useContext, useEffect} from 'react';
import {Context, Store} from "./store";
import {observer as observerLite} from "mobx-react-lite";
import {OpenFile} from "./components/open-file";
import {ChooseDestination} from "./components/choose-destination";
const {ipcRenderer} = window.require('electron');

export const App = () =>
{
	return <Context.Provider value={new Store()}>
		<_App />
	</Context.Provider>
};

export const _App = observerLite(() =>
{
	let {file, destination, setFile, setDestination} = useContext(Context);

	useEffect(() =>
	{
		ipcRenderer.on('blackified', () =>
		{
			setFile(undefined);
			setDestination(undefined);
		});
	}, []);

	return <>
		<nav className="navbar navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">blackify</a>
			</div>
		</nav>
		<div className="container">
			<OpenFile />
			<ChooseDestination />
			<button className="btn btn-primary" disabled={!file || !destination} onClick={() => ipcRenderer.send('file', {file, destination})}>Blackify</button>
		</div>
	</>
});
