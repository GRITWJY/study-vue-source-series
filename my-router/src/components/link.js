export default {
	name: 'RouterLink',
	props: {
		tag: {
			type: String,
			default: 'a'
		}
	},
	render(h) {
		const classes = {}
		const data = { class: classes }
		return h(this.tag, data, ['route-link'])
	}
}
