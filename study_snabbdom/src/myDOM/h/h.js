import vnode from "./vnode";
/*
			h(div,{},文字')
			h(div, {},[])
			h(div,{},h())
			c可能是数组、文字、函数

* */

export default function h(sel, data, c) {
	if (arguments.length != 3) {
		throw new Error('请传入3个参数')
	}

	// 检查参数类型
	if (typeof c == 'string' || typeof c == 'number') {
		return vnode(sel, data, undefined, c, undefined)
	} else if (Array.isArray(c)) {
		let children = []
		for (let i = 0; i < c.length; i++) {
			if (!typeof c[i] == 'object' && c[i].hasOwnProperty('self')) {
				throw Error('传入的第三个参数错误')
			}
			// 这里不用执行，只需要收集
			children.push(c[i])
		}
		return vnode(sel, data, children, undefined, undefined)
	} else if (typeof c == 'object' && c.hasOwnProperty('sel')) {// 是对象，且是sel属性
		let children = [c]
		return vnode(sel, data, children, undefined, undefined)
	} else {
		throw Error('传入的第三个类型不对')
	}
}
