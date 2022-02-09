import {resolvePath} from "./path";


export function normalizeLocation(raw, current, append, router) {
	let next = typeof raw === 'string' ? {path: raw} : raw
	const parsedPath = next
	const path = resolvePath(parsedPath.path)

	return {
		_normalized: true,
		path,
	}
}

