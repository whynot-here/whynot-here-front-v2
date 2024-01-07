<template>
  <div v-if="isShow" id="Proceeding_02">
    <div class="m-close">
      <img
        class="m-back-btn"
        src="@/assets/img/common/close-btn2.png"
        alt=""
        @click="go_home()"
      />
    </div>

    <div class="notice">
      <div class="auth-complete-wrp">
        <img src="@/assets/img/blind-date/proceeding02.png" alt="" />
      </div>
      <div class="line1">WNH팀이 열심히 매칭중 입니다🤩</div>
      <div class="line2">1.25일 (목) / 22시</div>
      <div class="line3">2차 매칭 오픈 예정 입니다.</div>
    </div>
    <div class="notice-sub">
      매칭이 완료되면 푸시알림으로 알려드려요 😀
    </div>
    <div class="footer">
      <div class="go-main-btn" @click="go_home()">그동안 앱 둘러보기</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProceedingPage02',
  components: {},
  data() {
    return {
      isShow: false
    }
  },
  watch: {},
  async mounted() {
    await this.getGraduateParticipationType().then((res) => {
      if (res === 'REMATCH') {
        this.isShow = true
      } else if (res === 'FAIL') {
        this.$router.push('/auth')
      } else {
        this.$router.push('/')
      } 
    })
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
#Proceeding_02 {
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  text-align: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .m-close {
    position: absolute;
    top: 30px;
    right: 20px;
    width: 24px;
    img {
      width: 24px;
      height: 24px;
    }

    @include tablet {
      top: 40px;
      right: 40px;

      img {
        width: 35px;
        height: 35px;
      }
    }
  }

  .notice {
    margin-top: -100px;
    color: #14428d;
    font-size: 1.5rem;
    font-weight: 600;
    .auth-complete-wrp {
      img {
        width: 120px;
        margin-bottom: 30px;
      }
    }

    .line1 {
      font-family: Pretendard;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: -0.005em;
      text-align: center;
      color: rgba(46, 51, 72, 1);
    }

    .line2 {
      font-family: Pretendard;
      font-size: 24px;
      font-weight: 700;
      line-height: 34px;
      letter-spacing: -0.005em;
      text-align: center;
      color: #6254f0;
    }

    .line3 {
      font-family: Pretendard;
      font-size: 24px;
      font-weight: 600;
      line-height: 34px;
      letter-spacing: -0.005em;
      text-align: center;
      color: rgba(46, 51, 72, 1);
    }
  }
  .notice-sub {
    padding-top: 16px;
    font-size: 0.88rem;
    color: #0c2958;
    line-height: 1.4;
    strong {
      font-weight: 500;
    }
  }

  .go-main-btn {
    margin: 0 auto;
    left: 0;
    right: 0;
    background-color: #6254f0;
    border-radius: 8px;
    position: fixed;
    width: calc(100% - 40px);
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    bottom: 24px;
    color: #fff;
    box-shadow: 0px 4px 22px 0px rgba(0, 0, 0, 0.06);
  }
}
</style>
