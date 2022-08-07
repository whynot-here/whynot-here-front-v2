<template>
  <div>
    난 {{ id }}번 포스팅 상세 페이지야
  </div>
</template>

<script>
export default {
  name: 'PostingPage',
  asyncData({ params }) {
    return {
      id: params.id
    }
  }
}
</script>

<style lang="scss" scoped>

</style>