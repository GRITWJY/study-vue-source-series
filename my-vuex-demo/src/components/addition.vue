<template>
  <div>
    <h3>当前最新count值为：{{ $store.state.count }}</h3>
    <button @click='btnHandlerAdd'>+N</button>
    <button @click='btnHandler'>+1</button>
    <button @click='btnHandlerAsync'>+1async</button>
    <button @click='btnHandlerAsyncN'>+Nasync</button>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  created() {
  },
  methods: {
    btnHandlerAdd() {
      this.$store.commit('addN', 3)
    },
    btnHandler() {
      this.$store.commit('add', 3)
    },
    btnHandlerAsync() {
      this.$store.dispatch('addAsync')
    },
    btnHandlerAsyncN() {
      this.$store.dispatch('addAsyncN',9)
    }
  }
}
</script>

<style scoped>

</style>
