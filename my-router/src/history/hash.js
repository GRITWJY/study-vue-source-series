import {History} from "./base";

export class HashHistory extends History {
	constructor(router, base, fallback) {
		// 实例化父类
		super(router, base)
	}

	// 因为如果钩子函数 beforeEnter 是异步的话, beforeEnter 钩子就会被触发两次. 因为在初始化时, 如果此时的 hash 值不是以 / 开头的话就会补上 #/, 这个过程会触发 hashchange 事件, 就会再走一次生命周期钩子, 也就意味着会再次调用 beforeEnter 钩子函数.
	setupListeners() {
		window.addEventListener('hashchange', () => {
			// gethansh是改变的的hash值
			this.transitionTo(getHash())
		})
	}


	getCurrentLocation() {
		return getHash()
	}

	push(location, onComplete, onAbort) {
		const {current} = this
		this.transitionTo(
			location,
			route => {
				pushHash(route.fullPath)
				onComplete && onComplete(route)
			},
			onAbort
		)
	}

	go (n) {
		window.history.go(n)
	}


	replace(location, onComplete, onAbort) {
		const {current} = this
		this.transitionTo(
			location,
			route => {
				replaceHash(route.fullPath)
				onComplete && onComplete(route)
			},
			onAbort
		)
	}

	/**
	 * 确保url是以/开头
	 */
	ensureURL(push) {
		const current = this.current.fullPath
		if (getHash() !== current) {
			push ? pushHash(current) : replaceHash(current)
		}
	}
}

function pushHash(path) {
	window.location.hash = path
}

/**
 * 获取#之后内容
 * http://localhost:8080/#/center/test?subjectCode=03&phaseCode=04&hwType=6
 * /center/test?subjectCode=03&phaseCode=04&hwType=6
 */
export function getHash() {
	let href = window.location.href
	const index = href.indexOf('#')
	if (index < 0) return ''

	href = href.slice(index + 1)
	return href
}

function getUrl(path) {
	const href = window.location.href
	const i = href.indexOf('#')
	const base = i >= 0 ? href.slice(0, i) : href
	return `${base}#${path}`
}

function replaceHash(path) {
	window.location.replace(getUrl(path))
}










