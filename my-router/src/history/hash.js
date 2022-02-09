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
			route=>{
				onComplete && onComplete(route)
			},
			onAbort
		)
	}
}


export function getHash() {
	let href = window.location.href
	const index = href.indexOf('#')
	if (index < 0) return ''

	href = href.slice(index + 1)
	return href
}
