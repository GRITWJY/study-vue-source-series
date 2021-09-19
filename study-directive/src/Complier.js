import Watcher from "./Watcher";

export default class Complier {
	constructor(el, vue) {
		// vue实例
		this.$vue = vue;
		// 挂载点
		this.$el = document.querySelector(el);
		// 如果用户传入了挂载点
		if (this.$el) {
			// 调用函数, 让节点变为fragment,类似于mustache中的tokens
			// 实际上用的是AST, 这里就是轻量级的,fragment
			let $fragment = this.node2Fragment(this.$el);
			// 编译
			this.complie($fragment)
			// 替换好的内容上树
			this.$el.appendChild($fragment)
		}
	}

	node2Fragment(el){
		var fragment = document.createDocumentFragment();
		var child;
		// 让所有DOM节点,都进入fragment
		while(child = el.firstChild) {
			fragment.appendChild(child);
		}
		return fragment;
	}

	complie(el) {
		// 得到子元素
		var childNodes = el.childNodes;
		var self = this;

		var reg = /\{\{(.*)\}\}/;

		childNodes.forEach(node => {
			var text = node.textContent
			if (node.nodeType == 1) {
				self.complieElement(node)
			} else if (node.nodeType == 3 && reg.test(text)) {
				let  name = text.match(reg)[1]
				self.complieText(node, name)
			}
		})
	}

	complieElement(node){
		console.log(node);
		// 这里的方便之处不是将HTML结构看做字符串,而是真正的属性列表
		var nodeAttrs = node.attributes;
		var self = this
		// 类数组对象变为数组
		Array.prototype.slice.call(nodeAttrs).forEach(attr => {
			// 这里就分析指令
			var attrName = attr.name;
			var value = attr.value;
			// 指令都是v-开头的
			var dir = attrName.substring(2);

			// 看看是不是指令
			if (attrName.indexOf('v-') == 0) {
				//v-开头的就是指令
				if (dir == 'model') {
					new Watcher(self.$vue, value, value=>{
						node.value = value
					})
					var v = self.getVueValue(self.$vue, value)
					node.value = v
					node.addEventListener('input',e=>{
						var newVal = a.target.value;
						self.setVueVal(self.$vue, value, newVal)
						v=newVal
					})

				} else if (dir == 'if') {
					console.log('发现了if指令')
					console.log(dir,value)
				}
			}
		});


	}

	complieText(node,name){
		node.textContent = this.getVueValue(this.$vue,name)
		new Watcher(this.$vue, name, value=>{
			node.textContent = value
		})
	}

	getVueValue(vue,exp) {
		var val = vue;
		exp = exp.split('.')
		exp.forEach(k=>{
			val = val[k]
		})
		return val;
	}

	setVueVal(vue,exp,value) {
		var val = vue;
		exp = exp.split('.')
		exp.forEach((k,i)=>{
			if (i<exp.length - 1){
				val = val[k]
			} else {
				val[k] = value
			}
		})
	}
}
