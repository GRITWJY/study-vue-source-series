import vnode from "./vnode";


// 编写一个低配版h函数,必须接受3个参数,缺一不可
// 相当于重载功能较弱
// 即以下3种请看
//  形态1 h('div',{},'文字')
//  形态2 h('div',{},[])
//  形态3 h('div',{},h())

export default function (sel, data, c){
	// 检查参数个数
	if (arguments.length !== 3){
		throw new Error("h函数必须有3个参数");
	}

	//检查c的类型
	if (typeof c == 'string' || typeof c == 'number'){
		// 形态1
		return vnode(sel,data,undefined,c,undefined);
	} else if (Array.isArray(c)){
		// 形态2
		let children = []
		// 遍历c
		for (let i=0; i<c.length;i++) {
			//检查c[i]必须也是一个对象
			if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))){
				throw new Error(`传入的数组中第${i+1}项的结果不是函数`);
			}
			//不用执行c[i],测试语句中已经运行了
			// 收集好即可
			children.push(c[i]);
		}
		// 循环结束后,说明children收集完
		return vnode(sel, data, children, undefined, undefined)

	} else if(typeof c == 'object' && c.hasOwnProperty('sel')) {
		// 说明调用函数是形态3
		// 即,传入的c是唯一的childre
		let children = [c];
		return vnode(sel, data, children, undefined, undefined)
	} else {
		throw new Error("传入的第三个参数类型不对")
	}
}








