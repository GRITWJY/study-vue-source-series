import {initMixin} from "./init";
import { renderMixin } from './render'


function Vue(options) {
	// 初始化
	this._init(options)
}

initMixin(Vue) //通过该方法给vue添加_init方法

renderMixin(Vue)   // _render(), $nextTick()

export default Vue
