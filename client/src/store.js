import React from 'react';
import {action, makeObservable, observable} from "mobx";
import {js as beautify} from 'js-beautify'

export const Context = React.createContext(null);

export class Store
{
	@observable route = '';
	@observable info;
	@observable parts = [];
	@observable decompressed;

	constructor()
	{
		makeObservable(this)
	}

	@action.bound
	decompress()
	{
		let _ = this;
		$.ajax({
			url: 'http://localhost:3001/decompress',
			type: 'POST',
			dataType: 'application/json',
			data: {parts: this.parts},
			async: false,
			complete: function (data)
			{
				_.decompressed = data.responseText;
			}
		});
	}
}
