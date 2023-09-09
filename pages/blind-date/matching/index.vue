<template>
  <div id="MatchingPage">
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
</template>

<script>
export default {
  name: 'MatchingPage',
  data() {
    return {
      matchingInfo: {}
    }
  },
  mounted() {
    this.getMatchingResult();
  },
  methods: {
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
            this.matchingInfo = res.data;
            this.matchingInfo.smoke = (this.matchingInfo.smoke === "Y") ? "흡연함" : "흡연안함";
            this.matchingInfo.faith = (this.matchingInfo.faith === "CHRISTIAN") ? "기독교" : "종교 상관없음";
          })
    }
  }
}
</script>

<style lang="scss" scoped>
#MatchingPage {
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
</style>