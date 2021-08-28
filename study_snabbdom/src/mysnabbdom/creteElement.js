// 真正创建节点.将vnode创建为DOM, 是孤儿节点,不进行插入
export default function createElement(vnode) {

	// 创建一个DOM节点,这个节点还是孤儿节点;
	// 这里就只进行创建节点,上树由patch做
	let domNode = document.createElement(vnode.sel)

	// 有子节点还是文本??
	if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
		// 相当于,内部是文字
		domNode.innerText = vnode.text

	}

	else if (Array.isArray(vnode.children) && vnode.children.length>0){
		// 内部是子节点,就要递归创建节点
		for (let i=0; i<vnode.children.length; i++) {
			// 得到当前这个children
			let ch = vnode.children[i]
			// 创建出DOM,一旦调用createElement意味着:创建出DOM了,
			// 并且它的elm属性指向了创建爱你处的DOM了,但是还没上树,是孤儿节点
			let chDOM = createElement(ch)
			//  子元素上树用 追加,appendChild
			domNode.appendChild(chDOM)
		}
	}
	// 补充elm属性
	vnode.elm = domNode


	//返回elm,elm属性感纯DOM
	return vnode.elm
}



















