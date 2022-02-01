export function normalizeLocation(raw, current, append, router) {
	let next = typeof raw === 'string' ? {path: raw} : raw
	return next
}

