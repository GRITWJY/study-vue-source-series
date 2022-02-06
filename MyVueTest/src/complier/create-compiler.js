import {createCompileToFunctionFn} from "./to-function";

export function createCompilerCreator(baseCompile) {
	return function createCompiler(baseOptions) {
		// 创建了一个compile函数，返回？
		function compile(template,options) {

		}

		return {
			compile,
			compileToFunctions: createCompileToFunctionFn(compile)
		}
	}
}
