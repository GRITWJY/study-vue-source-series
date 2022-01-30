// import Complier from "./Complier";
// import observe from "./observe";
// import Watcher from "./Watcher";

export default class Vue {
	constructor(options) {

		/*
			el: '#app',
			data: {
				a: 10
			}
		 */

		// 把参数options对象存为$options
		// 库的使用者去使用options
		this.$options = options || {};

		// 数据，存入内部
		this._data = options.data || undefined;

		// 数据要变为响应式的
		observe(this._data);

		// // 默认数据变为响应式的, 这里就是生命周期
		// this._initData();
		// // 调用默认的watch
		// this._initWatch();


		// 模板编译，this  vue的实例
		new Complier(options.el, this);

	}

	_initWatch(){
		// var sefl = this;
		// var watch = this.$options.watch;
		// Object.keys(watch).forEach(key => {
		// 	new Watcher(self,key,watch[key]);3
		// })
	}

	_initData(){
		// var self = this;
		// Object.keys(this._data).forEach(key =>{
		// 	Object.defineProperty(self, key, {
		// 		get() {
		// 			return self._data[key]
		// 		},
		// 		set(newVal) {
		// 			self._data[key] = newVal
		// 		}
		// 	})
		// })
	}
}
