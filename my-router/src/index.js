import {install} from "./install";
import {inBrowser} from './dom'
import {supportsPushState} from "./util/push-state";


import {HashHistory} from "./history/hash";
import {HTML5History} from "./history/html5";
import {AbstractHistory} from "./history/abstract";

export default class MyVueRouter {

	constructor(options = {}) {
		console.log('wjy-constructor', options)

		this.app = null
		this.apps = []
		this.options = options


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

	init(app) {
		this.apps.push(app)
		// todo:

		this.app = app
		const history = this.history

		if (history instanceof HTML5History) {
			// todo:
		} else if (history instanceof HashHistory) {
			// todo:
		}
		// todo：


	}
}


MyVueRouter.install = install
