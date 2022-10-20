const EventEmitter = require('node:events');
const app = require('express')();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'test'
  })
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
	console.log(`App is now running on port ${PORT}`);
});
