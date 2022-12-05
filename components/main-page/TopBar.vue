<template>
  <div v-if="!isMobile" id="TopBar">
    <div class="topbar" @click.self="toggleAccountPopup">
      <div class="topbar-wrp">
        <!-- <div class="logo-left">
          사람이 모이는 공간
        </div>
        <div class="logo" @click="mainPage">
          <img src="@/assets/img/common/whynot-here-logo.png" alt="">
        </div> -->
        <div class="category-wrp">
          <div>
            {{ categoryTitleProps }}
          </div>
          <div v-if="subCategoryTitleProps !== ''">
            <img src="@/assets/img/category/right-arrow.png" alt="">
          </div>
          <div>
            {{ subCategoryTitleProps }}
          </div>
        </div>
        <div class="search"></div>
        <div class="posting-wrp" @click="checkLogin()">
          <div :class="$store.state.userInfo.initLoginDone ? 'posting-btn' : 'posting-btn not-login'">
            📝 글쓰기
          </div>
          <div v-if="!$store.state.userInfo.initLoginDone" class="login-notice">
            <img src="@/assets/img/login/login-notice.png" alt="">
          </div>
        </div>
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
              <!-- <div class="sub-menu">{{ $store.state.userInfo.detail.nickname }}님 안녕하세요!</div> -->
              <div class="sub-menu" style="cursor:pointer" @click="moveMyPage()">마이페이지</div>
              <div class="sub-menu" style="cursor:pointer" @click="logout()">로그아웃</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoginPopup
      v-if="loginPopupOpen"
      @closePopup="closeLoginPopup"
    />
  </div>
  <div v-else id="TopBarM">
    <div class="top">
      <div class="category-toggle" @click="toggleCategoryPanel">
        <img src="@/assets/img/common/category-toggle.png" alt="">
      </div>
      <div class="logo-wrp">
        <div class="title">
          사람이 모이는 공간
        </div>
        <div class="logo-img" @click="mainPage">
          <img src="@/assets/img/common/whynot-here-logo.png" alt="">
        </div>
      </div>
      <div
          v-if="!$store.state.userInfo.initLoginDone"
          class="login"
          @click="openLoginPopup"
        >
        로그인
      </div>
      <div class="profile-wrp">
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
              <div class="sub-menu" style="cursor:pointer" @click="moveMyPage()">마이페이지</div>
              <div class="sub-menu" style="cursor:pointer" @click="logout()">로그아웃</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="category-wrp">
        <div>
          {{ categoryTitleProps }}
        </div>
        <div v-if="subCategoryTitleProps !== ''">
          <img src="@/assets/img/category/right-arrow.png" alt="">
        </div>
        <div>
          {{ subCategoryTitleProps }}
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
    categoryTitleProps: {
      type: String,
      default: ''
    },
    subCategoryTitleProps: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loginPopupOpen: false,
      profileImg: '',
      initLoginDone: false,
      openAccount: false,
      categoryTitle: '',
      subCategoryTitle: '',
    }
  },
  mounted () {
    this.profileImg = this.$store.state.userInfo.detail.profileImg
    this.initLoginDone = this.$store.state.userInfo.initLoginDone
  },
  methods: {
    toggleCategoryPanel () {
      this.$bus.$emit('toggleCategoryPanel', {})
    },
    mainPage () {
      this.$router.push('/')
    },
    openLoginPopup () {
      this.loginPopupOpen = true
      if (this.isMobile) {
        this.$bus.$emit('toggleReviewButton', {})
      }
    },
    closeLoginPopup () {
      this.loginPopupOpen = false
      if (this.isMobile) {
        this.$bus.$emit('toggleReviewButton', {})
      }
    },
    toggleAccountPopup () {
      this.openAccount = !this.openAccount
    },
    moveMyPage () {
      this.$router.push('/mypage')
    },
    checkLogin() {
      if (!this.$store.state.userInfo.initLoginDone) {
        // this.$emit('setLoginPopupOpen', {})
        this.openLoginPopup()
      } else {
        this.$router.push('/posting?m=write')
      }
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
