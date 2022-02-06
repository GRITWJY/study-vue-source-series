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
			const record = pathMap[location.path]
			if (matchRoute()) {

				return _createRoute(record, location, redirectedForm)
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


function matchRoute() {
	return true
}
