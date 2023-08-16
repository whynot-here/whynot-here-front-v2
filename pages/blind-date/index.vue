<template>
  <div id="BlindDate">
    <section class="top">
      <div class="title">
        <strong>두근두근</strong><br />
        한대소!
      </div>
    </section>
    <!-- <section class="middle">
      <div class="middle-img">
        <img class="img_01" src="@/assets/img/blind-date/notice_01.png" alt="" />
      </div>
      <div class="desc _01">본 이벤트는,</div>
      <div class="desc _02">
        <div class="left">11.11 ~ 11.11 (4일간)</div>
        <div class="right">진행되고,</div>
      </div>
      <div class="desc _03">
        <div class="left">한동대 학생들 (재학중)</div>
        <div class="right">참여 가능합니다.</div>
      </div>
      <div></div>
    </section> -->
    <section class="middle">
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
    </section>
    <section></section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {},
  data() {
    return {}
  },
  watch: {},
  mounted() {},
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
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
