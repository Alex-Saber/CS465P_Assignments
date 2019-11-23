const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = 3000;
const helmet = require('helmet');


app.use(helmet());
app.use(helmet.noSniff());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

//pre-flight requests
app.options('*', function(req, res) {
	res.send(200);
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	console.log('Node Server running on port: ' + port);
});

module.exports = server;

app.get('/', (err, res) => {
	res.render('index.html');
});

app.post('/contact', (request, response) => {
	console.log('POST /');
	console.log(request.body);

	let name = request.body.name;
	let email = request.body.email;
	let message = request.body.message;

	response.render('contact.html', {name: name, email: email, message: message});
});