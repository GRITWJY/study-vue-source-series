<template>
  <div>
    <h3>当前最新count值为：{{ $store.state.count }}</h3>
    <button @click='btnHandlerAdd'>+N</button>
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
    }
  }
}
</script>

<style scoped>

</style>
