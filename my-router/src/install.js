import Link from './components/link'
import View from './components/view'


export let _Vue

export function install(Vue) {

	if (install.installed && _Vue === Vue) return
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
				this._routerRoot = this
				this._router = this.$options.router
				this._router.init(this)
				Vue.util.defineReactive(this, '_route', this._router.history.current)
			} else {
				// todo：
			}
			// todo:
		},
		destroyed() {
		}
	})

	Object.defineProperty(Vue.prototype, '$route', {
		// this._router.history.current)
		get () { return this._routerRoot._route }
	})


	Vue.component('RouterLink', Link)
	Vue.component('RouterView', View)


}
