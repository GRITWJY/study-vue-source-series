/*
* 可以在dataObj对象中，可用连续点符号寻找keyname属性
* */

export default function lookup(dataObj, keyName) {

	// 看看KeyName是否有点符号
	if (keyName.indexOf('.') != -1 && keyName != '.') {
		var keys = keyName.split('.')
		var temp = dataObj
		for (let i = 0; i < keys.length; i++) {
			temp = temp[keys[i]]
		}
		return temp
	}

	temp = dataObj[keyName]

	return temp

}
