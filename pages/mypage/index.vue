<template>
  <div id="MyPage">
    <TopBar />
    <section class="mypage-wrp">
      <div class="title">
        마이페이지
      </div>
      <div class="sub-title">
        프로필
      </div>
      <div class="img-nickname-grp">
        <div class="img"><img :src="$store.state.userInfo.detail.profileImg" alt=""></div>
        <div v-if="!editNickNameMode" class="nickname">
          <div>
            {{ currentNickName }}
          </div>
          <div class="edit-pencil">
            <img src="@/assets/img/common/edit-pencil.png" alt="" @click="editNickNameMode = true">
          </div>
        </div>
        <div v-else class="nickname">
          <div class="edit-input">
            <input v-model="inputNickName" type="text">
          </div>
          <div class="edit-button">
            <div @click="editNickName()">완료</div>
          </div>
        </div>
      </div>
      <div class="email">
        <input type="text" :value="$store.state.userInfo.detail.email" disabled>
      </div>
    </section>
  </div>
</template>

<script>
import TopBar from '@/components/main-page/TopBar'

export default {
  name: 'MyPage',
  components: {
    TopBar
  },
  data () {
    return {
      editNickNameMode: false,
      currentNickName: '',
      inputNickName: ''
    }
  },
  mounted () {
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
#MyPage {
  .mypage-wrp {
    width: 1032px; height: 385px;
    margin: 0 auto; padding-top: 117px;
    .title {
      font-size: 1.63rem; font-weight: 700;
    }
    .sub-title {
      margin-top: 39px;
      font-size: 1.5rem; font-weight: 500;
    }
    .img-nickname-grp {
      text-align: center;
      .img {
        img {
          border-radius: 20px;
        }
      }
      .nickname {
        display: flex;
        width: max-content;
        margin: 10px auto;
        font-size: 1.25rem; font-weight: 500;
        color: #454545;
        .edit-pencil {
          img {
            width: 15px; height: 23px;
            padding: 6px 10px;
            cursor: pointer;
          }
        }
        .edit-input {
          input {
            font-size: 1.25rem; font-weight: 500;
            padding: 5px 12px;
            border: 1px solid #ccc;
            border-radius: 10px;
          }
        }
        .edit-button {
          width: 50px; height: 30px; line-height: 30px;
          margin-left: 10px;
          border-radius: 10px;
          background-color: #eee;
          font-size: 1rem;
        }
      }
    }
    .email {
      width: 502px; height: 52px; 
      margin: 0 auto;
      input {
        width: 100%; line-height: 52px;
        padding-left: 12px;
        font-size: 1rem;
        color: #A3A3A3;
        background-image: #FFFFFF;
        border: 1px solid #E7E7E7;
        border-radius: 8px;
      }
    }
  }
}
</style>