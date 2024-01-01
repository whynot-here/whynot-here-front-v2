<template>
  <div id="Rematching">
    <section class="title-wrp">
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
      <div class="prev" @click="openStopMatchingPopup(true)">매칭 포기</div>
      <div class="next active" @click="openRematchingPopup()">재매칭 신청</div>
    </section>
    <div v-if="isOpenStopMatchingPopup" class="popup">
      <div class="content-wrp">
        <div class="top">
          <div>정말 신청 철회를 하시겠어요?</div>
          <div>철회를 진행하시면, 지금까지의 정보가 삭제 됩니다.</div>
        </div>
        <div class="btn">
          <div @click="openStopMatchingPopup(false)">아니요</div>
          <div @click="cancelBlindDate()">네</div>
        </div>
      </div>
    </div>
    <div v-if="isOpenRematchingPopup === true" class="complete-popup">
      <div class="content-wrp">
        <div class="img">
          <img src="@/assets/img/common/matching.png" alt="" />
        </div>
        <div class="top">
          <div>
            24시간 뒤 매칭 재매칭<br />
            결과를 알려드려요!
          </div>
        </div>
        <div class="btn" @click.self="go_home()">그동안 앱 둘러보기</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RematchingPage',
  components: {},
  data() {
    return {
      isShow: false,
      isOpenStopMatchingPopup: false,
      isOpenRematchingPopup: false
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
    },
    openStopMatchingPopup(value) {
      this.isOpenStopMatchingPopup = value
    },
    cancelBlindDate() {
      this.$axios
        .delete(`${process.env.apiUrl}/v2/blind-date?season=2`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.$router.push('/')
        })
        .catch((error) => {
          window.alert(error.response.data.message)
        })
    },
    openRematchingPopup() {
      this.isOpenRematchingPopup = true
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
  .title-wrp {
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
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    .content-wrp {
      width: 355px;
      height: 194px;
      border-radius: 12px;
      background: #fff;
      .top {
        display: flex;
        padding: 40px 0px 24px 0px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div:first-child {
          color: #061935;
          text-align: center;
          font-family: Pretendard;
          font-size: 18px;
          font-style: normal;
          font-weight: 600;
          line-height: 24px;
        }
        div:nth-child(2) {
          margin-top: 8px;
          color: #5c6c82;
          text-align: center;
          font-family: Pretendard;
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
        }
      }
      .btn {
        display: flex;
        justify-content: center;
        gap: 16px;
        padding: 16px;
        div {
          width: 145px;
          height: 48px;
          line-height: 48px;
          text-align: center;
        }
        div:first-child {
          border-radius: 8px;
          border: 1px solid #dedede;
          background: #fff;
          color: #404040;

          font-family: Pretendard;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
        }
        div:nth-child(2) {
          border-radius: 8px;
          border: 1px solid #dedede;
          background: #fff;
          color: #6254f0;
          border: 1px solid #6254f0;

          font-family: Pretendard;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
        }
      }
    }
  }
  .complete-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    .content-wrp {
      width: 280px;
      height: 280px;
      border-radius: 12px;
      background: #fff;
      .close {
        padding-top: 20px;
        padding-right: 20px;
        text-align: right;
        img {
          width: 24px;
        }
      }
      .img {
        text-align: center;
        padding-top: 48px;
        img {
          width: 77px;
        }
      }
      .top {
        display: flex;
        width: 280px;
        height: 76px;
        padding: 17px 0px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 17px;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        text-align: center;
        div:first-child {
          color: #061935;
          font-family: Pretendard;
          font-size: 18px;
          font-style: normal;
          font-weight: 600;
          line-height: 24px; /* 133.333% */
        }
        div:nth-child(2) {
          color: #5c6c82;
          font-family: Pretendard;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-align: center;
        }
      }
      .btn {
        height: 48px;
        line-height: 48px;
        margin: 0px 16px 16px 16px;
        font-family: Pretendard;
        font-size: 15px;
        font-weight: 500;
        text-align: center;
        border-radius: 8px;
        border: 1px solid #6254f0;
        color: #6254f0;
        background: #f9faff;
      }
    }
  }
}
</style>
