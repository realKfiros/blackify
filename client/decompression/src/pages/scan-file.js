import React, {useContext, useState} from 'react';
import {observer as observerLite} from 'mobx-react-lite';
import {Context} from "../store";
import {Part} from "../components/part";
import {Modal} from "../components/modal";
import {css} from "@emotion/react";

export const ScanFilePage = observerLite(function ScanFilePage()
{
	const {info, decompress, decompressed} = useContext(Context);
	const [showConnected, setShowConnected] = useState(false);

	return <div className="container">
		{!!info && [...Array(info.parts)].map((value, index) => <Part index={index} key={index + 1} />)}
		<button
			className="btn btn-primary"
			onClick={() =>
			{
				decompress();
				setShowConnected(true);
			}}>
			Connect parts
		</button>
		{showConnected && <Modal close={() => setShowConnected(false)} title="Decompressed file">
			<textarea
				style={{ width: '100%' }}
				value={decompressed}
				readOnly
				rows={20}/>
		</Modal>}
	</div>
});
