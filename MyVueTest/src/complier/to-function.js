function createFunction (code, errors) {

}

export function createCompileToFunctionFn(compile) {
	return function compileToFunctions(template, options, vm) {
		const compiled = compile(template, options)

		const res = {}
		const fnGenErrors = []

		res.render = createFunction(compiled.render, fnGenErrors)


		// res.render = function (createElement) {
		// 	return createElement('div', [createElement('h1', 'aaa')])
		// }
		res.staticRenderFns = {}
		return res
	}
}
