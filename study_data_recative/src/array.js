import {def} from "./utils";

const arrayPrototype = Array.prototype

export const arrayMethods = Object.create(arrayPrototype)
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
	// 把上下文的__ob__取出来，__ob__已经被添加了
	// 定义新的方法
	def(arrayMethods, methodName, function () {
		const result = original.apply(this, arguments)
		// 把类数组对象变为数组
		const args =[...arguments]

		const ob = this.__ob__
		// 有3种方法push/unshift/splice能够插入新项
		// 现在要把插入的也要变为observe的
		let inserted = []
		switch (methodName) {
			case 'push':
			case 'unshift':
				inserted = args
				break
			case 'splice':
				// splice(下标,数量，插入的新项
				inserted = args.slice(2)
				break
		}

		// 判断有没有要插入的新项
		if (inserted) {
			// 让新项也变为相应地
			ob.observeArray(inserted)
		}
		ob.dep.notify()
		return result
	}, false)
})
