export function createRoute(record, location, redirectedFrom, router) {
	const route = {
		path: location.path || '/',
		matched: record ? formatMatch(record) : [],
		params: location.params || {},
		fullPath: getFullPath(location)
	}
	return Object.freeze(route)
}

export const START = createRoute(null, {
	path: '/'
})


function formatMatch(record) {
	const res = []
	while (record) {
		res.unshift(record)
		record = record.parent
	}
	return res
}


function getFullPath({path}) {
	return (path || '/')
}
