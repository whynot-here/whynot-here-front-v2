<template>
  <div id="ApplyPage">
    <div class="top">
      <div class="side" @click="$router.go(-1)">
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
    <section class="content" style="height: calc(100vh - 265px)">
      <section v-if="curStage === 1" class="form">
        <div class="stage_01_top">
          <div class="content_01">
            <div class="sub-title">
              선호하는 상대방의 나이대를 알려주세요 <strong>*</strong>
              <div class="must-matching-condition">
                <div class="icon">
                  <img
                    v-if="applyParams.mustMatchingCondition[0].value === 'Y'"
                    src="@/assets/img/common/check-box-purple-selected.png"
                    alt=""
                    @click="applyParams.mustMatchingCondition[0].value = 'N'"
                  />
                  <img
                    v-else
                    src="@/assets/img/common/check-box-purple-unselected.png"
                    alt=""
                    @click="applyParams.mustMatchingCondition[0].value = 'Y'"
                  />
                </div>
                <div>매칭 필수 요소</div>
              </div>
            </div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.otherAge === 'NO_MATTER'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.otherAge = 'NO_MATTER'"
              >
                상관없음
              </div>
              <div
                :class="
                  applyParams.otherAge === 'SAME'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.otherAge = 'SAME'"
              >
                동갑
              </div>
            </div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.otherAge === 'UP'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.otherAge = 'UP'"
              >
                연상
              </div>
              <div
                :class="
                  applyParams.otherAge === 'DOWN'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.otherAge = 'DOWN'"
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
                    v-if="applyParams.mustMatchingCondition[1].value === 'Y'"
                    src="@/assets/img/common/check-box-purple-selected.png"
                    alt=""
                    @click="applyParams.mustMatchingCondition[1].value = 'N'"
                  />
                  <img
                    v-else
                    src="@/assets/img/common/check-box-purple-unselected.png"
                    alt=""
                    @click="applyParams.mustMatchingCondition[1].value = 'Y'"
                  />
                </div>
                <div>매칭 필수 요소</div>
              </div>
            </div>
            <DropdownBankName
              ref="DropdownBankName"
              :label-first="'신장'"
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
                    v-if="applyParams.mustMatchingCondition[2].value === 'Y'"
                    src="@/assets/img/common/check-box-purple-selected.png"
                    alt=""
                    @click="applyParams.mustMatchingCondition[2].value = 'N'"
                  />
                  <img
                    v-else
                    src="@/assets/img/common/check-box-purple-unselected.png"
                    alt=""
                    @click="applyParams.mustMatchingCondition[2].value = 'Y'"
                  />
                </div>
                <div>매칭 필수 요소</div>
              </div>
            </div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.otherSmoke === 'N'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.otherSmoke = 'N'"
              >
                비흡연
              </div>
              <div
                :class="
                  applyParams.otherSmoke === 'Y'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.otherSmoke = 'Y'"
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
                    v-if="applyParams.mustMatchingCondition[3].value === 'Y'"
                    src="@/assets/img/common/check-box-purple-selected.png"
                    alt=""
                    @click="applyParams.mustMatchingCondition[3].value = 'N'"
                  />
                  <img
                    v-else
                    src="@/assets/img/common/check-box-purple-unselected.png"
                    alt=""
                    @click="applyParams.mustMatchingCondition[3].value = 'Y'"
                  />
                </div>
                <div>매칭 필수 요소</div>
              </div>
            </div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.otherFaith === 'NO_MATTER'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.otherFaith = 'NO_MATTER'"
              >
                상관없음
              </div>
              <div
                :class="
                  applyParams.otherFaith === 'CHRISTIAN'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.otherFaith = 'CHRISTIAN'"
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
                  applyParams.otherAlcohol === item.id
                    ? 'button selected'
                    : 'button'
                "
                @click="applyParams.otherAlcohol = item.id"
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
                  applyParams.distance === item.id
                    ? 'button selected'
                    : 'button'
                "
                @click="applyParams.distance = item.id"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="content_01">
            <div class="sub-title">상대에게 하고싶은 말이 있다면?</div>
            <textarea
              v-model="applyParams.comment"
              class="input-long textarea"
              placeholder="상대에게 하고싶은 말을 적어주세요"
            />
          </div>
        </div>
      </section>
      <section v-if="curStage === 4" class="form">
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">오픈 카카오 링크 <strong>*</strong></div>
            <input
              v-model="applyParams.kakaoLink"
              class="input-long"
              type="text"
              placeholder="ex) URL"
              @keyup="checkIsNextActive(4)"
            />
            <div class="sub-title">운영진에게 하고싶은 말이 있다면?</div>
            <textarea
              v-model="applyParams.inquiry"
              class="input-long textarea"
              placeholder="개선사항이나 문의하고 싶은 내용 작성"
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
      type: route.params.type
    }
  },
  data() {
    return {
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
      applyParams: {
        season: 1,
        name: '',
        gender: 'M',
        myAge: '',
        otherAge: 'NO_MATTER',
        major: '',
        height: '',
        otherHeight: '',
        favoriteAge: 'NO_MATTER',
        dateStyle: [],
        hobby: [],
        hobbyEtc: '',
        faith: 'NO_MATTER',
        otherFaith: 'NO_MATTER',
        smoke: 'N',
        otherSmoke: 'N',
        alcohol: 1,
        otherAlcohol: 1,
        distance: 1,
        address: 'DORMITORY',
        contactStyle: 1,
        personality: [],
        mbti_01: 'E',
        mbti_02: 'S',
        mbti_03: 'T',
        mbti_04: 'J',
        comment: '',
        kakaoLink: '',
        inquiry: '',
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
          },
          {
            isShow: false,
            name: '',
            department: '',
            studentId: ''
          }
        ],
        mustMatchingCondition: [
          {
            id: 1,
            value: 'Y'
          },
          {
            id: 2,
            value: 'Y'
          },
          {
            id: 3,
            value: 'Y'
          },
          {
            id: 4,
            value: 'Y'
          },
          {
            id: 5,
            value: 'Y'
          },
          {
            id: 6,
            value: 'Y'
          }
        ]
      },
      alcohol: [
        { id: 1, name: '안 마셨으면 좋겠어요' },
        { id: 2, name: '가끔' },
        { id: 3, name: '일주일에 1~2번' },
        { id: 4, name: '일주일에 5번 이상' }
      ],
      distance: [
        { id: 1, name: '괜찮아요' },
        { id: 2, name: '싫어요' }
      ],
      isAddBtnActive: true,
      isNextActive: false,
      isShow: false,
      inputImg: [],
      files: [],
      isImgUploadEnough: false
    }
  },
  mounted() {
    this.isNextActive = this.curStage === 1 || this.curStage === 3
  },
  methods: {
    selectOtherHeight(item) {
      this.applyParams.otherHeight = item.name
      this.checkIsNextActive(2)
    },
    checkIsNextActive(stage) {
      if (stage === 2) {
        if (this.type === 'date') {
          this.isNextActive = this.applyParams.otherHeight.length > 0
        }
      } else if (stage === 3) {
        if (this.type === 'date') {
          this.isNextActive =
            this.applyParams.otherSmoke.length > 0 &&
            this.applyParams.otherFaith.length > 0 &&
            this.applyParams.otherAlcohol > 0 &&
            this.applyParams.distance > 0
        } else {
          this.isNextActive = this.applyParams.kakaoLink.length > 0
        }
      } else if (stage === 4) {
        this.isNextActive = this.applyParams.kakaoLink.length > 0
      }
    },
    changeStage(addNum) {
      if (this.curStage === 5 && addNum === 1 && this.type === 'date') {
        this.submit()
      } else if (
        this.curStage === 3 &&
        addNum === 1 &&
        this.type === 'friend'
      ) {
        this.submit()
      } else {
        this.curStage += addNum
        this.isNextActive = this.curStage === 5
        this.checkIsNextActive(this.curStage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/apply.scss';
</style>
