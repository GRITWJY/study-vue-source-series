import Vue from '../../../core/index'
import {mountComponent} from "../../../core/instance/lifecycle";


Vue.prototype.$mount = function (el, hydrating) {
	return mountComponent(this, el, hydrating)
}


export default Vue
