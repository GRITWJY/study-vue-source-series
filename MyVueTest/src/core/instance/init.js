import {initRender} from "./render";
import {initProxy} from "./proxy";
import {resolveAsset, mergeOptions} from "../util/index";
import {initLifecycle} from "./lifecycle";

/**
 * 定义 Vue.prototype._init
 * @param {*} Vue Vue 构造函数
 */
export function initMixin(Vue) {
	// 负责 Vue 的初始化过程
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
			// 初始化根组件时走这里，合并 Vue 的全局配置到根组件的局部配置，比如 Vue.component 注册的全局组件最后会合并到 根组件实例的 components 选项中
			vm.$options = mergeOptions(
				options || {},
				resolveConstructorOptions(vm.constructor),
				vm)
		}

		initProxy(vm)
		initLifecycle(vm)    // 声明 $parent, $root, $children, $refs


		initRender(vm)     // 声明$slots, $createElement()


		// 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount，反之，没有 el 则必须手动调用 $mount
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


}
