<template>
  <div>
    <addition></addition>
    <hr>
    <subtraction></subtraction>
  </div>
</template>

<script>
import addition from '@/components/addition'
import subtraction from '@/components/subtraction'

export default {
  components: {
    addition,
    subtraction
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
