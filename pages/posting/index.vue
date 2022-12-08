<template>
  <div id="PostingPage">
    <TopBarOnly />
    <div class="panel">
      <section class="form">
        <div class="title-group">
          <div class="title">📝 글쓰기</div>
          <div class="close">
            <img src="@/assets/img/common/close-page.png" alt="" @click="cmn_goMainPage">
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
              <div class="sub-title">모집 마감일</div>
              <div class="sub-wrp d-day-input">
                <div>D&nbsp;-</div>
                <input v-model="d_day" oninput="this.value = this.value.replace(/[^\/0-9.]/g, '').replace(/(\..*)\./g, '$1');">
              </div>
            </div>
            <div class="form-wrp process">
              <div class="sub-title">진행방식</div>
              <div class="sub-wrp">
                <DropDown
                  ref="DropdownProcess"
                  :label="'방식'"
                  :option-list="processList"
                  @get-label="setCommunicationTool"
                />
              </div>
            </div>
          </div>
          <div class="line">
            <div class="form-wrp people-count">
              <div class="sub-title">모집 인원 수</div>
              <input
                v-model="recruitTotalCntTxt"
                class="sub-wrp"
                placeholder="모집 인원"
                oninput="this.value = this.value.replace(/[^\/0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              >
            </div>
            <div class="form-wrp call">
              <div class="sub-title">연락수단</div>
              <div class="sub-wrp">
                <div class="call-dropdown">
                  <DropDown
                    ref="DropdownCall"
                    :label="'연락수단'"
                    :option-list="callList"
                    @get-label="setOwnerContact"
                  />
                </div>
                <input v-model="postingRegisterParams.ownerContact.value" class="call-input" type="text" placeholder="입력">
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
                style="width: 750px; padding-left: 20px;" 
                placeholder="카테고리와 관련된 내용을 입력해 주세요."
                class="sub-wrp"
              >
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
                placeholder="카테고리와 관련된 내용을 입력해 주세요."
              ></textarea>
            </div>
          </div>
          <div>
            <div id="AddPostImg" class="add-img">
              <div class="camera-img">
                <img src="@/assets/img/posting/camera.png" alt="">
              </div>
              <b-button class="reg-btn">
                이미지 추가 (최대 4장)
              </b-button>
              <b-form-group id="fileInput" class="dragdrop">
                <b-form-file
                  multiple
                  accept="image/jpeg, image/png, image/gif"
                  @change="onFileChange"
                ></b-form-file>
              </b-form-group>
              <div
                v-if="inputImg && inputImg.length > 0"
                class="img-grp"
              >
                <div
                  id="postingImages"
                >
                  <div
                    v-for="(image, idx) in inputImg"
                    :key="idx"
                  >
                    <b-img
                      thumbnail
                      :src="image.prev_url"
                      class="obj"
                    />
                    <div class="img-btn-grp">
                      <img
                        class="del"
                        src="@/assets/img/common/close-review.png"
                        alt=""
                        @click="cancelPhoto(idx)"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div v-if="postingMode === 'write'" class="upload" @click="uploadPostingAndPicture">
          글 업로드
        </div>
        <div v-else class="upload" @click="editPostingAndPicture">
          수정하기
        </div>
      </section>
      <!-- <section class="content">
        <div class="title">프로젝트 소개</div>
        <div>
          <div class="sub-title">한줄소개</div>
          <div>
            <input type="text">
          </div>
        </div>
        <div>
          <div class="sub-title">내용</div>
          <div>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
      </section> -->
      <!-- <section>
        <div>업로드</div>
      </section> -->
    </div>
  </div>
</template>

<script>
// import FormData from 'form-data'
import TopBarOnly from '@/components/main-page/TopBarOnly'
import DropdownCategory from '@/components/common/dropdownCategory'
import DropDown from '@/components/common/dropdown'

