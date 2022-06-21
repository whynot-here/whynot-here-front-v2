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
  data () {
    return {
    }
  },
  methods: {
    mounted () {
      console.log('hihih')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>