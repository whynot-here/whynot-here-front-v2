<template>
  <div id="GIntroPage">
    <div class="top-bar">
      <div class="sized-box"></div>
      <div class="title">가치 설명</div>
      <div class="m-close">
        <img
          class="m-back-btn"
          src="@/assets/img/common/close-btn2.png"
          alt=""
          @click="$router.push('/')"
        />
      </div>
    </div>

    <div class="status-board">
      <div class="container">
        <div class="period">
          <span class="bold">1.16 (화) / 21시</span> 부터&nbsp;&nbsp;
          <span class="bold">1.21 (일) / 22시</span> 까지
        </div>
        <div class="apply-cnt">
          현재 <strong>{{ totalCount }}명</strong> 참여중!
        </div>
      </div>
    </div>

    <div class="team-intro">
      <div class="line">안녕하세요, 한동대학교 졸업생들로</div>
      <div class="line">구성된 <span class="blue">팀 WNH</span> 입니다 🤩</div>
    </div>

    <div class="saying">
      <img class="saying-img" src="@/assets/img/blind-date/saying.png" alt="" />
    </div>

    <div class="paragraph1">
      <div class="container">
        <div class="img">
          <img
            class="paragraph1-img"
            src="@/assets/img/blind-date/paragraph1.png"
            alt=""
          />
        </div>
        <div class="title">
          1학년,놀기 바빴던 <span class="bold">새내기 시절을 지나</span>
        </div>
        <div class="desc">
          <div>2학년 전공이 나랑 맞는지 고민도 하고</div>
          <div>3학년 한동 생활에 익숙해져갈 때 쯤</div>
          <div>4학년 졸업과 취업/대학원 관문을 거쳐</div>
          <div>저희는 사회에 나오게 되었습니다.</div>
        </div>
      </div>
    </div>

    <div class="paragraph2">
      <div class="container">
        <div class="img">
          <img
            class="paragraph2-img"
            src="@/assets/img/blind-date/paragraph2.png"
            alt=""
          />
        </div>
        <div class="title">
          <span class="bold">한동의 울타리 넘어</span>의 사회에서,
        </div>
        <div class="desc">
          <div>나와 맞는 인연을 만나는 일은 쉬운 일이 아니었습니다.</div>
          <div>뿐만 아니라, 각자 주변에 있는 좋은 한동인이 서로의 존재를</div>
          <div>몰라 인연을 만들지 못하는</div>
          <div>안타까운 모습을 보게 되었습니다.</div>
        </div>
      </div>
    </div>

    <div class="season1">
      <div class="container">
        <div class="stats-box">
          <div class="line1">시즌1 재학생 한대소</div>
          <div class="line2">재학생 248명 참여</div>
        </div>
        <div class="title">
          <div>한대소는 최고의 공통점인</div>
          <div class="bold">'한동'을 중심으로</div>
        </div>
        <div class="desc">
          <div>좋은 분들을 모시고자 합니다.</div>
          <div>저희 커뮤니티 운영팀은</div>
          <div>이미 결혼한 팀원들로 구성되어 있으며,</div>
          <div>시즌1에서는 재학생 기준 112쌍의 커플이 매칭되었습니다.</div>
        </div>
      </div>
    </div>

    <div class="saying2">
      <img
        class="saying2-img"
        src="@/assets/img/blind-date/saying2.png"
        alt=""
      />
    </div>
    <!-- 
    <div class="store">
      <div class="container">
        <div class="bottom-wrp">
          <div class="btn" @click="moveDownloadPage('playstore')">
            <div class="btn-title">플레이스토어 다운로드</div>
            <div class="img-wrp">
              <img
                class="playstore"
                src="@/assets/img/blind-date/blind-date-playstore.png"
                alt=""
              />
            </div>
          </div>
          <div class="btn" @click="moveDownloadPage('appstore')">
            <div class="btn-title">앱스토어 다운로드</div>
            <div class="img-wrp">
              <img
                class="appstore"
                src="@/assets/img/blind-date/blind-date-appstore.png"
                alt=""
              />
            </div>
          </div>
          <div class="link-wrp">
            <div class="left">이미 앱이 있다면?</div>
            <div class="right">
              <a href="https://whynot.page.link/share" target="_blank">
                앱으로 이동
              </a>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="caution">
      <div class="container">
        <div class="title">꼭 읽어주세요!</div>
        <div class="desc">
          <div class="line">
            <span class="bold">﹒</span>졸업생 한대소는 참여비 30,000이
            있습니다. 받은 보증금은 앞으로의 한대소 발전 목적으로 쓰여집니다.
          </div>
          <div class="line">
            <span class="bold">﹒</span>신청서 작성 후 내부 검수 기간이
            있습니다. 너무 꾸며내거나 불건전한 내용은 반려될 수 있으니 진중하게
            작성해 주세요.
          </div>
        </div>
      </div>
    </div>

    <div v-if="isShow" class="footer">
      <!-- <div
        class="btn btn-comming-soon"
      >
        comming soon
      </div> -->
      <div
        v-if="!isAuthComplete"
        class="btn btn-need-auth"
        @click="$router.push('/auth')"
      >
        학생증 인증하기
      </div>
      <div
        v-else-if="isAuthComplete && isBlindIng"
        class="btn btn-apply"
      >
        참여중
      </div>
      <div
        v-else
        class="btn btn-apply"
        @click="$router.push('/g-blind-date/terms')"
      >
        신청서 작성하기
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GIntroPage',
  components: {},
  data() {
    return {
      isShow: false,
      totalCount: 0,
      isAuthComplete: false,
      isBlindIng: false
    }
  },
  watch: {},
  async mounted() {
    this.getApplicantTotalCnt()

    await this.getGraduateParticipationType().then((res) => {
      if (res === 'FAIL') {
        // nothing to do
      } else if (res === 'NO') {
        this.isAuthComplete = true
      } else {
        this.isAuthComplete = true
        this.isBlindIng = true
      }

      this.isShow = true
    })
  },
  methods: {
    async getAuthState() {
      await this.cmn_getUserInfo(this.$store.state.userInfo.token)
      if (this.$store.state.userInfo.detail.roles.includes('ROLE_USER')) {
        this.isAuthComplete = true
      }
    },
    moveDownloadPage(type) {
      if (type === 'appstore') {
        window.open('https://apps.apple.com/kr/app/whynothere/id1665014097')
      } else if (type === 'playstore') {
        window.open(
          'https://play.google.com/store/apps/details?id=com.sangjin.whynot'
        )
      }
    },

    async getApplicantTotalCnt() {
      await this.$axios
        .get(`${process.env.apiUrl}/v2/blind-date/total-cnt?season=2`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          this.totalCount = res.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/g-blind-date/intro.scss';
</style>
