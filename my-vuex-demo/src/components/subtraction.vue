<template>
  <div>
    <h3>{{showNum}}</h3>
    <button @click='btnHandlerSubN'>-N</button>
    <button @click='btnHandlerSub'>-1</button>
    <button @click='subtractSync'>-1Sync</button>
    <button @click='subtractNSync(3)'>-NSync</button>
  </div>
</template>

<script>
import { mapState, mapMutations,mapActions,mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showNum'])

  },
  methods: {
    ...mapMutations(['subtract','subtractN']),
    ...mapActions(['subtractSync','subtractNSync']),
    btnHandlerSub() {
      this.subtract()
    },

    btnHandlerSubN(){
      this.subtractN(3)
    },

    btnHandlerSubAsync(){
      this.subtractNSync()
    },
  }
}
</script>

<style scoped>

</style>
