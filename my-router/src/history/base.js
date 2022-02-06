import {START} from "../util/route";

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
		// const route = {
		// 	"path": "/foo/foochild",
		// 	"fullPath": "/foo/foochild",
		// 	"matched": [{
		// 		"path": "/foo",
		// 		"components": {"default": {"template": "<div>foo<router-view></router-view></div> "}},
		// 	}, {
		// 		"path": "/foo/foochild",
		// 		"components": {"default": {"template": "<div>fooChild</div>"}},
		// 		"parent": {
		// 			"path": "/foo",
		// 			"components": {"default": {"template": "<div>foo<router-view></router-view></div> "}},
		// 		},
		// 	}]
		// }
		this.confirmTransition(route,
			() => {
				this.updateRoute(route)
				onComplete && onComplete(route)
			},
			err => {
			}
		)
	}

	confirmTransition(route, onComplete, onAbort) {
		onComplete()
	}

	updateRoute(route) {
		this.current = route
		this.cb && this.cb(route)
	}
}
