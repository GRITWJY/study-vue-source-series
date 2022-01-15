import Scanner from "./Scanner";

/*
* 生成tokens数组
* */

export default function parseTemplateToTokens(templateStr) {
	var tokens = [];
	// 创建扫描器
	var scanner = new Scanner(templateStr)
	// 扫描器工作
	var words
	while (scanner.eos()) {
		// 1、 收集开始标记之前的文字
		words = scanner.scanUtil("{{")
		if (words != '') {
			tokens.push(['text', words])
		}

		// 2、 跳过开始标记
		scanner.scan("{{")

		// 3、 收集参数
		words = scanner.scanUtil("}}")
		if (words!='' ) {
			tokens.push(['name', words])
		}

		// 4、 跳出结束标记
		scanner.scan("}}")

		// 5、 重复
	}

	return tokens
}
