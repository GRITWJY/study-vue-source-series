let builds = require('./config').getAllBuilds() // 拿到配置


console.log(builds)
build(builds)

function build(builds) {
	let built = 0
	const total = builds.length
	const next = () => {
		buildEntry(builds[built]).then(() => {
			built++
			if (built < total) {
				next()
			}
		}).catch(logError)
	}

	next()
}


function buildEntry(config) {
	const output = config.output
	const {file, banner} = output
}


function logError(e) {
	console.log(e)
}

