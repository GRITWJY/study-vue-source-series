/*
* 让tokens数组变为DOM字符串
* */

import lookup from "./lookup";
import parseArray from "./parseAray";

export default function renderTemplate(tokens, data) {

	var resultStr = ''

	// 遍历
	for (let i = 0; i < tokens.length; i++) {
		let token = tokens[i]
		if (token[0] == 'text') {
			resultStr += token[1]
		} else if (token[0] == 'name') {
			resultStr += lookup(data,token[1])
		} else if (token[0] == '#') {
			resultStr += parseArray(token,data)
		}
	}
	return resultStr
}


