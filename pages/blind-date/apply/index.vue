<template>
  <div v-if="isShow" id="ApplyPage">
    <section v-show="curStage === 1">
      <div class="percent">
        <img src="@/assets/img/blind-date/percent_20.png" alt="" />
      </div>
      <div class="title">Q1. 이름/성별 입력</div>
      <div class="content_01">
        <div class="sub-title">본인의 이름을 입력해주세요</div>
        <input
          v-model="applyParams.name"
          class="input-long"
          type="text"
          @keyup="checkIsNextActive(1)"
        />
      </div>
      <div class="content_01">
        <div>당신의 성별은 무엇인가요?</div>
        <div class="btn-select-wrp">
          <div
            :class="
              applyParams.gender === 'M'
                ? 'button-half selected'
                : 'button-half'
            "
            @click="applyParams.gender = 'M'"
          >
            남성
          </div>
          <div
            :class="
              applyParams.gender === 'F'
                ? 'button-half selected'
                : 'button-half'
            "
            @click="applyParams.gender = 'F'"
          >
            여성
          </div>
        </div>
      </div>
    </section>
    <section v-show="curStage === 2">
      <div class="percent">
        <img src="@/assets/img/blind-date/percent_30.png" alt="" />
      </div>
      <div class="title">Q2. 나이 입력</div>
      <div class="content_01">
        <div class="sub-title">본인의 나이를 입력해주세요 (숫자만)</div>
        <input
          v-model="applyParams.myAge"
          class="input-long"
          type="text"
          oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
          @keyup="checkIsNextActive(2)"
        />
      </div>
      <div class="content_01">
        <div>선호하는 상대방의 나이대를 알려주세요</div>
        <div class="btn-select-wrp">
          <div
            :class="
              applyParams.favoriteAge === 'NO_MATTER'
                ? 'button-half selected'
                : 'button-half'
            "
            @click="applyParams.favoriteAge = 'NO_MATTER'"
          >
            상관없음
          </div>
          <div
            :class="
              applyParams.favoriteAge === 'UP'
                ? 'button-half selected'
                : 'button-half'
            "
            @click="applyParams.favoriteAge = 'UP'"
          >
            연상
          </div>
          <div
            :class="
              applyParams.favoriteAge === 'DOWN'
                ? 'button-half selected'
                : 'button-half'
            "
            @click="applyParams.favoriteAge = 'DOWN'"
          >
            연하
          </div>
        </div>
      </div>
    </section>
    <section v-show="curStage === 3">
      <div class="percent">
        <img src="@/assets/img/blind-date/percent_40.png" alt="" />
      </div>
      <div class="title">Q3. 연애 스타일</div>
      <div class="content_01">
        <div class="sub-title">당신의 연애 스타일은 무엇인가요?</div>
        <div v-for="(item, idx) in dateStyle" :key="idx">
          <div
            :class="
              applyParams.dateStyle === item.id
                ? 'radio-long selected'
                : 'radio-long'
            "
            @click="applyParams.dateStyle = item.id"
          >
            <div class="radio">
              <img
                :src="
                  applyParams.dateStyle === item.id
                    ? require('@/assets/img/blind-date/selected.png')
                    : require('@/assets/img/blind-date/unselected.png')
                "
                alt=""
              />
            </div>
            <div class="item-name">{{ item.name }}</div>
            <div><img :src="item.url" alt="" /></div>
          </div>
        </div>
      </div>
    </section>
    <section v-show="curStage === 4">
      <div class="percent">
        <img src="@/assets/img/blind-date/percent_50.png" alt="" />
      </div>
      <div class="title">Q4. 취미 정보</div>
      <div class="content_01">
        <div class="sub-title">활동적인 취미가 많으신가요?</div>
        <div v-for="(item, idx) in hobby" :key="idx">
          <div
            :class="
              applyParams.hobby === item.id
                ? 'radio-long selected'
                : 'radio-long'
            "
            @click="applyParams.hobby = item.id"
          >
            <div class="radio">
              <img
                :src="
                  applyParams.hobby === item.id
                    ? require('@/assets/img/blind-date/selected.png')
                    : require('@/assets/img/blind-date/unselected.png')
                "
                alt=""
              />
            </div>
            <div class="item-name">{{ item.name }}</div>
            <div><img :src="item.url" alt="" /></div>
          </div>
        </div>
      </div>
    </section>
    <section v-show="curStage === 5">
      <div class="percent">
        <img src="@/assets/img/blind-date/percent_60.png" alt="" />
      </div>
      <div class="title">Q5. 종교관</div>
      <div class="content_01">
        <div class="sub-title">종교관에 대해 소개해주세요</div>
        <div v-for="(item, idx) in faith" :key="idx">
          <div
            :class="
              applyParams.faith === item.id
                ? 'radio-long selected'
                : 'radio-long'
            "
            @click="applyParams.faith = item.id"
          >
            <div class="radio">
              <img
                :src="
                  applyParams.faith === item.id
                    ? require('@/assets/img/blind-date/selected.png')
                    : require('@/assets/img/blind-date/unselected.png')
                "
                alt=""
              />
            </div>
            <div class="item-name">{{ item.name }}</div>
            <div><img :src="item.url" alt="" /></div>
          </div>
        </div>
      </div>
    </section>
    <section v-show="curStage === 6">
      <div class="percent">
        <img src="@/assets/img/blind-date/percent_80.png" alt="" />
      </div>
      <div class="title">
        Q6. 추가정보 입력
        <div class="desc">
          상대방이 학우님을 파악하는데 도움이 되어 <br />
          매칭률이 올라가요!
        </div>
      </div>
      <div class="content_01">
        <div class="sub-title">1. 당신의 mbti는? <strong>(필수)</strong></div>
        <div class="btn-select-multi-wrp">
          <div class="btn-select-wrp">
            <div
              :class="
                applyParams.mbti_01 === 'E'
                  ? 'button-half selected'
                  : 'button-half'
              "
              @click="applyParams.mbti_01 = 'E'"
            >
              E
            </div>
            <div
              :class="
                applyParams.mbti_01 === 'I'
                  ? 'button-half selected'
                  : 'button-half'
              "
              @click="applyParams.mbti_01 = 'I'"
            >
              I
            </div>
          </div>
          <div class="btn-select-wrp">
            <div
              :class="
                applyParams.mbti_02 === 'S'
                  ? 'button-half selected'
                  : 'button-half'
              "
              @click="applyParams.mbti_02 = 'S'"
            >
              S
            </div>
            <div
              :class="
                applyParams.mbti_02 === 'N'
                  ? 'button-half selected'
                  : 'button-half'
              "
              @click="applyParams.mbti_02 = 'N'"
            >
              N
            </div>
          </div>
          <div class="btn-select-wrp">
            <div
              :class="
                applyParams.mbti_03 === 'T'
                  ? 'button-half selected'
                  : 'button-half'
              "
              @click="applyParams.mbti_03 = 'T'"
            >
              T
            </div>
            <div
              :class="
                applyParams.mbti_03 === 'F'
                  ? 'button-half selected'
                  : 'button-half'
              "
              @click="applyParams.mbti_03 = 'F'"
            >
              F
            </div>
          </div>
          <div class="btn-select-wrp">
            <div
              :class="
                applyParams.mbti_04 === 'J'
                  ? 'button-half selected'
                  : 'button-half'
              "
              @click="applyParams.mbti_04 = 'J'"
            >
              J
            </div>
            <div
              :class="
                applyParams.mbti_04 === 'P'
                  ? 'button-half selected'
                  : 'button-half'
              "
              @click="applyParams.mbti_04 = 'P'"
            >
              P
            </div>
          </div>
        </div>
      </div>
      <div class="content_01">
        <div>2. 흡연을 하시나요? <strong>(필수)</strong></div>
        <div class="btn-select-wrp">
          <div
            :class="
              applyParams.smoke === 'Y' ? 'button-half selected' : 'button-half'
            "
            @click="applyParams.smoke = 'Y'"
          >
            네
          </div>
          <div
            :class="
              applyParams.smoke === 'N' ? 'button-half selected' : 'button-half'
            "
            @click="applyParams.smoke = 'N'"
          >
            아니오
          </div>
        </div>
      </div>
      <div class="content_01">
        <div class="sub-title">
          3. 혹시 정말 만나고 싶지 않은 사람이 있다면?
        </div>
        <div v-for="(item, idx) in applyParams.excludeCondList" :key="idx">
          <div v-if="item.isShow">
            <input
              v-model="item.name"
              class="input-long"
              placeholder="이름"
              type="text"
            />
            <div style="width: 100%" class="btn-select-wrp">
              <input
                v-model="item.department"
                class="input-half"
                placeholder="학과"
                type="text"
              />
              <input
                v-model="item.studentId"
                class="input-half"
                placeholder="학번"
                type="text"
              />
            </div>
          </div>
        </div>
        <div v-if="isAddBtnActive" class="add-btn">
          <img
            src="@/assets/img/blind-date/add-btn.png"
            alt=""
            @click="addAvoid()"
          />
        </div>
      </div>
      <div class="content_01">
        <div class="sub-title">4. 마지막으로 상대에게 하고픈 말이 있다면?</div>
        <textarea
          v-model="applyParams.comment"
          class="send-to"
          @keyup="checkIsNextActive(1)"
        />
      </div>
    </section>
    <section v-show="curStage === 7">
      <div class="percent">
        <img src="@/assets/img/blind-date/percent_100.png" alt="" />
      </div>
      <div class="title">마지막으로, 오픈카카오 링크 입력</div>
      <div class="content_01">
        <div class="sub-title">오픈카카오 링크</div>
        <input
          v-model="applyParams.kakaoLink"
          class="input-long"
          type="text"
          placeholder="url"
          @keyup="checkIsNextActive(7)"
        />
      </div>
    </section>
    <section v-show="curStage >= 1 || curStage <= 7" class="next-prev-btn">
      <div v-show="curStage !== 1" class="prev" @click="changeStage(-1)">
        이전
      </div>
      <div
        :class="isNextActive ? 'next active' : 'next'"
        @click="isNextActive ? changeStage(1) : ''"
      >
        {{ curStage === 7 ? '제출' : '다음' }}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ApplyPage',
  components: {},
  data() {
    return {
      curStage: 1,
      applyParams: {
        season: 1,
        name: '',
        gender: 'M',
        myAge: '',
        favoriteAge: 'NO_MATTER',
        dateStyle: 'CAFE',
        hobby: 'HOME',
        faith: 'NO_MATTER',
        smoke: 'N',
        mbti_01: 'E',
        mbti_02: 'S',
        mbti_03: 'T',
        mbti_04: 'J',
        comment: '',
        kakaoLink: '',
        excludeCondList: [
          {
            isShow: true,
            name: '',
            department: '',
            studentId: ''
          },
          {
            isShow: false,
            name: '',
            department: '',
            studentId: ''
          },
          {
            isShow: false,
            name: '',
            department: '',
            studentId: ''
          }
        ]
      },
      dateStyle: [
        {
          id: 'CAFE',
          name: '카페 데이트',
          url: require('@/assets/img/blind-date/cafe.png')
        },
        {
          id: 'HEALTH',
          name: '방탈출, 헬스장 데이트',
          url: require('@/assets/img/blind-date/exercise.png')
        },
        {
          id: 'WALK',
          name: '산책, 걷기 데이트',
          url: require('@/assets/img/blind-date/jogging.png')
        }
      ],
      hobby: [
        {
          id: 'HOME',
          name: '나는 집이 좋은 집돌이, 집순이',
          url: require('@/assets/img/blind-date/home.png')
        },
        {
          id: 'OUTSIDE',
          name: '주말 바깥 공기 필수!',
          url: require('@/assets/img/blind-date/exercise.png')
        }
      ],
      faith: [
        {
          id: 'NO_MATTER',
          name: '상관없어요',
          url: require('@/assets/img/blind-date/heart.png')
        },
        {
          id: 'CHRISTIAN',
          name: '기독교이신 분과만 매칭을 원해요',
          url: require('@/assets/img/blind-date/christian.png')
        }
      ],
      isAddBtnActive: true,
      isNextActive: false,
      isShow: false
    }
  },
  watch: {},
  mounted() {
    // 한대소 시즌 기간인 경우
    this.getAuthState()
    // 한대소 시즌 마감인 경우
    // this.cmn_goMainPage()
  },
  methods: {
    // 학생증 인증 여부
    async getAuthState() {
      await this.cmn_getUserInfo(this.$store.state.userInfo.token)
      if (this.$store.state.userInfo.detail.roles.includes('ROLE_USER')) {
        // 학생증 인증 O
        this.blindDateParticipation()
      } else {
        // 학생증 인증 X
        this.$router.push('/blind-date')
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
          if (res.data) {
            // 이미 참여한 경우
            this.$router.push('/blind-date/proceeding')
          } else {
            // 진입 가능
            this.isShow = true
          }
        })
    },
    checkIsNextActive(stage) {
      if (stage === 1) {
        this.isNextActive = this.applyParams.name.length > 0
      } else if (stage === 2) {
        this.isNextActive = this.applyParams.myAge.length > 0
      } else if (stage === 3 || stage === 4 || stage === 5 || stage === 6) {
        this.isNextActive = true
      } else if (stage === 7) {
        this.isNextActive = this.applyParams.kakaoLink.length > 0
      }
    },
    changeStage(addNum) {
      if (this.curStage === 7 && addNum === 1) {
        this.submit()
      } else {
        this.curStage += addNum
        this.isNextActive = false
        this.checkIsNextActive(this.curStage)
      }
    },
    submit() {
      if (!this.setSubmitParams()) {
        return false
      }

      this.$axios
        .post(`${process.env.apiUrl}/v2/blind-date`, this.applyParams, {
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
    },
    setSubmitParams() {
      if (!this.cmn_httpsCheck(this.applyParams.kakaoLink)) {
        return false
      }

      this.applyParams.mbti =
        this.applyParams.mbti_01 +
        this.applyParams.mbti_02 +
        this.applyParams.mbti_03 +
        this.applyParams.mbti_04

      delete this.applyParams.mbti_01
      delete this.applyParams.mbti_02
      delete this.applyParams.mbti_03
      delete this.applyParams.mbti_04

      this.applyParams.excludeCondList.map((item) => {
        return delete item.isShow
      })

      this.applyParams.excludeCondList =
        this.applyParams.excludeCondList.filter((item) => {
          return item.name !== ''
        })
      return true
    },
    addAvoid() {
      const idx = this.applyParams.excludeCondList.findIndex((item) => {
        return item.isShow === false
      })
      this.applyParams.excludeCondList[idx].isShow = true

      if (idx === 2) {
        this.isAddBtnActive = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#ApplyPage {
  width: 100vw;
  margin: 0 auto;
  .percent {
    width: 375px;
    height: 70px;
    margin: 0 auto;
    img {
      width: 375px;
    }
  }
  .title {
    padding: 24px 20px;
    margin-top: 20px;
    color: #061935;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    .desc {
      padding: 8px 0px;
      color: #414141;
      font-family: Pretendard;
      font-size: 13px;
      font-style: normal;
      font-weight: 300;
      line-height: 18px; /* 138.462% */
    }
  }
  .content_01 {
    padding: 20px 20px 40px 20px;
    strong {
      color: #e74133;
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
    }
    .sub-title {
      color: #061832;
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
    }
    .input-long {
      width: calc(100% - 20px);
      height: 44px;
      margin-top: 20px;
      flex-shrink: 0;
      border-radius: 6px;
      border: 1px solid #ececec;
      background: #fff;
      font-size: 14px;
      padding-left: 14px;
    }
    .input-long:focus,
    .send-to:focus {
      outline: 1px solid #7eb2ff;
    }
    .send-to {
      width: calc(100% - 35px);
      height: 146px;
      margin-top: 20px;
      flex-shrink: 0;
      border-radius: 6px;
      border: 1px solid #ececec;
      background: #fff;
      font-family: Pretendard;
      font-size: 14px;
      padding: 14px;
    }
    .btn-select-wrp {
      display: flex;
      flex-direction: row;
      gap: 13px;
      margin-top: 20px;
      .button-half {
        // width: 161px;
        flex-grow: 1;
        height: 44px;
        border-radius: 6px;
        background: #f5f5f5;
        flex-shrink: 0;
        color: #061832;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 44px;
        text-align: center;
      }
      .selected {
        border-radius: 6px;
        border: 1px solid #7eb2ff;
        background: #fff;
      }
      .input-half {
        width: 50%;
        height: 44px;
        border-radius: 6px;
        border: 1px solid #ececec;
        background: #fff;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        padding-left: 14px;
      }
    }
    .btn-select-multi-wrp {
      display: flex;
      flex-direction: row;
      gap: 42px;
      .btn-select-wrp {
        display: flex;
        flex-direction: column;
        gap: 12px;
        .button-half {
          width: 52px;
          height: 48px;
          border-radius: 6px;
          border: 1px solid #eee;
          background: #f9fafc;
          flex-shrink: 0;
          color: #5c6c82;
          font-family: Pretendard;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          line-height: 44px;
          text-align: center;
        }
        .selected {
          border-radius: 6px;
          border: 1px solid #7eb2ff;
          background: #fff;
          color: #061832;
          font-family: Pretendard;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
        }
      }
    }
    .radio-long {
      display: flex;
      height: 48px;
      border-radius: 6px;
      border: 1px solid #ececec;
      background: #fff;
      margin-top: 20px;
      line-height: 48px;
      .item-name {
        flex-grow: 1;
        color: #061832;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
      }
      .radio {
        img {
          margin: 18px 12px;
          width: 13px;
          height: 13px;
        }
      }
      img {
        width: 32px;
        height: 32px;
        margin: 8px 12px;
      }
    }
    .selected {
      border: 1px solid #7eb2ff;
    }
    .add-btn {
      width: 32px;
      margin: 20px auto 0 auto;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
  .next-prev-btn {
    padding: 20px 20px 40px 20px;
    display: flex;
    flex-direction: row;
    gap: 13px;
    .prev {
      flex-grow: 1;
      height: 48px;
      flex-shrink: 0;
      border-radius: 6px;
      background: #f3f5fb;
      color: #6254f0;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 48px;
      text-align: center;
    }
    .next {
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
    }
    .active {
      background: #6254f0;
    }
  }
}
</style>
