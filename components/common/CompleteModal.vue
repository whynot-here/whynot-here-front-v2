<template>
  <div v-if="modalOption.isShow" id="CompleteModal">
    <div class="m-close">
        <img
          class="m-back-btn"
          src="@/assets/img/common/close-btn2.png"
          alt=""
          @click="go_home()"
        />
      </div>
    <div class="notice">
      <div class="auth-complete-wrp">
        <img :src="modalOption.imageUrl" alt="" />
      </div>
      {{ modalOption.title }}<br />
      <strong style="color: #6254f0">{{ modalOption.time }} 정도</strong> 소요됩니다.
    </div>
    <div class="notice-sub">
      인증이 완료되면 푸시알림으로 알려드려요 😀
    </div>
    <div v-if="modalOption.isContactPopup" class="need-help" @click.prevent="isOpenAskPopup = true">혹시 다른 문제가 있나요?</div>
    <div class="go-main-btn" @click.prevent="go_home()">홈화면으로 가기</div>
    
    <div
      v-if="isOpenAskPopup"
      class="ask-popup"
      @click.self="isOpenAskPopup = false"
    >
      <div class="content-wrp">
        <div class="top">
          <div>인스타 @wnh.crew</div>
          <div>DM으로 문의주세요!</div>
        </div>
        <div class="btn btn1">
          <a
            class="banner-admin-insta"
            href="https://instagram.com/wnh.crew?igshid=YmMyMTA2M2Y="
            target="_blank"
          >
          <div class="btn-content-wrp">
              <div>WNH 인스타로 이동</div>
            </div>
          </a>
        </div>
        <div class="btn btn2" @click.prevent="isOpenAskPopup = false">
          <div class="btn-content-wrp">
            <div>닫기</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompleteModal',
  props: {
    option: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      modalOption: {
        isShow: false,
        imageUrl: '',
        title: '',
        time: '',
        isContactPopup: false,
        confirmCallback: null
      },
      isOpenAskPopup: false
    }
  },
  methods: {
    show(option) {
      this.modalOption.isShow = true
      this.modalOption = Object.assign(this.modalOption, option)
    },
    hide() {
      this.modalOption.isShow = false
    },
    go_home() {
      this.hide()
      this.modalOption.confirmCallback && this.modalOption.confirmCallback()
    },
    goToInsta() {
      window.open('about:blank').location.href='https://instagram.com/wnh.crew?igshid=YmMyMTA2M2Y='
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/common/complete-modal.scss';
</style>
