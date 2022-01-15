import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";

window.WJY_TemplateEngine = {
	// 渲染
	render(templateStr, data) {
		var tokens = parseTemplateToTokens(templateStr)

		var domstr = renderTemplate(tokens,data);

		return domstr
	}
};

