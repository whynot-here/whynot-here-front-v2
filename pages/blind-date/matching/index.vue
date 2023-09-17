<template>
  <div v-if="isShow" id="MatchingPage">
    <div v-if="isMatched" class="matchedScreen">
      <div class="title">
        {{ matchingInfo.myName }} 님의 매칭상대
      </div>

      <div class="content">
        <div class="matching-info-container">
          <div class="profile-img">
            <img :src="matchingInfo.profileImg" alt="" />
          </div>
          <div class="default-info">
            <span class="bold">{{ matchingInfo.name }} / {{ matchingInfo.myAge }}세 /</span> {{ matchingInfo.mbti }} / {{ matchingInfo.smoke }} / {{ matchingInfo.faith }}
          </div>
          <div class="comment">
            {{ matchingInfo.comment }}
          </div>
        </div>
      </div>
      
      <div class="link-info">
        <p>본인 혹은 상대방의 채팅방 중 하나가 사용됩니다.</p>
        <p>아래 링크가 본인의 링크라면, 상대방의 입장을 기다려주세요~!</p>
        <p class="bold">(카카오톡 앱이 바로 열리지 않는다면, 링크 복사 후 입장 부탁드립니다🙏)</p>
      </div>

      <div class="footer">
        <a
          class="kakao-btn"
          :href="matchingInfo.kakaoLink"
          target="_blank"
          style="text-decoration: none"
        >
          채팅방 입장
        </a>
      </div>
    </div>

    <div v-else class="unmatchedScreen">
      <div class="title-wrap">
        <div class="title">
        <p>아쉽지만 학우님과</p>
        <p>딱 맞는 매칭 상대를 찾지 못했어요 😥</p>
      </div>
      </div>
      <div class="sub-title">
        많이 기다려 주셨는데 죄송합니다.
      </div>

      <div class="matching-summary">
        <div class="row1">
          <div class="total-cnt box">
            <div class="info">
              총 참여 인원 수
            </div>
            <div class="cnt">
              249명
            </div>
          </div>          
        </div>

        <div class="row2">
          <div class="ratio box">
            <div class="info">
              성비
            </div>
            <div class="cnt">
              <div class="male">남 134</div>
              <div class="female">여 115</div>
            </div>
          </div>

          <div class="matched-cnt box">
            <div class="info">
              매칭 성공
            </div>
            <div class="cnt">
              114팀
            </div>
          </div>
        </div>
      </div>

      <div class="setting">
        <div class="row1" @click.prevent="pushSelect">
          <div class="left">
            <div v-if="!isSelected">
              <img class="btn-img" src="@/assets/img/blind-date/ellipse-off.png" alt="" />
            </div>
            <div v-if="isSelected">
              <img class="btn-img" src="@/assets/img/blind-date/ellipse-on.png" alt="" />
            </div>
            <div class="text">다음한대소 알림받기</div>
          </div>
          <div class="right">
            <div v-if="isSelected">
              <img class="text-img" src="@/assets/img/blind-date/ellipse-on-text.png" alt="" />
            </div>
          </div>
        </div>
        <div class="row2" @click = "openReviewModal = true">
          <div class="text">개선사항 / 문의하기</div>
          <div>
              <img class="img" src="@/assets/img/category/right-arrow.png" alt="" />
            </div>
        </div>
        <div v-if="openReviewModal">
          <ReviewModal
            :open-review-modal="openReviewModal"
            @update-modal="updateModal()"
          />
        </div>
      </div>

      <div class="footer">
        <a
          class="home-btn"
          target="_blank"
          style="text-decoration: none"
          @click.prevent = "commit"
        >
          확인
        </a>
      </div>
    </div>
  </div>  
</template>

<script>
import ReviewModal from '@/components/main-page/ReviewModal'

