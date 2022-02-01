import {History} from "./base";

export class HashHistory extends History {
	constructor(router, base, fallback) {
		super(router, base)
	}

	setupListeners() {
		window.addEventListener('hashchange', () => {
			console.log('wjy-listener')
			// gethansh是改变的的hash值
			this.transitionTo(getHash())
		})
	}


	getCurrentLocation() {
		return getHash()
	}
}


export function getHash() {
	let href = window.location.href
	const index = href.indexOf('#')
	if (index < 0) return ''

	href = href.slice(index + 1)
	return href
}
