import Link from './components/link'
import View from './components/view'


export let _Vue

export function install(Vue) {
	console.log('wjy-install')

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
			} else {
				// todo：
			}
			// todo:
		},
		destroyed() {
		}
	})

	Vue.component('RouterLink', Link)
	Vue.component('RouterView', View)


}
