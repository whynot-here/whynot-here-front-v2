<template>
  <div v-if="isLoaded" id="ApplyPage">
    <div class="top">
      <div class="side" @click="moveGraduateApplyIntroPage(type)">
        <img src="@/assets/img/common/left-arrow-black.png" alt="" />
      </div>
      <div class="title">상대 정보 입력</div>
      <div class="side" />
    </div>
    <div v-if="type === 'date'" class="proceed">
      <div class="info">
        <div class="stage-text">{{ curStage }}/4</div>
        <div class="title">{{ curStageInfoDate[curStage - 1].title }}</div>
      </div>
      <div class="stage-img">
        <img :src="curStageInfoDate[curStage - 1].imgUrl" alt="" />
      </div>
    </div>
    <div v-if="curStage !== 4" class="notice">
      <div class="notice-wrp">
        <div class="left">
          <img src="@/assets/img/common/notice-purple.png" alt="" />
        </div>
        <div>
          필수 요건 체크를 하면 매칭 시 해당 질문은 매칭 시 우선 요소로
          적용됩니다.
        </div>
      </div>
    </div>
    <div v-if="curStage === 4" class="notice-kakao">
      <div>
        카카오톡 오픈 채팅방을 개설해서 링크를 넣어주세요. 본 링크는 상대방만 볼
        수 있습니다. <br />
        <strong>비밀번호는 생성하지 말아주세요.</strong>
      </div>
    </div>
    <section class="content" style="height: calc(100vh - 260px)">
      <section v-if="curStage === 1" class="form">
        <div class="stage_01_top">
          <div class="content_01">
            <div class="sub-title">
              선호하는 상대방의 나이대를 알려주세요 <strong>*</strong>
              <div class="must-matching-condition">
                <div class="icon">
                  <img
                    v-if="applyParams.favoriteAgeImportant"
                    src="@/assets/img/common/check-box-purple-selected.png"
                    alt=""
                    @click="applyParams.favoriteAgeImportant = false"
                  />
                  <img
                    v-else
                    src="@/assets/img/common/check-box-purple-unselected.png"
                    alt=""
                    @click="applyParams.favoriteAgeImportant = true"
                  />
                </div>
                <div>매칭 필수 요소</div>
              </div>
            </div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.favoriteAge === 'NO_MATTER'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="
                  ;[
                    (applyParams.favoriteAge = 'NO_MATTER'),
                    checkIsNextActive(1)
                  ]
                "
              >
                상관없음
              </div>
              <div
                :class="
                  applyParams.favoriteAge === 'SAME'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="
                  ;[(applyParams.favoriteAge = 'SAME'), checkIsNextActive(1)]
                "
              >
                동갑
              </div>
            </div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.favoriteAge === 'UP'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="
                  ;[(applyParams.favoriteAge = 'UP'), checkIsNextActive(1)]
                "
              >
                연상
              </div>
              <div
                :class="
                  applyParams.favoriteAge === 'DOWN'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="
                  ;[(applyParams.favoriteAge = 'DOWN'), checkIsNextActive(1)]
                "
              >
                연하
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-if="curStage === 2" class="form">
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">
              선호하는 상대방의 신장을 알려주세요
              <strong>*</strong>
              <div class="must-matching-condition">
                <div class="icon">
                  <img
                    v-if="applyParams.favoriteHeightImportant"
                    src="@/assets/img/common/check-box-purple-selected.png"
                    alt=""
                    @click="applyParams.favoriteHeightImportant = false"
                  />
                  <img
                    v-else
                    src="@/assets/img/common/check-box-purple-unselected.png"
                    alt=""
                    @click="applyParams.favoriteHeightImportant = true"
                  />
                </div>
                <div>매칭 필수 요소</div>
              </div>
            </div>
            <DropdownBankName
              ref="dropdown"
              :label-first="dropdownLabel"
              :dropdown-type="'신장'"
              @get-label="selectOtherHeight"
            />
          </div>
        </div>
      </section>
      <section v-if="curStage === 3" class="form">
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">
              흡연 여부 <strong>*</strong>
              <div class="must-matching-condition">
                <div class="icon">
                  <img
                    v-if="applyParams.favoriteSmokeImportant"
                    src="@/assets/img/common/check-box-purple-selected.png"
                    alt=""
                    @click="
                      ;[
                        (applyParams.favoriteSmokeImportant = false),
                        checkIsNextActive(3)
                      ]
                    "
                  />
                  <img
                    v-else
                    src="@/assets/img/common/check-box-purple-unselected.png"
                    alt=""
                    @click="
                      ;[
                        (applyParams.favoriteSmokeImportant = true),
                        checkIsNextActive(3)
                      ]
                    "
                  />
                </div>
                <div>매칭 필수 요소</div>
              </div>
            </div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.favoriteSmoke === 'N'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="
                  ;[(applyParams.favoriteSmoke = 'N'), checkIsNextActive(3)]
                "
              >
                비흡연
              </div>
              <div
                :class="
                  applyParams.favoriteSmoke === 'Y'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="
                  ;[(applyParams.favoriteSmoke = 'Y'), checkIsNextActive(3)]
                "
              >
                흡연
              </div>
            </div>
          </div>
          <div class="content_01">
            <div class="sub-title">
              종교 <strong>*</strong>
              <div class="must-matching-condition">
                <div class="icon">
                  <img
                    v-if="applyParams.favoriteDrinkImportant"
                    src="@/assets/img/common/check-box-purple-selected.png"
                    alt=""
                    @click="applyParams.favoriteDrinkImportant = false"
                  />
                  <img
                    v-else
                    src="@/assets/img/common/check-box-purple-unselected.png"
                    alt=""
                    @click="applyParams.favoriteDrinkImportant = true"
                  />
                </div>
                <div>매칭 필수 요소</div>
              </div>
            </div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.favoriteFaith === 'NO_MATTER'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="
                  ;[
                    (applyParams.favoriteFaith = 'NO_MATTER'),
                    checkIsNextActive(3)
                  ]
                "
              >
                상관없음
              </div>
              <div
                :class="
                  applyParams.favoriteFaith === 'CHRISTIAN'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="
                  ;[
                    (applyParams.favoriteFaith = 'CHRISTIAN'),
                    checkIsNextActive(3)
                  ]
                "
              >
                기독교
              </div>
            </div>
          </div>
          <div class="content_01">
            <div class="sub-title">음주 여부 <strong>*</strong></div>
            <div class="round-btn-select-wrp">
              <div
                v-for="(item, key) in alcohol"
                :key="key"
                :class="
                  applyParams.favoriteDrink === item.code
                    ? 'button selected'
                    : 'button'
                "
                @click="
                  ;[
                    (applyParams.favoriteDrink = item.code),
                    checkIsNextActive(3)
                  ]
                "
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="content_01">
            <div class="sub-title">장거리 <strong>*</strong></div>
            <div class="round-btn-select-wrp">
              <div
                v-for="(item, key) in distance"
                :key="key"
                :class="
                  applyParams.favoriteLocation === item.code
                    ? 'button selected'
                    : 'button'
                "
                @click="
                  ;[
                    (applyParams.favoriteLocation = item.code),
                    checkIsNextActive(3)
                  ]
                "
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="content_01">
            <div class="sub-title">
              상대에게 하고싶은 말이 있다면?
              <strong class="gray">(200자 이내)</strong>
            </div>
            <textarea
              v-model="applyParams.commentForMate"
              class="input-long textarea"
              placeholder="상대에게 하고싶은 말을 적어주세요"
              maxlength="255"
            />
          </div>
        </div>
      </section>
      <section v-if="curStage === 4" class="form">
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">
              오픈 카카오 링크
              <strong class="gray">(ex) https://open.kakao.com/o/abcde</strong>
              <strong>*</strong>
            </div>
            <input
              v-model="applyParams.kakaoLink"
              class="input-long"
              type="text"
              placeholder="ex) URL"
              @keyup="checkIsNextActive(4)"
            />
            <div class="sub-title">
              운영진에게 하고싶은 말이 있다면?
              <strong class="gray">(200자 이내)</strong>
            </div>
            <textarea
              v-model="applyParams.commentForAdmin"
              class="input-long textarea"
              placeholder="개선사항이나 문의하고 싶은 내용 작성"
              maxlength="255"
            />
          </div>
        </div>
      </section>
      <section
        v-if="type === 'date'"
        v-show="curStage >= 1 || curStage <= 4"
        class="btn-wrp"
      >
        <div v-show="curStage !== 1" class="prev" @click="changeStage(-1)">
          이전
        </div>
        <div
          :class="isNextActive ? 'next active' : 'next'"
          @click="isNextActive ? changeStage(1) : ''"
        >
          {{ curStage === 4 ? '저장' : '다음' }}
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import DropdownBankName from '@/components/blind-date/dropdownBankName'

