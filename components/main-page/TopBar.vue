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
    <!-- <div v-if="isMainPageComp" class="middle">
      🗓️ 이번주는 한동 <strong>{{ numOfWeekStr }}</strong>
      <button @click.prevent="$router.push('/blind-date/selection')">
        한대소 시즌2
      </button>
    </div> -->
    <div
      v-if="isMainPageComp && bannerImg !== ''"
      class="menu"
      @click.prevent="moveApplyOrProceedingPage()"
    >
      <div class="banner">
        <img :src="bannerImg" alt="" @click="routeBlindDate()" />
      </div>
    </div>
    <div v-if="isMainPageComp" class="bottom">
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
    <div
      v-if="isOpenMatchingPopup === true"
      class="complete-popup"
      @click.self="isOpenMatchingPopup = false"
    >
      <div class="content-wrp">
        <div class="close">
          <img
            src="@/assets/img/common/close-review.png"
            alt=""
            @click.self="isOpenMatchingPopup = false"
          />
        </div>
        <div class="img">
          <img src="@/assets/img/common/matching.png" alt="" />
        </div>
        <div class="top">
          <div>매칭이 완료되었어요!</div>
          <div>어떤 분과 매칭이 되었는지 알아보러 갈까요?</div>
        </div>
        <div class="btn" @click.self="moveMatchingPage()">
          상대방 확인하러 가기
        </div>
      </div>
    </div>
    <div>
      <NoticePopup
        :is-open-popup="isOpenNoticePopup"
        @closePopup="closeNoticePopup"
      />
    </div>
  </div>
</template>

<script>
import NoticePopup from '@/components/common/NoticePopup'
export default {
  name: 'TopBar',
  components: { NoticePopup },
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
      subCategoryTitle: '',
      isOpenMatchingPopup: false,
      isOpenNoticePopup: false,
      numOfWeek: 0,
      numOfWeekStr: '',
      isMainPage: false,
      // 한대소 시즌2 관련
      isPaymentUser: false, // 한대소 참가 (= 보증금 제출)
      applyType: '', // 'frend' | 'date'
      // 졸업생 관련
      isBlindIng: false,
      bannerImg: '',
      bannerType: ''
    }
  },
  computed: {
    isMainPageComp() {
      return this.isMainPage
    }
  },
  watch: {
    // main 페이지인 경우만 배너 띄우기
    $route: {
      handler(to, from) {
        if (to.name === 'gather-category') {
          this.isMainPage = true
        } else {
          this.isMainPage = false
        }
      },
      deep: true
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

    // 공지사항을 띄우는 경우
    this.isOpenNoticePopup = !this.cmn_getCookie('close-notice')
    // 공지 기간 끝났을 때
    // this.cmn_removeCookie('close-notice')

    this.numOfWeek = this.cmn_getNumOfWeek()
    this.numOfWeekStr = this.numOfWeek + '주차'
    if (this.numOfWeek === 0) {
      this.numOfWeekStr = '방학중'
    }

    // main 페이지인 경우만 배너 띄우기
    if (this.$route.name === 'gather-category') {
      this.isMainPage = true
    } else {
      this.isMainPage = false
    }

    this.getGraduateParticipationType().then((res) => {
      // if (res === 'BLIND_ING') {
      //   this.isBlindIng = true
      // }
      this.bannerType = res
      if (res === 'BLIND_ING') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-auth-complete.png')
      } else if (res === 'SCREEN') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-proceeding.png')
      } else if (res === 'FEE_ING') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-account.png')
      } else if (res === 'FEE') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-account-proceeding.png')
      } else if (res === 'MATCH') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-proceeding-01.png')
      } else if (res === 'MATCH_OK') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-result.png')
      } else if (res === 'MATCH_FAIL') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-result.png')
      } else if (res === 'MATCH_REJECTED') {
        // this.$router.push('/g-blind-date/recall')
      } else if (res === 'REMATCH') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-proceeding-02.png')
      } else if (res === 'REMATCH_OK') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-result.png')
      } else if (res === 'FINISHED') {
        this.bannerImg = require('@/assets/img/banner/blind-date-banner-finish.png')
      }
    })
  },
  methods: {
    routeBlindDate() {
      if (this.bannerType === 'FAIL') {
        this.$router.push('/auth')
      } else if (this.bannerType === 'NO') {
        this.$router.push('/g-blind-date/intro')
      } else if (this.bannerType === 'BLIND_ING') {
        this.$router.push('/g-blind-date/apply/intro')
      } else if (this.bannerType === 'SCREEN') {
        this.completeScreen()
      } else if (this.bannerType === 'FEE_ING') {
        this.$router.push('/g-blind-date/fee')
      } else if (this.bannerType === 'FEE') {
        this.completeFee()
      } else if (this.bannerType === 'MATCH') {
        this.$router.push('/g-blind-date/proceeding_01')
      } else if (this.bannerType === 'MATCH_OK') {
        this.$router.push('/g-blind-date/matching')
      } else if (this.bannerType === 'MATCH_FAIL') {
        this.$router.push('/g-blind-date/matching')
      } else if (this.bannerType === 'MATCH_REJECTED') {
        this.$router.push('/g-blind-date/recall')
      } else if (this.bannerType === 'REMATCH') {
        this.$router.push('/g-blind-date/proceeding_02')
      } else if (this.bannerType === 'REMATCH_OK') {
        this.$router.push('/g-blind-date/matching')
      } else if (this.bannerType === 'FINISHED') {
        this.$router.push('/')
      }
    },
    closeNoticePopup() {
      this.isOpenNoticePopup = false
    },
    toggleCategoryPanel() {
      this.$bus.$emit('toggleCategoryPanel', {})
    },
    mainPage() {
      // 모바일 상단 logo를 눌렀을 때 저장된 스크롤 높이 초기화
      this.$store.commit('listHistory/setScrollHeight', {
        height: 0
      })

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
    },
    movePostingPage({ type }) {
      if (this.$store.state.userInfo.initLoginDone && type !== 'card') {
        this.$router.push(`/posting?m=write&type=${type}`)
      }
    },
    moveMatchingPage() {
      this.isOpenMatchingPopup = false
      this.$router.push(`/blind-date/matching`)
    },
    moveApplyOrProceedingPage() {
      this.$router.push({
        name: 'g-blind-date-apply-intro',
        params: { type: 'date' }
      })
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
