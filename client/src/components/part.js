import React, {useContext, useState} from 'react';
import {observer as observerLite} from 'mobx-react-lite';
import {Context} from "../store";
import {Scanner} from "./scanner";
import {css} from "@emotion/react";

const partStyle = css`
	margin: 20px;
`;
export const Part = observerLite(function Part({index})
{
	const modalState = useState(false);
	const setShowModal = modalState[1];
	let {parts} = useContext(Context);

	return <div className="card" css={partStyle}>
		<div className="card-body">
			<p className="fs-3">Part {index + 1}</p>
			{!!parts[index] && <textarea
				className="form-control"
				rows="10"
				value={parts[index]}
				readOnly/>}
		</div>
		<div className="card-footer">
			<button
				className="btn btn-primary"
				onClick={() => setShowModal(true)}>
				{!!parts[index] ? 'Rescan' : 'Scan'}
			</button>
		</div>
		<Scanner
			state={modalState}
			onUpdate={(res) =>
			{
				parts[index] = res.text;
			}}/>
	</div>;
});
