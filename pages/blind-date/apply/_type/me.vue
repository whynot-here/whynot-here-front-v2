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
        <div class="stage-text">{{ curStage }}/5</div>
        <div class="title">{{ curStageInfo[curStage - 1].title }}</div>
      </div>
      <div class="stage-img">
        <img :src="curStageInfo[curStage - 1].imgUrl" alt="" />
      </div>
    </div>
    <section v-if="type === 'date'" class="content">
      <section v-if="curStage === 1" class="form">
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
      <section v-if="curStage === 2" class="form">
        <div class="stage_01_top">
          <div class="content_01">
            <div class="sub-title">
              본인의 키를 입력해 주세요 <strong class="gray">(숫자만)</strong>
            </div>
            <input
              v-model="applyParams.height"
              class="input-long"
              type="text"
              placeholder="ex) 160"
            />
          </div>
          <div class="content_01">
            <div class="sub-title">
              본인을 나타낼 수 있는 사진 최소 2장 이상을 올려주세요
              <strong>*</strong>
              <div class="sub-desc">
                상대방에게 수치심을 주거나 불쾌감을 줄 수 있는 사진 업로드 시
                관리자 확인 후 한대소 명단에서 제외할 수 있습니다.
              </div>
            </div>
            <div class="btn-select-wrp" style="padding-top: 10px">
              <div class="file-select-btn">
                <div>+ 파일선택</div>
              </div>
              <b-form-group id="fileInput" class="dragdrop blind-date">
                <b-form-file
                  multiple
                  accept="image/jpeg, image/png, image/gif"
                  @change="onFileChange"
                ></b-form-file>
              </b-form-group>
              <div v-if="inputImg && inputImg.length > 0" class="img-grp">
                <div id="postingImages">
                  <div v-for="(image, idx) in inputImg" :key="idx">
                    <b-img thumbnail :src="image.prev_url" class="obj" />
                    <div class="img-btn-grp">
                      <img
                        class="del"
                        src="@/assets/img/blind-date/img-del-black.png"
                        alt=""
                        @click="cancelPhoto(idx)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isImgUploadEnough" class="complete-notice">
              <div class="check-img-wrp">
                <img src="@/assets/img/common/check-purple.png" alt="" />
              </div>
              <div>조건 충족 완료</div>
            </div>
          </div>
        </div>
      </section>
      <section v-if="curStage === 3" class="form">
        <div class="stage_01_top">
          <div class="content_01">
            <div class="sub-title">흡연 여부 <strong>*</strong></div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.smoke === 'N'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.smoke = 'N'"
              >
                비흡연
              </div>
              <div
                :class="
                  applyParams.smoke === 'Y'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.smoke = 'Y'"
              >
                흡연
              </div>
            </div>
          </div>
          <div class="content_01">
            <div class="sub-title">종교 <strong>*</strong></div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.faith === 'NO_MATTER'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.faith = 'NO_MATTER'"
              >
                안 믿음
              </div>
              <div
                :class="
                  applyParams.faith === 'CHRISTIAN'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.faith = 'CHRISTIAN'"
              >
                기독교
              </div>
              <div
                :class="
                  applyParams.faith === 'ETC'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.faith = 'ETC'"
              >
                그 외
              </div>
            </div>
          </div>
        </div>
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">음주 여부 <strong>*</strong></div>
            <div class="round-btn-select-wrp">
              <div
                v-for="(item, key) in alcohol"
                :key="key"
                :class="
                  applyParams.alcohol === item.id ? 'button selected' : 'button'
                "
                @click="applyParams.alcohol = item.id"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="background">
          <br />
        </div>
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">현 거주지 <strong>*</strong></div>
            <div class="btn-select-wrp">
              <div
                :class="
                  applyParams.address === 'DORMITORY'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.address = 'DORMITORY'"
              >
                기숙사
              </div>
              <div
                :class="
                  applyParams.address === 'POHANG'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.address = 'POHANG'"
              >
                포항
              </div>
              <div
                :class="
                  applyParams.address === 'ETC'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.address = 'ETC'"
              >
                타지역
              </div>
            </div>
            <div v-if="applyParams.address !== 'POHANG'" class="content_02">
              <div class="sub-question-title">
                {{
                  applyParams.address === 'DORMITORY'
                    ? '기숙사명 입력'
                    : '지역명 입력'
                }}
              </div>
              <input
                v-model="applyParams.addressDetail"
                class="input-long"
                type="text"
              />
            </div>
          </div>
        </div>
        <div class="background">
          <br />
        </div>
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">
              취미 <strong class="purple">최대 3개</strong><strong>*</strong>
            </div>
            <div class="round-btn-select-wrp">
              <div
                v-for="(item, key) in hobby"
                :key="key"
                :class="
                  applyParams.hobby.includes(item.id)
                    ? 'button selected'
                    : 'button'
                "
                @click="
                  ;[
                    applyParams.hobby.includes(item.id)
                      ? (applyParams.hobby = applyParams.hobby.filter(
                          (data) => {
                            return data !== item.id
                          }
                        ))
                      : applyParams.hobby.push(item.id),
                    checkIsNextActive(3)
                  ]
                "
              >
                <img
                  v-if="applyParams.hobby.includes(item.id)"
                  src="@/assets/img/common/check-purple.png"
                  alt=""
                  style="width: 16px; margin-right: 4px"
                />
                {{ item.name }}
              </div>
            </div>
            <div class="content_02">
              <div class="sub-question-title">이외 추가적인 취미</div>
              <input
                v-model="applyParams.hobbyEtc"
                class="input-long"
                type="text"
                @keyup="checkIsNextActive(3)"
              />
            </div>
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
      curStage: 3,
      curStageInfo: [
        {
          id: 1,
          title: '본인 기본 정보 입력',
          imgUrl: require('@/assets/img/blind-date/stage_1.png')
        },
        {
          id: 2,
          title: '본인 외형 정보 입력',
          imgUrl: require('@/assets/img/blind-date/stage_2.png')
        },
        {
          id: 3,
          title: '본인 상세 정보 입력',
          imgUrl: require('@/assets/img/blind-date/stage_3.png')
        }
      ],
      applyParams: {
        season: 1,
        name: '',
        gender: 'M',
        myAge: '',
        major: '',
        height: '',
        favoriteAge: 'NO_MATTER',
        dateStyle: 'CAFE',
        hobby: [],
        hobbyEtc: '',
        faith: 'NO_MATTER',
        smoke: 'N',
        alcohol: 1,
        address: 'DORMITORY',
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
          id: 1,
          name: '독서'
        },
        {
          id: 2,
          name: '음악'
        },
        {
          id: 3,
          name: '요리'
        },
        {
          id: 4,
          name: '게임'
        },
        {
          id: 5,
          name: '스포츠'
        },
        {
          id: 6,
          name: '헬스'
        },
        {
          id: 7,
          name: '여행'
        },
        {
          id: 8,
          name: '댄스'
        },
        {
          id: 9,
          name: '그림'
        },
        {
          id: 10,
          name: '보드게임'
        },
        {
          id: 11,
          name: '러닝'
        },
        {
          id: 12,
          name: '없음'
        }
      ],
      alcohol: [
        { id: 1, name: '안 마심' },
        { id: 2, name: '가끔' },
        { id: 3, name: '일주일에 1~2번' },
        { id: 4, name: '일주일에 5번 이상' }
      ],
      isAddBtnActive: true,
      isNextActive: false,
      isShow: false,
      inputImg: [],
      files: [],
      isImgUploadEnough: false
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
        // this.isNextActive = this.applyParams.height > 0
        this.isNextActive = this.isImgUploadEnough
      } else if (stage === 3) {
        this.isNextActive =
          this.applyParams.smoke.length > 0 &&
          this.applyParams.faith.length > 0 &&
          this.applyParams.alcohol > 0 &&
          this.applyParams.address.length > 0 &&
          this.applyParams.hobby.length > 2
      } else if (stage === 4 || stage === 5 || stage === 6) {
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
    // 사진 선택
    onFileChange(event) {
      const input = event.target.files
      if (input.length > 0) {
        for (let i = 0; i < input.length; i++) {
          const fileReader = new FileReader()
          fileReader.onload = (e) => {
            this.inputImg.push({
              prev_url: e.target.result,
              isNew: true
            })
          }
          fileReader.readAsDataURL(input[i])
          this.files.push(input[i])
        }
        event.target.value = ''
      }
      if (this.files.length > 1) {
        this.isImgUploadEnough = true
      }

      this.checkIsNextActive(2)
    },
    // 사진 선택 취소
    cancelPhoto(idx) {
      this.inputImg.splice(idx, 1)
      this.files.splice(idx, 1)
      if (this.files.length < 2) {
        this.isImgUploadEnough = false
      }
      this.checkIsNextActive(2)
    },
    toggleMultipleBtn(list, id) {
      if (list.includes(id)) {
        list.push(id)
      } else {
        // this.files.splice(id, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/apply-my-info.scss';
</style>
