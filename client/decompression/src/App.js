import React, {useContext, useEffect, useMemo, useState} from "react"
import {Modal} from './components/modal';
import Markdown from 'react-markdown';
import {MainPage} from "./pages/main";
import {Context, Store} from "./store";
import {ScanFilePage} from "./pages/scan-file";
import {observer as observerLite} from "mobx-react-lite";

export const App = () =>
{
	return <Context.Provider value={new Store()}>
		<_App />
	</Context.Provider>
}

const _App = observerLite(function App()
{
	const store = useContext(Context);
	const [showAboutModal, setShowAboutModal] = useState(false);
	const [about, setAbout] = useState('');
	const [data, setData] = useState('');

	useEffect(() =>
	{
		$.get('https://raw.githubusercontent.com/realKfiros/blackify/master/README.md', (data) =>
		{
			setAbout(data);
		});
	}, []);

	const Switch = useMemo(() => {
		switch (store.route)
		{
			case 'scan-file':
				return ScanFilePage;
			default:
				return MainPage;
		}
	}, [store.route]);

	return <>
		<nav className="navbar navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">blackify</a>
				<div className="d-flex nav-item">
					<button className="btn btn-dark" onClick={() => setShowAboutModal(true)}>
						<i className="fa fa-info-circle" style={{color: '#fff'}}/>
					</button>
				</div>
			</div>
		</nav>
		<Switch />
		{showAboutModal && <Modal close={() => setShowAboutModal(false)} title="About blackify">
			<Markdown>
				{about}
			</Markdown>
		</Modal>}
	</>;
});
