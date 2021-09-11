import parse from "./parse";

var templateString = `<div> 
		<h3 class="box" id="ca">你好</h3>
		<ul>
				<li>A</li>
				<li>B</li>
				<li>C</li>
		</ul>
</div>`;

const ast = parse(templateString);
console.log(ast)
