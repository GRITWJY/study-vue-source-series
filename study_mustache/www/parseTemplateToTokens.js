import nestTokens from "./nestToken";

export default function parseTemplateToTokens(templateStr) {
	var tokens = []
	var scanner = new Scanner(templateStr)
	var words

	while (scanner.eos()) {
		words = scanner.scanUtil("{{")
		if (words != '') {
			tokens.push(['text', words])
		}
		scanner.scan("{{")

		// 先只获取tokens数组，不进行嵌套
		// 之后要判断嵌套，就可以根据#和/之间的内容来判断
		words = scanner.scanUtil("}}")
		if (words != '') {
			if (words[0] == '#') {
				tokens.push(['#', words.substring(1)])
			} else if (words[0] == '/') {
				tokens.push(['/', words.substring(1)])
			} else {
				tokens.push(['name', words])
			}
		}
	}
	return nestTokens(tokens)
}
