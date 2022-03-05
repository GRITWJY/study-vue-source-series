import Link from './components/link'
import View from './components/view'


export let _Vue

export function install(Vue) {

	if (install.installed && _Vue === Vue) return  // 避免重复安装
	install.installed = true
	_Vue = Vue

	// 判断v是否有值
	const isDef = v => v !== undefined


	Vue.mixin({
		beforeCreate() {
			/*
			这个在new Vue的时候执行，才会走到beforeCreate
			Vue中的options的router实例
			new Vue({
			  el: '#app',
			  router,
			  components: { App },
			  template: '<App/>'
			})
			 */
			if (isDef(this.$options.router)) {
				this._routerRoot = this//保存挂载VueRouter的Vue实例，此处为根实例
				// 传进来的router实例
				this._router = this.$options.router // 保存VueRouter实例，this.$options.router仅存在于Vue根实例上，其它Vue组件不包含此属性，所以下面的初始化，只会执行一次
				this._router.init(this) // 初始化VueRouter实例，并传入Vue根实例
				// 响应式定义_route属性，保证_route发生变化时，组件(router-view)会重新渲染
				Vue.util.defineReactive(this, '_route', this._router.history.current)
			} else {
				// 所有组件拿到router,route
				// 回溯查找_routerRoot
				this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
			}
			// todo:
		},
		destroyed() {
		}
	})
	Object.defineProperty(Vue.prototype, '$router', {
		get() {
			return this._routerRoot._router
		}
	})

	Object.defineProperty(Vue.prototype, '$route', {
		get() {
			return this._routerRoot._route
		}
	})


	Vue.component('RouterLink', Link)
	Vue.component('RouterView', View)


}
