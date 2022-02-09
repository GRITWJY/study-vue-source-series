import {History} from "./base";

export class HashHistory extends History {
	constructor(router, base, fallback) {
		super(router, base)
	}

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










