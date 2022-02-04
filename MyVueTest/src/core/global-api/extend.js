import {mergeOptions} from "../util/index";

export function initExtend(Vue) {

	/**
	 *每个实例构造函数（包括Vue）都有一个唯一的
	 *cid。这使我们能够创建包装的“子对象”
	 *“构造函数”用于原型继承并缓存它们。
	 */
	Vue.cid = 0
	let cid = 1


	Vue.extend = function (extendOptions) {

		extendOptions = extendOptions || {}

		const Super = this // vue
		const SuperId = Super.cid

		const Sub = function VueComponent(options) {
			this._init(options)
		}

		// super的到Sub上
		Sub.prototype = Object.create(Super.prototype)
		Sub.prototype.constructor = Sub
		Sub.cid = cid++
		debugger
		Sub.options = mergeOptions(
			Super.options,
			extendOptions
		)
		return Sub
	}
}
