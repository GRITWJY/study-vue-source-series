import {
	isUndef,
	isDef, isPrimitive
} from "../../shared/util";
import VNode from "./VNode";

export function createPatchFunction(backend) {
	const {modules, nodeOps} = backend

	function createElm(vnode, insertedVnodeQueue, parentElm, refElm) {

		// 尝试创建组件的实例
		if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
			return
		}


		const data = vnode.data
		const children = vnode.children
		const tag = vnode.tag
		if (isDef(tag)) {
			vnode.elm = nodeOps.createElement(tag, vnode)
			createChildren(vnode, children, insertedVnodeQueue)
			insert(parentElm, vnode.elm)
		} else {
			vnode.elm = nodeOps.createTextNode(vnode.text)
			insert(parentElm, vnode.elm)
		}
	}

	function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
		let i = vnode.data
		if (isDef(i)) {
			const isReactivated = isDef(vnode.componentInstance)
			// 如果存在init钩子则执行
			// 执行实例创建和挂载
			if (isDef(i = i.hook) && isDef(i = i.init)) {
				// 此时i是init，应该是在这里执行init的时候挂载componentInstance
				i(vnode, false)
			}
			// 插入到父元素
			// todo: 没有这个
			if (isDef(vnode.componentInstance)) {
			}

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

	function createChildren(vnode, children, insertedVnodeQueue) {
		if (Array.isArray(children)) {
			for (let i = 0; i < children.length; ++i) {
				createElm(children[i], insertedVnodeQueue, vnode.elm)
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

		const insertedVnodeQueue = []


		if (isUndef(oldVnode)) {
		} else {
			const isRealElement = isDef(oldVnode.nodeType)
			if (isRealElement) {
				oldVnode = emptyNodeAt(oldVnode)
			}
			const oldElm = oldVnode.elm
			const parentElm = nodeOps.parentNode(oldElm)
			// 将新的vdom转换为真实dom
			createElm(vnode, insertedVnodeQueue, parentElm, nodeOps.nextSibling(oldElm))
		}
	}
}
