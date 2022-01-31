import Vue from './runtime/index'
import {query} from "./util/index";

const mount = Vue.prototype.$mount


Vue.prototype.$mount = function (el, hydrating) {
	el = el && query(el)

	//解析option选项
	const options = this.$options

	// resolve template/el and convert to render function
	//先判断是否有render
	if (!options.render) {
		let template = options.template
		// 模板解析
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
			let render = function () {
				console.log('wjy render')
			}
			console.log('wjyoptions',options)
			options.render = render

		}
	}

	return mount.call(this, el, hydrating)

}


export default Vue
