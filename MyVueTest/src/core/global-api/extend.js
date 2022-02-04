import {mergeOptions} from "../util/index";

export function initExtend(Vue) {
	Vue.extend = function (extendOptions) {

		extendOptions = extendOptions || {}

		const Super = this // vue

		const Sub = function VueComponent (options) {
			this._init(options)
		}

		// super的到Sub上
		Sub.prototype = Object.create(Super.prototype)
		Sub.prototype.constructor = Sub
		Sub.options = mergeOptions(
			Super.options,
			extendOptions
		)
		debugger
		return Sub

	}
}
