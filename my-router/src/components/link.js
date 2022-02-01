export default {
	name: 'RouterLink',
	props: {
		to: {
			type: String,
			required: true
		},
		tag: {
			type: String,
			default: 'a'
		}
	},
	render(h) {
		const classes = {}
		const data = {class: classes}
		const href = '#' + this.to
		if (this.tag === 'a') {
			data.attrs = {href}
		}

		return h(this.tag, data, ['route-link'])
	}
}
