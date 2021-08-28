import patchVNode from "./patchVNode";
import patch from "./patch";
import createElement from "./creteElement";

function checkSameVnode(a, b) {
	return a.sel === b.sel && a.key === b.key;
}


export default function updateChildren(parentElm, oldCh, newCh) {

	// 旧
	let oldStartIdx = 0
	let oldEndIdx = oldCh.length - 1
	// 旧节点
	let oldStartVnode = oldCh[0]
	let oldEndVnode = oldCh[oldEndIdx]


	// 新
	let newStartIdx = 0
	let newEndIdx = newCh.length - 1
	// 新节点
	let newStartVnode = newCh[0]
	let newEndVnode = newCh[newEndIdx]

	let keyMap = null

	while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
		console.log("☆")
		//首先不是判断
		if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
			oldStartVnode = oldCh[++oldStartIdx]
		} else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
			oldEndVnode = oldCh[--oldEndIdx]
		} else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
			newEndVnode = newCh[--newEndIdx]
		} else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
			newStartVnode = newCh[++newStartIdx]
		} else if (checkSameVnode(oldStartVnode, newStartVnode)) { //mynode2, mynode5
			console.log("①")
			patchVNode(oldStartVnode, newStartVnode)
			oldStartVnode = oldCh[++oldStartIdx]
			newStartVnode = newCh[++newStartIdx]
		} else if (checkSameVnode(oldEndVnode, newEndVnode)) {
			console.log("②")
			patchVNode(oldEndVnode, newEndVnode)
			oldEndVnode = oldCh[--oldEndIdx]
			newEndVnode = newCh[--newEndIdx]
		} else if (checkSameVnode(newEndVnode, oldStartVnode)) {
			console.log("③")
			patchVNode(oldStartVnode, newEndVnode)
			//新后与旧前命中,将节点插入到旧后的后面
			// 如何移动节点,只要插入一个已经在dom树上的节点
			parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
			oldStartVnode = oldCh[++oldStartIdx]
			newEndVnode = newCh[--newEndIdx]
		} else if (checkSameVnode(oldEndVnode, newStartVnode)) {
			console.log("④")
			patchVNode(oldEndVnode, newStartVnode)
			//新前与旧后命中,将节点插入到旧前的前

			parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
			newStartVnode = newCh[++newStartIdx]
			oldEndVnode = oldCh[--oldEndIdx]
		} else {
			// 都没有命中
			if (!keyMap) {
				keyMap = {}
				for (let i = oldStartIdx; i <= oldEndIdx; i++) {
					const key = oldCh[i].key
					if (key != undefined) {
						keyMap[key] = i
					}
				}
			}
			// 寻找序号
			const idxInOld = keyMap[newStartVnode.key]
			console.log(idxInOld)
			if (idxInOld == undefined) {
				parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
			} else {
				//移动
				const elmToMove = oldCh[idxInOld]
				patchVNode(elmToMove, newStartVnode)
				oldCh[idxInOld] = undefined
				parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
			}
			newStartVnode = newCh[++newStartIdx]

		}
	}


	if (newStartIdx <= newEndIdx) {
		console.log("new还有剩余没处理,要加项")

		// 遍历新的newCh,添加到老的没有处理之前
		for (let i = newStartIdx; i <= newEndIdx; i++) {
			//如果是null,自动排到队尾
			parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
		}
	} else if (oldStartIdx <= oldEndIdx) {
		console.log("old还有剩余没处理")
		for (let i = oldStartIdx; i <= oldEndIdx; i++) {
			if (oldCh[i]) {
				parentElm.removeChild(oldCh[i].elm)
			}
		}

	}


}
