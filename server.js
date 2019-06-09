'use strict'

const
	http    = require('http'),
	Server  = require('node-static').Server,
	file    = new Server('./dist');
 
http.createServer((request, response) => {
    request.addListener('end',() => file.serve(request, response)).resume();
}).listen(process.env.PORT || 8080);
