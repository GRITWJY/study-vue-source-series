import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 全局共享的数据
  state: {
    count: 0,
  },
  mutations: {
    addN(state, step) {
      state.count += step
    },
    subtract(state) {
      state.count--
    },
    subtractN(state, step) {
      state.count -= step
    },
  },
})
