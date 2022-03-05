<template>
  <div>
    App - {{ $store.state.count }}
    <button @click="clickEvent">commit</button>
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
    clickEvent() {
      this.$store.commit('increment')
    }
  }
}
</script>

<style scoped>

</style>
