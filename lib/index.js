#!/usr/bin/node

const fs = require('fs');
const snappy = require('snappy');
const inquirer = require('inquirer');
const QRCode = require('qrcode');

(async () => {
	const answers = await inquirer.prompt([
		{
			name: 'path',
			message: 'Type the path of the file that you want to blackify:'
		}
	]);

	if (!fs.existsSync('./blackify'))
		fs.mkdirSync('./blackify');

	let file = fs.readFileSync(answers.path).toString();

	const compressed = snappy.compressSync(file);
	const splitData = compressed.toString('base64').match(/[\s\S]{1,1000}/g) || [];

	const dataUrl = await QRCode.toDataURL(JSON.stringify({
		parts: splitData.length,
		filename: answers.path.split('/')[answers.path.split('/').length - 1].split('.')[0]
	}));
	const newDataUrl = dataUrl.replace(/^data:image\/\w+;base64,/, '');
	fs.writeFileSync(`./blackify/info.png`, newDataUrl, {encoding: 'base64'});


	for (let i = 0; i < splitData.length; i++)
	{
		const url = await QRCode.toDataURL(splitData[i]);
		const newUrl = url.replace(/^data:image\/\w+;base64,/, '');
		fs.writeFileSync(`./blackify/${answers.path.split('/')[answers.path.split('/').length - 1].split('.')[0]}${i}.png`, newUrl, {encoding: 'base64'});
	}

})();
