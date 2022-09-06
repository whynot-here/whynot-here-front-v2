<template>
  <div></div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted () {
    if (this.$route.query.accessToken) {
      this.cmn_getUserInfo(this.$route.query.accessToken)
    }
    this.$router.push('/gather/study')
  },
  methods: {
  }
}
</script>
