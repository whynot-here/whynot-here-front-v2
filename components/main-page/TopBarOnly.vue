<template>
  <div id="TopBar">
    <div class="topbar" @click.self="toggleAccountPopup">
      <div class="topbar-wrp">
        <div class="logo-left">
          사람이 모이는 공간
        </div>
        <div class="logo" @click="mainPage">
          <img src="@/assets/img/common/whynot-here-logo.png" alt="">
        </div>
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
    checkLogin() {
      if (!this.$store.state.userInfo.initLoginDone) {
        // this.$emit('setLoginPopupOpen', {})
        this.openLoginPopup()
      } else {
        this.$router.push('/posting?m=wirte')
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
@import '@/assets/scss/util.scss';

#TopBar {
  @include screen {
    .open-account {
      right: 15vw !important;
    }
  }
  
  height: 80px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 4px 22px rgba(0, 0, 0, 0.06);
  // margin: 0 auto;
  .topbar {
    background-color: #FAFAFA;
    .topbar-wrp {
      display: flex;
      width: 1064px;
      margin: 0 auto;
      .logo-left {
        line-height: 80px;
        color: #737373;
        font-size: .75rem;
        font-weight: 500;
      }
      .logo {
        margin-left: 12px;
        margin-top: 22px;
        img {
          width: 139px; height: 35px;
        }
      }
      .category-wrp {
        display: flex;
        height: 80px; line-height: 80px;
        div:first-child {
          font-size: 1.38rem; font-weight: 500;
          color: #4D4D4D;
        }
        div:nth-child(2) {
          img {
            width: 8px; height: 12px;
            margin: 0 20px;
          }
        }
        div:nth-child(3) {
          font-size: 1.5rem; font-weight: 600;
        }
      }
      .search {
        flex-grow: 1;
      }
      .posting-wrp {
        position: relative;
        .posting-btn {
          margin-top: 31px; margin-right: 24px;
          font-size: .94rem; font-weight: 700;
          cursor: pointer;
          &.not-login {
            color: #484848; opacity: 0.3;
          }
        }
        .login-notice {
          position: absolute;
          img {
            width: 199px; height: 46px;
            margin-top: 10px; margin-left: -70px;
          }
        }
      }
      .login {
        height: 18px;
        padding-left: 24px;
        margin-top: 31px; margin-right: 32px;
        font-size: .94rem; font-weight: 700;
        color: #391B1B;
        border-left: 1px solid #D9D9D9;
        cursor: pointer;
      }
      .logined {
        padding-top: 31px; margin-right: 32px;
        font-size: .94rem; font-weight: 700;
        color: #391B1B;
      }
      .profile {
        padding-top: 24px;
        img {
          width: 32px;
          height: 32px;
          border: 1px solid #D9D9D9;
          border-radius: 8px;
          cursor: pointer;
        }
        .open-account {
          position: absolute;
          right: 50px;
          width: 146px;
          // height: 100px;
          margin-top: 10px;
          background: #FFFFFF;
          border: 1px solid #EFEFEF;
          border-radius: 8px;
          box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 4px 8px rgba(0, 52, 138, 0.06);
          .sub-menu-wrp {
            position: relative;
            color: hsl(230,4%,90%);
            .sub-menu {
              margin: 8px; padding: 14px 8px;
              font-size: .88rem; font-weight: 500;
              color: #454545;
            }
            .sub-menu:hover {
              background: #F3F7FE;
              border-radius: 6px;
              color: #005B9A;
            }
            .sub-menu::after {
              border-color: #ffffff transparent;
              border-style: solid;
              border-width: 0 6px 8px 6.5px;
              content: '';
              display: block;
              left: 120px;
              position: absolute;
              top: -16px;
              width: 0;
              z-index: 1;
            }
            
            .sub-menu::before {
              border-color: #eef3fd transparent;
              border-style: solid;
              border-width: 0 6px 8px 6.5px;
              content: '';
              display: block;
              left: 120px;
              position: absolute;
              top: -18px;
              width: 0;
              z-index: 0;
            }
            // .sub-menu:after {
            //   content: '';
            //   position: absolute;
            //   top: 0;
            //   left: 86%;
            //   width: 0;
            //   height: 0;
            //   border-color: #eef3fd transparent;
            //   border-style: solid;
            //   // border: 20px solid transparent;
            //   border-width: 0 6px 8px 6.5px;
            //   border-bottom-color: #ffffff;
            //   top: -7px;
            //   // border-top: 0;
            //   // margin-left: -20px;
            //   // margin-top: -15px;
            // }
          }
        }
      }
    }
  }
}
</style>
