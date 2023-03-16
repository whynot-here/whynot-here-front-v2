<template>
  <div v-if="isFromPc" id="MyPage">
    <TopBarOnly class="top-bar-desktop" />
    <section class="mypage-wrp">
      <div class="close">
        <img
          src="@/assets/img/common/close-page.png"
          alt=""
          @click="$router.go(-1)"
        />
      </div>
      <div class="title">내정보</div>
      <div class="sub-title">
        안녕하세요 <strong>{{ currentNickName }}</strong> 님!
      </div>
      <div class="img-nickname-grp">
        <div class="img">
          <img :src="$store.state.userInfo.detail.profileImg" alt="" />
        </div>
        <div v-if="!editNickNameMode" class="nickname">
          <div class="nickname-left">닉네임</div>
          <div @click="editNickNameMode = true">
            {{ currentNickName }}
          </div>
        </div>
        <div v-else class="nickname selected">
          <div class="nickname-left">닉네임</div>
          <div class="edit-input-wrp">
            <input v-model="inputNickName" class="edit-input" type="text" />
          </div>
          <div class="edit-button-wrp">
            <div @click="editNickName()">저장</div>
          </div>
        </div>
      </div>
      <div class="email">
        <input
          type="text"
          :value="$store.state.userInfo.detail.email"
          disabled
        />
      </div>
      <div class="delete-account" @click="openDeleteAccountPopup()">
        회원탈퇴 >
      </div>
    </section>
  </div>
  <div v-else id="m-MyPage">
    <section class="m-mypage-wrp">
      <div class="m-mypage-header">
        <div class="m-title">마이페이지</div>
        <div class="m-close">
          <img
            class="m-back-btn"
            src="@/assets/img/common/close-review.png"
            alt=""
            @click="$router.go(-1)"
          />
        </div>
      </div>

      <div class="m-mypage-body" @click.self="editNickNameMode = false">
        <div>
          <img
            class="m-profile-img"
            :src="$store.state.userInfo.detail.profileImg"
            alt=""
          />
          <img
            class="m-profile-edit-btn"
            src="@/assets/img/common/edit-img-btn.png"
            alt=""
          />
        </div>

        <div class="m-nickname-left">닉네임</div>
        <div :class="editNickNameMode ? 'm-nickname m-selected' : 'm-nickname'">
          <div class="m-nickname-content">
            <input
              ref="cursor"
              v-model="inputNickName"
              class="m-edit-input"
              type="text"
              @focus="editNickNameModeToggle(true)"
            />
          </div>
          <div class="m-edit-button-wrp">
            <div @click="editNickName()">확인</div>
          </div>
        </div>

        <div class="m-email">
          <input
            type="text"
            :value="
              $store.state.userInfo.detail.email.length == 0 ||
              $store.state.userInfo.detail.email == undefined ||
              $store.state.userInfo.detail.email == null
                ? '이메일 제공 없음'
                : $store.state.userInfo.detail.email
            "
            disabled
          />
        </div>
        <div class="m-delete-account" @click="openDeleteAccountPopup()">
          <div class="title">회원탈퇴</div>
          <div class="right-arrow">
            <img src="@/assets/img/common/right-arrow.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TopBarOnly from '@/components/main-page/TopBarOnly'

export default {
  name: 'MyPage',
  components: {
    TopBarOnly
  },
  data() {
    return {
      editNickNameMode: false,
      currentNickName: '',
      inputNickName: ''
    }
  },
  mounted() {
    // mobile or pc
    this.currentNickName = this.$store.state.userInfo.detail.nickname
    this.inputNickName = this.$store.state.userInfo.detail.nickname
  },
  methods: {
    editNickNameModeToggle(type) {
      this.editNickNameMode = type
    },
    editNickName() {
      this.$axios
        .post(
          `${process.env.apiUrl}/v2/account/nickname`,
          {
            nickname: this.inputNickName
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
          this.cmn_getUserInfo(this.$store.state.userInfo.token)
          this.editNickNameMode = false
          this.currentNickName = this.inputNickName
        })
        .catch((error) => {
          this.cmn_openAlertPopup({
            option: {
              title: '⚠️알림',
              content: error.response.data.message,
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
        })
    },
    openDeleteAccountPopup() {
      this.cmn_openAlertPopup({
        option: {
          content: '정말 회원탈퇴 하시겠어요?.?ㅠㅠ',
          type: 'confirm',
          confirmText: '네',
          cancelText: '아니요',
          confirmCallback: () => {
            this.deleteAccount()
          }
        }
      })
    },
    deleteAccount() {
      this.$axios
        .delete(`${process.env.apiUrl}/v2/account`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.cmn_openAlertPopup({
            option: {
              content: '회원탈퇴가 정상적으로 되었습니다:)',
              type: 'alert',
              confirmText: '확인',
              cancelText: '',
              confirmCallback: () => {
                this.cmn_auto_logout()
              }
            }
          })
        })
        .catch((error) => {
          window.alert(error.response.data.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/my-page/my-page.scss';
</style>
