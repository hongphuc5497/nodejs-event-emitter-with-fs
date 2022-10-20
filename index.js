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

		cb(data);
	});
});

// Show
myEmitter.on('show', (data) => {
	console.log('==== [File Data] ====');
	console.log(data);
	console.log('==== [End] ====');
});

app.get('/', async (req, res) => {
  const fileContent = await new Promise(resolve => {
    myEmitter.emit('read', resolve);
  })

  res.status(200).json({
    content: fileContent.toString()
  });
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
	console.log(`App is now running on port ${PORT}`);
});
