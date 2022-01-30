export default function nestTokens(tokens) {
	var nestTokens = []

	var sections = [] // 存放嵌套的

	var collector = nestTokens

	let token
	for (let i = 0; i < tokens.length; i++) {
		token = tokens[i]
		switch (token[0]) {
			case '#':
				sections.push(token)
				collector.push(token)
				collector = token[2] = []
				break
			case '/':
				sections.pop()
				collector = sections.length > 0 ? sections[sections.length - 1][2] : nestTokens
				break
			default:
				collector.push(token)
		}
	}


	return nestTokens

}
