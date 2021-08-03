import React, {useContext} from 'react';
import {observer as observerLite} from "mobx-react-lite";
import {Context} from "../store";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export const MainPage = observerLite(function ObserverLite()
{
	const store = useContext(Context);

	const onBarcodeScanned = (err, result) =>
	{
		if (result)
		{
			let obj = JSON.parse(result.text);
			if (obj.parts)
			{
				store.info = JSON.parse(result.text);
				store.route = 'scan-file';
			}
		}
	}
	return <div className="container">
		<p className="fs-3">Please scan your info.png file</p>
		<BarcodeScannerComponent
			width={500}
			height={500}
			onUpdate={onBarcodeScanned}/>
	</div>
});
