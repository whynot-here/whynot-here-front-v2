<template>
  <div id="Rematching">
    <section class="top">
      <div class="title">
        <div>아쉽지만</div>
        <div><strong>매칭상대를</strong> 찾지 못했어요😢</div>
      </div>
      <div class="desc">
        아래에 있는 필수 요소 제외시 재매칭률이 올라갑니다.<br />
        매칭 포기시, 입력하신 계좌로 환불이 진행됩니다.
      </div>
    </section>
    <section class="notice">
      <div class="purple-box">
        <div class="left">
          <img src="@/assets/img/blind-date/notice-purple.png" alt="" />
        </div>
        <div class="right">
          <div>필수 요소 제외시에도 매칭되지 않을 수 있습니다.</div>
          <div>
            <li>상대방의 매칭 포기</li>
            <li>성비율</li>
          </div>
        </div>
      </div>
    </section>
    <main class="content"></main>
    <section class="btn-wrp">
      <div class="prev">매칭 포기</div>
      <div class="next active">재매칭 신청</div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RematchingPage',
  components: {},
  data() {
    return {
      isShow: false
    }
  },
  watch: {},
  async mounted() {
    // await this.getParticipationType().then((res) => {
    //   if (res === 'REMATCH') {
    //     this.isShow = true
    //   } else if (res === 'FAIL') {
    //     this.$router.push('/auth')
    //   } else {
    //     this.$router.push('/')
    //   }
    // })
  },
  methods: {
    go_home() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/util.scss';

@font-face {
  font-family: 'GmarketSans';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}
#Rematching {
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .top {
    display: flex;
    padding: 78px 20px 32px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    .title {
      color: #2e3348;

      text-align: center;
      font-family: Pretendard;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: 130%; /* 31.2px */
      letter-spacing: -0.12px;

      strong {
        color: #6254f0;
        font-family: Pretendard;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 130%;
        letter-spacing: -0.12px;
      }
    }
    .desc {
      color: #0c2958;

      text-align: center;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 19.6px */
      letter-spacing: -0.07px;
    }
  }
  .notice {
    padding: 16px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    .purple-box {
      border-radius: 8px;
      border: 1px solid #d2ceff;
      background: #f1f0ff;
      display: flex;
      padding: 10px 12px;
      .left {
        img {
          width: 16px;
          height: 16px;
        }
      }
      .right {
        padding-left: 6px;
        color: var(--gray-80, #454545);
        font-family: Pretendard;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }
  .content {
    flex-grow: 1;
  }
  .btn-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid var(--Color-WarmGray-WG-200, #e7e7e7);
    background: #f3f5fb;
    .prev {
      flex-grow: 1;
      height: 56px;
      flex-shrink: 0;
      background: #f3f5fb;
      color: #6254f0;
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 56px;
      text-align: center;
    }
    .next {
      flex-grow: 1;
      height: 56px;
      background: #6254f0;
      color: #fff;
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 56px;
      text-align: center;
      &.active {
        background: #5d50e1;
      }
    }
  }
}
</style>
