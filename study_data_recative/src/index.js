import observe from "./observe";
import Watcher from "./Watcher";
// 独立出来的

let obj = {
	a: {
		m: {
			n: 5,
		},
	},
	b: 10,
	c: {
		d: {
			e: {
				f: 888,
			},
		},
	},
	g: [22, 33, 44, 55],
};


observe(obj)

new Watcher(obj, 'a.m.n', () => {
	console.log('☆☆☆☆☆☆☆☆☆')
})

obj.a.m.n = 99
