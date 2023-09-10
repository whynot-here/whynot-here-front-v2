<template>
  <div v-show="isShow" id="BlindDate">
    <section class="top">
      <div class="title">
        <strong>두근두근</strong><br />
        한대소!
      </div>
    </section>

    <div
      v-if="isNuxtReady"
      v-swiper:mySwiper="swiperOption"
      class="swiper-container"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <section class="middle">
            <div class="middle-img">
              <img
                class="img_01"
                src="@/assets/img/blind-date/notice_01.png"
                alt=""
              />
            </div>
            <div class="desc _01">본 이벤트는,</div>
            <div class="desc _02">
              <div class="left">09.11 ~ 09.15 (5일간)</div>
              <div class="right">진행되고,</div>
            </div>
            <div class="desc _03">
              <div class="left">한동대 학생들 (재학중)</div>
              <div class="right">참여 가능합니다.</div>
            </div>
            <div></div>
          </section>
        </div>
        <div class="swiper-slide">
          <section class="middle">
            <div class="middle-img">
              <img
                class="img_02"
                src="@/assets/img/blind-date/notice_02.png"
                alt=""
              />
            </div>
            <div v-if="!isAuthComplete" class="desc _04">
              시작하기 위해서 학생증 인증이 필요해요
            </div>
            <div v-else class="desc _04">
              학생증 인증이 완료되어 한대소에 참여할 수 있어요
            </div>
            <div v-if="!isAuthComplete" class="auth-btn" @click.prevent="goToAuthPage">학생증 인증하기</div>
            <div v-else class="start auth-btn" @click.prevent="goToApplyPage">다음</div>
            <div></div>
          </section>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <!-- <section class="middle">
      <div class="middle-img">
        <img class="img_01" src="@/assets/img/blind-date/notice_01.png" alt="" />
      </div>
      <div class="desc _01">본 이벤트는,</div>
      <div class="desc _02">
        <div class="left">09.11 ~ 09.15 (5일간)</div>
        <div class="right">진행되고,</div>
      </div>
      <div class="desc _03">
        <div class="left">한동대 학생들 (재학중)</div>
        <div class="right">참여 가능합니다.</div>
      </div>
      <div></div>
    </section> -->
    <!-- <section class="middle">
      <div class="middle-img">
        <img
          class="img_02"
          src="@/assets/img/blind-date/notice_02.png"
          alt=""
        />
      </div>
      <div class="desc _04">시작하기 위해서 학생증 인증이 필요해요</div>
      <div class="auth-btn">학생증 인증하기</div>
      <div></div>
    </section> -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      isNuxtReady: false,
      isAuthComplete: false,
      isShow: true,
      swiperOption: {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
          // dynamicBullets: true,
          // dynamicMainBullets: 2
        }
        // breakpoints: {
        //   // when window width is >= 480px
        //   480: {
        //     slidesPerView: 2,
        //     spaceBetween: 10
        //   },
        //   // when window width is >= 640px
        //   640: {
        //     slidesPerView: 3,
        //     spaceBetween: 20
        //   },
        //   1264: {
        //     slidesPerView: 4,
        //     spaceBetween: 30
        //   }
        // }
      }
    }
  },
  watch: {},
  mounted() {
    this.isNuxtReady = true
    // this.getMyAuthImg().then((res) => {
    //   this.blindDateParticipation()
    // })
    this.getAuthState()
  },
  methods: {
    async getAuthState() {
      await this.cmn_getUserInfo(this.$store.state.userInfo.token)
      if (
        this.$store.state.userInfo.detail.roles.includes('ROLE_USER')
      ) {
        this.isAuthComplete = true
      }
    },
    async getMyAuthImg() {
      await this.$axios
        .get(`${process.env.apiUrl}/v2/student/img`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          if (res.data.imgUrl !== null) {
            if (res.data.imgUrl.length > 0) {
              this.isAuthComplete = true
            }
          }
        })
        .catch((error) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: error,
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
          return false
        })
    },
    blindDateParticipation() {
      this.$axios
        .get(`${process.env.apiUrl}/v2/blind-date/participation?season=1`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          if (res) {
            this.$router.push('/blind-date/proceeding')
          } else {
            this.isShow = true
          }
        })
    },
    goToAuthPage() {
      this.$router.push(`/auth`)
    },
    goToApplyPage() {
      this.$router.push(`/blind-date/apply`)
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'GmarketSans';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}
#BlindDate {
  width: 100vw;
  margin: 0 auto;
  .top {
    background: #f8fafb;
    padding: 20px 0 20px 20px;
    .title {
      strong {
        font-weight: 600;
      }
      color: rgba(98, 84, 240, 0.75);
      font-family: GmarketSans;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 32px;
    }
  }
  .middle {
    .middle-img {
      height: 380px;
      /* 설정 */
      position: relative;
      .img_01 {
        width: 107.408px;
        height: 98.9px;
        align-content: middle;
        /* 상하좌우 정중앙 정렬하기 */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .img_02 {
        width: 160px;
        height: 160px;
        align-content: middle;
        /* 상하좌우 정중앙 정렬하기 */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .desc {
      color: var(--gray-80, #454545);
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      padding: 24px 20px 12px;
    }
    ._02,
    ._03 {
      padding-top: 0;
      display: flex;
      .left {
        padding: 4px 8px;
        border-radius: 2px;
        background: #f6f6f6;
        color: #144285;
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-right: 8px;
      }
      .right {
        line-height: 30px;
      }
    }
    ._04 {
      color: var(--gray-80, #454545);
      text-align: center;
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      text-align: center;
    }
    .auth-btn {
      width: 335px;
      height: 52px;
      line-height: 52px;
      margin: 12px auto;
      border-radius: 4px;
      border: 1px solid #d9e5f4;
      background: #fff;
      color: #414c5b;
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      text-align: center;
    }
    .start {
      background: #6254f0;
      border: none;
      color: #fff;
    }
  }

  .swiper-container {
    width: 100%;
    // height: 300px;
  }

  .swiper-slide {
    // text-align: center;
    font-size: 18px;
    // background: #fafafa;

    /* Center slide text vertically */
    // display: -webkit-box;
    // display: -ms-flexbox;
    // display: -webkit-flex;
    // display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-pagination {
    position: relative !important;
    margin: 68px auto 0 auto;
    --swiper-theme-color: #6254f0;
  }
}
</style>
