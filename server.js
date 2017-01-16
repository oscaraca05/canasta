//require the express nodejs module
var express = require('express'),
	//set an instance of exress
	app = express(),
	//require the body-parser nodejs module
	bodyParser = require('body-parser'),
	//require the path nodejs module
	path = require("path");

//require the r-script nodejs module
var R = require("r-script");
	
//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//tell express what to do when the /about route is requested
app.post('/form',function(req, res){
	res.setHeader('Content-Type', 'application/json');

	//mimic a slow network connection
	setTimeout(function(){

		res.send(JSON.stringify({
			dato1: req.body.dato1 || null,
			dato2: req.body.dato2 || null,
			otroValor: "este es otro valor"
		}));

	}, 1000);

	//debugging output for the terminal
	console.log('you posted: First Name: ' + req.body.dato1 + ', Last Name: ' + req.body.dato2);
});

app.post('/peticion2', function(req, res){
	var out = R("testR.R")
	  .data(req.body.dato1, req.body.dato2)
	  .callSync();
	  
	console.log(out);

	console.log("devuelto de R " + out);
	res.send(JSON.stringify({
		resultado:out
	}));
});

//wait for a connection
app.listen(3000, function () {
  console.log('Server is running. Point your browser to: http://localhost:3000');
});