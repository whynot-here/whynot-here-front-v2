<template>
  <div id="AuthPage">
    <NuxtLoadingIndicator v-if="isLoading" />
    <section v-if="!isLoading" class="m-authpage-wrp">
      <div class="m-authpage-header">
        <div class="m-title" />
        <div class="m-close">
          <img
            class="m-back-btn"
            src="@/assets/img/common/close-review.png"
            alt=""
            @click="cmn_goMainPage"
          />
        </div>
      </div>
      <div v-if="!isAuthComplete" class="m-authpage-middle">
        <div class="title">학교 인증</div>
        <div class="description">
          카카오톡 - 더보기 - 톡학생증 앞/뒤 캡쳐 <br />
          (재학생일 경우 대학생카드 / 졸업생일 경우 졸업생 카드)
        </div>
        <section class="img-upload">
          <div v-if="currentStep == 1" class="step1">
            <div class="upload-ex">
              <img
                src="@/assets/img/auth/kakao-student-card-ex-01.png"
                alt=""
              />
            </div>
            <div class="upload-desc">예시 사진 앞/뒤</div>
          </div>
          <div
            v-if="currentStep == 2 || currentStep == 3"
            :class="inputImgFront.length > 0 ? 'step2 empty' : 'step2'"
          >
            <div class="upload-img">
              <div class="upload-img-btn-wrp">
                <img src="@/assets/img/auth/add-btn.png" alt="" />
              </div>
            </div>
            <b-form-group id="fileInput" class="authpage">
              <b-form-file
                accept="image/jpeg, image/png, image/gif"
                @change="onFileChangeFront"
              ></b-form-file>
            </b-form-group>
            <div
              v-if="inputImgFront && inputImgFront.length > 0"
              class="img-grp"
            >
              <div id="Images">
                <div>
                  <b-img
                    thumbnail
                    :src="inputImgFront[0].prev_url"
                    class="obj"
                  />
                </div>
                <div>
                  <img
                    src="@/assets/img/auth/auth-img-edit.png"
                    alt=""
                    class="edit-btn"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="currentStep == 2 || currentStep == 3"
            class="upload-img-desc"
          >
            앞면
          </div>
          <div
            v-if="currentStep == 2 || currentStep == 3"
            :class="inputImgBack.length > 0 ? 'step2 empty' : 'step2'"
          >
            <div class="upload-img">
              <div class="upload-img-btn-wrp">
                <img src="@/assets/img/auth/add-btn.png" alt="" />
              </div>
            </div>
            <b-form-group id="fileInput" class="authpage">
              <b-form-file
                accept="image/jpeg, image/png, image/gif"
                @change="onFileChangeBack"
              ></b-form-file>
            </b-form-group>
            <div v-if="inputImgBack && inputImgBack.length > 0" class="img-grp">
              <div id="Images">
                <div>
                  <b-img
                    thumbnail
                    :src="inputImgBack[0].prev_url"
                    class="obj"
                  />
                  <div>
                    <img
                      src="@/assets/img/auth/auth-img-edit.png"
                      alt=""
                      class="edit-btn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="currentStep == 2 || currentStep == 3"
            class="upload-img-desc"
          >
            뒷면
          </div>
        </section>
      </div>
      <section v-if="!isAuthComplete" class="reg-btn">
        <div v-if="currentStep == 1" class="step1" @click="currentStep = 2">
          확인 했어요
        </div>
        <div v-if="currentStep == 2" class="step2">인증 완료하기</div>
        <div
          v-if="currentStep == 3"
          class="step3"
          :class="{disabled: isClickedSubmit}"
          @click="authComplete({ type: 'register' })"
        >
          인증 완료하기
        </div>
      </section>
      <div v-else-if="isAuthEditPage" class="m-authpage-middle">
        <div class="title">학교 인증</div>
        <div v-if="!imgAuthenticated" class="description">
          빠른 시일 내로 학생증 인증을 완료해드리겠습니다. <br />
          사진을 클릭하면 사진 수정도 가능합니다.
        </div>
        <div v-else class="description">학교 인증이 완료되었습니다.</div>
        <section class="img-upload">
          <div class="step2">
            <div v-if="inputImgFront.length === 0" class="uploaded-img">
              <div>
                <img :src="inputAuthImgFront" alt="" />
              </div>
            </div>
            <b-form-group
              v-if="!imgAuthenticated"
              id="fileInput"
              class="authpage authpage-edit"
            >
              <b-form-file
                accept="image/jpeg, image/png, image/gif"
                @change="onFileChangeFront"
              ></b-form-file>
            </b-form-group>
            <div
              v-if="inputImgFront && inputImgFront.length > 0"
              class="img-grp"
            >
              <div id="Images" class="edit">
                <div v-for="(image, idx) in inputImgFront" :key="idx">
                  <b-img
                    thumbnail
                    :src="inputImgFront[0].prev_url"
                    class="obj"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="step2">
            <div v-if="inputImgBack.length === 0" class="uploaded-img">
              <div>
                <img :src="inputAuthImgBack" alt="" />
              </div>
            </div>
            <b-form-group
              v-if="!imgAuthenticated"
              id="fileInput"
              class="authpage authpage-edit"
            >
              <b-form-file
                accept="image/jpeg, image/png, image/gif"
                @change="onFileChangeBack"
              ></b-form-file>
            </b-form-group>
            <div v-if="inputImgBack && inputImgBack.length > 0" class="img-grp">
              <div id="Images" class="edit">
                <div v-for="(image, idx) in inputImgBack" :key="idx">
                  <b-img
                    thumbnail
                    :src="inputImgBack[0].prev_url"
                    class="obj"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="reg-btn">
          <div v-if="!imgAuthenticated && currentStep == 2" class="step2">
            수정하기
          </div>
          <div
            v-else-if="!imgAuthenticated && currentStep == 3"
            :class="{disabled: isClickedSubmit}"
            class="step3"
            @click="authComplete({ type: 'edit' })"
          >
            수정하기
          </div>
          <div v-else class="go-main-btn step1" @click="cmn_goMainPage">
            홈화면으로 가기
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import NuxtLoadingIndicator from '@/components/common/LoadingBar'

