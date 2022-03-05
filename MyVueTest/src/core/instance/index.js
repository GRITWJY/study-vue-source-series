import {initMixin} from "./init";
import {renderMixin} from './render'
import {lifecycleMixin} from "./lifecycle";

// Vue 的构造函数
function Vue(options) {
	// 初始化
	// 调用 Vue.prototype._init 方法，该方法是在 initMixin 中定义的
	this._init(options)
}

initMixin(Vue) //通过该方法给vue添加_init方法

lifecycleMixin(Vue) //_update(), $forceUpdate(), $destory()
renderMixin(Vue)   // _render(), $nextTick()

export default Vue
