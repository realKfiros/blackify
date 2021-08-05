const {ipcRenderer} = require('electron');

window.require = require;

process.once('loaded', () =>
{
	window.addEventListener('message', evt =>
	{
		switch (evt.data.type)
		{
			case 'select-dir':
				ipcRenderer.send('select-dir');
				break;
			case 'select-file':
				ipcRenderer.send('select-file');
				break;
			default:
				break;
		}
	});
});
