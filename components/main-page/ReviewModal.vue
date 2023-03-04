<template>
  <section v-if="isFromPc" class="review-modal">
      <div class="review-wrp">
        <div class="close-review">
          <div></div>
          <div>
            <img src="@/assets/img/common/close-review.png" alt="" @click="$emit('update-modal')">
          </div>
        </div>
        <div class="top">
          <div class="logo">
            <img src="@/assets/img/common/whynot-here-logo.png" alt="">
          </div>
          <div v-if="!isSendReview">
            서비스 개선을 위한 후기 작성 부탁드려요
          </div>
          <div v-else>
            당신의 소중한 후기가 전달 되었어요!
          </div>
        </div>
        <div v-if="!isSendReview" class="middle">
          <div class="review-char">
            <img src="@/assets/img/common/review-char.png" alt="">
          </div>
          <div class="star">
            <img v-if="!star1" src="@/assets/img/common/star.png" alt="" @click="fillStar(1, true)">
            <img v-if="star1" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(1, false)">
            <img v-if="!star2" src="@/assets/img/common/star.png" alt="" @click="fillStar(2, true)">
            <img v-if="star2" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(2, false)">
            <img v-if="!star3" src="@/assets/img/common/star.png" alt="" @click="fillStar(3, true)">
            <img v-if="star3" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(3, false)">
            <img v-if="!star4" src="@/assets/img/common/star.png" alt="" @click="fillStar(4, true)">
            <img v-if="star4" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(4, false)">
            <img v-if="!star5" src="@/assets/img/common/star.png" alt="" @click="fillStar(5, true)">
            <img v-if="star5" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(5, false)">
          </div>
        </div>
        <div v-else class="middle send-review">
          <img src="@/assets/img/common/send-review-char.png" alt="">
        </div>
        <div v-if="!isSendReview" class="bottom">
          <div class="comment-wrp">
            <textarea v-model="currentReview" class="comment-input" rows="10" placeholder="문제점/개선사항/이용후기를 적어주세요."></textarea>
            <div class="comment-register" @click="registerReview()">평가 남기기</div>
          </div>
        </div>
      </div>
    </section>

  <section v-else class="m-review-modal">
    <div class="m-review-wrp">
      <div class="m-close-review">
        <div></div>
        <div>
          <img src="@/assets/img/common/close-review.png" alt="" @click="$emit('update-modal')">
        </div>
      </div>
      <div class="m-top">
        <div class="m-logo">
          <img src="@/assets/img/common/whynot-here-logo.png" alt="">
        </div>
        <div v-if="!isSendReview">
          서비스 개선을 위한 후기 작성 부탁드려요
        </div>
        <div v-else>
          당신의 소중한 후기가 전달 되었어요!
        </div>
      </div>
      <div v-if="!isSendReview" class="m-middle">
        <div class="m-review-char">
          <img src="@/assets/img/common/review-char.png" alt="">
        </div>
        <div class="m-star">
          <img v-if="!star1" src="@/assets/img/common/star.png" alt="" @click="fillStar(1, true)">
          <img v-if="star1" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(1, false)">
          <img v-if="!star2" src="@/assets/img/common/star.png" alt="" @click="fillStar(2, true)">
          <img v-if="star2" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(2, false)">
          <img v-if="!star3" src="@/assets/img/common/star.png" alt="" @click="fillStar(3, true)">
          <img v-if="star3" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(3, false)">
          <img v-if="!star4" src="@/assets/img/common/star.png" alt="" @click="fillStar(4, true)">
          <img v-if="star4" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(4, false)">
          <img v-if="!star5" src="@/assets/img/common/star.png" alt="" @click="fillStar(5, true)">
          <img v-if="star5" src="@/assets/img/common/filled-star.png" alt="" @click="fillStar(5, false)">
        </div>
      </div>
      <div v-else class="m-middle m-send-review">
        <img src="@/assets/img/common/send-review-char.png" alt="">
      </div>
      <div v-if="!isSendReview" class="m-bottom">
        <div class="m-comment-wrp">
          <textarea v-model="currentReview" class="m-comment-input" rows="10" placeholder="문제점/개선사항/이용후기를 적어주세요."></textarea>
          <div class="m-comment-register" @click="registerReview()">평가 남기기</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ReviewModal',
  props: {
    openReviewModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      star1: false,
      star2: false,
      star3: false,
      star4: false,
      star5: false,
      currentReview: '',
      isSendReview: false
    }
  },
  methods: {
    registerReview() {
      if (this.currentReview === '') {
        // alert('후기를 작성해주세요.')
        this.cmn_openAlertPopup({
          option: {
            title: '⚠️알림',
            content: '후기를 작성해주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return
      }

      (this.$axios.post(
        (`${process.env.apiUrl}/v2/admin/feedback`),
        {
          rating: this.star1 + this.star2 + this.star3 + this.star4 + this.star5,
          description: this.currentReview
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
      )
      ).then(res => {
        this.isSendReview = true
      }).catch((error) => {
        // window.alert(error.response.data.message)
        this.cmn_openAlertPopup({
          option: {
            title: '⚠️알림',
            content: error.response.data.message,
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
      })
    },
    fillStar(idx, fill) {
      if (fill) {
        for (let i = 1; i <= idx; i++) {
          this.$data[`star${i}`] = fill
        }
      } else {
        for (let i = idx; i <= 5; i++) {
          this.$data[`star${i}`] = fill
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/main-page/review-modal.scss';
</style>