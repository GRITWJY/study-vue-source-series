// 变为数组返回
/*

{name: value:}
 */
export default function (attr){
	if (attr == undefined) { return [] };

	var isyinhao = false //是否在引号内
	var point = 0 // 断电
	var result = []
	console.log(attr) //  class="box" id="box"

	// 遍历attr,而不是直接用split
	// 拆分  class=/////box =
	// 因为class里面会有空格，即判断空格是否在引号里
	for (let i = 0; i < attr.length; i++) {
		let char = attr[i]
		// 第一次遇到引号，即为真
		// 再遇到就为false,这样就可以吧引号内的东西手机出来
		if (char == '"') {
			isyinhao = !isyinhao
		}
		// 空格不在引号中，且碰到了空格，相当于得到了不同类型的属性，此时就要获取这一段内容
			// point是上次留下来的位置，即开头
			// I是此时的位置
		else if (char == ' ' && !isyinhao) {
			// 遇见了空格,并且不在引号中
			// 还得判断是不是纯空格
			if (!/^\s*$/.test(attr.substring(point,i))) {
				// 把这个属性的内容全部存入，转为小写
				result.push(attr.substring(point, i).trim())
				point = i
			}
		}
	}

	// 遍历到最后一个结尾没有空格，就把point之后的存入数组
	result.push(attr.substring(point).trim())

	// 再拆分,此时就可以根据=拆分了
	result = result.map(item => {
		// 根据=拆分
		// 任意 = "(任意)"
		const o = item.match(/^(.+)="(.+)"$/)
		return {
			name:o[1],
			value:o[2]
		}
	})

	return result

}
