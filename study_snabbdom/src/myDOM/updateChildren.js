import patchVnode from "./patchVNode";
import patch from "./patch";
import creteElement from "./createElement";

function checkSameVnode(a, b) {
	return a.sel == b.sel && a.key == b.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
	// 新前、旧前
	// 新后、旧后
	// 新后、旧前
	// 新前、旧后
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
		// 首先要略过已经加Undefined

		if (oldStartVnode == null ) {
			oldStartVnode = oldCh[++oldStartIdx]
		} else if (oldEndVnode == null) {
			oldEndVnode = oldCh[--oldEndIdx]
		} else if (newStartVnode == null) {
			newStartVnode = newCh[++newStartIdx]
		} else if (newEndVnode == null) {
			newEndVnode = newCh[--newEndIdx]
		} else if (checkSameVnode(newStartVnode, oldStartVnode)) {
			/**新前与旧前**/
			console.log('1-新前与旧前')
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
			/**新后与旧前**/
			console.log('3-新后与旧前')
			patchVnode(newEndVnode, oldStartVnode)
			// 移动，当3命中时，移动新节点到旧后的后面
			parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
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
			// 4种都没有命中
			// 寻找Key的map
			if (!keyMap) {
				keyMap = {}
				// 创建Keymap对象，这样就不用每次都遍历对象了
				for (let i = oldStartIdx; i <= oldEndIdx; i++) {
					const key = oldCh[i].key
					if (key != undefined) {
						keyMap[key] = i
					}
				}
			}
			// 寻找当前这项（newStartIdx）在keyMap中位置
			var idxInOld = keyMap[newStartVnode.key]
			if (idxInOld == undefined) {
				// 全新的项
				console.log(idxInOld)
				parentElm.insertBefore(creteElement(newStartVnode), oldStartVnode.elm)
			} else {
				// 移动
				const elmToMove = oldCh[idxInOld]
				patchVnode(newStartVnode, elmToMove)
				// 把这项设置为undefined
				oldCh[idxInOld] = undefined
				// 移动
				parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
			}
			newStartVnode = newCh[++newStartIdx]
		}
	}

	if (newStartIdx <= newEndIdx) {
		// 插入这些节点
		console.log('添加多余节点')
		// 遍历新的newCh，添加到老的没有处理之前

		for (let i = newStartIdx; i <= newEndIdx; i++) {
			// insertbefore自动识别null，自动排到队尾
			parentElm.insertBefore(creteElement(newCh[i]), oldCh[oldStartIdx].elm)
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
