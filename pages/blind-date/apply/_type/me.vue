<template>
  <div id="ApplyMyInfoPage">
    <div class="top">
      <div class="side" @click="$router.go(-1)">
        <img src="@/assets/img/common/left-arrow-black.png" alt="" />
      </div>
      <div class="title">본인 정보 입력</div>
      <div class="side" />
    </div>
    <div v-if="type === 'date'" class="proceed">
      <div class="info">
        <div class="stage-text">{{ curStage }}/5</div>
        <div class="title">{{ curStageInfoDate[curStage - 1].title }}</div>
      </div>
      <div class="stage-img">
        <img :src="curStageInfoDate[curStage - 1].imgUrl" alt="" />
      </div>
    </div>
    <div v-if="type === 'friend'" class="proceed">
      <div class="info">
        <div class="stage-text">{{ curStage }}/3</div>
        <div class="title">{{ curStageInfoFriend[curStage - 1].title }}</div>
      </div>
      <div class="stage-img">
        <img :src="curStageInfoFriend[curStage - 1].imgUrl" alt="" />
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
      <section v-if="curStage === 4" class="form">
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">연락 스타일 <strong>*</strong></div>
            <div class="round-btn-select-wrp">
              <div
                v-for="(item, key) in contactStyle"
                :key="key"
                :class="
                  applyParams.contactStyle === item.id
                    ? 'button selected'
                    : 'button'
                "
                @click="applyParams.contactStyle = item.id"
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
            <div class="sub-title">
              성격 <strong class="purple">최대 2개</strong> <strong>*</strong>
            </div>
            <div class="round-btn-select-wrp">
              <div
                v-for="(item, key) in personality"
                :key="key"
                :class="
                  applyParams.personality.includes(item.id)
                    ? 'button selected'
                    : 'button'
                "
                @click="
                  ;[
                    applyParams.personality.includes(item.id)
                      ? (applyParams.personality =
                          applyParams.personality.filter((data) => {
                            return data !== item.id
                          }))
                      : applyParams.personality.push(item.id),
                    checkIsNextActive(4)
                  ]
                "
              >
                <img
                  v-if="applyParams.personality.includes(item.id)"
                  src="@/assets/img/common/check-purple.png"
                  alt=""
                  style="width: 16px; margin-right: 4px"
                />
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
            <div class="sub-title">
              데이트 스타일 <strong class="purple">최대 3개</strong
              ><strong>*</strong>
            </div>
            <div class="round-btn-select-wrp">
              <div
                v-for="(item, key) in dateStyle"
                :key="key"
                :class="
                  applyParams.dateStyle.includes(item.id)
                    ? 'button selected'
                    : 'button'
                "
                @click="
                  ;[
                    applyParams.dateStyle.includes(item.id)
                      ? (applyParams.dateStyle = applyParams.dateStyle.filter(
                          (data) => {
                            return data !== item.id
                          }
                        ))
                      : applyParams.dateStyle.push(item.id),
                    checkIsNextActive(4)
                  ]
                "
              >
                <img
                  v-if="applyParams.dateStyle.includes(item.id)"
                  src="@/assets/img/common/check-purple.png"
                  alt=""
                  style="width: 16px; margin-right: 4px"
                />
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-if="curStage === 5" class="form">
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">
              3. 혹시 정말 만나고 싶지 않은 사람이 있다면?
              <strong class="purple">최대 10명</strong>
            </div>
            <div>
              <div
                v-for="(item, idx) in applyParams.excludeCondList"
                :key="idx"
                style="margin-bottom: 20px"
              >
                <div v-if="item.isShow === true" class="input-multiple-wrp">
                  <input
                    v-model="item.name"
                    class="input-long-01"
                    placeholder="이름"
                    type="text"
                  />
                  <div class="input-half-wrp">
                    <div style="width: 100%">
                      <input
                        v-model="item.department"
                        class="input-half"
                        placeholder="학과"
                        type="text"
                      />
                    </div>
                    <div style="width: 100%">
                      <input
                        v-model="item.studentId"
                        class="input-half"
                        placeholder="학번"
                        type="text"
                      />
                    </div>
                  </div>
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
        </div>
      </section>
      <section
        v-if="type === 'date'"
        v-show="curStage >= 1 || curStage <= 5"
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
    <section v-if="type === 'friend'" class="content">
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
                    checkIsNextActive(2)
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
                @keyup="checkIsNextActive(2)"
              />
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
      <section v-if="curStage === 3" class="form">
        <div class="stage_01_bottom">
          <div class="content_01">
            <div class="sub-title">오픈 카카오 링크 <strong>*</strong></div>
            <input
              v-model="applyParams.kakaoLink"
              class="input-long"
              type="text"
              placeholder="ex) URL"
              @keyup="checkIsNextActive(3)"
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
        v-if="type === 'friend'"
        v-show="curStage >= 1 || curStage <= 3"
        class="btn-wrp"
      >
        <div v-show="curStage !== 1" class="prev" @click="changeStage(-1)">
          이전
        </div>
        <div
          :class="isNextActive ? 'next active' : 'next'"
          @click="isNextActive ? changeStage(1) : ''"
        >
          {{ curStage === 3 ? '저장' : '다음' }}
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import DropdownBankName from '@/components/blind-date/dropdownBankName'

