<template>
  <div>
    로그인 완료!
    <!-- <TopBar /> -->
  </div>
</template>

<script>
// import TopBar from '@/components/main-page/TopBar'

export default {
  name: 'RedirectLogin',
  components: {
    // TopBar
  },
  // middleware: 'auth',
  data () {
    return {
    }
  },
  mounted () {
    // console.log('hihih')
    // console.log(JSON.stringify(this.$auth.$state, undefined, 2))
    // (this.$axios.get('/api/v2/sign-in'),
    //   JSON.stringify({
    //     "email": "whynot-user@email.com",
    //     "password": 12345678
    //   }),
    //   {
    //     withCredentials: true,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer asdfadsfasdfsdfasf`
    //     }
    //   }
    // ).then(res => {
    //   res.data.map((res) => {
    //     return this.postsList.push(res)
    //   })
    // })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>