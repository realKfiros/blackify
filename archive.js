const fs = require('fs');
const snappy = require('snappy');
const inquirer = require('inquirer');
const QRCode = require('qrcode');

const replaceBackslashes = (str) => {
	return str.replace(/\r/gm, '___r___').replace(/\n/gm, '___n___').replace(/\t/gm, '___t___');
}

(async () => {
	const answers = await inquirer.prompt([
		{
			name: 'path',
			message: 'Type the path of the directory that you want to blackify:'
		}
	]);

	const file = fs.readFileSync(answers.path).toString();

	const compressed = snappy.compressSync(file);
	const compressedData = compressed.toString().replace(/\r/gm, '___r___').replace(/\n/gm, '___n___').replace(/\t/gm, '___t___');

	snappy.compress(file, async (err, compressed) => {
		let qr = await QRCode.toDataURL(compressed.toString());
		console.log(qr);
	})
})();
