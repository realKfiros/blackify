const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const snappy = require('snappy');
const prettier = require('prettier');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/decompress', (req, res) => {
	const {parts} = req.body;
	const compressedBuffer = Buffer.from(parts.join(''), 'base64');
	let valid = snappy.isValidCompressedSync(compressedBuffer);
	const uncompressed = snappy.uncompressSync(compressedBuffer, {
		asBuffer: false
	});
	const pretty_code = prettier.format(uncompressed, {
		semi: true,
		parser: "babel"
	});
	res.send(pretty_code);
});

app.listen(port, () => {});
