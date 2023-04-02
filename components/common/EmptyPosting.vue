<template>
  <div class="nolikes-wrp">
    <img class="nolikes-img" src="@/assets/img/category/nolikes.png">
    <div class="text-1">앗 이런</div>
    <div class="text-2">{{ kind }} 항목이 없어요</div>
  </div>
</template>

<script>
export default {
  name: 'EmptyPosting',
  props: {
    kind: {
      type: String,
      default: "좋아요"
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/common/empty-posting.scss';
</style>
