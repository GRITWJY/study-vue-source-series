export function cleanPath(path) {
	return path.replace(/\/+/g, '/')
}


export function resolvePath(
	relative,
	base,
	append
) {
	const firstChar = relative.charAt(0)
	if (firstChar === '/') {
		return relative
	}

	return '/' + relative
}



