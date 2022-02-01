import {createRouteMap} from "./create-route-map";

export function createMatcher(routes, router) {

	const {pathList, pathMap, nameMap} = createRouteMap(routes)

	console.log(pathMap, pathList, nameMap)
	function match(raw, currentRoute, redirectedForm) {
		console.log(raw)
		return {
			"meta": {},
			"path": "/bar",
			"hash": "",
			"query": {},
			"params": {},
			"fullPath": "/bar",
			"matched": [{
				"path": "/bar",
				"regex": {"keys": []},
				"components": {"default": {"template": "<div>bar</div>"}},
				"alias": [],
				"instances": {},
				"enteredCbs": {},
				"meta": {},
				"props": {}
			}]
		}
	}

	function addRoutes() {
	}

	return {
		match,
		addRoutes
	}

}
