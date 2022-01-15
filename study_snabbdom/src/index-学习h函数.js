import h from './myDOM/h'

var myvnode = h('div',{},[
	h('p',{},'哈哈'),
	h('p',{},
		h('span',{},'123')
	)
])

const myvnode2 = h('ul', {}, [
	h('li', {}, '牛奶'),
	h('li', {},
		h('span',{},'火龙果')),//1个可以直接写,不用数组,1一个以上要用数组
	h('li', {},[
		h('div', {},[
			h('p', {},'哈哈'),
			h('p', {},'哈哈')
		])
	])
]);

