import parseAttrString from "./parseAttrString";

// parse函数,主函数
export default function (templateString) {
	// 准备指针
	var index = 0;
	var rest = ''

	// 开始标记
	var startRegExp = /^\<([a-z]+[0-9]?)(\s[^\<]+)?\>/;
	var endRegExp = /^\<\/([a-z]+[0-9]?)\>/;
	var wordRegExp = /^([^\<]+)\<\/[a-z]+[0-9]?\>/;

	// 准备两个栈
	var stack1 = []
	var stack2 = [{'children':[]}]

	while (index < templateString.length - 1) {
		rest = templateString.substring(index)
		if ((startRegExp).test(rest)) {
			let tag = rest.match(startRegExp)[1]
			let attr = rest.match(startRegExp)[2]

			stack1.push(tag)             // 将开始标记推入栈中
			stack2.push({'tag':tag, 'children':[], 'attrs':parseAttrString(attr)})             // 将空数组推入栈中
			const attrL = attr != null ? attr.length : 0
			index += tag.length + 2 + attrL    // 指针移动长度为标签长度

		}
		else if ((endRegExp).test(rest)) {
			let tag = rest.match(endRegExp)[1]
			let pop_tag = stack1.pop()
			if (tag == pop_tag) {
				let pop_arr = stack2.pop()
				if (stack2.length > 0) {
					stack2[stack2.length - 1].children.push(pop_arr)
				}
			} else {
				throw new Error('标签没有封闭!!!')
			}

			// 指针移动长度为标签长度

			index += tag.length + 3

		}
		else if (wordRegExp.test(rest)) {
			// 并且不能是全空
			let word = rest.match(wordRegExp)[1]
			if (!/^\s+$/.test(word)) {
				stack2[stack2.length - 1].children.push({'text': word, 'type': 3}) // 改变此时stack2栈顶元素
			}
			index += word.length

		}
		else {
			index++
		}
	}

	return stack2[0].children[0]
}
