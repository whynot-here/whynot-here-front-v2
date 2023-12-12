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
    this.$router.push('/g-blind-date/intro')
  },
  methods: {}
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
