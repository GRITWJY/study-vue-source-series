import {createCompilerCreator} from "./create-compiler";
import {parse} from "./parser";

export const createCompiler = createCompilerCreator(function baseCompile(template, options) {
	// parse作用是将字符串模板编译为AST
	const ast = parse(template.trim(), options)

	const code = generate(ast, options)


	return {
		ast,
		render: code.render,
		staticRenderFns: code.staticRenderFns
	}
})