export default {
  name: 'ApplyOtherInfoPage',
  components: { DropdownBankName },
  asyncData({ params, route, query, redirect }) {
    return {
      // type: route.params.type
      type: 'date'
    }
  },
  data() {
    return {
      isLoaded: false,
      curStage: 1,
      curStageInfoDate: [
        {
          id: 1,
          title: '상대 나이대 선택',
          imgUrl: require('@/assets/img/blind-date/stage_1.png')
        },
        {
          id: 2,
          title: '상대 키 선택',
          imgUrl: require('@/assets/img/blind-date/stage_2.png')
        },
        {
          id: 3,
          title: '상대 필수 정보',
          imgUrl: require('@/assets/img/blind-date/stage_4.png')
        },
        {
          id: 4,
          title: '마지막으로, 오픈 카카오 링크 입력',
          imgUrl: require('@/assets/img/blind-date/stage_5.png')
        }
      ],
      alcohol: [
        { id: 1, name: '안 마셨으면 좋겠어요', code: 'NEVER' },
        { id: 2, name: '가끔', code: 'SOMETIMES' },
        { id: 3, name: '일주일에 1~2번', code: 'ONETWO_OF_WEEK' },
        { id: 4, name: '일주일에 5번 이상', code: 'FIVE_OF_WEEK' }
      ],
      distance: [
        { id: 1, name: '괜찮아요', code: 'LONG_OK' },
        { id: 2, name: '싫어요', code: 'LONG_NO' }
      ],
      isAddBtnActive: true,
      isNextActive: false,
      isShow: false,
      inputImg: [],
      files: [],
      isImgUploadEnough: false,
      dropdownLabel: '신장',
      isFinalStepSubmit: false
    }
  },
  mounted() {
    // this.submit()
    this.isNextActive = this.curStage === 1 || this.curStage === 3

    // 지원서 작성 중간에 수정하는 경우
    this.$axios
      .get(`${process.env.apiUrl}/v2/blind-date/my-apply?season=2`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$store.state.userInfo.token
        }
      })
      .then((res) => {
        if (this.type === 'date') {
          this.curStage =
            this.curStageInfoDate.length > res.data.favoriteStep + 1
              ? res.data.favoriteStep + 1
              : res.data.favoriteStep
        }
        this.cmn_setApplyParams(res.data)

        this.checkIsNextActive(this.curStage)

        if (this.applyParams.favoriteStep === 4) {
          this.isFinalStepSubmit = true
        }
        this.isLoaded = true
      })
  },
  methods: {
    selectOtherHeight(item) {
      this.applyParams.favoriteHeight = item.name
      this.checkIsNextActive(2)
    },
    checkIsNextActive(stage) {
      if (stage === 1) {
        this.isNextActive = this.applyParams.favoriteAge.length > 0
      }
      if (stage === 2) {
        if (this.type === 'date') {
          this.isNextActive = this.applyParams.favoriteHeight.length > 0
        }
      } else if (stage === 3) {
        if (this.type === 'date') {
          this.isNextActive =
            this.applyParams.favoriteSmoke.length > 0 &&
            this.applyParams.favoriteFaith.length > 0 &&
            this.applyParams.favoriteDrink.length > 0 &&
            this.applyParams.favoriteLocation.length > 0
        } else {
          this.isNextActive = this.applyParams.kakaoLink.length > 0
        }
      } else if (stage === 4) {
        this.isNextActive =
          this.applyParams.kakaoLink.length > 5 &&
          this.applyParams.kakaoLink.substring(0, 5) === 'https'
      }
    },
    changeStage(addNum) {
      console.log(this.curStage)
      if (!this.isFinalStepSubmit) {
        this.applyParams.favoriteStep = this.curStage // 지금 단계 저장
      } else {
        this.applyParams.favoriteStep = 4
      }

      if (addNum === 1) {
        this.submit()
      }

      if (this.curStage < 4) {
        this.curStage += addNum
        this.checkIsNextActive(this.curStage)
      } else if (this.curStage === 4 && addNum === 1) {
        setTimeout(() => {
          this.moveGraduateApplyIntroPage(this.type)
        }, 200)
      } else if (this.curStage === 4 && addNum === -1) {
        this.curStage += addNum
        this.checkIsNextActive(this.curStage)
      }

      this.$nextTick(() => {
        if (this.$refs.dropdown !== undefined) {
          const heightItem = this.heightList.filter((item) => {
            return item.heightName === this.applyParams.favoriteHeight
          })[0]
          if (heightItem !== undefined) {
            this.$refs.dropdown.$el.querySelector(`.신장`).innerHTML =
              heightItem.heightName + ''
            this.$refs.dropdown.parentId = heightItem.heightId
          }
        }
      })
    },
    submit() {
      this.$axios
        .put(`${process.env.apiUrl}/v2/blind-date`, this.applyParams, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          // if (this.curStage === 4) {
          //   this.isFinalStepSubmit = true
          // }
        })
        .catch((error) => {
          window.alert(error.response.data.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/apply.scss';
</style>
