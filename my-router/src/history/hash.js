import {History} from "./base";

export class HashHistory extends History {
	constructor(router, base, fallback) {
		super(router, base)
	}

	setupListeners () {}


	getCurrentLocation() {
		return getHash()
	}
}


export function getHash() {
	return ''
}
