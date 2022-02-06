import {createRouteMap} from "./create-route-map";
import {normalizeLocation} from "./util/location";
import {createRoute} from "./util/route";


export function createMatcher(routes, router) {
	const {pathList, pathMap, nameMap} = createRouteMap(routes)

	function match(raw, currentRoute, redirectedForm) {
		const location = normalizeLocation(raw, currentRoute, false, router)
		const {name} = location


		if (name) {

		} else if (location.path) {
			location.params = {}
			for (let i = 0; i < pathList.length; i++) {
				const path = pathList[i]
				const record = pathMap[path]
				if (matchRoute(record.regex, location.path, location.params)) {
					return _createRoute(record, location, redirectedForm)
				}
			}
		}

		function _createRoute(record, location, redirectedFrom) {
			return createRoute(record, location, redirectedFrom, router)
		}
	}

	function addRoutes() {
	}

	return {
		match,
		addRoutes
	}

}


function matchRoute(regex, path, params) {

	// path: /foo/:id
	const m = path.match(regex)
	if (!m) {
		return false
	} else if (!params) {
		return true
	}

	for (let i = 1, len = m.length; i < len; ++i) {
		const key = regex.keys[i - 1]
		if (key) {
			params[key.name] = m[i]
		}
	}
	return true
}
















