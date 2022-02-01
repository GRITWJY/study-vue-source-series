import {History} from "./base";

export class HashHistory extends History {
	constructor(router, base, fallback) {
		super(router, base)
	}

	setupListeners() {
		window.addEventListener('hashchange', () => {
			console.log('wjy-listener')
		})
	}


	getCurrentLocation() {
		return getHash()
	}
}


export function getHash() {
	return ''
}
