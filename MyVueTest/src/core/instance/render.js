import {createElement} from "../vdom/create-element";

export function initRender(vm) {
	// render(h) 此处的$createElement就是h
	vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

}


export function renderMixin(Vue) {

	Vue.prototype._render = function () {
		const vm = this
		const {render,_parentVnode} = vm.$options
		// set parent vnode. this allows render functions to have access
		// to the data on the placeholder node.
		vm.$vnoe = _parentVnode
		let vnode
		vnode = render.call(vm._renderProxy, vm.$createElement)
		return vnode
	}
}
