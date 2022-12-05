<template>
  <div v-if="!isMobile" id="AboutUs">
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

    <div class="m-feedback-part">
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
      openReviewModal: false
    }
  },
  methods: {
    updateModal() {
      this.openReviewModal = false
    }
  },
}
</script>

<style lang="scss" scoped>
#AboutUs {
  display: flex;
  height: calc(100vh - 80px - 44px);
  justify-content: center;
  overflow: scroll;
  
  .about-us-container {
    width: 1070px;
    .intro-part {
      display: flex;
      height: 100px;
      margin-top: 80px;
      .title-text {
        width: max-content;
        color: #181818;
        font-style: normal;
        font-weight: 600;
        font-size: 26px;
        line-height: 100%;
      }

      .body-text {
        width: max-content;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 160%;
        color: #414243;
        padding-left: 3vw;

        .highlight {
          color: #3E82F1;
        }
      }
    }
    
    .balloon-part {
      height: 620px;

      .word-balloon-list {
        display: flex;
        height: 80vh;
        flex-direction: column;
        align-items: center;

        .word-balloon {
          padding: 8px 24px;
          margin-top: 20px;
          background: #F3F3F3;
          border-radius: 9999px;
        }

        .dot {
          width: 6px;
          height: 6px;
          background-color: #D9D9D9;
          border-radius: 4.5px;
          margin-top: 20px;
        }

        .word-summary {
          width: 1070px;
          padding: 3vh 0vh;
          margin-top: 50px;
          height: max-content;
          background: #F3F3F3;
          border-radius: 12px;
          text-align: center;
          line-height: 180%;
          
          .highlight {
            font-weight: 600;
          }
        }
      }
    }

    .team-part {
      height: 550px;
      
      .subtitle {
        color: #737373;
        opacity: 0.6;
      }

      .title {
        width: max-content;
        color: #181818;
        margin-top: 2vh;
        font-style: normal;
        font-weight: 600;
        font-size: 26px;
        line-height: 100%;
      }

      .team-grid {
        display: grid;
        grid-template-rows: 180px 180px;
        grid-template-columns: 500px 500px;
      }
    }

    .feedback-part {
      height: 350px;
      display: flex;
      justify-content: center;
      .send-feedback-btn {
        color: #FFFFFF;
        padding: 14px 24px;
        gap: 10px;
        width: max-content;
        height: 50px;
        background-color: #FF8A00;
        border-radius: 10px;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
}

#m-AboutUs {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  overflow: scroll;

  .m-about-us-container {
    width: 100%;
    height: 73vh;
    .m-intro-part {

      .m-title-text {
        font-weight: 600;
        font-size: 20px;
        padding: 20px 20px;
      }

      .m-body-text {
        font-weight: 500;
        font-size: 14px;
        line-height: 160%;
        height: 120px;
        padding: 0px 25px; 

        .m-inner-text {
          padding-bottom: 20px;
        }

        .highlight {
          color: #3E82F1;
        }
      }
    }

    .m-balloon-part {
      height: 700px;
      font-weight: 400;
      font-size: 14px;
      .m-word-balloon-list {
        display: flex;
        height: 80vh;
        flex-direction: column;
        align-items: center;

        .m-word-balloon {
          padding: 6px 16px;
          margin-top: 15px;
          background: #F3F3F3;
          border-radius: 9999px;
        }

        .m-word-balloon:nth-child(1) {
          margin-top: 40px;
        }

        .m-dot {
          width: 4px;
          height: 4px;
          background-color: #D9D9D9;
          border-radius: 4.5px;
          margin-top: 12px;
        }

        .m-word-summary {
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
          margin-top: 30px;
          padding: 32px 24px;
          height: 340px;
          background-color: #F3F3F3;
          line-height: 170%;

          .highlight {
            font-weight: 600;
          }
        }
      }
    }

    .m-team-part {
      height: 900px;

      .m-team-info {
        .m-subtitle {
          font-weight: 400;
          font-size: 14px;
          color: #737373;
          opacity: 0.6;
          padding: 0px 20px;
        }

        .m-title {
          font-weight: 600;
          font-size: 20px;
          padding: 0px 20px;
        }

        .m-team-grid {
          display: flex;
          flex-direction: column;
          align-items: center;

          img {
            height: 147px;
          }

          img:nth-child(1) {
            margin-left: -30px;
          }

          img:nth-child(3) {
            margin-left: -20px;
          }
        }
      }
    }
  }

  .m-feedback-part {
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    border-radius: 20px 20px 0px 0px;
    box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 4px 8px rgba(0, 52, 138, 0.06);
    .m-send-feedback-btn {
      color: #FFFFFF;
      padding: 14px 24px;
      gap: 10px;
      width: 340px;
      height: 44px;
      background-color: #FF8A00;
      border-radius: 10px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      vertical-align: middle;
    }
  }
}
</style>
