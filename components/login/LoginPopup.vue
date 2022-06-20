<template>
  <div id="LoginPopup" @click.self="$emit('closePopup')">
    <div class="popup-wrp">
      <section class="popup-top">
        <div
          class="close-btn"
          @click="$emit('closePopup')"
        >
          <img src="@/assets/img/login/close-btn.png" alt="">
        </div>
      </section>
      <section class="popup-middle">
        <div class="top">
          <div>사람이 모이는 공간</div>
          <div>
            <img src="@/assets/img/common/whynot-here-logo.png" alt="">
          </div>
        </div>
        <div class="middle">
          시작하기
        </div>
        <div class="social-login-btn">
          <img src="@/assets/img/login/google-login-btn.png" alt="">
        </div>
        <div class="social-login-btn">
          <img src="@/assets/img/login/kakao-login-btn.png" alt="">
        </div>
        <div class="social-login-btn">
          <img src="@/assets/img/login/naver-login-btn.png" alt="">
        </div>
      </section>
      <section class="popup-bottom">
        로그인은 <strong>개인 정보 보호 정책</strong> 및 <strong>서비스 약관에 동의</strong>하는 것을
        의미하며, 서비스 이용을 위해서 이메일과, 이름, 프로필 이미지를 수집합니다.
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPopup',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#LoginPopup {
  z-index: 100;
  position: fixed;
  width: 100vw; height: 100vh;
  top: 0; left: 0;
  background: #D9D9D9;
  transition: opacity .2s;
  .popup-wrp {
    width: 422px; height: 496px;
    margin: calc((100vh - 496px) / 2) auto;

    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    .popup-top {
      .close-btn {
        padding-top: 24px; padding-right: 24px;
        text-align: right;
        cursor: pointer;
        img {
          width: 32px; height: 32px;
        }
      }
    }
    .popup-middle {
      width: 300px;
      margin: 0 auto;
      .top {
        display: flex;
        width: max-content; height: 28px;
        margin: 0 auto;
        div:first-child {
          line-height: 29px;
          font-size: .75rem; font-weight: 500;
          color: #737373;
        }
        div:nth-child(2) {
          margin-left: 6px;
          img {
            width: 120px; height: 28px;
          }
        }
      }
      .middle {
        margin-top: 20px; padding-bottom: 50px;
        text-align: center;
        font-size: 1.38rem; font-weight: 700;
        color: #181818;
      }
      .social-login-btn {
        // height: 65px;
        margin-bottom: 15px;
        cursor: pointer;
        img {
          width: 300px; height: 50px;
        }
        img:hover {
          box-shadow: 0px 0px 4px rgba(30, 30, 30, 0.04), 0px 4px 8px rgba(30, 30, 30, 0.04);
          border-radius: 12px;
        }
      }
    }
    .popup-bottom {
      width: 348px; line-height: 1.2rem;
      margin: 0 auto; padding-top: 17px;
      font-size: .75rem; font-weight: 400;
      color: #7A7A7A;
      text-align: center;
      strong {
        text-decoration: underline;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
}
</style>
