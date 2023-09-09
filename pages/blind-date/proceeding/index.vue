<template>
  <div id="Proceeding">
    <div class="title">
      why not here가 <br />
      열심히 매칭 중이에요
    </div>
    <div class="desc">(평균 하루 소요)</div>
    <div class="center-img">
      <img src="@/assets/img/blind-date/proceeding.png" alt="" />
    </div>
    <div class="desc-bottom">
      푸쉬알림으로 알려드리니 알람 설정 필수! <br />
      <strong>매칭 결과는 9월 16일에 확인할 수 있습니다.</strong>
    </div>
    <div class="button" @click="cmn_goMainPage">그동안 앱 둘러보기</div>
  </div>
</template>

<script>
export default {
  name: 'ProceedingPage',
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
#Proceeding {
  .title {
    margin-top: 131px;
    color: #6254f0;
    text-align: center;
    font-family: GmarketSans;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
  }
  .desc {
    color: #adadad;
    text-align: center;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  .center-img {
    margin-top: 94px;
    text-align: center;
    img {
      width: 141px;
      height: 103px;
    }
  }
  .desc-bottom {
    margin-top: 97px;
    color: #414c5b;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    strong {
      color: #414c5b;
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;
    }
  }
  .button {
    margin: 40px auto 0 auto;
    width: 335px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    border-radius: 4px;
    background: #6254f0;
    color: #fff;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
  }
}
</style>
