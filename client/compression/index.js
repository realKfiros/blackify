const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const {blackify} = require('./scripts/blackify');

let win;
const createWindow = () =>
{
	win = new BrowserWindow({
		width: 1024,
		height: 768,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: __dirname + '/preload.js'
		}
	});

	win.loadFile('dist/index.html');
};

app.whenReady().then(() =>
{
	createWindow();

	app.on('activate', () =>
	{
		if (BrowserWindow.getAllWindows().length === 0)
			createWindow();
	});
});

ipcMain.on('select-dir', async (event, arg) =>
{
	const result = await dialog.showOpenDialog(win, {
		properties: ['openDirectory']
	});
	if (result && !result.canceled)
		event.reply('select-dir', result.filePaths[0]);
});

ipcMain.on('select-file', async (event, arg) =>
{
	const result = await dialog.showOpenDialog(win, {
		properties: ['openFile']
	});
	if (result && !result.canceled)
		event.reply('select-file', result.filePaths[0]);
});

ipcMain.on('file', (event, obj) =>
{
	blackify(obj).then(async () =>
	{
		dialog.showMessageBox({
			message: 'Your QR codes are ready!'
		});
		event.reply('blackified', 'success');
	}).catch(async () =>
	{
		dialog.showMessageBox({
			message: 'error!'
		});
	});
});

app.on('window-all-closed', () =>
{
	if (process.platform !== 'darwin')
		app.quit();
});

try
{
	require('electron-reloader')(module)
}
catch (_)
{}
