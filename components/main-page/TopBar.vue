<template>
  <div id="TopBar">
    <div class="topbar">
      <div class="logo-left">
        사람이 모이는 공간
      </div>
      <div class="logo">
        <img src="@/assets/img/common/whynot-here-logo.png" alt="">
      </div>
      <div class="search"></div>
      <nuxt-link :to="`/${category}/posting`">
        <div
          class="posting-btn"
        >
          글쓰기
        </div>
      </nuxt-link>
      <div
        class="login"
        @click="loginPopupOpen = true"
      >
        로그인
      </div>
      <div class="profile">
        <img src="@/assets/img/common/no-profile.png" alt="">
      </div>
    </div>
    <LoginPopup
      v-if="loginPopupOpen"
      @closePopup="closeLoginPopup"
    />
  </div>
</template>

<script>
import LoginPopup from '@/components/login/LoginPopup'

export default {
  name: 'TopBar',
  components: {
    LoginPopup
  },
  props:{
    category: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loginPopupOpen: false
    }
  },
  methods: {
    closeLoginPopup () {
      this.loginPopupOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/top-bar.scss';
</style>