export default {
  name: 'PostingPage',
  components: {
    TopBarOnly,
    DropdownCategory,
    DropDown
  },
  asyncData({ params, query }) {
    return {
      category: params.category,
      mode: query.m,
      id: query.id
    }
  },
  data () {
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
        },
      ],
      d_day: '',
      recruitTotalCntTxt: '',
      postingRegisterParams: {        
        title: '',
        content: '',
        imageLinks: [],
        categoryId: 0,
        category: {
          code: '',
          id: 0,
          name: '',
        },
        closedDt: "2022-09-01T06:46:13.688Z",
        ownerContact: {
          type: '',
          value: ''
        },
        recruitTotalCnt: 0,
        recruitCurrentCnt: 0,
        communicationTool: ''
      },
      inputImg: [],
      files:[],
      dir: ''
    }
  },
  computed: {
    postingMode () {
      return this.mode
    }
  },
  mounted () {
    if (this.id !== undefined) {
      this.getPost()
    }
  },
  methods: {
    getPost() {
      // 수정하기 데이터 세팅
      this.$axios.get(`https://whynot-here.o-r.kr/v2/posts/${this.id}`)
      .then(res => {
        Object.keys(this.postingRegisterParams)
          .map((key) => {
            if (res.data[key] !== null) {
              this.postingRegisterParams[key] = res.data[key]
            }
            return key
          })
          this.recruitTotalCntTxt = this.postingRegisterParams.recruitTotalCnt
          this.d_day = this.cmn_getDday(this.postingRegisterParams.closedDt).substring(2) * 1

          // 카테고리
          let categoryItem = ''
          this.categoryGroup.forEach((category) => {
            if (category.parentId === this.postingRegisterParams.category.id) {
              categoryItem = {
                id: category.parentId,
                name: category.parentName
              }
              this.$refs.DropdownCategory.selectOptionMain(categoryItem)
            } else {
              category.children.forEach((child) => {
                if (child.id === this.postingRegisterParams.category.id) {
                  categoryItem = {
                    id: child.id,
                    name: child.name
                  }
                  this.$refs.DropdownCategory.selectOptionSub(categoryItem)
                  categoryItem = {
                    id: category.parentId,
                    name: category.parentName
                  }
                  this.$refs.DropdownCategory.selectOptionMain(categoryItem)
                }
              })
            }
          })

          // 진행방식
          let processItem = ''
          this.processList.forEach((item) => {
            if (item.value === this.postingRegisterParams.communicationTool) {
              processItem = item
              return ''
            }
          })
          this.$refs.DropdownProcess.selectOption(processItem)

          // 연락수단
          let callItem = ''
          this.callList.forEach((item) => {
            if (item.value === this.postingRegisterParams.ownerContact.type) {
              callItem = item
              return false
            }
          })
          this.$refs.DropdownCall.selectOption(callItem)
          // todo: 이미지 세팅
          res.data.imageLinks.map((imageLink) => {
            const img = {
              prev_url: imageLink.link,
              isNew: false
            }
            return this.inputImg.push(img)
          })
      })
    },
    setOwnerContact (item) {
      this.postingRegisterParams.ownerContact.type = item.value
    },
    setCommunicationTool (item) {
      this.postingRegisterParams.communicationTool = item.value
    },
    selectCategory (item) {
      this.postingRegisterParams.category.id = item.id
    },
    uploadPostingAndPicture () {
      if (!this.checkRegisterParamsValid()) {
        return false
      }

      if (this.files.length > 0) {
        this.files.forEach((file, idx) => {
          const formData = new FormData()
          formData.append("images", file)
  
          const cur = new Date()
          const year = (cur.getFullYear() + '').substring(2)
          const month = (cur.getMonth() + 1 + '')
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
      this.inputImg.forEach(img => {
        if (!img.isNew) {
          this.postingRegisterParams.imageLinks.push(img.prev_url)
        }
      })

      if (this.files.length > 0) {
        this.files.forEach((file, idx) => {
          const formData = new FormData()
          formData.append("images", file)

          const cur = new Date()
          const year = (cur.getFullYear() + '').substring(2)
          const month = (cur.getMonth() + 1 + '')
          this.dir = year + '-' + month

          this.uploadPicture({ formData, idx, callback: this.editPosting })
        })
      } else {
        this.editPosting()
      }
    },   
    uploadPicture ({ formData, idx, callback }) {
      (this.$axios.post(
        (`https://whynot-here.o-r.kr/images/${this.dir}`),
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.$store.state.userInfo.token
          }
        }
      )
      ).then(res => {
        this.postingRegisterParams.imageLinks.push(res.data.url)
        if (this.files.length === (idx + 1)) {
          callback()
        }
      }).catch((error) => {
        window.alert(error)
        return false
      })
    },
    uploadPosting() {
      // 포스팅 저장 (사진 제외)
      (this.$axios.post(
      ('https://whynot-here.o-r.kr/v2/posts'),
        this.postingRegisterParams,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
      )
      ).then(res => {
        // todo: 상세 페이지로 넘어가기
        alert('공고 생성 성공')
        this.$router.push(`/gather/posts/${res.data.id}`)
      }).catch((error) => {
        window.alert(error.response.data.message)
      })
    },
    editPosting() {
      (this.$axios.put(
        (`https://whynot-here.o-r.kr/v2/posts/${this.id}`),
        this.postingRegisterParams,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
      )
      ).then(res => {
        // 상세 페이지로 넘어가기
        alert('공고 수정 성공')
        this.$router.push(`/gather/posts/${this.id}`)
      }).catch((error) => {
        window.alert(error.response.data.message)
      })
    }, 
    // 사진 선택
    onFileChange (event) {
      if (this.inputImg.length >= 4) {
        alert('사진은 최대 4장까지 등록 가능합니다.')
        return false
      }

      const input = event.target.files
      if (input.length > 0) {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.inputImg.push({
            prev_url: e.target.result,
            isNew: true
          })
        }
        fileReader.readAsDataURL(input[0])
        this.files.push(input[0])
        event.target.value = ''
      }
    },
    // 사진 선택 취소
    cancelPhoto (idx) {
      this.inputImg.splice(idx, 1)
      this.files.splice(idx, 1)
    },
    checkRegisterParamsValid () {
      if (this.cmn_emptyCheck(this.postingRegisterParams.title)) {
        window.alert('제목을 입력해주세요.')
        return false
      }
      if (this.cmn_emptyCheck(this.postingRegisterParams.content)) {
        window.alert('내용을 입력해주세요.')
        return false
      }
      if (this.cmn_emptyCheck(this.d_day)) {
        window.alert('모집 마감일을 입력해주세요.')
        return false
      }
      if (this.cmn_emptyCheck(this.postingRegisterParams.ownerContact.value) || this.cmn_emptyCheck(this.postingRegisterParams.ownerContact.type)) {
        window.alert('연락 수단을 정확히 입력해주세요.')
        return false
      }
      if (this.cmn_emptyCheck(this.postingRegisterParams.communicationTool)) {
        window.alert('진행방식을 선택해주세요.')
        return false
      }
      if (this.cmn_emptyCheck(this.recruitTotalCntTxt)) {
        window.alert('모집 인원수를 입력해주세요.')
        return false
      }
      let closedDt = new Date()
      closedDt.setDate(closedDt.getDate() + (this.d_day * 1))
      closedDt = closedDt.toISOString()
      closedDt = closedDt.split('T')[0] + ' ' + closedDt.split('T')[1].substring(0, 5)
      this.postingRegisterParams.closedDt = closedDt
      this.postingRegisterParams.recruitTotalCnt = this.recruitTotalCntTxt * 1
      this.postingRegisterParams.categoryId = this.postingRegisterParams.category.id
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
#PostingPage {
  width: 100vw; height: 100vh;
  overflow: scroll;
  background-color: #F3F3F3;
  #TopBar {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .panel {
    width: 770px;
    margin: 117px auto;
    .form {
      .group {
        &.info {
          padding-bottom: 52px;
          border-bottom: 1px solid #E7E7E7;
        }
      }
      .title-group {
        display: flex;
        .title {
          font-size: 1.38rem; font-weight: 700;
          flex-grow: 1;
        }
        .close {
          img {
            width: 32px; height: 32px;
            cursor: pointer;
          }
        }
      }
      .posting-group {
        margin-top: 52px;
        font-size: 1.25rem; font-weight: 500;
        strong {
          color: #E74133;
        }
      }
      .line {
        display: flex;
        margin-top: 30px;
        .form-wrp {
          .sub-title {
            font-size: .88rem; font-weight: 500;
            color: #7A7A7A;
          }
          .sub-wrp {
            height: 46px; line-height: 46px;
            margin-top: 12px;
            // padding-left: 12px;
            background-color: #ffffff;
            border: 1px solid #E7E7E7;
            border-radius: 8px;
          }

          .sub-wrp::placeholder {
            color: #C8C8C8;
          }
          .d-day-input {
            display: flex;
            div {
              font-size: .88rem;
              padding: 0 13px;
            }
            input {
              width: 100px;
              border: none;
            }
            input:focus {
              outline: none;
            }
          }
          .content {
            width: 706px; height: 400px;
            padding: 32px;
            font-size: 1rem;
            background: #FFFFFF;
            border: 1px solid #E7E7E7;
            border-radius: 8px;
          }
          .content::placeholder {
            color: #C8C8C8;
          }
        }
        .category {
          width: 370px;
          .sub-wrp {
            width: 100%;
          }
        }
        .process, .d-day {
          flex-grow: 1;
          margin-left: 30px;
          .sub-wrp {
            width: 170px;
          }
        }
        .people-count {
          width: 170px;
          .sub-wrp {
            width: 155px;
            padding-left: 12px;
          }
        }
        .call {
          width: 470px;
          margin-left: 30px;
          .sub-wrp {
            display: flex;
            padding-left: 0px;
            .call-dropdown {
              width: 146px;
            }
            .call-input {
              width: 200px; height: 16px;
              padding: 0 20px; margin: 16px 0px;
              border: none;
              border-left: 1px solid #E7E7E7;
            }
            .call-input:focus {
              outline: none;
            }
            .call-input::placeholder {
              color: #C8C8C8;
            }
          }
        }
      }
      .add-img {
        display: flex;
        width: 750px; height: 70px; line-height: 80px;
        margin: 16px 0 42px 0; padding-left: 24px;
        font-size: 1rem; font-weight: 500;
        color: #A3A3A3;
        background: #FAFAFA;
        border: 1px solid #E7E7E7;
        border-radius: 8px;
        .camera-img {
          padding: 0 5px 0 0;
          img {
            width: 26px; height: 22px;
          }
        }
        .reg-btn {
          // z-index: 10;
          width: max-height; height: 40px;
          margin-top: 18px;
          color: #A3A3A3;
          border: none;
          background: none;
          text-decoration: underline;
          cursor: pointer;
        }
        .reg-btn:focus {
          outline: none;
        }
        .img-grp {
          #postingImages {
            display: flex;
            div {
              margin-left: 10px;
              width: 50px; height: 50px;
              .obj {
                width: 50px; height: 50px;
              }
              .img-btn-grp {
                height: 30px;
                display: flex;
                // padding: 5px 10px 0px 60px;
                .del {
                  margin-top: -70px;
                  margin-left: 25px;
                  width: 20px; height: 20px;
                  z-index: 1;
                }
              }
            }
          }
        }
      }
    }
    .upload {
      width: 146px; height: 47px; line-height: 47px;
      margin: 0 auto;
      font-size: 1rem; font-weight: 500;
      background: #FFFFFF;
      // opacity: 0.4;
      border: 1px solid #E1E2E3;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>