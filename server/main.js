console.log('Written with node v7.0.0, current: ' + process.version)

let adebray = {}

let def = function (path, object) {
	let o = global

	path.match(/(\w+)/g).forEach( (v, i, array) => {
		if (o[v] == undefined && i < array.length - 1) {
			console.log(v, i, array.length)
			o[v] = {}
		}
		o = o[v]
	} )

	console.log(o)
	o = object || {}
}

// let fn = function ({name, fn}) {
// 	def( adebray[name], [] ) = fn
// 	adebray.documentation[name] = arguments[0]
// }

// fn({
// 	name: "fn",
// 	description: "The 1st order function for documentation",
// 	tags: [ "utils" ],
// 	fn: fn
// })

def('adebray.documentation.io')

console.log(global.adebray)

