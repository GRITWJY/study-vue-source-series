export default function createEelment(vnode) {
	let domel = document.createElement(vnode.sel)
	if (vnode.text != '' && (vnode.children == undefined || vnode.children.length === 0)) {
		domel.innerText = vnode.text
	} else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
		for (let i = 0; i < vnode.children.length; i++) {
			let ch = vnode.children[i]
			let chDom = createEelment(ch)
			domel.appendChild(chDom)
		}
	}
	vnode.elm = domel
	return vnode.elm
}
