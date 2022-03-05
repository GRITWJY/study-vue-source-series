import VNode from "./VNode";
import config from '../config'
import { createComponent } from './create-component'

import {
	isDef,
	isTrue,
	isPrimitive,
	resolveAsset
} from '../util/index'

import {
	normalizeChildren
} from "./helpers/index";

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

export function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
	if (Array.isArray(data) || isPrimitive(data)) {
		normalizationType = children
		children = data
		data = undefined
	}
	if (isTrue(alwaysNormalize)) {
		normalizationType = ALWAYS_NORMALIZE
	}

	return _createElement(context, tag, data, children, normalizationType)
}


export function _createElement(context, tag, data, children, normalizationType) {
	if (normalizationType === ALWAYS_NORMALIZE) {
		children = normalizeChildren(children)
	} else if (normalizationType === SIMPLE_NORMALIZE) {
	}
	let vnode
	if (typeof tag === 'string') {
		// 标签是字符串时，该标签有三种可能：
		//   1、平台保留标签
		//   2、自定义组件
		//   3、不知名标签
		let Ctor
		if (config.isReservedTag(tag)) {
			vnode = new VNode(
				config.parsePlatformTagName(tag), data, children,
				undefined, undefined, context
			)
			// 问题在这，options上没有components
		} else if ((!data) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
			// Ctro此时是aaa里的内容'template:'.....''
			vnode = createComponent(Ctor, data, context, children, tag)
		} else {
			vnode = new VNode(
				tag, data, children,
				undefined, undefined, context
			)
		}
	}
	return vnode
}
