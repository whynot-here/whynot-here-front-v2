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
    <div class="notice">
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
    <section class="content">
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
          {{ curStage === 5 ? '저장' : '다음' }}
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
      curStage: 2,
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
        smoke: 'N',
        alcohol: 1,
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
      isAddBtnActive: true,
      isNextActive: false,
      isShow: false,
      inputImg: [],
      files: [],
      isImgUploadEnough: false
    }
  },
  mounted() {
    this.isNextActive = this.curStage === 1
  },
  methods: {
    selectOtherHeight(item) {
      this.applyParams.otherHeight = item.name
      this.checkIsNextActive(2)
    },
    checkIsNextActive(stage) {
      if (stage === 2) {
        // this.isNextActive = this.applyParams.height > 0
        if (this.type === 'date') {
          this.isNextActive = this.applyParams.otherHeight.length > 0
        } else {
          this.isNextActive =
            this.applyParams.smoke.length > 0 &&
            this.applyParams.faith.length > 0 &&
            this.applyParams.alcohol > 0 &&
            this.applyParams.address.length > 0 &&
            this.applyParams.hobby.length > 0
        }
      } else if (stage === 3) {
        if (this.type === 'date') {
          this.isNextActive =
            this.applyParams.smoke.length > 0 &&
            this.applyParams.faith.length > 0 &&
            this.applyParams.alcohol > 0 &&
            this.applyParams.address.length > 0 &&
            this.applyParams.hobby.length > 0
        } else {
          this.isNextActive = this.applyParams.kakaoLink.length > 0
        }
      } else if (stage === 4) {
        this.isNextActive =
          this.applyParams.personality.length > 0 &&
          this.applyParams.dateStyle.length > 0
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
