import patchVnode from "./patchVnode";
import createEelment from "./createElement";
import creteElement from "../src/myDOM/createElement";

function checkSameVnode(a, b) {
	return a.sel == b.sel && a.key == b.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
	let oldStartIdx = 0
	let newStartIdx = 0
	let oldEndIdx = oldCh.length - 1
	let newEndIdx = newCh.length - 1

	// 节点
	let oldStartVnode = oldCh[0]
	let newStartVnode = newCh[0]
	let newEndVnode = newCh[newEndIdx]
	let oldEndVnode = oldCh[oldEndIdx]

	let keyMap = null


	while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
		if (oldStartVnode == null) {
			oldStartVnode = oldCh[++oldStartIdx]
		} else if (oldEndVnode == null) {
			oldEndVnode = oldCh[--oldEndIdx]
		} else if (newStartVnode == null) {
			newStartVnode = newCh[++newStartIdx]
		} else if (newEndVnode == null) {
			newEndVnode = newCh[--newEndIdx]
		} else if (checkSameVnode(newStartVnode, oldStartVnode)) {
			patchVnode(newStartVnode, oldStartVnode)
			oldStartVnode = oldCh[++oldStartIdx]
			newStartVnode = newCh[++newStartIdx]
		} else if (checkSameVnode(newEndVnode, oldEndVnode)) {
			/**新后与旧后**/
			console.log('2-新后与旧后')
			patchVnode(newEndVnode, oldEndVnode)
			oldEndVnode = oldCh[--oldEndIdx]
			newEndVnode = newCh[--newEndIdx]
		} else if (checkSameVnode(newEndVnode, oldStartVnode)) {
			patchVnode(newEndVnode, oldStartVnode)
			parentElm.elm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
			oldStartVnode = oldCh[++oldStartIdx]
			newEndVnode = newCh[--newEndIdx]
		} else if (checkSameVnode(newStartVnode, oldEndVnode)) {
			// 新前与旧后
			console.log('4-新前与旧后')
			// 移动，4命中，移动节点当新前的签名
			patchVnode(newStartVnode, oldEndVnode)
			parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
			oldEndVnode = oldCh[--oldEndIdx]
			newStartVnode = newCh[++newStartIdx]
		} else {
			if (!keyMap) {
				keyMap = {}
				for (let i = oldStartIdx; i <= oldEndIdx; i++) {
					const key = oldCh[i].key
					if (key != undefined) {
						keyMap[key] = i
					}
				}
			}
			var idxInOld = keyMap[newStartVnode.key]
			if (idxInOld == undefined) {
				parentElm.elm.insertBefore(createEelment(newStartVnode), oldStartVnode)
			} else {
				const elmToMove = oldCh[idxInOld]
				patchVnode(newStartVnode, elmToMove)
				oldCh[idxInOld] = undefined
				parentElm.elm.insertBefore(newStartVnode.elm, elmToMove)
			}
		}
	}

	if (newStartIdx <= newEndIdx) {
		// 插入这些节点
		console.log('添加多余节点')
		// 遍历新的newCh，添加到老的没有处理之前

		for (let i = newStartIdx; i <= newEndIdx; i++) {
			// insertbefore自动识别null，自动排到队尾
			parentElm.insertBefore(createEelment(newCh[i]), oldCh[oldStartIdx].elm)
		}
	} else if (oldStartIdx <= oldEndIdx) {
		// 删除多余节点
		console.log('删除多余节点')
		for (let i = oldStartIdx; i <= oldEndIdx; i++) {
			if (oldCh[i]) {
				parentElm.removeChild(oldCh[i].elm)
			}
		}
	}

}
