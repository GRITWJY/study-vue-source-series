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

const vnode1 = h('ul',{},[
	h('li',{key:'A'},'a'),
	h('li',{key:'B'},'b'),
	h('li',{key:'C'},'c'),
	h('li',{key:'D'},'d'),
])


patch(container,vnode1)



const vnode2 = h('ul',{},[
	h('li',{key:'A'},'a'),
	h('li',{key:'B'},'b'),
	h('li',{key:'C'},'c'),
	h('li',{key:'D'},'d'),
	h('li',{key:'E'},'e'),
])

//点击按钮时,将vnode1变为vnode2
btn.onclick = function () {
	patch(vnode1, vnode2)
}
