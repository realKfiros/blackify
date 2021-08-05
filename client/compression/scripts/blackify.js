const fs = require('fs');
const snappy = require('snappy');
const QRCode = require('qrcode');

const blackify = async ({ file, destination }) =>
{
	if (!fs.existsSync(destination + '/blackify'))
		fs.mkdirSync(destination + '/blackify');

	let fileContents = fs.readFileSync(file).toString();

	const compressed = snappy.compressSync(fileContents);
	const splitData = compressed.toString('base64').match(/[\s\S]{1,1000}/g) || [];

	const dataUrl = await QRCode.toDataURL(JSON.stringify({
		parts: splitData.length,
		filename: file.split('/')[file.split('/').length - 1].split('.')[0]
	}));
	const newDataUrl = dataUrl.replace(/^data:image\/\w+;base64,/, '');
	fs.writeFileSync(destination + `/blackify/info.png`, newDataUrl, {encoding: 'base64'});


	for (let i = 0; i < splitData.length; i++)
	{
		const url = await QRCode.toDataURL(splitData[i]);
		const newUrl = url.replace(/^data:image\/\w+;base64,/, '');
		fs.writeFileSync(destination + `/blackify/${file.split('/')[file.split('/').length - 1].split('.')[0]}${i}.png`, newUrl, {encoding: 'base64'});
	}
}

module.exports = {
	blackify
};
