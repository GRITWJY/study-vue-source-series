import {
	isUndef,
	isObject
} from "../util/index";
import {resolveConstructorOptions} from "../instance/init";
import VNode from "./VNode";

export function createComponent(Ctor, data, context, children, tag) {
	if (isUndef(Ctor)) {
		return
	}

	const baseCtor = context.$options._base

	if (isObject(Ctor)) {
		Ctor = baseCtor.extend(Ctor)
	}
	if (typeof Ctor !== 'function') {
		return
	}

	let asyncFactory
	if (isUndef(Ctor.cid)) {
		// todo:
	}


	data = data || {}

	const propsData = ''
	const listeners = ''

	// 安装组件钩子函数
	// todo
	installComponentHooks(data)
	const name = Ctor.options.name || tag
	const vnode = new VNode(
		`vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
		data,
		undefined,
		undefined,
		undefined,
		context,
		{Ctor, propsData, listeners, tag, children},
		asyncFactory)

	return vnode
}


function installComponentHooks(data) {

}







