import {START} from "../util/route";
import {runQueue} from "../util/async";
import {isSameRoute} from "../util/route";

export class History {

	constructor(router, base) {
		this.router = router
		this.current = START
	}

	// 设置监听器，在updateRoute时回调被调用
	listen(cb) {
		this.cb = cb
	}

	// 路由跳转
	transitionTo(
		location,// 原始location，一个url或者是一个Location interface(自定义形状，在types/router.d.ts中定义)
		onComplete,// 跳转成功回调
		onAbort// 跳转失败回调
	) {
		const route = this.router.match(location, this.current)
		// 确认跳转
		this.confirmTransition(route,
			() => { // onComplete，完成
				this.updateRoute(route)  // 更新route，会触发afterEach钩子
				onComplete && onComplete(route)  // 调用onComplete回调
				this.ensureURL()
			},
			err => {
			}
		)
	}

	// 确认路由跳转
	confirmTransition(route, onComplete, onAbort) {
		const current = this.current

		// 取消
		const abort = err => {
			onAbort && onAbort(err)
		}
		const lastRouteIndex = route.matched.length - 1
		const lastCurrentIndex = current.matched.length - 1


		if (
			// 相同Route，报重复错误
			isSameRoute(route, current) &&
			// in the case the route map has been dynamically appended to
			lastRouteIndex === lastCurrentIndex &&
			// 防止route map 被动态改变了
			route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]
		) {
			// ensureURL由子类实现，主要根据传参确定是添加还是替换一个记录
			this.ensureURL() // 替换当前历史记录
			return abort()
		}
		// 生成需要执行的守卫、钩子队列
		const queue = [].concat(
			this.router.beforeHooks // 全局的beforeEach守卫
		)
		// 迭代函数
		const iterator = (hook, next) => {
			hook(route, current, (to) => {
				if (to === false) {
					this.ensureURL(true)
					abort(to)
				} else if (
					typeof to === 'string' ||
					(typeof to === 'object' &&
						(typeof to.path === 'string' || typeof to.name === 'string'))
				) {
					abort()
					if (typeof to === 'object' && to.replace) {
						// 调用子类方法的替换记录
						this.replace(to)
					} else {
						// 调用子类方法的添加记录
						this.push(to)
					}
				} else {
					next(to)
				}
			})
		}

		// 执行队列
		runQueue(queue, iterator, () => {
			onComplete()
		})

	}

	// 更新路由，触发afterEach钩子
	updateRoute(route) {
		const prev = this.current
		this.current = route // 更新current
		this.cb && this.cb(route) // 调用updateRoute回调，回调中会重新为_routerRoot._route赋值，进而触发router-view的重新渲染
		this.router.afterHooks.forEach(hook => { // 触发afterEach狗子
			hook && hook(route, prev)
		})
	}
}
