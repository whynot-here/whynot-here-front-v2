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
        ('https://whynot-here.o-r.kr/v2/admin/feedback'),
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
.review-modal {
    position: fixed;
    z-index: 120;
    width: 100vw; height: 100vh;
    top: 0; left: 0;
    background-color: rgba(24, 24, 24, 0.4);
    .review-wrp {
      margin: calc(100vh / 7) auto;
      width: 600px;
      height: max-content;
      padding-bottom: 32px;
      background-color: #FFFFFF;
      box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 4px 22px rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      .close-review {
        display: flex;
        div:first-child {
          flex-grow: 1;
        }
        div:nth-child(2) {
          padding: 24px 24px 0 0;
          img {
            width: 32px; height: 32px;
            cursor: pointer;
          }
        }
      }
      .top {
        text-align: center;
        .logo {
          img {
            width: 150px; height: 36px;
          }
        }
        div:nth-child(2) {
          margin-top: 8px;
          font-size: 1.13rem; font-weight: 500;
          color: #454545;
        }
      }
      .middle {
        text-align: center;
        .review-char {
          padding-top: 16px;
          img {
            width: 128px; height: 147px;
          }
        }
        .star {
          padding-top: 16px;
          img {
            width: 32px; height: 32px;
            margin: 0 5px;
            cursor: pointer;
          }
        }
      }
      .send-review {
        height: 210px;
        margin: 24px 32px 0 32px;
        padding-top: 20px;
        background-color: #D7EBFF;
        img {
          width: 168px;
        }
      }
      .bottom {
        .comment-wrp {
          position: relative;
          margin: 10px 24px 0 24px;
          .comment-input {
            width: 522px; height: 107px;
            padding: 15px; margin-top: 14px;
            background: #FAFAFA;
            border-radius: 8px;
            border: 1px solid #EFEFEF;
            resize: none;
          }          
          .comment-input:focus {
            outline: none;
          }
          .comment-input::placeholder {
            color: #C8C8C8;
          }
          .comment-register {
            position: absolute;
            margin-top: -50px;
            margin-left: 460px;
            width: 77px; height: 33px; line-height: 33px;
            padding: 0 4px;
            font-size: .88rem;
            font-weight: 500;
            color: #737373;
            text-align: center;
            background: #FFFFFF;
            mix-blend-mode: normal;
            border: 1px solid #E7E7E7;
            border-radius: 32px;
            cursor: pointer;
          }
        }
      }
    }
  }

.m-review-modal {
  position: fixed;
  overflow: scroll;
  z-index: 120;
  width: 100vw; height: 100vh;
  top: 0; left: 0;
  background-color: rgba(24, 24, 24, 0.4);
  .m-review-wrp {
    margin: calc(100vh / 7) auto;
    width: 300px;
    height: max-content;
    padding-bottom: 32px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 4px 22px rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    .m-close-review {
      display: flex;
      div:first-child {
        flex-grow: 1;
      }
      div:nth-child(2) {
        padding: 24px 24px 0 0;
        img {
          width: 32px; height: 32px;
          cursor: pointer;
        }
      }
    }
    .m-top {
      text-align: center;
      .m-logo {
        img {
          width: 120px; height: 30px;
        }
      }
      div:nth-child(2) {
        margin-top: 8px;
        font-size: 0.9rem; font-weight: 500;
        color: #454545;
      }
    }
    .m-middle {
      text-align: center;
      .m-review-char {
        padding-top: 16px;
        img {
          width: 88px; height: 102px;
        }
      }
      .m-star {
        padding-top: 16px;
        img {
          width: 24px; height: 24px;
          margin: 0 5px;
          cursor: pointer;
        }
      }
    }
    .m-send-review {
      height: 210px;
      margin: 24px 32px 0 32px;
      padding-top: 20px;
      background-color: #D7EBFF;
      img {
        width: 168px;
      }
    }
    .m-bottom {
      .m-comment-wrp {
        position: relative;
        margin: 10px 24px 0 24px;
        .m-comment-input {
          font-size: 14px;
          width: 222px; height: 180px;
          padding: 15px; margin-top: 14px;
          background: #FAFAFA;
          border-radius: 8px;
          border: 1px solid #EFEFEF;
          resize: none;
        }          
        .m-comment-input:focus {
          outline: none;
        }
        .m-comment-input::placeholder {
          color: #C8C8C8;
        }
        .m-comment-register {
          position: absolute;
          margin-top: -50px;
          margin-left: 160px;
          width: 77px; height: 33px; line-height: 33px;
          padding: 0 4px;
          font-size: .88rem;
          font-weight: 500;
          color: #737373;
          text-align: center;
          background: #FFFFFF;
          mix-blend-mode: normal;
          border: 1px solid #E7E7E7;
          border-radius: 32px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>