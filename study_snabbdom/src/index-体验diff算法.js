import {
	init,
	classModule,
	propsModule,
	styleModule,
	eventListenersModule,
	h,
} from "snabbdom";

// 创建出patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);
const container = document.getElementById('container');
const btn = document.getElementById('btn');

const vnode1 = h('ul',{key:'ul'},[
	h('li',{key:'A'},'a'),
	h('li',{key:'B'},'b'),
	h('li',{key:'C'},'c'),
	h('li',{key:'D'},'d'),
])

// 上树
patch(container,vnode1)
const vnode2 = h('ol',{key:'ul'},[
	h('li',{key:'A'},'a'),
	h('li',{key:'E'},'e'),
	h('li',{key:'B'},'b'),
	h('li',{key:'C'},'c'),
	h('li',{key:'D'},'d'),
])

//点击按钮时,将vnode1变为vnode2
btn.onclick = function () {
	patch(vnode1, vnode2)
}
