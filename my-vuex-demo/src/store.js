import Vue from 'vue';

import Vuex from 'vuex'

Vue.use(Vuex)

export default store = new Vuex.Store({
	// 全局共享的数据
	state: {
		count: 0
	},
	mutations: {
		increment(state) {
			state.count++
		}
	}
})
