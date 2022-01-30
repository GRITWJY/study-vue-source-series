const configs = require('./configs')
const rollup = require('rollup')
const fs = require('fs')



build(configs)

function build(builds) {
	let built = 0
	const total = builds.length
	const next = () => {
		buildEntry(builds[built])
			.then(() => {
				built++
				if (built < total) {
					next()
				}
			}).catch(logError)
	}
	next()
}


function buildEntry({input, output}) {
	const {file, banner} = output
	const isProd = /min\.js$/.test(file)

	return rollup
		.rollup(input)
		.then(bundle => bundle.generate(output))
		.then(bundle => {
			const code = bundle.output[0].code
			return write(file, code)
		})

}


function write(dest, code, zip) {



	return new Promise((resolve, reject) => {

		function report (extra) {
			resolve()
		}


		fs.writeFile(dest, code, err => {
			if (err) return reject(err)

			if (zip) {
			}
			report()

		})
	})

}


function logError (e) {
	console.log(e)
}
