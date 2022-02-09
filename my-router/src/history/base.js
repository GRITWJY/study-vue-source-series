import {START} from "../util/route";
import {runQueue} from "../util/async";

export class History {

	constructor(router, base) {
		this.router = router
		this.current = START
	}

	listen(cb) {
		this.cb = cb
	}

	transitionTo(location, onComplete, onAbort) {
		const route = this.router.match(location, this.current)
		this.confirmTransition(route,
			() => {
				this.updateRoute(route)
				onComplete && onComplete(route)
				this.ensureURL()
			},
			err => {
			}
		)
	}

	confirmTransition(route, onComplete, onAbort) {
		const current = this.current

		const abort = err => {
			onAbort && onAbort(err)
		}


		const queue = [].concat(
			this.router.beforeHooks
		)
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
						this.replace(to)
					} else {
						this.push(to)
					}
				} else {
					next(to)
				}
			})
		}

		runQueue(queue, iterator, () => {
			onComplete()

		})

	}

	updateRoute(route) {
		this.current = route
		this.cb && this.cb(route)
	}
}
