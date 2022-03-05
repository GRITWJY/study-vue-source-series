export default {
	name: 'RouterView',
	functional: true, // 函数式组件
	props: {
		name: {
			type: String,
			default: 'default'
		}
	},
	render(h, {props, children, parent, data}) {
		// used by devtools to display a router-view badge
		data.routerView = true// 标识当前组件为router-view


		const name = props.name
		const route = parent.$route

		let depth = 0
		// 相当于是找嵌套组件是在第几层
		// ---------- 嵌套组件的逻辑，之前默认是0，第一层
		// 相当于是找嵌套组件是在第几层
		// 向上查找，计算depth、inactive
		// 当parent指向Vue根实例结束循环
		while (parent && parent._routerRoot !== parent) {
			const vnodeData = parent.$vnode ? parent.$vnode.data : {}
			if (vnodeData.routerView) {
				depth++
			}
			parent = parent.$parent
		}
		data.routerViewDepth = depth

		// 从第几层
		const matched = route.matched[depth]
		const component = matched && matched.components[name]
		return h(component, data, children)
	}
	// render(h, context) {
	// 	console.log("wjycontext", context)
	// 	return h('div', {},['aaa'])
	// }
}
