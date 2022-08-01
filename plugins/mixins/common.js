import Cookies from 'js-cookie'
import Vue from 'vue'

const common = {
  data () {
    return {}
  },
  computed: {},
  methods: {
    cmn_setCookie (cname, cvalue, exhour) {
      const d = new Date()
      d.setTime(d.getTime() + (exhour * 60 * 60 * 1000))
      const expires = 'expires=' + d.toUTCString()
      // todo: 배포시 분리 필요
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;'
      if (window.location.href.search('127.0.0.1') > -1) {
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;'
      } else {
        // document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;domain=;'
      }
    },
    cmn_getUserInfo (accessToken) {
      (this.$axios.get(
        // ('https://whynot-here.o-r.kr/v2/account/info'),
        ('http://localhost:9000/v2/account/info'),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        }
      )
      ).then(res => {
        this.$store.commit('userInfo/setToken', { token: accessToken })
        this.$store.commit('userInfo/setInitLoginDone', { loginDone: true })
        this.$store.commit('userInfo/setDetail', { info: res.data })
        this.cmn_setCookie('token', accessToken, 8760)

        this.$router.push('/project')
      })
    },
    cmn_logout () {
      if (window.confirm('로그아웃 하시겠어요?')) {
        this.$cookies.remove('token')
        
        this.$store.commit('userInfo/setToken', { token: '' })
        this.$store.commit('userInfo/setInitLoginDone', { loginDone: false })
        this.$store.commit('userInfo/setDetail', { info: null })

        Cookies.remove('vuex')
        // this.$router.replace('/project')
      }

    }
  }
}

Vue.mixin(common)