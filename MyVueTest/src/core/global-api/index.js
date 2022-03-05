import {initExtend} from "./extend";

export function initGlobalAPI (Vue) {
	Vue.options = Object.create(null)
	Vue.options._base = Vue // 将 Vue 构造函数挂载到 Vue.options._base 上


	// vue里的extend方法，在create-component里用到
	initExtend(Vue)

}
