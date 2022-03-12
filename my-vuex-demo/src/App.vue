<template>
  <div>

  </div>
</template>

<script>

export default {
  components: {
  },
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
