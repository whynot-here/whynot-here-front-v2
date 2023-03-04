<template>
  <div v-if="isFromPc" id="AboutUs">
    <div class="about-us-container">
      <div class="intro-part">
        <div class="title-text">About Project</div>
        <div class="body-text">
          안녕하세요! 저희는 사람이 모이는 공간 “why not here” 운영진입니다. <br />
          저희는 한동대에서 <span class="highlight">서로에게 가치 있는 모임 활동</span>을 했으면 하는 취지에서 시작하게 되었습니다.
        </div>
      </div>
      
      <div class="balloon-part">
        <div class="word-balloon-list">
          <div class="word-balloon">📢 프로젝트 홍보를 하고 싶어!</div>
          <div class="word-balloon">💳 분실물이 생겼는데 어느 단톡방에 올려야 하지?</div>
          <div class="word-balloon">🚝 포항역에 같이 갈 동행자 없나?</div>
          <div class="word-balloon">📖 스터디같이 진행할 사람 없나?</div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="word-summary">
            단톡방을 조사하면서, 같은 내용이 여러 번 올라오기도 하고, 이로 인해 글이 묻히는 경우도 생기는 것을 보아왔습니다. <br />
            <span class="highlight">여러 개의 단톡방에 흩어진 정보들을 정리해 한곳에 모으고, 학교 내 소규모 만남/모임을 보다 쉽게 진행하고 싶었어요. </span><br />
            우리 대학만의 특색 있는 공간이 되도록 최선을 다해 운영해 나가도록 하겠습니다. 많은 응원과 하단 피드백 부탁드려요!
          </div>
        </div>
      </div>
      
      <div class="team-part">
        <div class="team-info">
          <div class="subtitle">why not Here를 이끌고 있는 운영진</div>
          <div class="title">Our Team</div>
          <div class="team-grid">
            <img src="@/assets/img/about/Yoonie.png" />
            <img src="@/assets/img/about/MJ.png" />
            <img src="@/assets/img/about/Jin.png" />
            <img src="@/assets/img/about/D.png" />
          </div>
        </div>
      </div>
      
      <div class="feedback-part">
        <div class="send-feedback-btn" @click="openReviewModal = true">후기 / 오류 운영진에게 보내기</div>
      </div>

      <div v-if="openReviewModal" >
        <ReviewModal
          :open-review-modal="openReviewModal" 
          @update-modal="updateModal()"/>
      </div>
    </div>
  </div>

  <div v-else id="m-AboutUs">
    <div class="m-about-us-container">
      <div class="m-intro-part">
        <div class="m-title-text">About Project</div>
        <div class="m-body-text">
          <div class="m-inner-text">안녕하세요! 저희는 사람이 모이는 공간 “why not here” <br />운영진입니다.</div>
          <div class="m-inner-text">저희는 한동대에서 <span class="highlight">서로에게 가치 있는 모임 활동</span>을 했으면<br /> 하는 취지에서 시작하게 되었습니다.</div>
        </div>
      </div>
      
      <div class="m-balloon-part">
        <div class="m-word-balloon-list">
          <div class="m-word-balloon">📢 프로젝트 홍보를 하고 싶어!</div>
          <div class="m-word-balloon">💳 분실물이 생겼는데 어느 단톡방에 올려야 하지?</div>
          <div class="m-word-balloon">🚝 포항역에 같이 갈 동행자 없나?</div>
          <div class="m-word-balloon">📖 스터디같이 진행할 사람 없나?</div>
          <div class="m-dot"></div>
          <div class="m-dot"></div>
          <div class="m-dot"></div>
          <div class="m-word-summary">
            <div>단톡방을 조사하면서, 같은 내용이 여러 번 <br />올라오기도 하고, 이로 인해 글이 묻히는 경우도<br /> 생기는 것을 보아왔습니다. </div>
            <div><span class="highlight">여러 개의 단톡방에 흩어진 정보들을 정리해<br /> 한곳에 모으고, 학교 내 소규모 만남/모임을<br /> 보다 쉽게 진행하고 싶었어요. </span></div>
            <div>우리 대학만의 특색 있는 공간이 되도록 최선을 다해 운영해<br /> 나가도록 하겠습니다.<br /> 많은 응원과 하단 피드백 부탁드려요!</div>
          </div>
        </div>
      </div>
      
      <div class="m-team-part">
        <div class="m-team-info">
          <div class="m-subtitle">why not Here를 이끌고 있는 운영진</div>
          <div class="m-title">Our Team</div>
          <div class="m-team-grid">
            <img src="@/assets/img/about/Yoonie.png" />
            <img src="@/assets/img/about/MJ.png" />
            <img src="@/assets/img/about/Jin.png" />
            <img src="@/assets/img/about/D.png" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="isReviewButtonOpen" class="m-feedback-part">
      <div class="m-send-feedback-btn" @click="openReviewModal = true">후기 / 오류 운영진에게 보내기</div>
    </div>

    <div v-if="openReviewModal" >
        <ReviewModal
          :open-review-modal="openReviewModal" 
          @update-modal="updateModal()"/>
      </div>
  </div>
</template>

<script>
import ReviewModal from '@/components/main-page/ReviewModal'

export default {
  name: 'AboutUs',
  components: {
    ReviewModal
  },
  layout: 'why-not',
  data() {
    return {
      openReviewModal: false,
      isReviewButtonOpen: true
    }
  },
  created() {
    this.$bus.$off('toggleReviewButton')
    this.$bus.$on('toggleReviewButton', ()=> {
      this.toggleReviewButton()
    })
  },
  methods: {
    toggleReviewButton() {
      this.isReviewButtonOpen = !this.isReviewButtonOpen
    },
    updateModal() {
      this.openReviewModal = false
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/aboutus.scss';
</style>
