import {History} from "./base";

export class HTML5History extends History {
	constructor(router, base) {
		super(router, base)
	}



	getCurrentLocation() {
		return getLocation(this.base)
	}
}


export function getLocation(base) {
	return ''
}
