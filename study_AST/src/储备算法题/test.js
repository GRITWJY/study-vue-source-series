var arr = "2[3[a]4[4[b]2[c]]]"

//   aaabccbccbccbcc

function smartRepeat(arr) {
	var index = 0//指针
	var stk1 = []
	var stk2 = []

	// 剩余部分
	var rest = arr

	// 如果for其步长固定,遇到22等不好获取
	while (index < arr.length - 1) {
		debugger
		// 获取字符串的剩余部分
		rest = arr.substring(index)



		// 1、看当前剩余部分是不是以数字开头
		// ^以..开头
		// \d+ 1或多个数字
		// \[ 数字后面是[
		if ((/^\d+\[/).test(rest)) {
			// 得到数字
			// match第一个元素是64[。第二个才是捕获的内容
			let times = Number(rest.match(/^(\d+)\[/)[1])
			// 数字压栈：3、2
			stk1.push(times)
			// 字符压入一个空：''、''
			stk2.push('')
			// 跳过4[，直接进入到[]里的字符
			index += times.toString().length + 1;
		}



		// 如果开头是字符
		else if (/^\w+/.test(rest)) {

			// 获取这些字符
			let word = rest.match(/^(\w+)/)[1]
			stk2[stk2.length - 1] = word
			index += word.length
		}


		else if (rest[0] == ']'){
			let times = stk1.pop()
			let word = stk2.pop()
			stk2[stk2.length - 1] += word.repeat(times)
			index++
		}
	}
	return stk2[0].repeat(stk1[0])

}

console.log(smartRepeat(arr))
