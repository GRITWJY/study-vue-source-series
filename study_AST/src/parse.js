// parse函数,主函数
/*
tag
attrs:[]
children:[]

 */
import parseAttrString from "./parseAttrString";

export default function (templateString) {
	// 准备指针
	var index = 0;
	// 剩余的内容
	var rest = ''

	// 这个?表示[0-9]可能有，可能没有
	// 开始标记
	// var startRegExp = /^\<([a-z]+[0-9]?)\>/ 这个是没有attr的正则
	var startRegExp = /^\<([a-z]+[0-9]?)(\s[^\<]+)?\>/

	// 结束标记
	var endRegExp = /^\<\/([a-z]+[0-9]?)\>/;

	var wordRegExp = /^([^\<]+)\<\/[a-z]+[0-9]?\>/;


	// 准备两个栈
	// 存储标签
	var stack1 = []
	// 存储内容text
	var stack2 = [{'children': []}]

	while (index < templateString.length - 1) {
		// 剩余字符串
		rest = templateString.substring(index)


		// 如果匹配到开始标签，如<div>
		if ((startRegExp).test(rest)) {
			let tag = rest.match(startRegExp)[1]
			let attrString = rest.match(startRegExp)[2]
			// 入栈
			stack1.push(tag)
			stack2.push({'children': [], tag, 'attrs': parseAttrString(attrString)})

			const attrLength = attrString != null ? attrString.length : 0
			index += tag.length + 2 + attrLength
		} else if ((endRegExp).test(rest)) {
			let tag = rest.match(endRegExp)[1]
			let pop_tag = stack1.pop()

			// 结束标签是否与stack1的栈顶相等，必须相等
			if (tag === pop_tag) {
				let pop_arr = stack2.pop()
				if (stack2.length > 0) {
					stack2[stack2.length - 1].children.push(pop_arr)
				}
			} else {
				throw Error('标签没封闭')
			}
			index += tag.length + 3
		} else if (wordRegExp.test(rest)) {
			let word = rest.match(wordRegExp)[1]
			if (!/^\s+$/.test(word)) {
				//改变栈顶元素
				stack2[stack2.length - 1].children.push({text: word, type: 3})
			}
			index += word.length
		} else {
			index++
		}
	}

	return stack2[0].children
}
