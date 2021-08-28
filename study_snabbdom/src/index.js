import h from './mysnabbdom/h'
import patch from "./mysnabbdom/patch";

const container = document.getElementById('container')
const btn = document.getElementById('btn');


const myVNode2 = h('section',{},[
	h('li',{key:'A'},'A'),
	h('li',{key:'B'},'B'),
	h('li',{key:'C'},'C'),
	h('li',{key:'D'},'D'),
	h('li',{key:'E'},'e'),

])


const myVNode3 = h('section',{},[
	h('li',{key:'E'},'E'),
	h('li',{key:'B'},'B'),
	h('li',{key:'A'},'A'),
	h('li',{key:'Q'},'Q'),
	h('li',{key:'D'},'D'),
	h('li',{key:'C'},'C'),

])

patch(container,myVNode2)

btn.onclick = function () {
	patch(myVNode2, myVNode3)
}
