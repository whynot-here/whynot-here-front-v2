<template>
  <div v-if="isFromPc" id="ReviewComponent">
    <section class="notice">
      why not here는 어떠셨나요?<strong @click="openReviewModal = true">후기작성</strong>
    </section>
    <div v-if="openReviewModal" >
      <ReviewModal
:open-review-modal="openReviewModal" 
      @update-modal="updateModal()"/>
    </div>
  </div>
</template>

<script>
import ReviewModal from '@/components/main-page/ReviewModal'

export default {
  name: 'ReviewComponent',
  components: {
    ReviewModal
  },
  data () {
    return {
      openReviewModal: false
    }
  },
  methods: {
    updateModal() {
      this.openReviewModal = false
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/main-page/review.scss';
</style>
