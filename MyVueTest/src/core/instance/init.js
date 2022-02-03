import {initRender} from "./render";
import {initProxy} from "./proxy";

export function initMixin(Vue) {
	Vue.prototype._init = function (options) {
		const vm = this


		// merge options
		//合并选项
		if (options && options._isComponent) {//自定义组件

		} else {
			vm.$options = options
		}

		initProxy(vm)
		initRender(vm)     // 声明$slots, $createElement()


		if (vm.$options.el) {
			vm.$mount(vm.$options.el)
		}
	}
}
