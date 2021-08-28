import creteElement from "./creteElement";
import updateChildren from "./updateChildren";

// 对比同一个虚拟节点
export default function patchVNode(oldVNode,newVNode) {
	// 1. 判断新旧node是不是同一个对象
	if (oldVNode === newVNode) return;

	// 2. 判断新vnode有没有text属性
	if (newVNode.text != undefined && (newVNode.children == undefined || newVNode.children.length == 0)){

		if (newVNode.text !== oldVNode.text){
			// 2.1 如果新的和旧的不同,直接更新老的;若老的是children,也会立即消失
			oldVNode.elm.innerHTML = newVNode.text
		}
	}

	else {

		// 2.1 判断老的有没有children
		if (oldVNode.children !=undefined && oldVNode.children.length > 0){
			// 新老都有chldren
			updateChildren(oldVNode.elm, oldVNode.children, newVNode.children)
		}
		else {
			// 老的没有children,新的有children
			// 清空文字
			oldVNode.elm.innerHTML = ''
			// 遍历子节点,上树
			for (let i = 0; i < newVNode.children.length; i++) {
				let dom = creteElement(newVNode.children[i])
				oldVNode.elm.appendChild(dom)
			}
		}
	}


}
