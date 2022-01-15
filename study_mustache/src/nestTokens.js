/*
* 折叠tokens，将#he / 折叠起来，作为下标为3的项
* */

export default function nestTokens(tokens) {

	var nestTokens = []
	// 栈结构,存放嵌套的token
	var sections = []
	var collector = nestTokens // 重点！！！！高级！！！！

	let token,section;
	for (let i = 0; i < tokens.length; i++) {
		token = tokens[i]
		switch (token[0]) {
			case '#':
				collector.push(token)
				sections.push(token)
				collector = token[2] = []
				break;
			case '/':
				section = sections.pop()
				collector = sections.length > 0 ? sections[sections.length - 1][2] : nestTokens
				break
			default:
				collector.push(token)
		}
	}
	return nestTokens
}
