import {createRouteMap} from "./create-route-map";
import {normalizeLocation} from "./util/location";
import {createRoute} from "./util/route";


export function createMatcher(
	routes, // 路由配置列表
	router// VueRouter实例
) {
	const {pathList, pathMap, nameMap} = createRouteMap(routes)

	// 传入location,返回匹配的Route对象
	function match(raw, currentRoute, redirectedForm) {
		// 获取格式化后的location，由于闭包特性，所以此处能访问到router实例
		const location = normalizeLocation(raw, currentRoute, false, router)
		const {name} = location
		if (name) {

		} else if (location.path) {
			location.params = {}
			for (let i = 0; i < pathList.length; i++) {
				// 遍历pathList，找到能匹配到的记录，然后生成Route
				const path = pathList[i]
				const record = pathMap[path]
				if (matchRoute(record.regex, location.path, location.params)) {
					// 找到匹配的路由记录后，生成对应Route
					return _createRoute(record, location, redirectedForm)
				}
			}
		}

		function _createRoute(record, location, redirectedFrom) {
			return createRoute(record, location, redirectedFrom, router)
		}

		return _createRoute(null, location)

	}

	// 添加路由
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
	// 符合正则 && params存在，需要对params进行正确赋值
	// path-to-regexp会将每个动态路由标记处处理成正则的一个组，所以i从1开始
	// 参考https://www.npmjs.com/package/path-to-regexp
	// const keys = [];
	// const regexp = pathToRegexp("/foo/:bar", keys);
	// regexp = /^\/foo\/([^\/]+?)\/?$/i
	// :bar就被处理成正则的一个组了
	// keys = [{ name: 'bar', prefix: '/', suffix: '', pattern: '[^\\/#\\?]+?', modifier: '' }]

	for (let i = 1, len = m.length; i < len; ++i) {
		const key = regex.keys[i - 1]
		if (key) {
			params[key.name] = m[i]
		}
	}
	return true
}
















