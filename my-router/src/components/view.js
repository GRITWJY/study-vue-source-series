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

		const name = props.name
		let depth = 0
		const route = parent.$route
		const matched = route.matched[depth]
		const component = matched && matched.components[name]
		return h(component, data, children)
	}
	// render(h, context) {
	// 	console.log("wjycontext", context)
	// 	return h('div', {},['aaa'])
	// }


}
