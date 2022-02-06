export function createCompileToFunctionFn(compile) {
	return function compileToFunctions(template, options, vm) {
		compile()
		console.log(' compileToFunctions ')
		const res = {}
		res.render = function (createElement) {
			return createElement('div', [createElement('h1', 'aaa')])
		}
		res.staticRenderFns = {}
		return res
	}
}
