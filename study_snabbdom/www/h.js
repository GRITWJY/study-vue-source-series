import vnode from "./vnode";

export default function (sel, data, c) {
	if (typeof c === 'string' || typeof c === "undefined") {
		return vnode(sel, data, undefined, c, undefined)
	} else if (Array.isArray(c)) {
		let children = []
		for (let i = 0; i < c.length; i++) {
			children.push(c[i])
		}
		return vnode(sel, data, children, undefined, undefined)
	} else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
		let children = [c]
		return vnode(sel, data, children, undefined, undefined)
	}
}
