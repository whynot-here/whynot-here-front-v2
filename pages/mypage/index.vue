<template>
  <div id="MyPage">
    <div v-if="!isMobile">
      pcpc
      <TopBarOnly class="top-bar-desktop" />
    <section class="mypage-wrp">
      <div class="close">
        <img src="@/assets/img/common/close-page.png" alt="" @click="cmn_goMainPage">
      </div>
      <div class="title">
        마이페이지
      </div>
      <div class="sub-title">
        안녕하세요 <strong>{{currentNickName}}</strong> 님!
      </div>
      <div class="img-nickname-grp">
        <div class="img"><img :src="$store.state.userInfo.detail.profileImg" alt=""></div>
        <div v-if="!editNickNameMode" class="nickname">
          <div class="nickname-left">
            닉네임
          </div>
          <div @click="editNickNameMode = true">
            {{ currentNickName }}
          </div>
          <!-- <div class="edit-pencil">
            <img src="@/assets/img/common/edit-pencil.png" alt="" @click="editNickNameMode = true">
          </div> -->
        </div>
        <div v-else class="nickname selected">
          <div class="nickname-left">
            닉네임
          </div>
          <div class="edit-input-wrp">
            <input v-model="inputNickName" class="edit-input" type="text">
          </div>
          <div class="edit-button-wrp">
            <div @click="editNickName()">저장</div>
          </div>
        </div>
      </div>
      <div class="email">
        <input type="text" :value="$store.state.userInfo.detail.email" disabled>
      </div>
    </section>
    </div>
    <div v-else>
      mobile
      <section class="mypage-wrp">
        <div class="close">
          <img src="@/assets/img/common/close-page.png" alt="" @click="cmn_goMainPage">
        </div>
        <div class="title">
          마이페이지
        </div>
        <div class="sub-title">
          안녕하세요 <strong>{{currentNickName}}</strong> 님!
        </div>
        <div class="img-nickname-grp">
          <div class="img"><img :src="$store.state.userInfo.detail.profileImg" alt=""></div>
          <div v-if="!editNickNameMode" class="nickname">
            <div class="nickname-left">
              닉네임
            </div>
            <div @click="editNickNameMode = true">
              {{ currentNickName }}
            </div>
            <!-- <div class="edit-pencil">
              <img src="@/assets/img/common/edit-pencil.png" alt="" @click="editNickNameMode = true">
            </div> -->
          </div>
          <div v-else class="nickname selected">
            <div class="nickname-left">
              닉네임
            </div>
            <div class="edit-input-wrp">
              <input v-model="inputNickName" class="edit-input" type="text">
            </div>
            <div class="edit-button-wrp">
              <div @click="editNickName()">저장</div>
            </div>
          </div>
        </div>
        <div class="email">
          <input type="text" :value="$store.state.userInfo.detail.email" disabled>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import TopBarOnly from '@/components/main-page/TopBarOnly'

export default {
  name: 'MyPage',
  components: {
    TopBarOnly
  },
  data () {
    return {
      editNickNameMode: false,
      currentNickName: '',
      inputNickName: ''
    }
  },
  mounted () {
    // mobile or pc
    this.currentNickName = this.$store.state.userInfo.detail.nickname
    this.inputNickName = this.$store.state.userInfo.detail.nickname
  },
  methods: {
    editNickName () {
      (this.$axios.post(
        ('https://whynot-here.o-r.kr/v2/account/nickname'),
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
      ).then(res => {
        this.cmn_getUserInfo(this.$store.state.userInfo.token)
        this.editNickNameMode = false
        this.currentNickName = this.inputNickName
      }).catch((error) => {
        window.alert(error.response.data.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/util.scss';

#MyPage {
  @include mobile {
    .top-bar-desktop {
      display: none;
    }
  }
  .mypage-wrp {
    width: 970px; height: 572px;
    margin: 0 auto; padding-top: 123px;
    .close {
      img {
        width: 32px; height: 32px;
        cursor: pointer;
      }
    }
    .title {
      font-size: 1.38rem; font-weight: 500;
      color: #737373;
    }
    .sub-title {
      margin-top: 24px;
      font-size: 2rem; font-weight: 600;
      strong {
        color: #3E82F1;
      }
    }
    .img-nickname-grp {
      margin-top: 120px;
      text-align: center;
      .img {
        img {
          border-radius: 24px;
          box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 4px 8px rgba(0, 52, 138, 0.06);
        }
      }
      .nickname {
        &.selected {
          border: 1px solid #3E82F1;
        }
        display: flex;
        width: 370px; height: 56px;
        margin: 32px auto 0 auto;
        font-size: 1rem; font-weight: 500;
        color: #454545;
        background: #FFFFFF;
        border: 1px solid #EFEFEF;
        border-radius: 12px;
        .nickname-left {
          width: 65px; height: 18px;
          margin-top: 20px;
          border-right: 1px solid #EFEFEF;
          font-size: .88rem;
          color: #C8C8C8
        }
        div:nth-child(2) {
          line-height: 56px;
          padding-left: 12px;
          text-align: left;
          flex-grow: 1;
          cursor: pointer;
        }
        .edit-pencil {
          img {
            width: 15px; height: 23px;
            padding: 6px 10px;
            cursor: pointer;
          }
        }
        .edit-input-wrp {
          .edit-input {
            font-size: 1rem; font-weight: 500;
            padding: 12px;
            border: none;
            border-radius: 10px;
          }
          .edit-input:focus {
            outline: none;
          }
        }
        .edit-button-wrp {
          width: 50px; height: 28px; line-height: 28px;
          margin: 14px 16px;
          background: #F3F3F3;
          border-radius: 16px;
          font-size: 1rem; font-weight: 500;
          color: #3E82F1;
          cursor: pointer;
        }
      }
    }
    .email {
      width: 370px; height: 56px; line-height: 56px;
      margin: 24px auto;
      input {
        width: 100%; height: 100%;
        padding-left: 12px;
        font-size: 1rem;
        color: #A3A3A3;
        background: #EFEFEF;
        border-radius: 12px;
        border: none;
        text-align: center;
      }
    }
  }
}
</style>