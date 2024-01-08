<template>
  <div id="Rematching">
    <section class="top-wrp">
      <section class="title-wrp">
        <div class="title">
          <div>아쉽지만 상대방이</div>
          <div><strong>재매칭을</strong> 신청했어요😢</div>
        </div>
        <div class="desc">
          자동 재매칭 대상자이지만, 참여비 환불받고<br />
          시즌 종료도 가능해요
        </div>
      </section>
      <section class="select">
        <div class="option">
          <input
            type="radio"
            name="option"
            value="rematching"
            checked
            @click="selectOption('rematching')"
          /><label>재매칭 신청</label>
        </div>
        <div class="option">
          <input
            type="radio"
            name="option"
            value="finish"
            @click="selectOption('finish')"
          /><label>참여비 환불받고 시즌 종료하기</label>
        </div>
      </section>
    </section>
    <section class="other">
      <div class="next active" @click="openRematchingPopup()">확인</div>
    </section>
    <div v-if="isOpenStopMatchingPopup" class="popup">
      <div class="content-wrp">
        <div class="top">
          <div>다음 한대소 졸업생 시즌 알림 받기</div>
          <div>시즌이 열리면 푸시알림으로 알려드려요!</div>
        </div>
        <div class="btn">
          <div @click="commit(false)">아니요</div>
          <div @click="commit(true)">네</div>
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
      dropdownLabel: '신장',
      isOpenStopMatchingPopup: false,
      isOpenRematchingPopup: false,
      selectedOption: 'rematching' // rematching | finish
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
    commit(value) {
      // push 알림 업데이트
      this.$axios.put(
        `${process.env.apiUrl}/v2/account/blind-date-push?pushOn=${value}`,
        null,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
      )

      // 홈화면 이동
      this.go_home()
    },
    openRematchingPopup() {
      if (this.selectedOption === 'rematching') {
        // 재매칭 신청
        this.$axios
          .put(
            `${process.env.apiUrl}/v2/blind-date/g-fee/recall`,
            {
              season: 2,
              isRecall: false
            },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                Authorization: this.$store.state.userInfo.token
              }
            }
          )
          .then((res) => {
            this.$router.push('/g-blind-date/proceeding_02')
          })
          .catch((error) => {
            window.alert(error.response.data.message)
          })
      } else if (this.selectedOption === 'finish') {
        this.isOpenStopMatchingPopup = true
        this.$axios
          .put(
            `${process.env.apiUrl}/v2/blind-date/g-fee/recall`,
            {
              season: 2,
              isRecall: true
            },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                Authorization: this.$store.state.userInfo.token
              }
            }
          )
          .then((res) => {})
          .catch((error) => {
            window.alert(error.response.data.message)
          })
      }
    },
    selectOption(value) {
      this.selectedOption = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/g-blind-date/rematching.scss';
</style>
