<template>
  <div v-if="isFromPc" id="TopBar">
    <div class="topbar" @click.self="toggleAccountPopup">
      <div class="topbar-wrp">
        <div class="category-wrp">
          <div>
            {{ categoryTitleProps }}
          </div>
          <div v-if="subCategoryTitleProps !== ''">
            <img src="@/assets/img/category/right-arrow.png" alt="" />
          </div>
          <div>
            {{ subCategoryTitleProps }}
          </div>
        </div>
        <div class="search"></div>
        <div class="posting-wrp" @click="checkLogin('')">
          <div
            :class="
              $store.state.userInfo.initLoginDone
                ? 'posting-btn'
                : 'posting-btn not-login'
            "
          >
            📝 글쓰기
          </div>
          <div v-if="!$store.state.userInfo.initLoginDone" class="login-notice">
            <img src="@/assets/img/login/login-notice.png" alt="" />
          </div>
        </div>
        <div
          v-if="!$store.state.userInfo.initLoginDone"
          class="login"
          @click="moveToLoginPage"
        >
          로그인
        </div>
        <div v-if="initLoginDone" class="profile" @click="toggleAccountPopup">
          <div v-if="profileImg !== ''">
            <img :src="profileImg" alt="" />
          </div>
          <div v-else>
            <img src="@/assets/img/common/default-profile.png" alt="" />
          </div>
          <div v-if="openAccount" class="open-account">
            <div class="sub-menu-wrp">
              <div
                class="sub-menu"
                style="cursor: pointer"
                @click="moveMyPage()"
              >
                내정보
              </div>
              <div class="sub-menu" style="cursor: pointer" @click="logout()">
                로그아웃
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else id="TopBarM">
    <div class="top">
      <div class="logo-wrp">
        <div class="title">사람이 모이는 공간</div>
        <div class="logo-img" @click="mainPage">
          <img src="@/assets/img/common/whynot-here-logo.png" alt="" />
        </div>
      </div>
      <div
        v-if="!$store.state.userInfo.initLoginDone"
        class="login"
        @click="moveToLoginPage"
      >
        로그인
      </div>
      <div v-else class="profile-wrp">
        <div v-if="initLoginDone" class="profile" @click="toggleAccountPopup">
          <div v-if="profileImg !== ''">
            <img :src="profileImg" alt="" />
          </div>
          <div v-else>
            <img src="@/assets/img/common/default-profile.png" alt="" />
          </div>
          <div v-if="openAccount" class="open-account">
            <div class="sub-menu-wrp">
              <div
                class="sub-menu"
                style="cursor: pointer"
                @click="moveMyPage()"
              >
                내정보
              </div>
              <div class="sub-menu" style="cursor: pointer" @click="logout()">
                로그아웃
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="category-toggle" @click.prevent="toggleCategoryPanel">
        <img src="@/assets/img/common/category-toggle.png" alt="" />
      </div>
    </div>
    <div class="middle">🗓️ 이번주는 한동 <strong>10주차</strong></div>
    <div class="bottom">
      <div class="category-wrp">
        <div>
          {{ categoryTitleProps }}
        </div>
        <div v-if="subCategoryTitleProps !== ''">
          <img src="@/assets/img/category/right-arrow.png" alt="" />
        </div>
        <div>
          {{ subCategoryTitleProps }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
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
  data() {
    return {
      profileImg: '',
      initLoginDone: false,
      openAccount: false,
      categoryTitle: '',
      subCategoryTitle: ''
    }
  },
  created() {
    this.$bus.$off('checkLogin')
    this.$bus.$on('checkLogin', () => {
      this.checkLogin('card')
    })
  },
  mounted() {
    this.profileImg = this.$store.state.userInfo.detail.profileImg
    this.initLoginDone = this.$store.state.userInfo.initLoginDone
  },
  methods: {
    toggleCategoryPanel() {
      this.$bus.$emit('toggleCategoryPanel', {})
    },
    mainPage() {
      this.$router.push('/')
    },
    moveToLoginPage() {
      this.$router.push('/login')
    },
    toggleAccountPopup() {
      this.openAccount = !this.openAccount
    },
    moveMyPage() {
      this.$router.push('/mypage')
    },
    checkLogin(type) {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.$router.push('/login')
      }
      // this.movePostingPage({ type })
    },
    movePostingPage({ type }) {
      if (this.$store.state.userInfo.initLoginDone && type !== 'card') {
        this.$router.push(`/posting?m=write&type=${type}`)
      }
    },
    logout() {
      this.cmn_logout()
      this.initLoginDone = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/main-page/top-bar.scss';
</style>

<style>
.owl-dots {
  position: relative;
  z-index: 10;
  margin-top: -25px !important;
}
</style>
