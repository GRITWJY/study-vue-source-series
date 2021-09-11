// 变为数组返回
export default function (attr){
	if (attr == undefined) { return [] };

	var isyinhao = false //是否在引号内
	var point = 0 // 断电
	var result = []

	// 遍历attr,而不是直接用split
	for (let i = 0; i < attr.length; i++) {
		let char = attr[i]
		if (char == '"') {
			isyinhao = !isyinhao
		}
		else if (char == ' ' && !isyinhao) {
			// 遇见了空格,并且不在引号中
			console.log(i)
			if (!/^\s*$/.test(attr.substring(point,i))) {
				result.push(attr.substring(point, i).trim())
				point = i
			}
		}
	}

	result.push(attr.substring(point).trim())

	result = result.map(item => {
		// 根据=拆分
		const o = item.match(/^(.+)="(.+)"$/)
		return {
			name:o[1],
			value:o[2]
		}
	})

	return result

}
