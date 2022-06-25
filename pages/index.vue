<template>
  <div></div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted () {
    this.$router.push('/project')
    // console.log(JSON.stringify(this.$auth.$state, undefined, 2))
    console.log(this.$auth.strategy.token.get())
  }
}
</script>
