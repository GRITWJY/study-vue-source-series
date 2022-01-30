import {def} from "./Observer";

const arrayPrototype = Array.prototype

export const arrayMehtods = Object.create(arrayPrototype)
const methodsNeedChange = [
	'push',
	'pop',
	'shift',
	'unshift',
	'splice',
	'sort',
	'reverse'
]

methodsNeedChange.forEach(methodName => {
	// 备份原来的
	const original = arrayPrototype[methodName]

	def(arrayMehtods, methodName, function () {
		const result = original.apply(this, arguments)
		const args = [...arguments]
		const ob = this.__ob__
		let inserted = []
		switch (methodName) {
			case 'push':
			case 'unshift':
				inserted = args
				break
			case 'splice':
				inserted = args.slice(2)
				break
		}
		if (inserted) {
			ob.observeArray(inserted)
		}
		return result
	}, false)
})

