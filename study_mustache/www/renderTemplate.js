import lookup from "./lookup";
import parseArray from "./parseArray";


export default function renderTemplate(tokens, data) {
	var resultStr = ''
	for (let i = 0; i < tokens.length; i++) {
		let token = tokens[i]
		if (token[0] == 'text') {
			resultStr += token[1]
		} else if (token[1] == 'name') {
			// 点运算符
			resultStr += lookup(data, tokens[1])
		} else if (token[1] == '#') {
			// 数组
			resultStr += parseArray(token, data)

		}
	}
	return resultStr
}
