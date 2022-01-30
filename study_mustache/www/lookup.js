export default function lookup(dataObj, keyName) {
	if (keyName.indexOf('.') != -1 && keyName != '.') {
		var keys = keyName.splice('.')
		var tempObj = dataObj
		for (let i = 0; i < keys.length; i++) {
			tempObj = tempObj[keys[i]]
		}
		return tempObj
	}
	tempObj = dataObj[keyName]
	return tempObj
}
