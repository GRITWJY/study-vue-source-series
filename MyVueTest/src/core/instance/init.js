import {initRender} from "./render";
import {initProxy} from "./proxy";
import {resolveAsset, mergeOptions} from "../util/index";

export function initMixin(Vue) {
	Vue.prototype._init = function (options) {
		const vm = this


		// merge options
		//合并选项
		if (options && options._isComponent) {//自定义组件
			// createComponentInstanceFORvnode
			//优化内部组件实例化，因为动态选项合并非常慢，
			// 并且没有任何内部组件选项需要特殊处理。
			initInternalComponent(vm, options)

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


export function initInternalComponent(vm, options) {
	const opts = vm.$options = Object.create(vm.constructor.options)
	//这样做是因为它比动态枚举更快。
	const parentVnode = options._parentVnode
	// 这个parentVnode也是在createComp..Insta中的，就是Init中传进来的vnode
	opts.parent = options.parent
	// parent就是activeInstance，vm实例
	opts._parentVnode = parentVnode


	// Patch中的createComponent会传的
	const vnodeComponentOptions = parentVnode.componentOptions
	opts.propsData = vnodeComponentOptions.propsData
	opts._parentListeners = vnodeComponentOptions.listeners
	opts._renderChildren = vnodeComponentOptions.children
	opts._componentTag = vnodeComponentOptions.tag

	if (options.render) {
		opts.render = options.render
		opts.staticRenderFns = options.staticRenderFns
	}

}
