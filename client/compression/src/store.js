import React from 'react';
import {makeObservable, observable, action} from "mobx";

export const Context = React.createContext(null);

export class Store
{
	@observable file;
	@observable destination;

	constructor()
	{
		makeObservable(this);
	}

	@action.bound
	setFile(file)
	{
		this.file = file;
	}

	@action.bound
	setDestination(destination)
	{
		this.destination = destination;
	}
}
