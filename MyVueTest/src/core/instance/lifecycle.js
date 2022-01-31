import Watcher from "../observer/watcher";
import {
	noop
} from '../util/index'

export function lifecycleMixin(Vue) {
	Vue.prototype._update = function (VNode, hydrating) {
		console.log('wjy-update', VNode)
	}
}


export function mountComponent(vm, el, hydrating) {
	vm.$el = vm
	vm._render = function () {
		console.log('wjy-_render')
		return 'aaa'
	}
	let updateComponent
	updateComponent = () => {
		vm._update(vm._render(), hydrating)
	}


	new Watcher(vm, updateComponent, noop, {}, true)

	return vm

}
