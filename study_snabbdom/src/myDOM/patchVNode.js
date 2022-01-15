import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVnode(newVnode, oldVnode) {
	if (oldVnode === newVnode) return

	if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
		if (newVnode.text !== oldVnode.text)
			oldVnode.elm.innerText = newVnode.text
	} else {
		if (oldVnode.children === undefined || oldVnode.children.length == 0) {
			oldVnode.elm.innerText = null
			for (let i = 0; i < newVnode.children.length; i++) {
				let dom = createElement(newVnode.children[i])
				oldVnode.elm.appendChild(dom)
			}
		} else {
			/**最复杂**/
			updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
		}
	}
}

