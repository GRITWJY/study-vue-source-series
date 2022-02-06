import Vue from './runtime/index'
import {query} from "./util/index";
import {compileToFunctions} from './complier/index'


const mount = Vue.prototype.$mount


Vue.prototype.$mount = function (el, hydrating) {
	el = el && query(el)
	const options = this.$options

	// if (options._componentTag) {
	// 	let render = function (createElement) {
	// 		return createElement('div', 'aaab')
	// 	}
	// 	options.render = render
	//
	// }

	if (!options.render) {
		let template = options.template
		if (template) {
			if (typeof template === 'string') {
			} else if (template.nodeType) {
			} else {
				return this
			}
		} else if (el) {

		}

		// 如果存在模板,执行编译
		if (template) {
			// todo：

			debugger
			// 这里最后返回的是compiler函数，
			const {render, staticRenderFns} = compileToFunctions(template, {}, this)
			debugger

			options.render = render
		}
	}
	mount.call(this, el, hydrating)

}


export default Vue