export default {
  name: 'ApplyMyInfoPage',
  components: { DropdownBankName },
  asyncData({ params, route, query, redirect }) {
    console.log(route.params.type)
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
        },
        {
          id: 4,
          title: '본인 연애 스타일 입력',
          imgUrl: require('@/assets/img/blind-date/stage_4.png')
        },
        {
          id: 5,
          title: '아는 사람은 싫어요',
          imgUrl: require('@/assets/img/blind-date/stage_5.png')
        }
      ],
      curStageInfoFriend: [
        {
          id: 1,
          title: '본인 기본 정보 입력',
          imgUrl: require('@/assets/img/blind-date/stage_1.png')
        },
        {
          id: 2,
          title: '본인 상세 정보 입력',
          imgUrl: require('@/assets/img/blind-date/stage_3.png')
        },
        {
          id: 3,
          title: '마지막으로, 오픈 카카오 링크 입력',
          imgUrl: require('@/assets/img/blind-date/stage_5.png')
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
        ]
      },
      dateStyle: [
        {
          id: 1,
          name: '카페'
        },
        {
          id: 2,
          name: 'PC방'
        },
        {
          id: 3,
          name: '맛집 탐방'
        },
        {
          id: 4,
          name: '전시회 구경'
        },
        {
          id: 5,
          name: '헬스장 데이트'
        },
        {
          id: 6,
          name: '방탈출'
        },
        {
          id: 7,
          name: '공원 산책'
        },
        {
          id: 8,
          name: '드라이브'
        },
        {
          id: 9,
          name: '실내'
        },
        {
          id: 10,
          name: '실외'
        }
      ],
      contactStyle: [
        {
          id: 1,
          name: '카톡 자주 하는 편'
        },
        {
          id: 2,
          name: '카톡 잘 못하는 편'
        },
        {
          id: 3,
          name: '직접 만나는 것을 선호'
        },
        {
          id: 4,
          name: '전화 선호'
        }
      ],
      personality: [
        {
          id: 1,
          name: '말을 예쁘게 하는'
        },
        {
          id: 2,
          name: '유머러스 한'
        },
        {
          id: 3,
          name: '장난기 많은'
        },
        {
          id: 4,
          name: '예의 바른'
        },
        {
          id: 5,
          name: '진중한'
        },
        {
          id: 6,
          name: '상대에게 잘 맞추는'
        },
        {
          id: 7,
          name: '배려심 깊은'
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
  mounted() {
    if (this.type === 'date') {
      this.isNextActive = this.curStage === 5
    }
  },
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
        if (this.type === 'date') {
          this.isNextActive = this.isImgUploadEnough
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
    addAvoid() {
      const idx = this.applyParams.excludeCondList.findIndex((item) => {
        return item.isShow === false
      })
      this.applyParams.excludeCondList[idx].isShow = true

      if (idx === 9) {
        this.isAddBtnActive = false
      }
    },
    submit() {
      // if (!this.setSubmitParams()) {
      //   return false
      // }
      this.$router.push('/blind-date/apply/intro')

      // this.$axios
      //   .post(`${process.env.apiUrl}/v2/blind-date`, this.applyParams, {
      //     withCredentials: true,
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: this.$store.state.userInfo.token
      //     }
      //   })
      //   .then((res) => {
      //     this.$router.push('/blind-date/proceeding')
      //   })
      //   .catch((error) => {
      //     window.alert(error.response.data.message)
      //   })
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/apply-my-info.scss';
</style>
