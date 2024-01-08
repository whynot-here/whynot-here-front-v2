<template>
  <div v-if="isShow" id="MatchingPage">
    <div v-if="isMatched" class="matchedScreen">
      <div class="m-close">
        <div>
          <img
            class="m-back-btn"
            src="@/assets/img/common/close-btn2.png"
            alt=""
            @click="$router.push('/')"
          />
        </div>
      </div>

      <div class="content-wrap">
        <div class="title">{{ matchingInfo.myName }} 님의 매칭상대</div>

        <div class="content">
          <div v-if="openImage" class="image-links">
            <div
              v-if="isNuxtReady"
              v-swiper:mySwiper="swiperOption"
              class="swiper-container"
            >
              <div class="swiper-wrapper">
                <div
                  v-for="(image, idx) in matchingInfo.imageLinks"
                  :key="idx"
                  class="swiper-slide"
                >
                  <div class="img">
                    <img class="img_src" :src="image" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>

          <div v-else class="image-lock">
            <div class="img">
              <img src="@/assets/img/blind-date/matching-lock.png" alt="" />
            </div>
            <div class="desc">사진 공개까지</div>
            <div class="timer">{{ TimerStr }}</div>
          </div>

          <div class="intro-wrap">
            <div class="name">
              {{ matchingInfo.name }}
            </div>
            <div class="base-info">
              {{ matchingInfo.myAge }}세 / {{ matchingInfo.myHeight }}cm /
              {{ matchingInfo.department }} 학과
            </div>
          </div>

          <div class="extra-info-container">
            <div class="block1-wrap">
              <div class="block purple">💨 {{ matchingInfo.smoke }}</div>
              <div class="block purple">⛪️ {{ matchingInfo.faith }}</div>
              <div class="block purple">🍷 술 {{ matchingInfo.myDrink }}</div>
              <div class="block purple">
                🏠 {{ matchingInfo.location }} 거주
              </div>
              <div class="block purple">
                💼 {{ matchingInfo.myJob }} ({{ matchingInfo.myJobDesc }})
              </div>
            </div>

            <div class="block2-wrap">
              <div
                v-for="(item, idx) in block2List"
                :key="idx"
                class="block gray"
              >
                {{ item }}
              </div>
            </div>

            <div class="hr"></div>

            <div class="comments">
              {{ matchingInfo.commentForMate }}
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="desc">
          <div class="">혹시 채팅방 입장 버튼 클릭이 안되시나요?</div>
          <div class="popup" @click.prevent="isOpenAskPopup = true">
            (앱/ 카카오)
          </div>
        </div>
        <div class="btn-list">
          <div
            class="rematch-btn"
            @click.prevent="isOpenRematchAskPopup = true"
          >
            재매칭 신청
          </div>
          <a
            :href="matchingInfo.kakaoLink"
            target="_blank"
            style="text-decoration: none"
          >
            <div class="kakao-btn">채팅방 입장</div>
          </a>
          <div
            class="accusation-btn"
            @click.prevent="isOpenAccusationPopup = true"
          >
            <img src="@/assets/img/blind-date/accusation-btn.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="unmatchedScreen">
      <div class="title-wrap">
        <div class="title">
          <p>아쉽지만 학우님과</p>
          <p>딱 맞는 매칭 상대를 찾지 못했어요 😥</p>
        </div>
      </div>
      <div class="sub-title">많이 기다려 주셨는데 죄송합니다.</div>

      <div class="matching-summary">
        <div class="row1">
          <div class="total-cnt box">
            <div class="info">총 참여 인원 수</div>
            <div class="cnt">249명</div>
          </div>
        </div>

        <div class="row2">
          <div class="ratio box">
            <div class="info">성비</div>
            <div class="cnt">
              <div class="male">남 134</div>
              <div class="female">여 115</div>
            </div>
          </div>

          <div class="matched-cnt box">
            <div class="info">매칭 성공</div>
            <div class="cnt">114팀</div>
          </div>
        </div>
      </div>

      <div class="setting">
        <div class="row1" @click.prevent="pushSelect">
          <div class="left">
            <div v-if="!isSelected">
              <img
                class="btn-img"
                src="@/assets/img/blind-date/ellipse-off.png"
                alt=""
              />
            </div>
            <div v-if="isSelected">
              <img
                class="btn-img"
                src="@/assets/img/blind-date/ellipse-on.png"
                alt=""
              />
            </div>
            <div class="text">다음한대소 알림받기</div>
          </div>
          <div class="right">
            <div v-if="isSelected">
              <img
                class="text-img"
                src="@/assets/img/blind-date/ellipse-on-text.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="row2" @click="openReviewModal = true">
          <div class="text">개선사항 / 문의하기</div>
          <div>
            <img
              class="img"
              src="@/assets/img/category/right-arrow.png"
              alt=""
            />
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
          @click.prevent="commit"
        >
          확인
        </a>
      </div>
    </div>

    <div
      v-if="isOpenAccusationPopup"
      class="accusation-popup"
      @click.self="isOpenAccusationPopup = false"
    >
      <div class="content-wrp">
        <div class="title">비매너 사용자 신고</div>
        <div v-for="(item, idx) in accusationList" :key="idx">
          <div class="select-wrp" @click="selectedAccusation = item.id">
            <div class="select-img">
              <img
                v-if="item.id * 1 != selectedAccusation * 1"
                src="@/assets/img/posting/accusation-unselected.png"
                alt=""
              />
              <img
                v-else
                src="@/assets/img/posting/accusation-selected.png"
                alt=""
              />
            </div>
            <div>{{ item.title }}</div>
          </div>
        </div>
        <div class="input-container">
          <textarea
            v-model="accusationReason"
            class="input-long"
            type="text"
            maxlength="300"
            placeholder="상세 내용을 입력해주세요"
          >
          </textarea>
        </div>
        <div class="btn-list">
          <div class="prev" @click="isOpenAccusationPopup = false">이전</div>
          <div class="next active" @click.prevent="submitAccusation()">
            확인
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isOpenAccusationCompletePopup"
      class="complete-popup"
      @click.self="isOpenAccusationCompletePopup = false"
    >
      <div class="content-wrp">
        <div class="top">
          <div>신고가 접수되었습니다.</div>
          <div>검토까지는 최대 24시간이 소요됩니다.</div>
        </div>
        <div class="btn" @click.self="isOpenAccusationCompletePopup = false">
          확인
        </div>
      </div>
    </div>

    <div
      v-if="isOpenAskPopup"
      class="ask-popup"
      @click.self="isOpenAskPopup = false"
    >
      <div class="content-wrp">
        <div class="top">
          <div>채팅방 입장이 안된다면,</div>
          <div>인스타 @wnh.crew</div>
          <div>DM으로 문의주세요!</div>
        </div>
        <div class="btn btn1">
          <a
            class="banner-admin-insta"
            href="https://instagram.com/wnh.crew?igshid=YmMyMTA2M2Y="
            target="_blank"
          >
            <div class="btn-content-wrp">
              <div>WNH 인스타로 이동</div>
            </div>
          </a>
        </div>
        <div class="btn btn2" @click.prevent="isOpenAskPopup = false">
          <div class="btn-content-wrp">
            <div>닫기</div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isOpenRematchAskPopup"
      class="rematch-ask-popup"
      @click.self="isOpenRematchAskPopup = false"
    >
      <div class="content-wrp">
        <div class="top">
          <div>현재 참여자 중 본인과</div>
          <div>가장 부합하는 참여자입니다.</div>
          <div>재매칭 신청을 하더라도 조건 미충족 또는</div>
          <div>
            인원 부족으로
            <span style="color: rgba(231, 65, 51, 1)"
              >매칭이 안될 수 있습니다.</span
            >
          </div>
          <div class="input-container">
            <textarea
              v-model="retryReason"
              class="input-long"
              type="text"
              maxlength="300"
              placeholder="상세 내용을 입력해주세요"
            >
            </textarea>
          </div>
        </div>
        <div class="btn-list">
          <div class="btn btn1" @click.prevent="isOpenRematchAskPopup = false">
            <div class="btn-content-wrp">
              <div>닫기</div>
            </div>
          </div>
          <div class="btn btn2" @click.prevent="requestRematch()">
            <div class="btn-content-wrp">
              <div>재매칭 신청 🥲</div>
            </div>
          </div>
        </div>
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
      openReviewModal: false,
      isNuxtReady: false,
      swiperOption: {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      block2List: [],
      isOpenAskPopup: false,
      isOpenRematchAskPopup: false,
      retryReason: '',
      isOpenAccusationPopup: false,
      accusationList: [
        {
          id: 1,
          title: '채팅방 들어오자마자 나감'
        },
        {
          id: 2,
          title: '음란물/불건전한 만남 및 대화'
        },
        {
          id: 3,
          title: '욕설/비하'
        }
      ],
      selectedAccusation: 1,
      accusationReason: '',
      isOpenAccusationCompletePopup: false,
      timer: null,
      openImage: false,
      TimeCounter: 180,
      TimerStr: ''
    }
  },
  async mounted() {
    this.isNuxtReady = true

    this.getMatchingResult()

    await this.getGraduateParticipationType().then((res) => {
      if (res === 'MATCH_OK' || res === 'MATCH_FAIL') {
        // 매칭 페이지 진입 조건은 맞지만, getMatchinReveal() 내부에서 isShow값 업데이트 필요.
      } else if (res === 'MATCH_REJECTED') {
        this.$router.push('/g-blind-date/rematching/other') // todo: 상대방이 재매칭을 요구한 경우 페이지 필요
      } else if (res === 'FAIL') {
        this.$router.push('/auth')
      } else {
        this.$router.push('/g-blind-date/intro')
      }
    })

    if (this.timer != null) {
      this.timerStop(this.timer)
      this.timer = null
    }
    this.timer = this.timerStart()
  },
  methods: {
    async getMatchinReveal() {
      await this.$axios
        .get(`${process.env.apiUrl}/v2/blind-date/reveal-result?season=2`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          if (res.data) {
            // 매칭 결과 오픈인 경우
            this.isShow = true
          } else {
            this.$router.push('/')
          }
        })
    },
    async getMatchingResult() {
      await this.$axios
        .get(`${process.env.apiUrl}/v2/blind-date/matching-result?season=2`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.getMatchinReveal()

          // 매칭이 된 경우
          this.matchingInfo = res.data
          this.block2List = this.block2List
            .concat(this.matchingInfo.hobbyList)
            .concat(this.matchingInfo.characterList)
            .concat(this.matchingInfo.dateStyle)
          this.block2List.push(this.matchingInfo.contactStyle)

          this.isMatched = true
        })
        .catch((_error) => {
          this.getMatchinReveal()

          // 매칭이 안 된 경우
          this.isMatched = false
        })
    },
    commit() {
      // push 알림 업데이트
      this.$axios.put(
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
      this.isSelected = !this.isSelected
    },

    updateModal() {
      this.openReviewModal = false
    },
    goToInsta() {
      window.open('about:blank').location.href =
        'https://instagram.com/wnh.crew?igshid=YmMyMTA2M2Y='
    },
    requestRematch() {
      this.$axios
        .put(
          `${process.env.apiUrl}/v2/blind-date/retry?season=2`,
          {
            reason: this.retryReason
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
        )
        .then(() => {
          this.$router.push('/g-blind-date/proceeding_02')
        })
    },
    submitAccusation() {
      this.$axios
        .put(
          `${process.env.apiUrl}/v2/blind-date/manners?season=2`,
          {
            reason: this.accusationList[this.selectedAccusation - 1].title,
            reasonDesc: this.accusationReason
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
        )
        .then(() => {
          this.isOpenAccusationCompletePopup = true
          this.$router.push('/g-blind-date/proceeding_02')
        })
    },
    timerStart() {
      const openDate = new Date('2024/01/08 21:30:00') // todo: 수정 필요
      const diff = openDate.getTime() - new Date().getTime()
      if (diff < 0) {
        this.openImage = true
        return
      }
      const interval = setInterval(() => {
        this.TimeCounter-- // 1초씩 감소
        this.TimerStr = this.prettyTime(openDate)
        if (this.TimeCounter <= 0) this.timerStop(interval)
      }, 1000)
      return interval
    },
    timerStop() {
      this.timer = null
      clearInterval(this.timer)
    },
    prettyTime(openDate) {
      const diff = openDate.getTime() - new Date().getTime()
      if (diff < 0) {
        this.openImage = true
        this.$router.go(0)
        return
      }
      return this.convertTime(diff)
    },
    convertTime(milliseconds) {
      let seconds = Math.floor(milliseconds / 1000)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)

      seconds = seconds % 60
      minutes = (minutes % 60) + 1

      hours = hours % 24

      return `${this.padTo2Digits(hours)}시간 ${this.padTo2Digits(minutes)}분`
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/matching.scss';
</style>
