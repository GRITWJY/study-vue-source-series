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
    add(state) {
      state.count++
    },
    subtract(state) {
      state.count--
    },
    subtractN(state, step) {
      state.count -= step
    },
  },
  actions: {
    addAsync(context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    addAsyncN(context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    subtractSync(context) {
      setTimeout(() => {
        context.commit('subtract')
      }, 1000)
    },
    subtractNSync(context, step) {
      setTimeout(() => {
        context.commit('subtractN', step)
      }, 1000)
    },
  },
  getters: {
    showNum: (state) => {
      return `当前最新的数量是【${state.count}】`
    },
  },
})
