/*
 处理数据，实现递归

 parseArray递归调用renderTemplate,调用多少次由data决定，
 如果data有3个长度，就递归3次
 */

import lookup from "./lookup";
import renderTemplate from "./renderTemplate";

export default function parseArray(token, data) {

	// 得到数据中这个数组要使用的部分
	var v = lookup(data, token[1])
	var resultStr = ''


	// 这里遍历的是数据，数据有几条就遍历几次
	for (let i = 0; i < v.length; i++) {
		// 补充'.'的识别
		resultStr += renderTemplate(token[2], {
			'.': v[i],
			...v[i]
		})
	}


	return resultStr
}
