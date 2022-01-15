/*
* vnode函数把传入的5个参数返回
* */
export default function (sel, data, children, text, elm) {
	const key = data.key
	return {
		sel, data, children, text, elm, key
	}
}
