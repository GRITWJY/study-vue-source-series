<template>
  <div>
    <h3>当前最新count值为：{{ count }}</h3>
    <button @click='btnHandlerSubN'>-N</button>
    <button @click='btnHandlerSub'>-1</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
  },
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['subtract','subtractN']),
    btnHandlerSub() {
      this.subtract()
    },

    btnHandlerSubN(){
      this.subtractN(3)
    }
  }
}
</script>

<style scoped>

</style>