export default {
  name: 'AuthPage',
  components: {
    NuxtLoadingIndicator
  },
  asyncData({ params }) {
    return {
      token: params.token
    }
  },
  data() {
    return {
      isAuthComplete: false, // 학교 인증 화면 내에서 사진 제출 여부
      isAuthEditPage: false, // 학생증 수정 화면인지 여부
      imgAuthenticated: false, // 관리자가 인증했는지 여부

      currentStep: 1,
      filesFront: [],
      filesBack: [],
      inputImgFront: [],
      inputImgBack: [],
      inputAuthImgFront: '',
      inputAuthImgBack: '',
      dir: '',
      isLoading: true,
      isClickedSubmit: false,
    }
  },
  watch: {
    isLoading(newValue) {
      this.$nextTick(() => {
        if (newValue) {
          this.$nuxt.$loading.start()
        } else {
          this.$nuxt.$loading.finish()
        }
      })
    }
  },
  mounted() {
    // token 업데이트 API 추가

    const token = this.$route.query.token
    if (token != null) {
      this.updateDeviceToken(token)
    }

    this.getMyAuthImg().then(() => {
      this.isLoading = false
    })

    this.cmn_updateAccessToken()
  },
  methods: {
    async getMyAuthImg() {
      await this.$axios
        .get(`${process.env.apiUrl}/v2/student/img-kakao`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          if (res.data.imgUrl !== null) {
            if (res.data.imgUrl.length > 0) {
              this.isAuthEditPage = true
              this.isAuthComplete = true
              this.inputAuthImgFront = res.data.imgUrl
              this.inputAuthImgBack = res.data.backImgUrl
              this.imgAuthenticated = res.data.authenticated
              if (!this.imgAuthenticated) {
                this.currentStep = 2
              } else {
                this.currentStep = 1
              }
            }
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
    // 사진 선택
    onFileChangeFront(event) {
      const input = event.target.files
      if (input.length > 0) {
        for (let i = 0; i < input.length; i++) {
          const fileReader = new FileReader()
          fileReader.onload = (e) => {
            this.inputImgFront = []
            this.inputImgFront.push({
              prev_url: e.target.result,
              isNew: true
            })
            if (!this.imgAuthenticated && this.isAuthEditPage) {
              if (
                this.inputImgFront.length > 0 ||
                this.inputImgBack.length > 0
              ) {
                this.currentStep = 3
              }
            } else if (!this.isAuthComplete && !this.isAuthEditPage) {
              if (
                this.inputImgFront.length > 0 &&
                this.inputImgBack.length > 0
              ) {
                this.currentStep = 3
              }
            }
          }
          fileReader.readAsDataURL(input[i])
          this.filesFront = []
          this.filesFront.push(input[i])
        }
        event.target.value = ''
      }
    },
    onFileChangeBack(event) {
      const input = event.target.files
      if (input.length > 0) {
        for (let i = 0; i < input.length; i++) {
          const fileReader = new FileReader()
          fileReader.onload = (e) => {
            this.inputImgBack = []
            this.inputImgBack.push({
              prev_url: e.target.result,
              isNew: true
            })
            if (!this.imgAuthenticated && this.isAuthEditPage) {
              if (
                this.inputImgFront.length > 0 ||
                this.inputImgBack.length > 0
              ) {
                this.currentStep = 3
              }
            } else if (!this.isAuthComplete && !this.isAuthEditPage) {
              if (
                this.inputImgFront.length > 0 &&
                this.inputImgBack.length > 0
              ) {
                this.currentStep = 3
              }
            }
          }
          fileReader.readAsDataURL(input[i])
          this.filesBack = []
          this.filesBack.push(input[i])
        }
        event.target.value = ''
      }
    },
    authComplete({ type }) {
      if (this.isClickedSubmit) {
        return;
      }
      this.isClickedSubmit = true;

      if (type === 'register') {
        Promise.all([
          this.registerAuthImgFront(),
          this.registerAuthImgBack()
        ]).then((result) => {
          this.registerAuthImgUrl()
          this.cmn_openCompleteModal({
            option: {
              imageUrl: require('@/assets/img/blind-date/auth-complete.png'),
              title: '학생증 인증 완료까지',
              time: '한시간',
              isContactPopup: false,
              confirmCallback: this.cmn_goMainPage
            }
          })
        })
      } else if (type === 'edit') {
        if (this.inputImgFront.length > 0 && this.inputImgBack.length === 0) {
          Promise.all([this.registerAuthImgFront()]).then((result) => {
            this.editAuthImgUrl()
            this.cmn_openCompleteModal({
              option: {
                imageUrl: require('@/assets/img/blind-date/auth-complete.png'),
                title: '학생증 인증 완료까지',
                time: '한시간',
                isContactPopup: false,
                confirmCallback: this.cmn_goMainPage
              }
            })
          })
        } else if (
          this.inputImgFront.length === 0 &&
          this.inputImgBack.length > 0
        ) {
          Promise.all([this.registerAuthImgBack()]).then((result) => {
            this.editAuthImgUrl()
            this.cmn_openCompleteModal({
              option: {
                imageUrl: require('@/assets/img/blind-date/auth-complete.png'),
                title: '학생증 인증 완료까지',
                time: '한시간',
                isContactPopup: false,
                confirmCallback: this.cmn_goMainPage
              }
            })
          })
        } else if (
          this.inputImgFront.length > 0 &&
          this.inputImgBack.length > 0
        ) {
          Promise.all([
            this.registerAuthImgFront(),
            this.registerAuthImgBack()
          ]).then((result) => {
            this.editAuthImgUrl()
            this.cmn_openCompleteModal({
              option: {
                imageUrl: require('@/assets/img/blind-date/auth-complete.png'),
                title: '학생증 인증 완료까지',
                time: '한시간',
                isContactPopup: false,
                confirmCallback: this.cmn_goMainPage
              }
            })
          })
        }
      }
    },
    registerAuthImgFront() {
      return new Promise((resolve, reject) => {
        // 학생증 앞면 사진 저장
        const formDataFront = new FormData()
        formDataFront.append('images', this.filesFront[0])
        const cur = new Date()
        const year = (cur.getFullYear() + '').substring(2)
        const month = cur.getMonth() + 1 + ''
        this.dir = 'auth-' + year + '-' + month
        this.$axios
          .post(`${process.env.apiUrl}/images/${this.dir}`, formDataFront, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            this.inputAuthImgFront = res.data.url
            this.inputImgFront = []
            this.filesFront = []
            resolve('UPLOAD_COMPLETE')
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
            reject(error)
          })
      })
    },
    registerAuthImgBack() {
      return new Promise((resolve, reject) => {
        // 학생증 뒷면 사진 저장
        const formDataBack = new FormData()
        formDataBack.append('images', this.filesBack[0])
        const cur = new Date()
        const year = (cur.getFullYear() + '').substring(2)
        const month = cur.getMonth() + 1 + ''
        this.dir = 'auth-' + year + '-' + month
        return this.$axios
          .post(`${process.env.apiUrl}/images/${this.dir}`, formDataBack, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            this.inputAuthImgBack = res.data.url
            this.inputImgBack = []
            this.filesBack = []
            resolve('UPLOAD_COMPLETE')
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
            reject(error)
          })
      })
    },
    registerAuthImgUrl() {
      this.$axios
        .post(
          `${process.env.apiUrl}/v2/student/request-auth-kakao`,
          {
            imgUrl: this.inputAuthImgFront,
            backImgUrl: this.inputAuthImgBack
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
        )
        .then((res) => {
          this.isAuthComplete = true
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
        })
    },
    editAuthImgUrl() {
      this.$axios
        .put(
          `${process.env.apiUrl}/v2/student/request-auth-kakao`,
          {
            imgUrl: this.inputAuthImgFront,
            backImgUrl: this.inputAuthImgBack
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
        )
        .then((res) => {
          this.isAuthComplete = true
          this.isAuthEditPage = false
        })
        .catch((error) => {
          console.log(error)
          // window.alert(error.response.data.message)
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content:
                '기존에 신청한 인증을 처리 중입니다! 기존 인증 이후 24시간이 지나도 인증이 안되었을 경우 WHYNOT 이메일로 문의주세요!',
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
        })
    },
    updateDeviceToken(token) {
      this.$axios.put(
        `${process.env.apiUrl}/v2/account/device-token`,
        {
          token
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
#AuthPage {
  .m-authpage-wrp {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    .m-authpage-header {
      height: 60px;
      line-height: 60px;
      padding: 20px 20px 0 20px;
      display: flex;
      .m-title {
        font-size: 1.13rem;
        color: #181818;
        font-weight: 500;
        flex-grow: 1;
      }

      .m-close {
        width: 24px;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
    .m-authpage-middle {
      // height: calc(100vh - 140px);

      flex-grow: 1;
      padding: 8px 0px 24px 0px;
      .title {
        padding: 0 20px;
        color: #14428d;
        font-size: 1.5rem;
        font-weight: 600;
      }
      .description {
        color: #0c2958;

        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 19.6px */
        letter-spacing: -0.07px;

        padding: 12px 20px 0 20px;
        strong {
          font-weight: 500;
        }
      }
      .img-upload {
        // padding-bottom: 100px;
        padding: 0 20px;
        .step1 {
          .upload-ex {
            margin-top: 32px;
            height: 340px;
            text-align: center;
            img {
              height: 340px;
            }
          }
          .upload-desc {
            padding-top: 16px;
            color: var(--gray-50, #a3a3a3);
            font-family: Pretendard;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%; /* 24px */
            letter-spacing: -0.08px;
            text-align: center;
          }
        }
        .step2 {
          border-radius: 12px;
          border: 1px solid var(--gray-20, #e7e7e7);
          background: #fafafa;
          height: 360px;
          margin-top: 32px;
          text-align: center;
          &.empty {
            background-color: #1f1f1f;
          }
          .upload-img {
            .upload-img-btn-wrp {
              padding-top: 162px;
              img {
                width: 40px;
                height: 40px;
              }
            }
          }
          .uploaded-img {
            div {
              img {
                width: 205px;
                height: 339px;
              }
            }
          }
          #Images {
            margin-top: -347px;
            .obj {
              max-width: 340px;
              height: 300px;
              border-radius: 12px;
              object-fit: contain;
            }
            .edit-btn {
              width: 127px;
            }
          }
          .edit {
            margin-top: 0px !important;
          }
        }
        .upload-img-desc {
          padding-top: 16px;
          color: #454545;

          font-family: Pretendard;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 24px */
          letter-spacing: -0.08px;

          text-align: center;
        }
      }
    }
    .reg-btn {
      // position: fixed;
      // width: calc(100% - 40px);
      height: 50px;
      // margin-bottom: 20px;
      padding: 20px;
      line-height: 50px;
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
      // bottom: 24px;
      color: #fff;
      .step1 {
        background-color: #3e82f1;
        border-radius: 8px;
      }
      .step2 {
        background-color: #d9d9d9;
        border-radius: 8px;
      }
      .step3 {
        background-color: #3e82f1;
        border-radius: 8px;
      }

      .disabled {
        background-color: rgba(235, 235, 235, 1);
        border: 1px solid rgba(217, 229, 244, 1);
      }
    }
  }
}
</style>
