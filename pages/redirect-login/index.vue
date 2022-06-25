<template>
  <div>
    <TopBar />
  </div>
</template>

<script>
import TopBar from '@/components/main-page/TopBar'

export default {
  name: 'CallBackPage',
  components: {
    TopBar
  },
  // middleware: 'auth',
  data () {
    return {
    }
  },
  mounted () {
    console.log('hihih')
    console.log(JSON.stringify(this.$auth.$state, undefined, 2))
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>