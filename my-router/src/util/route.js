export function createRoute(record, location, redirectedFrom, router) {
	const route = {
		path: location.path || '/'
	}
	return Object.freeze(route)
}

export const START = createRoute(null, {
	path: '/'
})
