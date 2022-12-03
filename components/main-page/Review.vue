<template>
  <div v-if="!isMobile" id="ReviewComponent">
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
#ReviewComponent {
  .notice {
    background-color: #181818;
    height: 44px; line-height: 44px;
    color: #ffffff;
    font-size: .88rem; font-weight: 400;
    text-align: center;
    strong {
      margin-left: 16px;
      font-size: .75rem; font-weight: 700;
      color: #A0C4FF;
      cursor: pointer;
    }
  }
}
</style>
