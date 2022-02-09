import {install} from "./install";
import {supportsPushState} from "./util/push-state";
import {inBrowser} from "./util/dom";

import {HashHistory} from "./history/hash";
import {HTML5History} from "./history/html5";
import {AbstractHistory} from "./history/abstract";
import {createMatcher} from "./creat-matcher";

export default class VueRouter {

	constructor(options = {}) {

		this.app = null
		this.apps = []
		this.options = options
		this.matcher = createMatcher(options.routes || [], this)


		let mode = options.mode || 'hash'
		this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
		if (this.fallback) {
			mode = 'hash'
		}

		if (!inBrowser) {
			mode = 'abstract'
		}
		this.mode = mode


		switch (mode) {
			case 'history':
				this.history = new HTML5History(this, options.base)
				break
			case 'hash':
				this.history = new HashHistory(this, options.base, this.fallback)
				break
			case 'abstract':
				this.history = new AbstractHistory(this, options.base)
				break
			default:
			// todo:
		}

	}


	match(raw, current, redirectedFrom) {
		// 这是createMatcher里的match方法
		return this.matcher.match(raw, current, redirectedFrom)
	}

	init(app) {
		this.apps.push(app)
		// todo:

		this.app = app
		const history = this.history

		if (history instanceof HTML5History) {
			history.transitionTo(history.getCurrentLocation())
		} else if (history instanceof HashHistory) {
			const setupHashListener = () => {
				history.setupListeners()
			}
			history.transitionTo(
				history.getCurrentLocation(),
				setupHashListener,
				setupHashListener
			)
		}
		history.listen(route => {
			this.apps.forEach(app => {
				app._route = route
			})
		})
	}

	push(location, onComplete, onAbort) {
		if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
			return new Promise((resolve, reject) => {
				this.history.push(location, resolve, reject)
			})
		}else {
			this.history.push(location, onComplete, onAbort)
		}
	}
	replace(location, onComplete, onAbort) {
		if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
			return new Promise((resolve, reject) => {
				this.history.replace(location, resolve, reject)
			})
		}else {
			this.history.replace(location, onComplete, onAbort)
		}
	}
	go (n) {
		this.history.go(n)
	}


}


VueRouter.install = install
if (inBrowser && window.Vue) {
	window.Vue.use(VueRouter)
}
