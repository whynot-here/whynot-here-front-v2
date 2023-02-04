<template>
  <div id="LoginPopup" @click.self="$emit('closePopup')">
    <div class="popup-wrp">
      <section class="popup-top">
        <div
          class="close-btn"
          @click="$emit('closePopup')"
        >
          <img src="@/assets/img/common/close-btn.png" alt="">
        </div>
      </section>
      <section class="popup-middle">
        <div class="top">
          <div>
            <img src="@/assets/img/common/whynot-here-logo.png" alt="">
          </div>
          <div>
            한동대학교 모임의 시작!
          </div>
          <div>
            원활한 서비스 이용을 위해 로그인을 해주세요.
          </div>
        </div>
        <div class="middle">
          <div v-if="isIdPwLoginMode">
            <div class="form-title">
              이메일 주소
            </div>
            <div>
              <input class="form-content" type="text" placeholder="ex) whynot@gmail.com">
            </div>
            <div class="form-title">
              비밀번호
            </div>
            <div>
              <input class="form-content" type="password" placeholder="비밀번호를 입력해주세요.">
            </div>
          </div>
          <div v-else style="height: 160px;"></div>
          <div class="login-btn-wrp" @click="idPwLogin()">
            <div class="login-btn">
              <div v-if="!isIdPwLoginMode" class="login-icon">
                <img src="@/assets/img/login/login-icon.png" alt="">
              </div>
              <div>
                {{ isIdPwLoginMode ? '로그인' : '일반 로그인' }}
              </div>
            </div>
          </div>
        </div>
        <div class="social-login">
          <div class="social-login-btn">
            <img src="@/assets/img/login/apple-login-btn.png" alt="" @click="googleLogin()">
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
      isIdPwLoginMode: false
    }
  },
  methods: {
    googleLogin () {
      location.href = `https://whynot-here.o-r.kr/auth/login/google?redirect_uri=${process.env.frontUrl}`
    },
    kakaoLogin () {
      location.href = `https://whynot-here.o-r.kr/auth/login/kakao?redirect_uri=${process.env.frontUrl}`
    },
    naverLogin () {
      location.href = `https://whynot-here.o-r.kr/auth/login/naver?redirect_uri=${process.env.frontUrl}`
    },
    idPwLogin () {
      if (this.isIdPwLoginMode) {
        // 일반 로그인
        console.log('일반 로그인')
      } else {
        this.isIdPwLoginMode = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/login/login-popup.scss';
</style>
