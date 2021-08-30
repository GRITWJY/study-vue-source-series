// parse函数,主函数
export default function (templateString) {
	// 准备指针
	var index = 0;
	var rest = templateString

	// 开始标记
	var startRegExp = /^\<([a-z]+[0-9]?)\>/;
	var endRegExp = /^\<\/([a-z]+[0-9]?)\>/;

	// 准备两个栈
	var stack1 = []
	var stack2 = []

	while (index < templateString.length - 1) {

		rest = templateString.substring(index)
		// 识别遍历到的字符是不是一个开始标签
		if ((startRegExp).test(rest)) {
			let tag = rest.match(startRegExp)[1]
			console.log('1检测到开始标记', tag)

			stack1.push(tag)            // 将开始标记推入栈中
			stack2.push([])             // 将空数组推入栈中
			index += tag.length + 2     // 指针移动长度为标签长度

		} else if ((endRegExp).test(rest)) {
			let tag = rest.match(endRegExp)[1]
			console.log('2检测到结束标记', tag, stack1[stack1.length - 1])
			// 此时tag一定是和栈1顶部相同
			if (tag == stack1[stack1.length - 1]) {
				stack1.pop()
			} else {
				throw new Error('标签没有封闭!!!')
			}

			// 指针移动长度为标签长度
			index += tag.length + 3

		} else {
			// 标签中的内容
			index++
		}
		console.log(stack1, stack2)
	}

	return templateString
}
