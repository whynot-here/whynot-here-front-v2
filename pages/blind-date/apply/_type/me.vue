<template>
  <div id="ApplyPage">
    <div class="top">
      <div class="side" @click="moveApplyIntroPage(type)">
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
              본인의 키를 입력해 주세요
              <strong class="gray">(숫자만)</strong>
              <strong>*</strong>
            </div>
            <input
              v-model="applyParams.myHeight"
              class="input-long"
              type="text"
              placeholder="ex) 160"
              @keyup="checkIsNextActive(2)"
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
                  applyParams.faith === 'NOTHING'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="applyParams.faith = 'NOTHING'"
              >
                안 믿음
              </div>
              <div
                :class="
                  applyParams.faith === 'CHRISTIAN'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="applyParams.faith = 'CHRISTIAN'"
              >
                기독교
              </div>
              <div
                :class="
                  applyParams.faith === 'ETC'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
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
                  applyParams.myDrink === item.code
                    ? 'button selected'
                    : 'button'
                "
                @click="applyParams.myDrink = item.code"
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
                  applyParams.myLocation === 'DORMITORY'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="
                  ;[
                    (applyParams.myLocation = 'DORMITORY'),
                    checkIsNextActive(3),
                    (applyParams.myLocationDesc = '')
                  ]
                "
              >
                기숙사
              </div>
              <div
                :class="
                  applyParams.myLocation === 'POHANG'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="
                  ;[
                    (applyParams.myLocation = 'POHANG'),
                    checkIsNextActive(3),
                    (applyParams.myLocationDesc = '')
                  ]
                "
              >
                포항
              </div>
              <div
                :class="
                  applyParams.myLocation === 'ETC'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="
                  ;[
                    (applyParams.myLocation = 'ETC'),
                    checkIsNextActive(3),
                    (applyParams.myLocationDesc = '')
                  ]
                "
              >
                타지역
              </div>
            </div>
            <div v-if="applyParams.myLocation !== 'POHANG'" class="content_02">
              <div class="sub-question-title">
                {{
                  applyParams.myLocation === 'DORMITORY'
                    ? '기숙사명 입력'
                    : '지역명 입력'
                }}
                <strong class="gray">(20자 이내)</strong>
              </div>
              <input
                v-model="applyParams.myLocationDesc"
                class="input-long"
                type="text"
                maxlength="32"
                @keyup="checkIsNextActive(3)"
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
                  applyParams.hobby.split(';').includes(item.code)
                    ? 'button selected'
                    : 'button'
                "
                @click="
                  ;[
                    applyParams.hobby.split(';').includes(item.code)
                      ? (applyParams.hobby = applyParams.hobby
                          .split(';')
                          .filter((data) => {
                            return data !== item.code
                          })
                          .join(';'))
                      : applyParams.hobby.split(';').length <= 3
                      ? (applyParams.hobby = applyParams.hobby.concat(
                          item.code,
                          ';'
                        ))
                      : '',
                    checkIsNextActive(3)
                  ]
                "
              >
                <img
                  v-if="applyParams.hobby.split(';').includes(item.code)"
                  src="@/assets/img/common/check-purple.png"
                  alt=""
                  style="width: 16px; margin-right: 4px"
                />
                {{ item.name }}
              </div>
            </div>
            <div class="content_02">
              <div class="sub-question-title">
                이외 추가적인 취미
                <strong class="gray">(20자 이내)</strong>
              </div>
              <input
                v-model="applyParams.hobbyDesc"
                class="input-long"
                type="text"
                maxlength="32"
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
                v-for="(item, key) in myContactStyle"
                :key="key"
                :class="
                  applyParams.myContactStyle === item.code
                    ? 'button selected'
                    : 'button'
                "
                @click="applyParams.myContactStyle = item.code"
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
                v-for="(item, key) in myCharacter"
                :key="key"
                :class="
                  applyParams.myCharacter.split(';').includes(item.code)
                    ? 'button selected'
                    : 'button'
                "
                @click="
                  ;[
                    applyParams.myCharacter.split(';').includes(item.code)
                      ? (applyParams.myCharacter = applyParams.myCharacter
                          .split(';')
                          .filter((data) => {
                            return data !== item.code
                          })
                          .join(';'))
                      : applyParams.myCharacter.split(';').length <= 2
                      ? (applyParams.myCharacter =
                          applyParams.myCharacter.concat(item.code, ';'))
                      : '',
                    checkIsNextActive(4)
                  ]
                "
              >
                <img
                  v-if="applyParams.myCharacter.split(';').includes(item.code)"
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
                  applyParams.dateStyle.split(';').includes(item.code)
                    ? 'button selected'
                    : 'button'
                "
                @click="
                  ;[
                    applyParams.dateStyle.split(';').includes(item.code)
                      ? (applyParams.dateStyle = applyParams.dateStyle
                          .split(';')
                          .filter((data) => {
                            return data !== item.code
                          })
                          .join(';'))
                      : applyParams.dateStyle.split(';').length <= 3
                      ? (applyParams.dateStyle = applyParams.dateStyle.concat(
                          item.code,
                          ';'
                        ))
                      : '',
                    checkIsNextActive(4)
                  ]
                "
              >
                <img
                  v-if="applyParams.dateStyle.split(';').includes(item.code)"
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
              ref="dropdown"
              :label-first="dropdownLabel"
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
                  applyParams.mySmoke === 'N'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.mySmoke = 'N'"
              >
                비흡연
              </div>
              <div
                :class="
                  applyParams.mySmoke === 'Y'
                    ? 'button-half selected'
                    : 'button-half'
                "
                @click="applyParams.mySmoke = 'Y'"
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
                  applyParams.faith === 'NOTHING'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="applyParams.faith = 'NOTHING'"
              >
                안 믿음
              </div>
              <div
                :class="
                  applyParams.faith === 'CHRISTIAN'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="applyParams.faith = 'CHRISTIAN'"
              >
                기독교
              </div>
              <div
                :class="
                  applyParams.faith === 'ETC'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
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
                  applyParams.myDrink === item.code
                    ? 'button selected'
                    : 'button'
                "
                @click="applyParams.myDrink = item.code"
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
                  applyParams.myLocation === 'DORMITORY'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="
                  ;[
                    (applyParams.myLocation = 'DORMITORY'),
                    checkIsNextActive(2)
                  ]
                "
              >
                기숙사
              </div>
              <div
                :class="
                  applyParams.myLocation === 'POHANG'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="
                  ;[(applyParams.myLocation = 'POHANG'), checkIsNextActive(2)]
                "
              >
                포항
              </div>
              <div
                :class="
                  applyParams.myLocation === 'ETC'
                    ? 'button-30-percent selected'
                    : 'button-30-percent'
                "
                @click="
                  ;[(applyParams.myLocation = 'ETC'), checkIsNextActive(2)]
                "
              >
                타지역
              </div>
            </div>
            <div v-if="applyParams.myLocation !== 'POHANG'" class="content_02">
              <div class="sub-question-title">
                {{
                  applyParams.myLocation === 'DORMITORY'
                    ? '기숙사명 입력'
                    : '지역명 입력'
                }}
                <strong class="gray">(200자 이내)</strong>
              </div>
              <input
                v-model="applyParams.myLocationDesc"
                class="input-long"
                type="text"
                maxlength="32"
                @keyup="checkIsNextActive(2)"
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
                  applyParams.myHobby.split(';').includes(item.code)
                    ? 'button selected'
                    : 'button'
                "
                @click="
                  ;[
                    applyParams.myHobby.split(';').includes(item.code)
                      ? (applyParams.myHobby = applyParams.myHobby
                          .split(';')
                          .filter((data) => {
                            return data !== item.code
                          })
                          .join(';'))
                      : applyParams.myHobby.split(';').length <= 3
                      ? (applyParams.myHobby = applyParams.myHobby.concat(
                          item.code,
                          ';'
                        ))
                      : '',
                    checkIsNextActive(2)
                  ]
                "
              >
                <img
                  v-if="applyParams.myHobby.includes(item.id)"
                  src="@/assets/img/common/check-purple.png"
                  alt=""
                  style="width: 16px; margin-right: 4px"
                />
                {{ item.name }}
              </div>
            </div>
            <div class="content_02">
              <div class="sub-question-title">
                이외 추가적인 취미
                <strong class="gray">(20자 이내)</strong>
              </div>
              <input
                v-model="applyParams.myHobbyDesc"
                class="input-long"
                type="text"
                maxlength="32"
                @keyup="checkIsNextActive(2)"
              />
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
      <section v-if="curStage === 3" class="form">
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
              @keyup="checkIsNextActive(3)"
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
      dateStyle: [
        {
          id: 1,
          name: '카페',
          code: 'CAFE'
        },
        {
          id: 2,
          name: 'PC방',
          code: 'PC'
        },
        {
          id: 3,
          name: '맛집 탐방',
          code: 'FOOD'
        },
        {
          id: 4,
          name: '전시회 구경',
          code: 'EXHIBITION'
        },
        {
          id: 5,
          name: '헬스장 데이트',
          code: 'HEALTH'
        },
        {
          id: 6,
          name: '방탈출',
          code: 'ESCAPE_ROOM'
        },
        {
          id: 7,
          name: '공원 산책',
          code: 'WALK'
        },
        {
          id: 8,
          name: '드라이브',
          code: 'DRIVE'
        },
        {
          id: 9,
          name: '실내',
          code: 'INSIDE'
        },
        {
          id: 10,
          name: '실외',
          code: 'OUTSIDE'
        }
      ],
      myContactStyle: [
        {
          id: 1,
          name: '카톡 자주 하는 편',
          code: 'KAKAO_OFTEN'
        },
        {
          id: 2,
          name: '카톡 잘 못하는 편',
          code: 'KAKAO_RARELY'
        },
        {
          id: 3,
          name: '직접 만나는 것을 선호',
          code: 'MEET'
        },
        {
          id: 4,
          name: '전화 선호',
          code: 'CALL'
        }
      ],
      myCharacter: [
        {
          id: 1,
          name: '말을 예쁘게 하는',
          code: 'PRETTY_TALKING'
        },
        {
          id: 2,
          name: '유머러스 한',
          code: 'HUMOROUS'
        },
        {
          id: 3,
          name: '장난기 많은',
          code: 'PLAYFUL'
        },
        {
          id: 4,
          name: '예의 바른',
          code: 'POLITE'
        },
        {
          id: 5,
          name: '진중한',
          code: 'CAREFUL'
        },
        {
          id: 6,
          name: '상대에게 잘 맞추는',
          code: 'GOOD_MATCH'
        },
        {
          id: 7,
          name: '배려심 깊은',
          code: 'THOUGHTFUL'
        }
      ],
      hobby: [
        {
          id: 1,
          name: '독서',
          code: 'READING_BOOKS'
        },
        {
          id: 2,
          name: '음악',
          code: 'MUSIC'
        },
        {
          id: 3,
          name: '요리',
          code: 'COOKING'
        },
        {
          id: 4,
          name: '게임',
          code: 'GAME'
        },
        {
          id: 5,
          name: '스포츠',
          code: 'SPORTS'
        },
        {
          id: 6,
          name: '헬스',
          code: 'HEALTH'
        },
        {
          id: 7,
          name: '여행',
          code: 'TRAVELING'
        },
        {
          id: 8,
          name: '댄스',
          code: 'DANCE'
        },
        {
          id: 9,
          name: '그림',
          code: 'DRAWING'
        },
        {
          id: 10,
          name: '보드게임',
          code: 'BOARD_GAME'
        },
        {
          id: 11,
          name: '러닝',
          code: 'RUNNING'
        },
        {
          id: 12,
          name: '없음',
          code: 'NO'
        }
      ],
      alcohol: [
        { id: 1, name: '안 마심', code: 'NEVER' },
        { id: 2, name: '가끔', code: 'SOMETIMES' },
        { id: 3, name: '일주일에 1~2번', code: 'ONETWO_OF_WEEK' },
        { id: 4, name: '일주일에 5번 이상', code: 'FIVE_OF_WEEK' }
      ],
      isAddBtnActive: true,
      isNextActive: false,
      isShow: false,
      inputImg: [],
      files: [],
      isImgUploadEnough: false,
      dropdownLabel: '학부'
    }
  },
  mounted() {
    // 지원서 작성 중간에 수정하는 경우 (연애탭일 경우만)
    if (this.type === 'date') {
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
              this.curStageInfoDate.length > res.data.myStep + 1
                ? res.data.myStep + 1
                : res.data.myStep

            this.isNextActive = this.curStage === 5
          } else {
            this.curStage =
              this.curStageInfoFriend.length > res.data.myStep + 1
                ? res.data.myStep + 1
                : res.data.myStep
          }
          this.cmn_setApplyParams(res.data)
        })
    }
  },
  methods: {
    selectBankName(item) {
      this.applyParams.department = item.code
      this.checkIsNextActive(1)
    },
    checkIsNextActive(stage) {
      if (stage === 1) {
        this.isNextActive =
          this.nullCheck(this.applyParams.name) &&
          this.nullCheck(this.applyParams.myAge) &&
          this.nullCheck(this.applyParams.department) &&
          this.applyParams.name.length > 0 &&
          this.applyParams.myAge.length > 0 &&
          this.applyParams.department.length > 0
      } else if (stage === 2) {
        if (this.type === 'date') {
          this.isNextActive =
            this.isImgUploadEnough && this.applyParams.myHeight.length > 0
        } else {
          this.isNextActive =
            this.nullCheck(this.applyParams.mySmoke) &&
            this.nullCheck(this.applyParams.faith) &&
            this.nullCheck(this.applyParams.myDrink) &&
            this.nullCheck(this.applyParams.myLocation) &&
            this.nullCheck(this.applyParams.myHobby) &&
            this.applyParams.mySmoke.length > 0 &&
            this.applyParams.faith.length > 0 &&
            this.applyParams.myDrink.length > 0 &&
            this.applyParams.myLocation.length > 0 &&
            this.applyParams.myHobby.length > 0
        }
      } else if (stage === 3) {
        if (this.type === 'date') {
          this.isNextActive =
            this.nullCheck(this.applyParams.smoke) &&
            this.nullCheck(this.applyParams.faith) &&
            this.nullCheck(this.applyParams.myDrink) &&
            this.nullCheck(this.applyParams.myLocation) &&
            this.nullCheck(this.applyParams.hobby) &&
            this.applyParams.smoke.length > 0 &&
            this.applyParams.faith.length > 0 &&
            this.applyParams.myDrink.length > 0 &&
            this.applyParams.myLocation.length > 0 &&
            (this.applyParams.myLocation === 'DORMITORY' ||
            this.applyParams.myLocation === 'ETC'
              ? this.applyParams.myLocationDesc.length > 0
              : true) &&
            this.applyParams.hobby.length > 0
        } else {
          this.isNextActive =
            this.nullCheck(this.applyParams.kakaoLink) &&
            this.applyParams.kakaoLink.length > 5 &&
            this.applyParams.kakaoLink.substring(0, 5) === 'https'
        }
      } else if (stage === 4) {
        this.isNextActive =
          this.nullCheck(this.applyParams.myCharacter) &&
          this.nullCheck(this.applyParams.dateStyle) &&
          this.applyParams.myCharacter.length > 0 &&
          this.applyParams.dateStyle.length > 0
      }
    },
    changeStage(addNum) {
      this.applyParams.myStep = this.curStage // 지금 단계 저장
      if (this.type === 'date') {
        if (addNum === 1 && this.curStage === 2) {
          this.submitAndPicture()
        } else if (addNum === 1) {
          this.submit()
        }

        if (this.curStage === 5 && addNum === 1) {
          this.moveApplyIntroPage(this.type)
        } else {
          this.curStage += addNum
        }
      } else if (this.type === 'friend') {
        if (this.curStage === 3 && addNum === 1) {
          this.submit()
        } else {
          this.curStage += addNum
        }
      }

      this.checkIsNextActive(this.curStage)

      // 드롭다운 이전으로 갈 때 에러 수정하는 부분
      // if (this.curStage === 2 && addNum === -1 && this.type === 'date') {
      //   this.dropdownLabel = this.$store.state.sharedData.department
      // if (
      //   this.$store.state.sharedData !== null &&
      //   this.$store.state.sharedData.department !== ''
      // ) {
      //   const item = {
      //     id: 0,
      //     name: ''
      //   }
      //   const majorItem = this.majorList.filter((item) => {
      //     return item.majorName === this.$store.state.sharedData.department
      //   })[0]
      //   item.id = majorItem.majorId
      //   item.name = majorItem.majorName

      //   setTimeout(() => {
      //     console.log(this.$refs.dropdown.print())
      //     this.$refs.dropdown.parentId = item.id
      //   }, 1000)
      // }
      // }
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
    submitAndPicture() {
      if (this.files.length > 1) {
        this.files.forEach((file, idx) => {
          const formData = new FormData()
          formData.append('images', file)

          const cur = new Date()
          const year = (cur.getFullYear() + '').substring(2)
          const month = cur.getMonth() + 1 + ''
          this.dir = year + '-' + month

          this.uploadPicture({ formData, idx, callback: this.submit })
        })
      } else {
        this.submit()
      }
    },
    submit() {
      if (this.type === 'date') {
        this.$axios
          .put(`${process.env.apiUrl}/v2/blind-date`, this.applyParams, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {})
          .catch((error) => {
            window.alert(error.response.data.message)
          })
      } else if (this.type === 'friend') {
        this.$axios
          .post(`${process.env.apiUrl}/v2/friend-meeting`, this.applyParams, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            console.log(res)
            // this.$router.push('/blind-date/proceeding')
          })
          .catch((error) => {
            window.alert(error.response.data.message)
          })
      }
    },

    uploadPicture({ formData, idx, callback }) {
      this.$axios
        .post(`${process.env.apiUrl}/images/${this.dir}`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.applyParams.imageLinks.push(res.data.url)
          if (this.files.length === this.applyParams.imageLinks.length) {
            callback()
          }
        })
        .catch((error) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: error,
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
          return false
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blind-date/apply.scss';
</style>
