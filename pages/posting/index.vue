<template>
  <div id="PostingPage">
    <TopBar />
    <div class="panel">
      <section class="form">
        <div class="title">📝 글쓰기</div>
        <div class="group info">
          <div class="posting-group">모집 정보</div>
          <div class="line">
            <div class="form-wrp category">
              <div class="sub-title">카테고리</div>
              <div name="" class="sub-wrp">
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
          <div class="posting-group">한줄 소개</div>
          <div class="line">
            <div class="form-wrp">
              <input v-model="postingRegisterParams.title" type="text" style="width: 770px; padding-left: 20px;" class="sub-wrp">
            </div>
          </div>
        </div>
        <div class="group">
          <div class="posting-group">모집 소개</div>
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
            <div class="add-img">
              <div>
                <img src="@/assets/img/posting/camera.png" alt="">
              </div>
              <div>
                이미지 추가 (최대 4장)
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div v-if="mode === 'write'" class="upload" @click="uploadPosting">
          📄 업로드
        </div>
        <div v-else class="upload" @click="editPosting">
          📄 수정하기
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
import TopBar from '@/components/main-page/TopBar'
import DropDown from '@/components/common/dropdown'

export default {
  name: 'CategoryPage',
  components: {
    TopBar,
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
        categoryId: 3,
        closedDt: "2022-09-01T06:46:13.688Z",
        ownerContact: {
          type: '',
          value: ''
        },
        recruitTotalCnt: 0,
        recruitCurrentCnt: 1,
        communicationTool: ''
      }
    }
  },
  mounted () {
    if (this.id !== undefined) {
      this.getPost()
    }
  },
  methods: {
    getPost() {
      this.$axios.get(`https://whynot-here.o-r.kr/v2/posts/${this.id}`)
      .then(res => {
        Object.keys(this.postingRegisterParams)
          .map((key) => {
            if (res.data[key] !== null) {
              this.postingRegisterParams[key] = res.data[key]
            }
            return key
          })
        
      })
    },
    setOwnerContact (item) {
      this.postingRegisterParams.ownerContact.type = item.value
    },
    setCommunicationTool (item) {
      this.postingRegisterParams.communicationTool = item.value
    },
    uploadPosting () {
      if (!this.checkRegisterParamsValid()) {
        return false
      }
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
        // 상세 페이지로 넘어가기
        alert('공고 생성 성공')
      }).catch((error) => {
        window.alert(error.response.data.message)
      })
    },
    editPosting() {
      if (!this.checkRegisterParamsValid()) {
        return false
      }
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
      }).catch((error) => {
        window.alert(error.response.data.message)
      })
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
      closedDt.setDate(closedDt.getDate() + this.d_day)
      closedDt = closedDt.toISOString()
      closedDt = closedDt.split('T')[0] + ' ' + closedDt.split('T')[1].substring(0, 5)
      this.postingRegisterParams.closedDt = closedDt
      this.postingRegisterParams.recruitTotalCnt = this.recruitTotalCntTxt * 1
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
#PostingPage {
  width: 100vw; height: 100vh;
  overflow: scroll;
  background: #FAFAFA;
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
      .title {
        font-size: 1.38rem; font-weight: 700;
      }
      .posting-group {
        margin-top: 52px;
        font-size: 1.25rem; font-weight: 500;
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
            height: 50px; line-height: 50px;
            margin-top: 12px;
            // padding-left: 12px;
            background-color: #ffffff;
            border: 1px solid #E7E7E7;
            border-radius: 8px;
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
              width: 200px; height: 28px;
              padding: 0 20px; margin: 10px 0px;
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
        width: 746px; height: 70px; line-height: 70px;
        margin: 16px 0 42px 0; padding-left: 24px;
        font-size: 1rem; font-weight: 500;
        color: #A3A3A3;
        background: #FAFAFA;
        border: 1px solid #E7E7E7;
        border-radius: 8px;
        div:first-child {
          padding: 5px 16px 0 0;
          img {
            width: 26px; height: 22px;
          }
        }
        div:nth-child(2) {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .upload {
      width: 146px; height: 47px; line-height: 47px;
      margin: 0 auto;
      font-size: 1rem; font-weight: 500;
      background: #FFFFFF;
      border: 1px solid #E1E2E3;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>