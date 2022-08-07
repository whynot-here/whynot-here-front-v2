<template>
  <div></div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted () {
    if (this.$route.query.accessToken) {
      this.cmn_getUserInfo(this.$route.query.accessToken)
    } else {
      this.$router.push('/gather/study')
    }
    // } else if (window.$cookies.get('token') !== null) {
    //   const token = window.$cookies.get('token')
    //   this.cmn_getUserInfo(token)
    //   this.$router.push('/project')
    // } else {
    //   this.$router.push('/project')
    // }
  },
  methods: {
    // getUserInfo (accessToken) {
    //   (this.$axios.get(
    //     // ('https://whynot-here.o-r.kr/v2/account/info'),
    //     ('http://localhost:9000/v2/account/info'),
    //     {
    //       withCredentials: true,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: accessToken
    //       }
    //     }
    //   )
    //   ).then(res => {
    //     this.$store.commit('userInfo/setToken', { token: accessToken })
    //     this.$store.commit('userInfo/setUserInfo', { info: res.data })
    //     this.cmn_setCookie('token', accessToken, 8760)

    //     // this.$router.push('/project')
    //   })
    // }
  }
}
</script>
