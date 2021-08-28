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

// 创建虚拟节点
const myVnode1 = h('a', {
	props: {
		href: 'http://www.atguigu.com',
		target: '_blacnk'
	}
}, '尚硅谷')
console.log(myVnode1)

// h函数可以嵌套使用
const myVnode2 = h('ul', {}, [
	h('li', {}, '牛奶'),
	h('li', h('span','火龙果')),//1个可以直接写,不用数组,1一个以上要用数组
	h('li', [
		h('div', [
			h('p', '哈哈'),
			h('p', '哈哈')
		])
	])
]);


// 让虚拟节点上树
const container = document.getElementById('container');
patch(container, myVnode2);












