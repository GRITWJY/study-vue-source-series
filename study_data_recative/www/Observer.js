import {def} from "../src/utils";
import defineReactive from "./defineReactive";
import {arrayMethods} from "../src/array";
import observe from "./observe";
import Dep from "./Dep";

export default class Observer {
	constructor(value) {
		this.dep = new Dep()

		def(value, '__ob__', this, false)
		if (Array.isArray(value)) {
			// 数组响应式
			Object.setPrototypeOf(value, arrayMethods)
			this.observeArray(value)
		} else {
			this.walk(value)
		}
	}

	walk(value) {
		for (const key in value) {
			defineReactive(value, k)
		}
	}

	observeArray(arr) {
		for (let i = 0; i < arr.length; i++) {
			observe(arr[i])
		}
	}
}

export const def = function (obj, key, value, enumerable) {
	Object.defineProperty(obj, key, {
		value: value,
		writable: true,
		enumerable: enumerable
	})
}