export default {
  name: 'MatchingPage',
  components: {
    ReviewModal
  },
  data() {
    return {
      matchingInfo: {},
      isShow: false,
      isMatched: false,
      isSelected: true,
      openReviewModal: false
    }
  },
  mounted() {
    this.getAuthState();
    this.getMatchingResult();
  },
  methods: {
    // 학생증 인증 여부
    async getAuthState() {
      await this.cmn_getUserInfo(this.$store.state.userInfo.token)
      if (this.$store.state.userInfo.detail.roles.includes('ROLE_USER')) {  // 학생증 인증 O
        this.blindDateParticipation()
      } else {                                                              // 학생증 인증 X
        this.$router.push('/')
      }
    },
    // 신청 여부 확인
    blindDateParticipation() {
      this.$axios
        .get(`${process.env.apiUrl}/v2/blind-date/participation?season=1`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          if (res.data) {             // 이미 참여한 경우 => 매칭 결과 대상자 인지 확인
            this.getMatchinReveal()
          } else {                    // 참여 안한 경우 => 메인 페이지
            this.$router.push('/')
          }
        })
    },
    async getMatchinReveal() {
      await this.$axios
          .get(`${process.env.apiUrl}/v2/blind-date/reveal-result?season=1`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            if (res.data) {             // 매칭 결과 오픈인 경우
              this.isShow = true;
            } else {
              this.$router.push('/')
            }
          })
    },
    async getMatchingResult() {
      await this.$axios
          .get(`${process.env.apiUrl}/v2/blind-date/matching-result?season=1`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            // 매칭이 된 경우
            this.matchingInfo = res.data;
            this.matchingInfo.smoke = (this.matchingInfo.smoke === "Y") ? "흡연함" : "흡연안함";
            this.matchingInfo.faith = (this.matchingInfo.faith === "CHRISTIAN") ? "기독교" : "종교 상관없음";

            this.isMatched = true;
          })
          .catch((_error) => {
            // 매칭이 안 된 경우
            this.isMatched = false;
          })
    },
    commit() {
      // push 알림 업데이트
      this.$axios
      .put(
        `${process.env.apiUrl}/v2/account/blind-date-push?pushOn=${this.isSelected}`,
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
      this.$router.push(`/`)
    },

    pushSelect() {
      this.isSelected = !this.isSelected;
    },

    updateModal() {
      this.openReviewModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
#MatchingPage {
  .matchedScreen {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 2fr 7fr 1fr 1fr;

    .title {
      display: flex;
      align-self: flex-end;
      padding: 10px 20px;
      margin-top: 20px;
      color: #061935;
      font-family: Pretendard;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
    }
    .content {
      padding: 20px 20px 40px 20px;
      strong {
        color: #e74133;
        font-family: Pretendard;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
      }

      .matching-info-container {
        display: grid;

        min-height: 120px;
        padding: 16px;
        border: 1px solid rgba(234, 232, 255, 1);
        border-radius: 12px;
        box-shadow: 0px 8px 16px 0px rgba(0, 52, 138, 0.08);

        .profile-img {
          margin-bottom: 10px;

          img {
            border-radius: 6px;
            border: 1px solid var(--gray-30, #efefef);
            width: 40px;
            height: 40px;
          }
        }

        .default-info {
          margin-bottom: 20px;
          font-family: Pretendard;
          font-size: 14px;
          font-weight: 400;
          line-height: 17px;
          letter-spacing: 0em;
          .bold {
            font-weight: 600;
          }
        }

        .comment {
          font-family: Pretendard;
          font-size: 13px;
          font-weight: 400;
          line-height: 16px;
          letter-spacing: 0em;

          color: rgba(92, 108, 130, 1);
        }
      }
    }

    .link-info {
      font-size: 13px;
      line-height: 8px;
      color: rgba(92, 108, 130, 1);
      text-align: center;

      .bold {
        color: black;
      }
    }
    .footer {
      padding: 20px 20px 40px 20px;
      display: flex;
      flex-direction: row;
      gap: 13px;
      
      .kakao-btn {
        flex-grow: 1;
        height: 48px;
        flex-shrink: 0;
        border-radius: 6px;
        background: #d9d9d9;
        color: #fff;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 48px;
        text-align: center;
        background: #6254f0;
      }
    }
  }

  .unmatchedScreen {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 18fr 4fr 22fr 35fr 10fr;

    .title-wrap {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .title {
        color: rgba(20, 66, 141, 1);
        font-family: Pretendard;
        font-size: 20px;
        font-weight: 600;
        line-height: 10px;
        letter-spacing: 0em;
        text-align: center;
      }
    }

    .sub-title {
      display: flex;
      justify-self: center;

      color: rgba(132, 132, 132, 1);
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
    }

    .matching-summary {
      margin-bottom: 20px;
      .row1 {
        .total-cnt {
          margin: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .info {
            color: rgba(115, 115, 115, 1);
            font-family: Pretendard;
            font-size: 13px;
            font-weight: 600;
            line-height: 16px;
            letter-spacing: 0em;
            text-align: left;
          }
        }
      }

      .row2  {
        display: flex;

        .ratio {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .info {
            color: rgba(115, 115, 115, 1);
            font-family: Pretendard;
            font-size: 13px;
            font-weight: 600;
            line-height: 16px;
            letter-spacing: 0em;
            text-align: left;
          }
          .cnt {
            display: flex;
            font-family: Pretendard;
            font-size: 16px;
            font-weight: 400;
            line-height: 19px;
            letter-spacing: 0em;
            text-align: left;

            .male {
              margin-right: 20px;
            }
          }
        }

        .matched-cnt {
          margin: 0px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .info {
            color: rgba(115, 115, 115, 1);
            font-family: Pretendard;
            font-size: 13px;
            font-weight: 600;
            line-height: 16px;
            letter-spacing: 0em;
            text-align: left;
          }
          .cnt {
            display: flex;
            font-family: Pretendard;
            font-size: 16px;
            font-weight: 400;
            line-height: 19px;
            letter-spacing: 0em;
            text-align: left;

            .male {
              margin-right: 20px;
            }
          }
        }
      }
    }

    .box {
      width: 80%;
      height: 65px;
      background: rgba(247, 248, 250, 1);
      padding: 16px 20px 16px 20px;
      border-radius: 8px;
      gap: 10px;
    }

    .setting {
      background-color: rgb(249,249,249);

      .row1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 68px;
        margin-top: 10px;
        padding: 0px 20px;
        background-color: white;

        .left {
          display: flex;
          align-items: center;
          .btn-img {
            width: 16px;
            height: 16px;
            margin-right: 10px;
            margin-top: 5px;
          }

          .text {
            font-family: Pretendard;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 0em;
            text-align: left;
          }
        }
        
        .right {
          .text-img {
            width: 32px;
            height: 20px;
            margin-top: 5px;
          }
        }
        
      }

      .row2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px;

        height: 68px;
        background-color: white;
        border-width: 2px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(247, 248, 250, 1);

        .text {
          font-family: Pretendard;
          font-size: 15px;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
        }

        .img {
          width: 8px;
          height: 12px;
        }
      }
    }

    .footer {
      background-color: rgb(249,249,249);
      padding: 20px 20px 40px 20px;
      display: flex;
      flex-direction: row;
      gap: 13px;

      .title {
        display: flex;
        align-self: flex-end;
      }
      
      .home-btn {
        flex-grow: 1;
        height: 48px;
        flex-shrink: 0;
        border-radius: 6px;
        background: #d9d9d9;
        color: #fff;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 48px;
        text-align: center;
        background: #6254f0;
      }
    }
  }
}
</style>