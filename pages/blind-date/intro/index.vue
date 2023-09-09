<template>
  <div id="IntroPage">
    <section class="top">
      <div class="period">23.09.11~23.09.15 까지</div>
      <div class="title">
        <strong>두근두근</strong><br />
        한대소!
      </div>
      <div class="apply-cnt">현재 <strong>{{ totalCount }}명</strong> 참여중!</div>
      <div class="apply-ratio">(남여 비율 차이로 매칭이 되지 않을 수 있습니다.)</div>
    </section>
    <section class="bottom">
      <div class="point-img">
        <img src="@/assets/img/blind-date/blind-date-intro.png" alt="" />
      </div>
      <div class="bottom-wrp">
        <div class="btn" @click="moveDownloadPage('playstore')">
          <div class="btn-title">플레이스토어 다운로드</div>
          <div class="img-wrp">
            <img
              class="playstore"
              src="@/assets/img/blind-date/blind-date-playstore.png"
              alt=""
            />
          </div>
        </div>
        <div class="btn" @click="moveDownloadPage('appstore')">
          <div class="btn-title">앱스토어 다운로드</div>
          <div class="img-wrp">
            <img
              class="appstore"
              src="@/assets/img/blind-date/blind-date-appstore.png"
              alt=""
            />
          </div>
        </div>
        <div class="link-wrp">
          <div class="left">이미 앱이 있다면?</div>
          <div class="right">
            <a href="https://whynot.page.link/share" target="_blank">
              앱으로 이동
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IntroPage',
  components: {},
  data() {
    return {
      totalCount: 0,
    }
  },
  watch: {},
  mounted() {
    this.getApplicantTotalCnt()
  },
  methods: {
    moveDownloadPage(type) {
      if (type === 'appstore') {
        window.open('https://apps.apple.com/kr/app/whynothere/id1665014097')
      } else if (type === 'playstore') {
        window.open(
          'https://play.google.com/store/apps/details?id=com.sangjin.whynot'
        )
      }
    },

    async getApplicantTotalCnt() {
      await this.$axios
          .get(`${process.env.apiUrl}/v2/blind-date/total-cnt?season=1`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((res) => {
            this.totalCount = res.data
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
#IntroPage::-webkit-scrollbar {
  display: none;
}
#IntroPage {
  width: calc(100vw - 40px);
  height: calc(100vh - 100px);
  margin: 0 auto;
  background-color: #f8fafb;
  padding: 52px 20px 48px 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  .top {
    flex-grow: 1;
    .period {
      width: 175px;
      padding: 4px 8px;
      border-radius: 4px;
      background: #2c3849;
      color: #fdfeff;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      text-align: center;
    }
    .title {
      strong {
        color: #6254f0;
        font-weight: 600;
      }
      margin-top: 20px;
      color: #6254f0;
      font-family: GmarketSans;
      font-size: 32px;
      font-weight: 400;
      line-height: 44px;
    }
    .apply-cnt {
      margin-top: 16px;
      margin-bottom: 10px;
      color: var(--gray-80, #454545);
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      strong {
        color: #296cdb;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  }
  .bottom {
    margin-top: 116px;
    .point-img {
      text-align: right;
      img {
        width: 125px;
        height: 120px;
      }
    }
    .bottom-wrp {
      margin-top: 40px;
      .btn {
        display: flex;
        width: calc(100% - 18px);
        height: 52px;
        line-height: 52px;
        border-radius: 4px;
        border: 1px solid #daeaff;
        background: #fff;
        padding-left: 18px;
        margin-bottom: 12px;
        color: #414c5b;
        font-family: Pretendard;
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        .btn-title {
          flex-grow: 1;
        }
        .img-wrp {
          padding-right: 14px;
          .playstore {
            width: 40px;
            height: 40px;
            margin-top: 6px;
          }
          .appstore {
            width: 24px;
            height: 24px;
            margin-right: 4px;
            margin-top: 15px;
          }
        }
      }
      .link-wrp {
        margin-top: 24px;
        display: flex;
        .left {
          flex-grow: 1;
          padding-left: 8px;
          color: #737373;
          font-family: Pretendard;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 24px;
        }
        .right {
          a {
            padding-right: 9px;
            color: #3e82f1;
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
