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
          <img src="@/assets/img/login/google-login-btn.png" alt="" @click="googleLogin()">
        </div>
        <div class="social-login-btn">
          <img src="@/assets/img/login/kakao-login-btn.png" alt="" @click="kakaoLogin()">
        </div>
        <div class="social-login-btn">
          <img src="@/assets/img/login/naver-login-btn.png" alt="" @click="naverLogin()">
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
  },
  methods: {
    googleLogin () {
      location.href = `https://whynot-here.o-r.kr/auth/login/google?redirect=${process.env.frontUrl}`
    },
    kakaoLogin () {

    },
    naverLogin () {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/login/login-popup.scss';
</style>
