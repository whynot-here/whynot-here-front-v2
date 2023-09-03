<template>
  <div id="BlockAccount">
    <section class="top-title">
      <div class="_01" @click="$router.go(-1)">
        <img src="@/assets/img/block-account/back-arrow.png" alt="" />
      </div>
      <div class="_02">차단한 계정</div>
      <div class="_01"></div>
    </section>
    <section class="content">
      <div v-for="(item, idx) in blockAccountComp" :key="idx">
        <div class="card-wrp">
          <div class="_01">
            <div class="left">
              <img :src="item.profileImg" alt="" />
            </div>
            <div class="right">
              <div>{{ item.name }}</div>
              <div>{{ item.createdDt }}</div>
            </div>
          </div>
          <div class="_02">
            <div @click="deleteBlockAccount(item.accountId)">차단해제</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BlockAccount',
  components: {},
  data() {
    return {
      blockAccount: []
    }
  },
  computed: {
    blockAccountComp() {
      return this.blockAccount
    }
  },
  mounted() {
    this.getBlockAccount()
  },
  methods: {
    getBlockAccount() {
      this.$axios
        .get(`${process.env.apiUrl}/v2/account/block-account`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.blockAccount = []
          res.data.map((res) => {
            return this.blockAccount.push(res)
          })
        })
    },
    deleteBlockAccount(accountId) {
      this.$axios
        .delete(`${process.env.apiUrl}/v2/account/block-account/${accountId}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          setTimeout(() => {
            this.getBlockAccount()
          }, 2000)
        })
        .catch((error) => {
          // window.alert(error.response.data.message)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/block-account/block-account.scss';
</style>
