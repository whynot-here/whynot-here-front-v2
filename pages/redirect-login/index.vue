<template>
  <div>
    <TopBar />
  </div>
</template>

<script>
import TopBar from '@/components/common/TopBar'

export default {
  name: 'CallBackPage',
  components: {
    TopBar
  },
  middleware: 'auth',
  data () {
    return {
    }
  },
  mounted () {
    console.log('hihih')
    console.log(this.$auth.user)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>