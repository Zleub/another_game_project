let def = function (path, object) {
	let o = global

	path.match(/(\w+)/g).forEach( (v, i, array) => {
		if (o[v] == undefined && i < array.length - 1)
			o[v] = {}
		if (o[v] == undefined && i == array.length - 1)
			o[v] = object || {}
		o = o[v]
	} )
}

let fn = function ({name, namespace, fn}) {
	def(namespace + '.' + name, fn )
	def('adebray.documentation.' + name, arguments[0])
}

let ev = function ({elem, event, fn}) {
	global.adebray.def('adebray.documentation.events', {})
	global.adebray.def('adebray.documentation.events.' + event, [])

	global.adebray.documentation.events[event].push({
		name: event,
		namespace: elem.constructor.name,
		tags: [ 'Event' ],
		fn: fn
	})

	if (elem.addEventListener)
		elem.addEventListener(event, fn)
	else if (elem.on)
		elem.on(event, fn)
}

fn({
	name: "def",
	namespace: "adebray",
	description: "The 1st order function for namespacing",
	tags: [ "utils" ],
	fn: def
})

fn({
	name: "fn",
	namespace: "adebray",
	description: "The 1st order function for documentation",
	tags: [ "utils" ],
	fn: fn
})

fn({
	name: "ev",
	namespace: "adebray",
	description: "The 1st order function for managing events",
	tags: [ "utils" ],
	fn: ev
})

let print_adebray = () => Object.keys(global.adebray.documentation).forEach( (k) => {
	console.log(k, global.adebray.documentation[k])
} )

exports.print = print_adebray
exports.def = def
exports.fn = fn
exports.ev = ev
