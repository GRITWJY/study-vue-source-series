var uid = 0
export default class Dep {
	constructor() {
		console.log('我是dep类的构造器')
		this.id = uid++

		// 用数组存储订阅者,这里面放的是watcher的实例
		this.subs = []
	}


	addSub(sub) {
		this.subs.push(sub)
	}
	// 添加依赖
	depend(){
		// 就是一个我们自己指定的全局位置，只要唯一即可
		if (Dep.target) {
			this.addSub(Dep.target)
		}
	}

	notify() {
		console.log('我是Notify')
		// 浅克隆
		const subs = this.subs.slice()
		for (let i = 0, l = subs.length; i < l; i++) {
			subs[i].update()
		}
	}
}
