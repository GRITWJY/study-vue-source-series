// 根据数组长度
import lookup from "./lookup";
import renderTemplate from "./renderTemplate";

export default function parseArray(token, data) {
	var v = lookup(data, token[1])
	var resultStr = ''

	for (let i = 0; i < v.length; i++) {
		// token2四嵌套的tokens，所以就当成一个新的tokens数组
		// 每次循环的数据
		resultStr += renderTemplate(token[2], {
			'.': v[i],
			...v[i]
		})
	}

}
