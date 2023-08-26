<template>
  <div>
    <div v-if="isFromPc" id="PostingPage">
      <TopBarOnly />
      <div class="panel">
        <section class="form">
          <div class="title-group">
            <div class="title">📝 글쓰기</div>
            <div class="close">
              <img
                src="@/assets/img/common/close-page.png"
                alt=""
                @click="cmn_goMainPage"
              />
            </div>
          </div>
          <div class="group info">
            <div class="posting-group">모집 정보 <strong>*</strong></div>
            <div class="line">
              <div class="form-wrp category">
                <div class="sub-title">카테고리</div>
                <div name="" class="sub-wrp">
                  <DropdownCategory
                    ref="DropdownCategory"
                    :label-first="'카테고리'"
                    :label-second="'상세'"
                    @get-label="selectCategory"
                  />
                </div>
              </div>
              <div class="form-wrp d-day">
                <div class="sub-title">
                  <span
                    ><input
                      v-model="useDday"
                      type="checkbox"
                      name="color"
                      value="blue"
                  /></span>
                  모집 마감일
                </div>
                <!-- <div class="sub-wrp d-day-input"> -->
                <!-- <div>D&nbsp;-</div> -->
                <!-- <input
                    v-model="d_day"
                    :disabled="!useDday"
                    placeholder="날짜 선택"
                    oninput="this.value = this.value.replace(/[^\/0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  > -->

                <div v-if="useDday">
                  <custom-date-picker
                    v-model="postingRegisterParams.closedDt"
                    class="sub-wrp d-day-input bg-white border px-2 py-1 rounded"
                  />
                </div>
                <div v-else>
                  <input disabled class="sub-wrp d-day-input px-2 py-1" />
                </div>
              </div>
            </div>
          </div>
          <div class="group">
            <div class="posting-group">모집 한줄 소개</div>
            <div class="line">
              <div class="form-wrp">
                <input
                  v-model="postingRegisterParams.title"
                  type="text"
                  style="width: 750px; padding-left: 20px"
                  placeholder="욕, 비방 관련 글은 무통보 삭제 될 수 있습니다."
                  class="sub-wrp"
                />
              </div>
            </div>
          </div>
          <div class="group">
            <div class="posting-group">모집 소개 <strong>*</strong></div>
            <div class="line">
              <div class="form-wrp">
                <textarea
                  v-model="postingRegisterParams.content"
                  class="content"
                  name="introduce"
                  cols="30"
                  rows="10"
                  placeholder="욕, 비방 관련 글은 무통보 삭제 될 수 있습니다."
                ></textarea>
              </div>
            </div>
            <div>
              <div id="AddPostImg" class="add-img">
                <div class="camera-img">
                  <img src="@/assets/img/posting/camera.png" alt="" />
                </div>
                <b-button class="reg-btn"> 이미지 추가 </b-button>
                <b-form-group id="fileInput" class="dragdrop">
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
                          src="@/assets/img/common/img-del.png"
                          alt=""
                          @click="cancelPhoto(idx)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div
            v-if="postingMode === 'write'"
            class="upload"
            @click="uploadPostingAndPicture"
          >
            글 업로드
          </div>
          <div v-else class="upload" @click="editPostingAndPicture">
            수정하기
          </div>
        </section>
      </div>
    </div>
    <div v-else id="PostingPageMobile">
      <div class="panel">
        <!-- 타입이 한슐랭 일 때와 아닐 때를 구분 -->
        <section
          v-if="type !== 'must-eat' && selectedCode !== 'MUST-EAT'"
          class="form"
        >
          <div class="title-group">
            <div class="title">글쓰기</div>
            <div class="close">
              <img
                src="@/assets/img/common/close-btn.png"
                alt=""
                @click="cmn_goMainPage"
              />
            </div>
          </div>
          <div class="group info">
            <div class="posting-group">모집 정보 <strong>*</strong></div>
            <div class="line">
              <div class="form-wrp category">
                <div class="sub-title">카테고리</div>
                <div
                  name=""
                  class="sub-wrp"
                  :style="
                    type !== 'must-eat' && selectedCode !== 'MUST-EAT'
                      ? 'width: 50%;'
                      : 'width: 100%;'
                  "
                >
                  <DropdownCategory
                    ref="DropdownCategory"
                    :label-first="'카테고리'"
                    :label-second="'상세'"
                    :posting-type="type"
                    @get-label="selectCategory"
                  />
                </div>
              </div>
              <div class="form-wrp d-day">
                <div class="sub-title">모집 마감일</div>
                <!-- <div class="sub-wrp d-day-input"> -->
                <!-- <div>D&nbsp;-</div> -->
                <!-- <input
                    v-model="d_day"
                    :disabled="!useDday"
                    placeholder="날짜 선택"
                    oninput="this.value = this.value.replace(/[^\/0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  > -->
                <div class="d-day-wrp">
                  <div>
                    <input
                      v-model="useDday"
                      type="checkbox"
                      name="color"
                      value="blue"
                    />
                  </div>
                  <div v-if="useDday">
                    <custom-date-picker
                      v-model="postingRegisterParams.closedDt"
                      class="sub-wrp d-day-input bg-white border px-2 py-1 rounded"
                    />
                  </div>
                  <div v-else>
                    <input disabled class="sub-wrp d-day-input px-2 py-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="group">
            <div class="posting-group">모집 한줄 소개</div>
            <div class="line">
              <div class="form-wrp">
                <input
                  v-model="postingRegisterParams.title"
                  type="text"
                  placeholder="욕, 비방 관련 글은 무통보 삭제 될 수 있습니다."
                  class="sub-wrp summary"
                />
              </div>
            </div>
          </div>
          <div class="group">
            <div class="posting-group">모집 소개 <strong>*</strong></div>
            <div class="line">
              <div class="form-wrp">
                <textarea
                  v-model="postingRegisterParams.content"
                  class="content"
                  name="introduce"
                  cols="30"
                  rows="10"
                  placeholder="욕, 비방 관련 글은 무통보 삭제 될 수 있습니다."
                ></textarea>
              </div>
            </div>
            <div>
              <div id="AddPostImg" class="add-img">
                <div class="camera-img">
                  <img src="@/assets/img/posting/camera.png" alt="" />
                </div>
                <b-button class="reg-btn"> 이미지 추가 </b-button>
                <b-form-group id="fileInput" class="dragdrop">
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
                          src="@/assets/img/common/img-del.png"
                          alt=""
                          @click="cancelPhoto(idx)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section v-else class="form">
          <div class="title-group">
            <div class="title">글쓰기</div>
            <div class="close">
              <img
                src="@/assets/img/common/close-btn.png"
                alt=""
                @click="cmn_goMainPage"
              />
            </div>
          </div>
          <div class="group info">
            <div class="posting-group">카테고리 선택</div>
            <div class="line">
              <div class="form-wrp category">
                <div name="" class="sub-wrp">
                  <DropdownCategory
                    ref="DropdownCategory"
                    :label-first="'카테고리'"
                    :label-second="'상세'"
                    :posting-type="type"
                    @get-label="selectCategory"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="group">
            <div class="posting-group">식당 이름 <strong>*</strong></div>
            <div class="line">
              <div class="form-wrp">
                <input
                  v-model="postingRegisterParams.title"
                  type="text"
                  placeholder="식당 이름을 적어주세요"
                  class="sub-wrp summary"
                />
              </div>
            </div>
          </div>
          <div class="group">
            <div class="posting-group">위치 url</div>
            <div class="line">
              <div class="form-wrp">
                <input
                  v-model="postingRegisterParams.locationUrl"
                  type="text"
                  placeholder="위치 url을 붙여넣기 해주세요"
                  class="sub-wrp summary"
                />
              </div>
            </div>
          </div>
          <div class="group">
            <div class="posting-group">내용 입력 <strong>*</strong></div>
            <div class="line">
              <div class="form-wrp">
                <textarea
                  v-model="postingRegisterParams.content"
                  class="content"
                  name="introduce"
                  cols="30"
                  rows="10"
                  placeholder="식당을 소개해주세요"
                ></textarea>
              </div>
            </div>
            <div>
              <div id="AddPostImg" class="add-img">
                <div class="camera-img">
                  <img src="@/assets/img/posting/camera.png" alt="" />
                </div>
                <b-button class="reg-btn"> 이미지 추가 </b-button>
                <b-form-group id="fileInput" class="dragdrop">
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
                          src="@/assets/img/common/img-del.png"
                          alt=""
                          @click="cancelPhoto(idx)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="bottom">
          <div
            v-if="postingMode === 'write'"
            class="upload"
            @click="uploadPostingAndPicture"
          >
            글 등록
          </div>
          <div v-else class="upload" @click="editPostingAndPicture">
            수정하기
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import TopBarOnly from '@/components/main-page/TopBarOnly'
import DropdownCategory from '@/components/common/dropdownCategory'

