<template>
  <div id="TopBar">
    <div class="topbar" @click.self="toggleAccountPopup">
      <div class="logo-left">
        사람이 모이는 공간
      </div>
      <div class="logo" @click="mainPage">
        <img src="@/assets/img/common/whynot-here-logo.png" alt="">
      </div>
      <div class="search"></div>
      <!-- <nuxt-link :to="`/posting`">
        <div
          class="posting-btn"
        >
          글쓰기
        </div>
      </nuxt-link> -->
      <div
        v-if="!$store.state.userInfo.initLoginDone"
        class="login"
        @click="openLoginPopup"
      >
        로그인
      </div>
      <!-- <div
        v-else
        class="logined"
      >
        {{ $store.state.userInfo.detail.nickname }}님 안녕하세요!
      </div> -->
      <div 
        v-if="initLoginDone"
        class="profile"
        @click="toggleAccountPopup"
      >
        <img :src="profileImg" alt="">
        <div
          v-if="openAccount"
          class="open-account"
        >
          <div class="sub-menu-wrp">
            <div class="sub-menu">{{ $store.state.userInfo.detail.nickname }}님 안녕하세요!</div>
            <div class="sub-menu" style="cursor:pointer" @click="logout()">👋 로그아웃</div>
            <div class="sub-menu" style="cursor:pointer" @click="moveMyPage()">👤 마이페이지</div>
          </div>
        </div>
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
  props: {
    // category: {
    //   type: String,
    //   default: ''
    // }
  },
  data () {
    return {
      loginPopupOpen: false,
      profileImg: '',
      initLoginDone: false,
      openAccount: false
    }
  },
  mounted () {
    this.profileImg = this.$store.state.userInfo.detail.profileImg
    this.initLoginDone = this.$store.state.userInfo.initLoginDone
  },
  methods: {
    mainPage () {
      this.$router.push('/')
    },
    openLoginPopup () {
      this.loginPopupOpen = true
    },
    closeLoginPopup () {
      this.loginPopupOpen = false
    },
    toggleAccountPopup () {
      this.openAccount = !this.openAccount
    },
    moveMyPage () {
      this.$router.push('/mypage')
    },
    logout() {
      this.cmn_logout()
      this.initLoginDone = false
      this.loginPopupOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/top-bar.scss';
</style>
