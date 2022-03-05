import Vue from 'vue';
import App from './App'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		increment(state) {
			state.count++
		}
	}
})

new Vue({
	render: h => h(App),
	store
}).$mount('#app')
