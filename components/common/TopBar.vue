<template>
  <div id="TopBar">
    <div class="topbar">
      <div class="logo">
        <img src="@/assets/img/common/whynot-here-logo.png" alt="">
      </div>
      <div class="search"></div>
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
#TopBar {
  width: 1368px; height: 73px;
  margin: 0 auto;
  .topbar {
    display: flex;
    .logo {
      padding-top: 16px;
      img {
        width: 139px; height: 33px;
      }
    }
    .search {
      flex-grow: 1;
    }
    .login {
      padding-top: 24px; margin-right: 32px;
      font-size: .94rem; font-weight: 700;
      color: #737373;
      cursor: pointer;
    }
    .profile {
      padding-top: 16px;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
