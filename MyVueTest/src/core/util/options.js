import {
	hasOwn
} from "../../shared/util";

export function resolveAsset(options, type, id, warnMissing) {
	/* istanbul ignore if */
	if (typeof id !== 'string') {
		return
	}
	debugger
	// 获取components
	const assets = options[type]
	if (hasOwn(assets,id)) return assets[id]

}
