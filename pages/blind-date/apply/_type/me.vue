<template>
  <div id="ApplyMyInfoPage">
    <div class="top">
      <div class="side" @click="$router.go(-1)">
        <img src="@/assets/img/common/left-arrow-black.png" alt="" />
      </div>
      <div class="title">본인 정보 입력</div>
      <div class="side" />
    </div>
    <div class="proceed">
      <div class="info">
        <div class="stage-text">1/5</div>
        <div class="title">본인 기본 정보 입력</div>
      </div>
      <div class="stage-img">
        <img src="@/assets/img/blind-date/stage_1.png" alt="" />
      </div>
    </div>
    <section v-if="type === 'date'" class="content">
      <section class="form">
        <div class="stage_01_top">
          <div class="content_01">
            <div class="sub-title">이름을 적어주세요 <strong>*</strong></div>
            <input
              v-model="applyParams.name"
              class="input-long"
              type="text"
              placeholder="ex) 김와이낫"
              @keyup="checkIsNextActive(1)"
            />
          </div>
          <div class="content_01">
            <div class="sub-title">
              나이를 적어주세요 <strong class="gray">(숫자만)</strong>
              <strong>*</strong>
            </div>
            <input
              v-model="applyParams.myAge"
              class="input-long"
              type="text"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
              placeholder="ex) 25"
              @keyup="checkIsNextActive(1)"
            />
          </div>
          <div class="content_01">
            <div class="sub-title">
              당신의 성별은 무엇인가요? <strong>*</strong>
            </div>
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
        </div>
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">
              본인 학부 선택
              <strong>*</strong>
            </div>
            <DropdownBankName
              ref="DropdownBankName"
              :label-first="'학부'"
              @get-label="selectBankName"
            />
          </div>
        </div>
      </section>
      <section v-show="curStage >= 1 || curStage <= 7" class="btn-wrp">
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
    </section>
    <section v-if="type === 'friend'"></section>
  </div>
</template>

<script>
import DropdownBankName from '@/components/blind-date/dropdownBankName'

export default {
  name: 'ApplyMyInfoPage',
  components: { DropdownBankName },
  asyncData({ params, route, query, redirect }) {
    return {
      type: route.params.type
    }
  },
  data() {
    return {
      curStage: 1,
      applyParams: {
        season: 1,
        name: '',
        gender: 'M',
        myAge: '',
        major: '',
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
  mounted() {},
  methods: {
    selectBankName(item) {
      this.applyParams.major = item.name
      this.checkIsNextActive(1)
    },
    checkIsNextActive(stage) {
      if (stage === 1) {
        this.isNextActive =
          this.applyParams.name.length > 0 &&
          this.applyParams.myAge.length > 0 &&
          this.applyParams.major.length > 0
      } else if (stage === 2) {
        this.isNextActive = this.applyParams.myAge.length > 0
      } else if (stage === 3 || stage === 4 || stage === 5 || stage === 6) {
        this.isNextActive = true
      } else if (stage === 7) {
        this.isNextActive = this.applyParams.kakaoLink.length > 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/apply-my-info.scss';
</style>
