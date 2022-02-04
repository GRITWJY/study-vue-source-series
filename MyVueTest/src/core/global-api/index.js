import {initExtend} from "./extend";

export function initGlobalAPI (Vue) {
	Vue.options = Object.create(null)
	Vue.options._base = Vue


	// vue里的extend方法，在create-component里用到
	initExtend(Vue)

}
