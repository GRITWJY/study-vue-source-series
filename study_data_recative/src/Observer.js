import {def} from "./utils";
import defineReactive from "./defineReactive";
import {arrayMethods} from "./array";
import observe from "./observe";
import Dep from "./Dep";

// 将一个正常的Obj转换为每个层级都被监听的obj
export default class Observer {
	// 如何被实例化
	constructor(value) {
		// 每个Observe的实例都有dep
		this.dep = new Dep()

		// 给实例，构造函数中的this不是类本身，而是实例
		def(value, '__ob__', this, false)
		// 检查是数组还是对象
		if (Array.isArray(value)) {
			Object.setPrototypeOf(value, arrayMethods)
			this.observeArray(value)
		} else {
			this.walk(value)
		}
	}


	// 遍历每个key
	walk(value) {
		for (let k in value) {
			defineReactive(value, k)
		}
	}

	// 数组的特殊遍历
	observeArray(arr) {
		for (let i = 0; i < arr.length; i++) {
			observe(arr[i])
		}
	}

}
