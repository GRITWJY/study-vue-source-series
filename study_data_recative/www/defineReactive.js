import observe from "../src/observe";

export default function defineReactive(data, type, val) {
	if (arguments.length == 2) {
		val = data[type]
	}
	// let childOb = observe()

	Object.defineProperty(data, type, {
		get() {
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
			childOb = observe(newValue)
			dep.notify()
		}
	})

}
