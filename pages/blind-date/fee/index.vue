<template>
  <div id="FeePage">
    <section class="top">
      <div class="title">보증금 입금</div>
      <div class="m-close">
        <img
          class="m-back-btn"
          src="@/assets/img/common/close-btn2.png"
          alt=""
          @click="$router.go(-1)"
        />
      </div>
      <div class="container">
        <div class="desc">
          <div class="block1">
            위 보증금은, 일부 비매너 사용자를 거르기 윙한 용도입니다.
          </div>

          <div class="block2">
            <p>﹒실제 만남이 이뤄진팀 (앱 내 인증)</p>
            <p>﹒비매너 상대를 만난 분</p>
          </div>

          <div class="block3">
            <p>차후 반환 예정이며 이와 반대로</p>
            <p>실제 만남이 이뤄지지 않거나, 비매너 행동을 한 경우</p>
            <p>보증금은 돌려받지 못합니다.</p>
          </div>
        </div>
      </div>
    </section>

    <div class="hr"></div>

    <section class="middle">
      <div class="whynot">
        <div class="whynot-number-title">입금 계좌</div>
        <div class="whynot-number-box">
          <div class="text">
            <div class="line1">
              카카오뱅크&nbsp;&nbsp;<span>3333-28-8664788</span>
            </div>
            <div class="line2">
              예금주:&nbsp; 오상진(와이낫히어(WNH))<br />
              보증금:&nbsp; 5,000원
            </div>
          </div>
          <div class="copy-icon" @click.prevent="copyWhynotBankNumber">
            복사
          </div>
        </div>
      </div>

      <div class="my-name">
        <div class="my-name-title">송금자명 입력 <span>*</span></div>
        <div>
          <input
            v-model="feeRequest.name"
            class="my-name-input"
            placeholder="본인의 이름을 입력 해주세요"
            type="text"
          />
        </div>
      </div>

      <div class="student-id">
        <div class="student-id-title">학번 입력 <span>*</span></div>
        <div>
          <input
            v-model="feeRequest.studentId"
            class="student-id-input"
            placeholder="학번을 입력 해주세요"
            type="number"
          />
        </div>
      </div>

      <div class="bank">
        <div class="bank-name">계좌번호 입력 <span>*</span></div>
        <DropdownBankName
          ref="DropdownBankName"
          :label-first="'은행명'"
          :dropdown-type="'은행명'"
          @get-label="selectBankName"
        />
        <div>
          <input
            v-model="feeRequest.bankNumber"
            class="bank-number-input"
            placeholder="계좌를 입력 해주세요"
            type="text"
          />
        </div>
      </div>

      <div
        :class="{ active: getIsBtnActive }"
        class="submit-btn"
        @click.prevent="submitBankInfo"
      >
        <div class="title">입금 확인 요청</div>
        <div class="desc">입금 확인까지 2-3시간 정도 소요됩니다.</div>
      </div>

      <div
        v-if="isOpenAskPopup"
        class="ask-popup"
        @click.self="isOpenAskPopup = false"
      >
        <div class="content-wrp">
          <div class="top">
            <div>입금 확인 요청 완료</div>
            <div>확인이 완료되면 푸시알림으로 알려드려요</div>
            <div>혹시 다른 문제가 있나요?</div>
          </div>
          <div class="btn" @click="$router.push('/')">
            <div class="btn-content-wrp">
              <div>닫기</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DropdownBankName from '@/components/blind-date/dropdownBankName'

export default {
  name: 'FeePage',
  components: { DropdownBankName },
  data() {
    return {
      isShow: true,
      feeRequest: {
        name: '',
        studentId: null,
        bankName: '',
        bankNumber: '',
        season: 2
      },
      isOpenAskPopup: false,
      isBtnActive: false
    }
  },
  computed: {
    getIsBtnActive() {
      return this.isBtnActive
    }
  },
  watch: {
    feeRequest: {
      handler() {
        this.isBtnActive =
          this.feeRequest.name !== '' &&
          this.feeRequest.studentId !== null &&
          this.feeRequest.studentId.toString().length === 8 &&
          this.feeRequest.bankName !== '' &&
          this.feeRequest.bankNumber.toString().length > 9
      },
      deep: true
    }
  },
  mounted() {
    this.cmn_goMainPage()
  },
  methods: {
    selectBankName(item) {
      this.feeRequest.bankName = item.name
    },
    copyWhynotBankNumber() {
      this.copySomething('3333288664788')
      this.toastPopup('계좌가 복사되었습니다')
    },
    submitBankInfo() {
      if (this.isBtnActive) {
        this.$axios
          .post(`${process.env.apiUrl}/v2/blind-date/fee`, this.feeRequest, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            this.isOpenAskPopup = true
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/fee.scss';
</style>
