import createEelment from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVnode(newVnode, oldVnode) {
	if (newVnode === oldVnode) {
		return
	}

	if (newVnode.text != undefined) {
		if (newVnode.text !== oldVnode.text) {
			oldVnode.elm.innerText = newVnode.text
		}
	} else {
		if (oldVnode.children == undefined) {
			oldVnode.elm.innerText = null
			for (let i = 0; i < newVnode.children.length; i++) {
				let dom = createEelment(newVnode.children[i])
				oldVnode.elm.appendChild(dom)
			}
		} else {
			updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
		}
	}


}
