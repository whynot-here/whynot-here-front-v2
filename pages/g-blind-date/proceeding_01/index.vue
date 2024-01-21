<template>
  <div v-if="isShow" id="Proceeding_01">
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
      <div class="line2">1.23일 (화) / 22시</div>
      <div class="line3">1차 매칭 오픈 예정 입니다.</div>
    </div>
    <div class="notice-sub">
      매칭이 완료되면 푸시알림으로 알려드려요 😀
    </div>
    <div class="footer">
      <div class="go-main-btn" @click="go_home()">그동안 앱 둘러보기</div>
      <div class="share-kakao-btn" @click.prevent="checkInfo()">제출 정보 확인하기</div>
    </div>

    <div
      v-if="isOpenInfoPopup"
      class="extra-info-popup"
      @click.self="isOpenInfoPopup = false"
    >
      <div class="content-wrp">
        <div class="top">
          <div class="title">제출 정보 확인하기😊</div>
          <div class="age-area">
            <span>1️⃣ 만 나이</span>
            <input
              v-model="age"
              class="input-long-age"
              type="number"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
              placeholder="ex) 25"
            />
          </div>
          <div class="link-area">
            <span class="sub-title">2️⃣ 카카오 링크 <span class="desc">(익명을 권장해요✨)</span></span>
            <input
              v-model="kakaoLink"
              class="input-long-link"
              type="text"
              placeholder="ex) https://open.kakao.com/o/abcde"
            />
          </div>
          <div class="input-container">
            <div class="sub-title">3️⃣ 상대에게 전할 말 <span class="sub-desc">(200자 이내)</span></div>
            <textarea
              v-model="comment"
              class="input-long"
              type="text"
              maxlength="300"
              placeholder="상세 내용을 입력해주세요"
            >
            </textarea>
          </div>
        </div>
        <div class="btn-list">
          <div class="btn btn1" @click.prevent="isOpenInfoPopup = false">
            <div class="btn-content-wrp">
              <div>닫기</div>
            </div>
          </div>
          <div class="btn btn2" @click.prevent="requestExtraInfo()">
            <div class="btn-content-wrp">
              <div>저장</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProceedingPage01',
  components: {},
  data() {
    return {
      isShow: true,
      isOpenInfoPopup: false,
      age: '',
      comment: '',
      kakaoLink: ''
    }
  },
  watch: {},
  async mounted() {
    await this.getGraduateParticipationType().then((res) => {
      if (res === 'MATCH') {
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
    },
    async checkInfo() {
      await this.$axios
        .get(`${process.env.apiUrl}/v2/blind-date/g-extra-info?season=2`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.age = res.data.age
          this.comment = res.data.comment
          this.kakaoLink = res.data.kakaoLink
          this.isOpenInfoPopup = true
        })
    },
    async requestExtraInfo() {
      await this.$axios
        .put(`${process.env.apiUrl}/v2/blind-date/g-extra-info?season=2`, 
        {
          age: this.age,
          kakaoLink: this.kakaoLink,
          comment: this.comment
        }, 
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.$router.push('/')
        })
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
#Proceeding_01 {
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

  .footer {
    height: 150px;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    box-shadow: 0px 4px 22px 0px rgba(0, 0, 0, 0.06);
  }

  .go-main-btn {
    margin: 0 auto;
    background-color: #6254f0;
    border-radius: 8px;
    width: calc(100% - 40px);
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    color: #fff;
  }

  .share-kakao-btn {
    margin: 0 auto;
    border: 1px solid rgba(217, 229, 244, 1);
    border-radius: 8px;
    width: calc(100% - 40px);
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    color: rgba(65, 76, 91, 1);
    margin-top: 10px;
  }

  .extra-info-popup {
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
      width: 320px;
      height: 500px;
      border-radius: 12px;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .top {
        display: flex;
        width: 320px;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding-top: 5px;

        color: rgba(6, 25, 53, 1);
        font-family: Pretendard;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: center;
        padding-bottom: 8px;

        .age-area{
          padding: 10px 0px;
          margin-left: -25px;
        }

        .link-area {
          padding: 10px 0px;
          margin-left: -15px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          .sub-title {

            .desc {
              font-size: 14px;
              font-weight: 400;
            }
          }
        
          .sub-text {
            font-size: 14px;
            font-weight: 400;
          }
        }

        .input-long-age {
          margin: 0px 10px;
          height: 32px;
          padding: 6px 6px;
          border-radius: 8px;
          border: 1px solid #ececec;
          background: #fff;
          font-family: Pretendard;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          &.textarea {
            padding: 16px;
            height: 146px;
          }
        }

        .input-long-link {
          width: 250px;
          margin: 0px 10px;
          margin-left: 0px;
          height: 32px;
          padding: 6px 6px;
          border-radius: 8px;
          border: 1px solid #ececec;
          background: #fff;
          font-family: Pretendard;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          &.textarea {
            padding: 16px;
            height: 146px;
          }
        }

        .input-long:focus {
          outline: 1px solid #6254f0;
        }

        .title {
          font-size: 24px;
          padding-bottom: 10px;
        }

        .input-container {
          margin-top: 10px;
          display: flex;
          flex-direction: column;

          .sub-title {
            text-align: left;
          }

          .sub-desc {
            font-size: 14px;
            font-weight: 400;
          }
          .input-long {
            width: 270px;
            height: 150px;
            border-radius: 8px;
            border: 1px solid rgba(236, 236, 236, 1);
  
            font-family: Pretendard;
            font-size: 14px;
            font-weight: 500;
            line-height: 17px;
            letter-spacing: 0em;
            text-align: left;
            padding-left: 10px;
            padding-top: 10px;
  
            &::placeholder {
              position: relative;
              color: rgba(163, 163, 163, 1);
            }
          }
        }
      }

      .btn-list {
        display: flex;
        justify-content: center;

        .btn {
          border-radius: 8px;
          border: 1px solid #d9d9d9;
          background: #fff;
          color: #454545;
          font-family: Pretendard;
          font-size: 15px;
          font-weight: 500;
          .btn-content-wrp {
            width: max-content;
            margin: 0 auto;
            display: flex;
            align-self: center;
          }

          width: 140px;
          height: 45px;
          display: flex;
          align-self: center;
  
          margin-bottom: 15px;
        }

        .btn2 {
          color: rgba(98, 84, 240, 1);
          border: 1px solid rgba(98, 84, 240, 1);
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
