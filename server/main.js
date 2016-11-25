console.log('Written with node v7.0.0, current: ' + process.version)

const http = require('http')

const director = require('./ext/director')
const redis = require('./ext/node_redis')
const adebray = require('./adebray.js')

function HelloWorld() {
	this.res.end('World Hello')
}

var router = new director.http.Router({
	'/hello': {
		get: HelloWorld
	}
})

const client = redis.createClient({
	port: 6380
})
client.on("error", function (err) {
    console.log("Error " + err);
})

var server = http.createServer( (req, res) => {
	router.dispatch(req, res, (err) => res.end('404') )
} )

client.keys('*', function (err, res) {
	console.log(err, res)
})

server.listen('4200', 'localhost')
