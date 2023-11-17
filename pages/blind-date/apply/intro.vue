<template>
  <div id="ApplyIntroPage">
    <div v-if="!isFormTypeComplete" class="wrp">
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
          <p>한대소 진행을 위해</p>
          <p>질문 작성을 완료해 주세요!</p>
        </div>
      </section>
      <section class="middle">
        <div
          class="form-btn"
          @click="$router.push(`/blind-date/apply/${type}/me`)"
        >
          <div class="left">본인 정보 입력</div>
          <div class="right">{{ myStep }}/5</div>
        </div>
        <div
          class="form-btn"
          @click="$router.push(`/blind-date/apply/${type}/other`)"
        >
          <div class="left">상대 정보 입력</div>
          <div class="right">{{ favoriteStep }}/5</div>
        </div>
      </section>
    </div>
    <div v-else class="wrp">
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
          <p>모든 입력 사항을 완료 했어요!</p>
          <p>확인 버튼을 누르면 수정 불가합니다.</p>
        </div>
      </section>
      <section class="middle">
        <div class="form-btn">
          <div class="left">본인 정보 입력</div>
          <div class="right done">완료</div>
        </div>
        <div class="form-btn">
          <div class="left">상대 정보 입력</div>
          <div class="right done">완료</div>
        </div>
      </section>
      <section class="bottom">
        <div
          class="complete-btn"
          @click="$router.push('/blind-date/proceeding')"
        >
          확인
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplyIntroPage',
  components: {},
  data() {
    return {
      isFormTypeComplete: false,
      type: 'friend',
      myStep: 0,
      favoriteStep: 0
    }
  },
  mounted() {
    this.$axios
      .get(`${process.env.apiUrl}/v2/blind-date/steps?season=2`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$store.state.userInfo.token
        }
      })
      .then((res) => {
        this.myStep = res.data.myStep
        this.favoriteStep = res.data.favoriteStep
      })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/apply-intro.scss';
</style>
