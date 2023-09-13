<template>
  <div v-if="isOpenPopup && $store.state.userInfo.initLoginDone">
    <div class="popup" @click.self="closePopup">
      <div class="content-wrp">
        <!-- <div class="close">
          <img
            src="@/assets/img/common/close-review.png"
            alt=""
            @click.self="closePopup"
          />
        </div> -->
        <div class="img">
          <img src="@/assets/img/common/notice.png" alt="" />
        </div>
        <div class="top">
          <div>학생증 인증 관련 공지사항</div>
          <div>
            홈 화면에서 계속 인증 표시가 뜬다면<br />
            <strong>마이페이지 - 학생증 인증 클릭 - 하단 홈 버튼 재클릭</strong
            ><br />
            하시면 정상적으로 작용됩니다.<br />
            후에, 상단 배너 (한대소) 클릭 후 신청하시면 됩니다.
          </div>
        </div>
        <div class="btn-wrp">
          <div class="btn" @click="closeToday()">다시 열지 않음</div>
          <div class="btn" @click.self="closePopup">닫기</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticePopup',
  components: {},
  props: {
    isOpenPopup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    closeToday() {
      this.cmn_setCookie('close-notice', true, 3000)
      this.closePopup()
    },
    closePopup() {
      this.$emit('closePopup', {})
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  .content-wrp {
    width: 270px;
    height: 280px;
    border-radius: 12px;
    background: #fff;
    padding: 20px;
    .close {
      padding-top: 20px;
      padding-right: 20px;
      text-align: right;
      img {
        width: 24px;
      }
    }
    .img {
      img {
        width: 48px;
      }
    }
    .top {
      // display: flex;
      width: 280px;
      // height: 76px;
      padding: 17px 0px;
      // flex-direction: column;
      // justify-content: center;
      align-items: center;
      // gap: 17px;
      // display: inline-flex;
      // flex-direction: column;
      // align-items: center;
      // gap: 6px;
      text-align: left;
      div:first-child {
        color: #061935;
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 133.333% */
      }
      div:nth-child(2) {
        margin-top: 20px;
        color: #515d6f;
        font-family: Pretendard;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        strong {
          color: #11151a;
          font-family: Pretendard;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }
    .btn-wrp {
      margin-top: 30px;
      display: flex;
      gap: 10px;
      .btn {
        // width: 135px;
        width: 50%;
        height: 36px;
        border-radius: 4px;
        border: 1px solid #d2d2d2;
        background: #fff;
        color: #484848;
        font-family: Pretendard;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 36px;
        text-align: center;
      }
    }
  }
}
</style>
