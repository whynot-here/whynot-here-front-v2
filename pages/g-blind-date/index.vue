<template>
  <div></div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      isNuxtReady: false,
      isAuthComplete: false,
      isShow: false,
      swiperOption: {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      isFeeConfirm: true
    }
  },
  watch: {},
  mounted() {
    this.getGraduateParticipationType().then((res) => {
      if (res === 'FAIL') {
        this.$router.push('/auth')
      } else if (res === 'NO') {
        this.$router.push('/g-blind-date/intro')
      } else if (res === 'BLIND_ING') {
        this.$router.push('/g-blind-date/apply/intro')
      } else if (res === 'SCREEN') {
        this.completeScreen()
      } else if (res === 'FEE_ING') {
        this.$router.push('/g-blind-date/fee')
      } else if (res === 'FEE') {
        this.completeFee()
      } else if (res === 'MATCH') {
        this.$router.push('/g-blind-date/proceeding_01')
      } else if (res === 'MATCH_OK') {
        this.$router.push('/g-blind-date/matching')
      } else if (res === 'MATCH_FAIL') {
        this.$router.push('/g-blind-date/rematching')
      } else if (res === 'MATCH_REJECTED') {
        this.$router.push('/g-blind-date/rematching/other')
      } else if (res === 'REMATCH') {
        this.$router.push('/g-blind-date/proceeding_02')
      } else if (res === 'REMATCH_OK') {
        this.$router.push('/g-blind-date/matching')
      } else if (res === 'FINISHED') {
        this.$router.push('/')
      }
    })
  },
  methods: {
    completeFee() {
      this.cmn_openCompleteModal({
        option: {
          imageUrl: require('@/assets/img/blind-date/fee-complete.png'),
          title: '납부 확인 진행중입니다',
          time: '한시간',
          isContactPopup: true,
          confirmCallback: this.cmn_goMainPage
        }
      })
    },
    completeScreen() {
      this.cmn_openCompleteModal({
        option: {
          imageUrl: require('@/assets/img/blind-date/apply-complete.png'),
          title: '내부 검수 진행중입니다',
          time: '하루',
          isContactPopup: false,
          confirmCallback: this.cmn_goMainPage
        }
      })
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
      // color: #b3b3b3;
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
