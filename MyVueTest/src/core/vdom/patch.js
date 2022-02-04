import {
	isUndef,
	isDef, isPrimitive
} from "../../shared/util";
import VNode from "./VNode";

export function createPatchFunction(backend) {
	const {modules, nodeOps} = backend

	function createElm(vnode, parentElm) {
		const data = vnode.data
		const children = vnode.children
		const tag = vnode.tag
		if (isDef(tag)) {
			vnode.elm = nodeOps.createElement(tag, vnode)
			createChildren(vnode, children)
			insert(parentElm, vnode.elm)
		} else {
			vnode.elm = nodeOps.createTextNode(vnode.text)
			insert(parentElm, vnode.elm)
		}
	}

	function insert(parent, elm, ref) {
		if (isDef(parent)) {

			if (isDef(ref)) {
			} else {
				nodeOps.appendChild(parent, elm)
			}
		}
	}

	function createChildren(vnode, children) {
		if (Array.isArray(children)) {
			for (let i = 0; i < children.length; ++i) {
				createElm(children[i], vnode.elm)
			}
		} else if (isPrimitive(vnode.text)) {
			nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
		}
	}

	// 创建空节点
	function emptyNodeAt(elm) {
		return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	}

	return function patch(oldVnode, vnode, hydrating, removeOnly) {
		if (isUndef(oldVnode)) {
		} else {
			const isRealElement = isDef(oldVnode.nodeType)
			if (isRealElement) {
				oldVnode = emptyNodeAt(oldVnode)
			}
			const oldElm = oldVnode.elm
			const parentElm = nodeOps.parentNode(oldElm)
			// 将新的vdom转换为真实dom
			createElm(vnode, parentElm)
		}
	}
}
