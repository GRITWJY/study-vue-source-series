import {cleanPath} from "./util/path";

export function createRouteMap(routes) {
	const pathList = []
	const pathMap = Object.create(null)
	const nameMap = Object.create(null)

	routes.forEach(route => {
		addRouteRecord(pathList, pathMap, nameMap, route)
	})


	return {
		pathList,
		pathMap,
		nameMap
	}
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
	const {path, name} = route
	const normalizedPath = normalizePath(path, parent)


	const record = {
		path: normalizedPath,
		components: route.components || {default: route.component},
		parent,
		matchAs
	}

	if (route.children) {
		route.children.forEach(child => {
			const childMatchAs = matchAs
				? cleanPath(`${matchAs}/${child.path}`)
				: undefined
			addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
		})
	}

	if (!pathMap[record.path]) {
		pathList.push(record.path)
		pathMap[record.path] = record
	}
}

function normalizePath(path, parent) {
	if (path[0] === '/') return path
	if (parent == null) return path
	return cleanPath(`${parent.path}/${path}`)
}
