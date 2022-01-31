export function initMixin(Vue) {
	Vue.prototype._init = function (options) {
		const vm = this


		// merge options
		//合并选项
		if (options && options._isComponent) {//自定义组件

		} else {
			vm.$options = options
		}


		if (vm.$options.el) {
			console.log('wjy el', vm.$options.el)
			vm.$mount(vm.$options.el)
		}

	}
}
