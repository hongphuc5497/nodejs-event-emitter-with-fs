const app = require('express')();
const EventEmitter = require('node:events');

const myEmitter = new EventEmitter();
myEmitter.on('call', () => {
  console.log('Calling emitter')
})

app.get('/', (req, res) => {
  myEmitter.emit('call')
  res.status(200).json({
    message: 'test'
  })
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
	console.log(`App is now running on port ${PORT}`);
});
