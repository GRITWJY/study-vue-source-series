import Vue from '../../../core/index'
import {mountComponent} from "../../../core/instance/lifecycle";
import {patch} from "./patch";


// install platform patch functio
// 指定补丁方法:传入虚拟dom转换为真实dom
Vue.prototype.__patch__ = patch


Vue.prototype.$mount = function (el, hydrating) {
	return mountComponent(this, el, hydrating)
}


export default Vue
