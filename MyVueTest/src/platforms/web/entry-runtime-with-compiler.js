import Vue from './runtime/index'
import {query} from "./util/index";
import {compileToFunctions} from './complier/index'


const mount = Vue.prototype.$mount


Vue.prototype.$mount = function (el, hydrating) {
	// 挂载点
	el = el && query(el)
	//解析option选项
	const options = this.$options

	// if (options._componentTag) {
	// 	let render = function (createElement) {
	// 		return createElement('div', 'aaab')
	// 	}
	// 	options.render = render
	//
	// }


	/**
	 * 如果用户提供了 render 配置项，则直接跳过编译阶段，否则进入编译阶段
	 *   解析 template 和 el，并转换为 render 函数
	 *   优先级：render > template > el
	 *
	 *  这里就默认没有模板
	 */
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

			// 这里最后返回的是compiler函数，
			const {render, staticRenderFns} = compileToFunctions(template, {}, this)

			// 将render放到 this.$options 上
			options.render = render
		}
	}
	mount.call(this, el, hydrating)

}


export default Vue
