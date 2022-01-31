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
	let updateComponent
	console.log(vm._render())
	updateComponent = () => {
		vm._update(vm._render(), hydrating)
	}


	new Watcher(vm, updateComponent, noop, {}, true)

	return vm

}
