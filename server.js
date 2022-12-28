const express = require('express')
const app = express()
const path = require('path')
const WebSocket = require('ws');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(3000, () => {
	console.log('client server listening on port 3000')
})

clients = []

const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function(ws, req) {
    try {
	 	ws.on('message', function(message) {
	 		var msg = message.toString('utf8')
	 		var connected = msg.split(" ")

			if(connected[0] == 'connected') {
				clients.push(connected[1])
			} else {
				var canvas = JSON.parse(msg)

				wss.clients.forEach((client) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(JSON.stringify(canvas))
					}
				})
			}
	 	})

	 	ws.on('close', (message) => {
            
    	});
    }catch(e) {
    	console.log(e)
    }
})
