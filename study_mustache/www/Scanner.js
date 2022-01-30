export default class Scanner {
	constructor(templateStr) {
		this.pos = 0
		this.templateStr = templateStr
		this.tail = templateStr
	}

	// 找到标记停止
	scanUtil(stopTag) {
		const pos_back = this.pos
		while (this.tail.indexOf(stopTag) !== 0 && this.eos()) {
			this.pos++
			this.tail = this.templateStr.substring(this.pos)
		}
		return this.templateStr.substring(pos_back, this.pos)
	}

	// 跳过标记
	scan(tah) {
		if (this.tail.indexOf(tag) == 0) {
			this.pos += tag.length
			this.tail = this.templateStr.substring(this.pos)
		}
	}

	// 指针是否到头
	eos() {
		return this.pos < this.templateStr.length
	}
}
