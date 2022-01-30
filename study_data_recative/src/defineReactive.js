import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(data, type, val) {
	const dep = new Dep()
	if (arguments.length == 2) {
		val = data[type]
	}
	// 继续给其他层级设计响应式,形成了递归，不是函数调用自己
	// 而是多个函数类循环调用
	let childOb = observe(val)

	Object.defineProperty(data, type, {
		get() {
			// 处于依赖收集
			if (Dep.target) {
				dep.depend()
				if (childOb) {
					childOb.dep.depend()
				}
			}
			return val
		},
		set(newValue) {
			if (val === newValue) {
				return
			}
			val = newValue
			// 当设置了新值，新值也要observe
			childOb = observe(newValue)

			// 发布订阅模式
			dep.notify()
		}
	})
}