export default {
  name: 'PostingPage',
  components: {
    TopBarOnly,
    DropdownCategory
  },
  asyncData({ params, query }) {
    return {
      category: params.category,
      mode: query.m,
      id: query.id,
      type: query.type
    }
  },
  data() {
    return {
      callList: [
        {
          text: '이메일',
          value: 'EMAIL'
        },
        {
          text: '카카오톡 오픈채팅',
          value: 'KAKAO_OPEN_CHAT'
        },
        {
          text: '구글폼',
          value: 'GOOGLE_FORM'
        },
        {
          text: '전화번호',
          value: 'PHONE'
        }
      ],
      processList: [
        {
          text: '만나서',
          value: 'OFFLINE'
        },
        {
          text: '줌으로',
          value: 'ONLINE'
        }
      ],
      d_day: '',
      postingRegisterParams: {
        title: '',
        locationUrl: '',
        content: '',
        imageLinks: [],
        categoryId: 0,
        category: {
          code: '',
          id: 0,
          name: ''
        },
        closedDt: '',
        recruitTotalCnt: 0,
        recruitCurrentCnt: 0
      },
      inputImg: [],
      files: [],
      dir: '',
      useDday: false,
      selectedDate: ''
    }
  },
  computed: {
    postingMode() {
      return this.mode
    },
    selectedCode() {
      return this.postingRegisterParams.category.code
    }
  },
  mounted() {
    if (this.id !== undefined) {
      this.getPost()
    }
  },
  methods: {
    getPost() {
      // 수정하기 데이터 세팅
      this.$axios
        .get(`${process.env.apiUrl}/v2/posts/${this.id}`)
        .then((res) => {
          Object.keys(this.postingRegisterParams).map((key) => {
            if (res.data[key] !== null) {
              this.postingRegisterParams[key] = res.data[key]
            }
            return key
          })
          this.d_day =
            this.cmn_getDday(this.postingRegisterParams.closedDt).substring(2) *
            1

          // 카테고리
          let categoryItem = ''
          this.categoryGroup.forEach((category) => {
            if (category.parentId === this.postingRegisterParams.category.id) {
              categoryItem = {
                id: category.parentId,
                name: category.parentName,
                code: category.parentCode,
                parentCode: category.parentCode
              }
              this.$refs.DropdownCategory.selectOptionMain(categoryItem)
            } else {
              category.children.forEach((child) => {
                if (child.id === this.postingRegisterParams.category.id) {
                  categoryItem = {
                    id: child.id,
                    name: child.name,
                    code: child.code,
                    parentCode: child.parentCode
                  }
                  this.$refs.DropdownCategory.selectOptionSub(categoryItem)
                  categoryItem = {
                    id: category.parentId,
                    name: category.parentName,
                    code: category.parentCode,
                    parentCode: category.parentCode
                  }
                  this.$refs.DropdownCategory.selectOptionMain(categoryItem)
                }
              })
            }
          })

          res.data.imageLinks.map((imageLink) => {
            const img = {
              prev_url: imageLink.link,
              isNew: false
            }
            return this.inputImg.push(img)
          })

          if (this.postingRegisterParams.closedDt !== '') {
            this.useDday = true
          }
        })
    },
    setOwnerContact(item) {
      this.postingRegisterParams.ownerContact.type = item.value
    },
    setCommunicationTool(item) {
      this.postingRegisterParams.communicationTool = item.value
    },
    selectCategory(item) {
      this.postingRegisterParams.category.id = item.id
      this.postingRegisterParams.category.name = item.name
      this.postingRegisterParams.category.code = item.code

      if (item.parentCode === 'MUST-EAT') {
        this.type = 'must-eat'
      } else {
        this.type = item.parentCode.toLowerCase()
      }
    },
    uploadPostingAndPicture() {
      if (!this.checkRegisterParamsValid()) {
        return false
      }

      if (this.files.length > 0) {
        this.files.forEach((file, idx) => {
          const formData = new FormData()
          formData.append('images', file)

          const cur = new Date()
          const year = (cur.getFullYear() + '').substring(2)
          const month = cur.getMonth() + 1 + ''
          this.dir = year + '-' + month

          this.uploadPicture({ formData, idx, callback: this.uploadPosting })
        })
      } else {
        this.uploadPosting()
      }
    },
    editPostingAndPicture() {
      if (!this.checkRegisterParamsValid()) {
        return false
      }

      // 초기화
      this.postingRegisterParams.imageLinks = []
      this.inputImg.forEach((img) => {
        if (!img.isNew) {
          this.postingRegisterParams.imageLinks.push(img.prev_url)
        }
      })

      if (this.files.length > 0) {
        this.files.forEach((file, idx) => {
          const formData = new FormData()
          formData.append('images', file)

          const cur = new Date()
          const year = (cur.getFullYear() + '').substring(2)
          const month = cur.getMonth() + 1 + ''
          this.dir = year + '-' + month

          this.uploadPicture({ formData, idx, callback: this.editPosting })
        })
      } else {
        this.editPosting()
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
          this.postingRegisterParams.imageLinks.push(res.data.url)
          if (this.files.length === idx + 1) {
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
    uploadPosting() {
      this.paramsSetting()
      // 포스팅 저장 (사진 제외)
      this.$axios
        .post(`${process.env.apiUrl}/v2/posts`, this.postingRegisterParams, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: '공고 생성 성공',
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
          this.$router.push(`/gather/posts/${res.data.id}`)
        })
        .catch((error) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: error.response.data.message,
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
        })
    },
    editPosting() {
      this.paramsSetting()
      this.$axios
        .put(
          `${process.env.apiUrl}/v2/posts/${this.id}`,
          this.postingRegisterParams,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
        )
        .then((res) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: '공고 수정 성공',
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
          this.$router.push(`/gather/posts/${this.id}`)
        })
        .catch((error) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: error.response.data.message,
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
        })
    },
    paramsSetting() {
      this.postingRegisterParams.categoryId =
        this.postingRegisterParams.category.id
      if (!this.useDday || this.postingRegisterParams.closedDt === '') {
        delete this.postingRegisterParams.closedDt
      }
      if (this.postingRegisterParams.locationUrl.length === 0) {
        delete this.postingRegisterParams.locationUrl
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
    },
    // 사진 선택 취소
    cancelPhoto(idx) {
      this.inputImg.splice(idx, 1)
      this.files.splice(idx, 1)
    },
    checkRegisterParamsValid() {
      if (this.cmn_emptyCheck(this.postingRegisterParams.title)) {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
            content: '제목을 입력해주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }
      if (this.cmn_emptyCheck(this.postingRegisterParams.content)) {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
            content: '내용을 입력해주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }
      if (
        this.postingRegisterParams.locationUrl.length > 0 &&
        this.postingRegisterParams.locationUrl.substring(0, 5) !== 'https'
      ) {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
            content: '위치 url은 https로 시작해야합니다.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/detail-page/posting.scss';
</style>
