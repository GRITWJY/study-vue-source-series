import parseTemplateToTokens from "./parseTemplateToTokens";

window.WJY_TemplateEngine = {
	// 渲染
	render(templateStr, data) {
		var tokens = parseTemplateToTokens(templateStr)
		console.log(tokens)
	}
};

