
import {
	isUndef
} from "../util/index";

export function createComponent(Ctor, data, context, children, tag) {
	if (isUndef(Ctor)) {
		return
	}

	debugger
	const baseCtor = context.$options._base


	console.log('createComponent')
}
