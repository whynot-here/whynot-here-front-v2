<template>
  <div v-if="isShow" id="SelectionPage">
    <!-- 약관 동의 화면 -->
    <div
      class="blind-popup"
    >
      <div class="content-wrp">
        <div class="m-close">
          <img
            class="m-back-btn"
            src="@/assets/img/common/close-btn2.png"
            alt=""
            @click="cmn_goMainPage()"
          />
        </div>

        <section class="popup-top">
          <div class="title">
            <p class="line1">한동대학교 졸업생 소개팅</p>
            <p class="line2">약관동의</p>
          </div>
        </section>

        <div class="popup-middle">
          <div class="desc">
            <div class="block1">
              <p>
                한동대학교 졸업생 소개팅을 원활하게 진행하기 위해서
                아래와 같은 내용을 받습니다.
              </p>
            </div>

            <div class="block2">
              <p>﹒양측 카카오 링크 오픈</p>
              <p>﹒재매칭 제도</p>
              <p>﹒참여비 30,000</p>
              <p>﹒매칭 리뷰에 따른 다음 시즌 참여 불가 패널티</p>
              <p>﹒채팅방 입장 안할 시 다음 시즌 참여 불가 패널티</p>
              <p>﹒본인 사진 최소 2장 필수</p>
            </div>
          </div>
        </div>

        <div class="popup-bottom">
          <div class="check-box">
            <div class="icon" @click.prevent="clickBlindCheckBox">
              <img
                :class="getIsBlindCheckedContract ? '' : 'disabled'"
                class="check-box-img"
                src="@/assets/img/blind-date/check-box-selected.png"
                alt=""
              />
              <img
                :class="getIsBlindCheckedContract ? 'disabled' : ''"
                class="check-box-img"
                src="@/assets/img/blind-date/check-box.png"
                alt=""
              />
            </div>
            <div class="text">
              매너 있는 한대소를 위한 약관을 잘 읽고 보았고, 동의합니다.
              <span class="red">(필수)</span>
            </div>
          </div>
          <div
            :class="getIsBlindCheckedContract ? 'isChecked' : ''"
            class="btn"
            @click.prevent="aggreeBlindContract"
          >
            동의
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectionPage',
  components: {},
  data() {
    return {
      isShow: false,
      isBlindCheckedContract: false
    }
  },
  computed: {
    getIsBlindCheckedContract() {
      return this.isBlindCheckedContract
    },
    getIsFriendCheckedContract() {
      return this.isFriendCheckedContract
    }
  },
  watch: {},
  async mounted() {
    await this.getGraduateParticipationType().then((res) => {
      if (res === 'NO') {
        this.isShow = true // 처음 시작하는 사용자 페이지
      } else if (res === 'FRIEND' || res === 'BLIND_DONE') {
        this.$router.push('/g-blind-date/proceeding') // 완료 후 매칭중 페이지
      } else if (res === 'BLIND_ING') {
        this.$router.push({
          name: 'g-blind-date-apply-intro',
          params: { type: 'date' }
        }) // 작성중 페이지
      } else if (res === 'FAIL') {
        this.$router.push('/auth')
      }
    })
  },
  methods: {
    // 연애 탭 약관 체크
    clickBlindCheckBox() {
      this.isBlindCheckedContract = !this.isBlindCheckedContract
    },
    // 연애 탭 약관 제출
    aggreeBlindContract() {
      if (this.isBlindCheckedContract) {
        console.log('계좌번호 제출 페이지 이동')
        
        this.$axios
        .post(`${process.env.apiUrl}/v2/blind-date?season=2`, null, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.$router.push('/g-blind-date/apply/intro')
        })
        .catch((error) => {
          window.alert(error.response.data.message)
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/terms.scss';
</style>
