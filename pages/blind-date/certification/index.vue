<template>
  <div id="CertificationPage">
    <div class="wrp">
      <section class="top">
        <div class="m-close">
          <img
            class="m-back-btn"
            src="@/assets/img/common/close-btn2.png"
            alt=""
            @click="$router.push('/')"
          />
        </div>
        <div class="title">
          <p>만남 인증하기</p>
        </div>
      </section>
      <section class="middle">
        <div class="notice">
          매칭된 상대방과 만났다면, <br />
          상대방 휴대폰 속 본인 정보가 담긴 매칭 페이지를 <br />
          촬영하여 제출하시면 됩니다. <br />
          <strong
            >아무 상관 없는 사진을 제출 할 경우 보증금 반환은 이루어지지
            않습니다.
          </strong>
        </div>
        <div class="br">
          <p></p>
        </div>
        <div class="content">
          <div class="title">보증금 받으실 계좌</div>
          <div class="account">
            <div>카카오</div>
            <div>000-0000-00000</div>
          </div>
        </div>
        <div class="content">
          <div class="title">인증 사진 추가<strong>*</strong></div>
          <div class="picture"></div>
        </div>
        <div class="complete-btn">인증 완료하기</div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CertificationPage',
  components: {},
  data() {
    return {
      isFormTypeComplete: false,
      type: 'date' // 'date' | 'friend'
    }
  },
  mounted() {
    this.cmn_goMainPage()
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/certification.scss';
</style>
