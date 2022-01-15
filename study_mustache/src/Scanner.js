/*
* 扫描器类
* */

export default class Scanner {
	constructor(templateStr) {
		this.templateStr = templateStr
		console.log('--------------scanner类被调用,开始解析模板')
		// 指针
		this.pos = 0
		// 尾巴
		this.tail = templateStr
	}


	//1、 scanUtil   找到指定标记停止，并获取路过的内容
	scanUtil(stopTag) {
		// 记录开始执行时的pos值
		const pos_backup = this.pos
		while (this.tail.indexOf(stopTag) !== 0 && this.eos()) {
			this.pos++
			this.tail = this.templateStr.substring(this.pos)
		}
		return this.templateStr.substring(pos_backup, this.pos)
	}

	// 2、 跳过指定标记，无返回值
	scan(tag) {
		if (this.tail.indexOf(tag) == 0) {
			this.pos += tag.length
			this.tail = this.templateStr.substring(this.pos)
		}
	}

	// 指针是否到头
	eos(){
		return this.pos < this.templateStr.length
	}

}














