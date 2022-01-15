import h from './myDOM/h/h'
import patch from "./myDOM/patch";

const container = document.getElementById('container')
const myVnode1 = h('section', {}, [
	h('li', {key:'A'}, 'A'),
	h('li', {key:'B'}, 'B'),
	h('li', {key:'C'}, 'C'),
	h('li', {key:'D'}, 'D'),
	h('li', {key:'E'}, 'E'),
])

const myVnode2 = h('section', {}, [
	h('li', {key:'E'}, 'E'),
	h('li', {key:'B'}, 'B'),
	h('li', {key:'Q'}, 'Q'),
	h('li', {key:'A'}, 'A'),
	h('li', {key:'C'}, 'C'),
	h('li', {key:'D'}, 'D'),


])

// const myVnode1 = h('h1',{},'nihao')
patch(container, myVnode1)

const btn = document.getElementById('btn');
//点击按钮时,将vnode1变为vnode2
btn.onclick = function () {
	patch(myVnode1, myVnode2)
}
