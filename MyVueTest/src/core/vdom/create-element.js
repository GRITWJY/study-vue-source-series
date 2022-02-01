import VNode from "./vnode";

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

export function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
	return _createElement(context, tag, data, children, normalizationType)
}


export function _createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
	if (normalizationType === ALWAYS_NORMALIZE) {
	} else if (normalizationType === SIMPLE_NORMALIZE) {
	}
	let vnode
	if (typeof tag === 'string') {
		vnode = new VNode(
			tag, data, children,
			undefined, undefined, context
		)
	}
	return vnode
}
