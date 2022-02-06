import {
	hasOwn
} from "../../shared/util";
import config from "../config";


const strats = config.optionMergeStrategies
const defaultStrat = function (parentVal, childVal) {
	return childVal === undefined
		? parentVal
		: childVal
}


export function resolveAsset(options, type, id, warnMissing) {
	/* istanbul ignore if */
	if (typeof id !== 'string') {
		return
	}
	// 获取components
	const assets = options[type]
	if (hasOwn(assets, id)) return assets[id]
}

export function mergeOptions(parent, child, vm) {
	const options = {}

	let key
	for (key in parent) {
		mergeField(key)
	}
	for (key in child) {
		if (!hasOwn(parent, key)) {
			mergeField(key)
		}
	}

	function mergeField(key) {
		const strat = strats[key] || defaultStrat
		options[key] = strat(parent[key], child[key])
	}


	return options
}

