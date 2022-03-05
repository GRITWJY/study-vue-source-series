import {cleanPath} from "./util/path";
import Regexp from 'path-to-regexp'


// 创建路由映射map、添加路由记录
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

// 添加路由记录，更新pathList、pathMap、nameMap
function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
	const {path, name} = route
	const normalizedPath = normalizePath(path, parent)
	const pathToRegexpOptions = {}
	const record = {
		path: normalizedPath,
		regex: compileRouteRegex(normalizedPath, pathToRegexpOptions), // 利用path-to-regexp包生成用来匹配path的增强正则对象，可以用来匹配动态路由
		components: route.components || {default: route.component},  // 保存路由组件，支持命名视图
		parent,
		matchAs
	}

	// 处理有子路由情况
	if (route.children) {
		// 遍历生成子路由记录
		route.children.forEach(child => {
			const childMatchAs = matchAs // matchAs若有值，代表当前路由是别名路由，则需要单独生成别名路由的子路由，路径前缀需使用matchAs
				? cleanPath(`${matchAs}/${child.path}`)
				: undefined
			addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
		})
	}
	// 若pathMap中不存在当前路径，则更新pathList和pathMap
	if (!pathMap[record.path]) {
		pathList.push(record.path)
		pathMap[record.path] = record
	}
}

// 格式化path，若为子路由，需要拼接父路由path
function normalizePath(path, parent) {
	if (path[0] === '/') return path // 只要斜线开头，无论是否子路由，直接使用
	if (parent == null) return path  // 非子路由，直接返回
	return cleanPath(`${parent.path}/${path}`)  // 子路由，需要拼接出完整path
}


function compileRouteRegex(path, pathToRegexpOptions) {
	const regex = Regexp(path, [], pathToRegexpOptions)
	return regex
}
















