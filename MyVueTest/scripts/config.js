const path = require('path')

const aliases = require('./alias')


// 生成全路径
const resolve = p => {
	// dist
	const base = p.split('/')[0]
	// 判断
	if (aliases[base]) {
		return path.resolve(aliases[base], p.slice(base.length + 1))
	} else {
		return path.resolve(__dirname, '../', p)
	}
}

console.log(resolve('web/entry-runtime-with-compiler.js'))


const builds = {
	'web-full-dev': {
		entry: resolve('web/entry-runtime-with-compiler.js'),
		dest: resolve('dist/vue.js'),
		format: 'umd',
	},
	'web-runtime-dev': {
		entry: resolve('web/entry-runtime.js'),
		dest: resolve('dist/vue.runtime.js'),
		format: 'umd',
	},

}

function genConfig (name) {
	const opts = builds[name]
	const config = {
		input: opts.entry,
		output: {
			file: opts.dest,
			format: opts.format,
			name: 'Vue'
		},
	}
	return config

}


exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
