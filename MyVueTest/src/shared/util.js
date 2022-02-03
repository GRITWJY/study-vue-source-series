export function noop(a, b, c) {
}

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
export function isUndef(v) {
	return v === undefined || v === null
}

export function isDef(v) {
	return v !== undefined && v !== null
}

export function isTrue(v) {
	return v === true
}


// 原始数据类型
export function isPrimitive(value) {
	return (
		typeof value === 'string' ||
		typeof value === 'number' ||
		// $flow-disable-line
		typeof value === 'symbol' ||
		typeof value === 'boolean'
	)
}


export const no = (a, b, c) => false

export const identity = (_: any) => _



