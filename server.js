const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const snappy = require('snappy');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/decompress', (req, res) => {
	const {parts} = req.body;
	const compressed = parts.join('');
	const compressedBuffer = Buffer.from(compressed, 'utf8');
	snappy.uncompress(compressedBuffer, {}, (err, uncompressed) => {
		res.pipe(uncompressed);
	});
});

app.listen(port, () => {});
