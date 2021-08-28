import vnode from "./vnode";
import creteElement from "./creteElement";
import patchVNode from "./patchVNode";

export default function (oldVNode,newVNode){


	// 1.判断传入的第一个参数,是DOM节点还是虚拟节点?
	if (oldVNode.sel == '' || oldVNode.sel == undefined) {
		//DOM节点,则要包装为虚拟节点
		oldVNode = vnode(oldVNode.tagName.toLowerCase(), {}, [], undefined, oldVNode)
	}

	// 2.判断oldVNode 和 newVNode是不是同一个节点
	if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel){
		console.log("是同一个节点")
		console.log(oldVNode)
		patchVNode(oldVNode,newVNode)
	}

	else {
		console.log("不是同一个,暴力插入新的,删除旧的")
		let newVNodeElm = creteElement(newVNode)
		console.log(newVNodeElm)
		// 插入到老节点之前
		if (oldVNode.elm && newVNodeElm) {
			oldVNode.elm.parentNode.insertBefore(newVNodeElm, oldVNode.elm)
		}

		//删除老节点
		oldVNode.elm.parentNode.removeChild(oldVNode.elm);
	}

};








