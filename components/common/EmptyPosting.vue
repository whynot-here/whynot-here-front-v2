<template>
  <div class="nolikes-wrp">
    <img class="nolikes-img" src="@/assets/img/category/nolikes.png" />
    <div class="text-1">앗 이런</div>
    <div class="text-2">{{ innerText }}</div>
  </div>
</template>

<script>
export default {
  name: 'EmptyPosting',
  props: {
    kind: {
      type: String,
      default: null
    },
    blindDate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    innerText() {
      if (this.kind) {
        return this.kind + '항목이 없어요'
      } else if (this.blindDate) {
        return '보증금 제출 확인중입니다.'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/common/empty-posting.scss';
</style>
