<template>
  <div id="ApplyIntroPage">
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
        <div v-if="isBeforeFinalSubmit" class="title">
          <p>모든 입력사항을 완료했어요!</p>
          <p>확인 버튼을 누르면 수정이 불가합니다.</p>
        </div>
        <div v-else class="title">
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
          <div v-if="isBeforeFinalSubmit" class="right">완료</div>
          <div v-else class="right">
            {{ myStep }}/{{ type === 'date' ? '5' : '3' }}
          </div>
        </div>
        <div
          v-if="type === 'date'"
          class="form-btn"
          @click="$router.push(`/blind-date/apply/${type}/other`)"
        >
          <div class="left">상대 정보 입력</div>
          <div v-if="isBeforeFinalSubmit" class="right">완료</div>
          <div v-else class="right">{{ favoriteStep }}/4</div>
        </div>
      </section>

      <section v-if="isBeforeFinalSubmit && type === 'date'" class="bottom">
        <div class="complete-btn" @click="submitFinal()">확인</div>
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
      type: 'date',
      myStep: 0,
      favoriteStep: 0,
      isBeforeFinalSubmit: true
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

        // if (this.type === 'date') {
        //   this.isBeforeFinalSubmit =
        //     this.myStep === 5 && this.favoriteStep === 4
        // } else if (this.type === 'friend') {
        //   this.isBeforeFinalSubmit = this.myStep === 3
        // }
      })
  },
  methods: {
    submitFinal() {
      this.$axios
        .put(`${process.env.apiUrl}/v2/blind-date/finish?season=2`, '', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.$router.push('/blind-date/proceeding')
        })
        .catch((error) => {
          window.alert(error.response.data.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/apply-intro.scss';
</style>
