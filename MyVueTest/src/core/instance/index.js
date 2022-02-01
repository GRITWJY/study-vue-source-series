import {initMixin} from "./init";
import {renderMixin} from './render'
import {lifecycleMixin} from "./lifecycle";


function Vue(options) {
	// 初始化
	this._init(options)
}

initMixin(Vue) //通过该方法给vue添加_init方法

lifecycleMixin(Vue) //_update(), $forceUpdate(), $destory()
renderMixin(Vue)   // _render(), $nextTick()

export default Vue
