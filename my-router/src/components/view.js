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
		data.routerView = true


		const name = props.name
		const route = parent.$route

		let depth = 0
		debugger
		// 相当于是找嵌套组件是在第几层
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
