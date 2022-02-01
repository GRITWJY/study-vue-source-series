import {START} from "../util/route";

export class History {

	constructor(router, base) {
		this.router = router
		this.current = START
	}

	transitionTo(location, onComplete, onAbort) {
		const route = this.router.match(location, this.current)
		this.confirmTransition(
			route,
			() => {
			},
			err => {
			}
		)
	}

	confirmTransition(route, onComplete, onAbort) {

	}
}
