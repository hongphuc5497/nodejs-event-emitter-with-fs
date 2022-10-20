const app = require('express')();
const EventEmitter = require('node:events');
const fs = require('fs');

const myEmitter = new EventEmitter();

// Read
myEmitter.on('read', (cb) => {
	const EXAMPLE_FILE = 'lorem.txt';
	fs.readFile(`${__dirname}/${EXAMPLE_FILE}`, (err, data) => {
		if (err) console.error(err);

		myEmitter.emit('show', data);

		// cb(data);
	});
});

// Show
myEmitter.on('show', (data) => {
	console.log('===========');
	console.log(data);
	console.log('===========');
});

app.get('/', async (req, res) => {
	myEmitter.emit('read');
	// const data = await new Promise(resolve => {
	// })
	// console.log('sss', data)

	res.status(200).json({
		message: 'test',
	});
	// res.status(200).json(data.toJSON());
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
	console.log(`App is now running on port ${PORT}`);
});
