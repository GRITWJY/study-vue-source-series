import {initRender} from "./render";
import {initProxy} from "./proxy";
import {resolveAsset,mergeOptions} from "../util/index";

export function initMixin(Vue) {
	Vue.prototype._init = function (options) {
		const vm = this


		// merge options
		//合并选项
		if (options && options._isComponent) {//自定义组件

		} else {
			vm.$options = mergeOptions(
				options || {},
				resolveConstructorOptions(vm.constructor),
				vm)
		}

		initProxy(vm)
		initRender(vm)     // 声明$slots, $createElement()


		if (vm.$options.el) {
			vm.$mount(vm.$options.el)
		}
	}
}


export function resolveConstructorOptions(Ctor) {
	let options = Ctor.options
	return options
}
