const path = require('path')
const version = require('../package.json').version
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const banner =
	`/*!
  * vue-router v${version}
  * (c) ${new Date().getFullYear()} Evan You
  * @license MIT
  */`



const resolve = _path => path.resolve(__dirname, '../', _path)


module.exports = [
	{
		file: resolve('dist/vue-router.js'),
		format: 'umd',
		env: 'development'
	},
].map(genConfig)

function genConfig (opts) {
	const config = {
		input: {
			input: resolve('src/index.js'),
			plugins: [
				node(),
				cjs()
			]
		},
		output: {
			file: opts.file,
			format: opts.format,
			banner,
			name: 'MyVueRouter'
		}
	}
	return config
}


