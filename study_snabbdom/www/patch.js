import vnode from "./vnode";
import createEelment from "./createElement";
import patchVnode from "./patchVnode";


export default function patch(oldVnode, newVnode) {
	if (oldVnode.sel == '' || oldVnode.sel == undefined) {
		oldVnode  = vnode(oldVnode.tagName.toLowerCase(), {},[],undefined,oldVnode)
	}

	if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
		patchVnode(newVnode,oldVnode)
	} else {
		let newVnodeElm = createEelment(newVnode)
		if (oldVnode.elm.parentNode && newVnodeElm) {
			oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
		}
		oldVnode.elm.parentNode.removeChild(oldVnode.elm)
	}

}
