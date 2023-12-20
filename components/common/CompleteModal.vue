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
    <div class="go-main-btn" @click="go_home()">홈화면으로 가기</div>
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
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/common/complete-modal.scss';
</style>
