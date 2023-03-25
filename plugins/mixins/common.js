import Cookies from 'js-cookie'
import Vue from 'vue'

const common = {
  data() {
    return {
      categoryGroup: [
        {
          parentId: 0,
          parentCode: 'ALL',
          parentName: '전체',
          children: []
        },
        {
          parentId: 40,
          parentCode: 'FREE',
          parentName: '자유게시판',
          children: []
        },
        {
          parentId: 41,
          parentCode: 'ADS',
          parentName: '얼리어답터',
          children: []
        },
        {
          parentId: 42,
          parentCode: 'MUST-EAT',
          parentName: '한슐랭',
          children: []
        },
        {
          parentId: 17,
          parentCode: 'USED',
          parentName: '중고거래',
          children: [
            { id: 18, code: 'HOUSE', name: '양도', parentCode: 'USED' },
            { id: 19, code: 'TEXTBOOK', name: '전공책', parentCode: 'USED' },
            { id: 20, code: 'ETC-USED', name: '그 외', parentCode: 'USED' }
          ]
        },
        {
          parentId: 43,
          parentCode: 'LOST-FOUND',
          parentName: 'Lost & Found',
          children: []
        },
        {
          parentId: 1,
          parentCode: 'STUDY',
          parentName: '스터디',
          children: [
            { id: 2, code: 'PROJECT', name: '프로젝트', parentCode: 'STUDY' },
            { id: 3, code: 'MAJOR', name: '전공공부', parentCode: 'STUDY' },
            { id: 4, code: 'RECRUIT', name: '리쿠르팅', parentCode: 'STUDY' },
            { id: 5, code: 'ETC-STUDY', name: '그 외', parentCode: 'STUDY' }
          ]
        },
        {
          parentId: 25,
          parentCode: 'PART-JOB',
          parentName: '알바',
          children: [
            { id: 26, code: 'IN-SCHOOL', name: '교내', parentCode: 'PART-JOB' },
            {
              id: 27,
              code: 'OUT-SCHOOL',
              name: '교외',
              parentCode: 'PART-JOB'
            },
            {
              id: 28,
              code: 'ETC-PART-JOB',
              name: '그 외',
              parentCode: 'PART-JOB'
            }
          ]
        },
        {
          parentId: 21,
          parentCode: 'EXERCISE',
          parentName: '운동',
          children: [
            { id: 22, code: 'FUTSAL', name: '풋살', parentCode: 'EXERCISE' },
            { id: 23, code: 'PINGPONG', name: '탁구', parentCode: 'EXERCISE' },
            {
              id: 24,
              code: 'ETC-EXERCISE',
              name: '그 외',
              parentCode: 'EXERCISE'
            }
          ]
        },
        {
          parentId: 13,
          parentCode: 'TRANSPORT',
          parentName: '교통수단',
          children: [
            { id: 14, code: 'CARPOOL', name: '카풀', parentCode: 'TRANSPORT' },
            {
              id: 15,
              code: 'KTX',
              name: 'KTX 동반석',
              parentCode: 'TRANSPORT'
            },
            {
              id: 16,
              code: 'ETC-TRANSPORT',
              name: '그 외',
              parentCode: 'TRANSPORT'
            }
          ]
        },
        {
          parentId: 36,
          parentCode: 'GROUP-BUY',
          parentName: '공동구매',
          children: [
            { id: 37, code: 'STUFF', name: '물건', parentCode: 'GROUP-BUY' },
            { id: 38, code: 'OTT', name: 'OTT 구독', parentCode: 'GROUP-BUY' },
            {
              id: 39,
              code: 'ETC-GROUP-BUY',
              name: '그 외',
              parentCode: 'GROUP-BUY'
            }
          ]
        },
        {
          parentId: 33,
          parentCode: 'FAITH',
          parentName: '기도실',
          children: [
            { id: 34, code: 'PRAY', name: '기도모임', parentCode: 'FAITH' },
            { id: 35, code: 'ETC-FAITH', name: '그 외', parentCode: 'FAITH' }
          ]
        }
      ]
    }
  },
  computed: {
    isMobile() {
      return this.$ua.isFromSmartphone()
    },
    isTablet() {
      return this.$ua.isFromTablet()
    },
    isFromPc() {
      if (process.browser) {
        const width = window.innerWidth
        return width > 2048
      }
      return false
    }
  },
  methods: {
    cmn_setCookie(cname, cvalue, exhour) {
      const d = new Date()
      d.setTime(d.getTime() + exhour * 60 * 60 * 1000)
      const expires = 'expires=' + d.toUTCString()

      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;'
      if (window.location.href.search('127.0.0.1') > -1) {
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;'
      }
    },

    cmn_getUserInfo(accessToken) {
      this.$axios
        .get(`${process.env.apiUrl}/v2/account/info`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        })
        .then((res) => {
          this.$store.commit('userInfo/setToken', { token: accessToken })
          this.$store.commit('userInfo/setInitLoginDone', { loginDone: true })
          this.$store.commit('userInfo/setDetail', { info: res.data })
          this.cmn_setCookie('token', accessToken, 8760)
          this.$bus.$emit('refreshCard', {})
        })
    },

    cmn_getDday(endDate) {
      if (endDate === null || endDate === '') {
        return ''
      }

      // 디데이 계산
      const today = new Date()
      const end = new Date(endDate.replaceAll('-', '/'))

      const diff = (end.getTime() - today.getTime()) / (1000 * 3600 * 24)

      if (diff === 0) {
        return 'D-Day'
      } else {
        return (
          'D' +
          (diff > 0 ? '-' + Math.ceil(diff) : '+' + Math.abs(Math.ceil(diff)))
        )
      }
    },

    cmn_getPassedDay(createdDt) {
      const today = new Date()
      const createdDate = new Date(createdDt.replaceAll('-', '/'))

      const minutesDiff =
        (today.getTime() - createdDate.getTime()) / (1000 * 60)
      const day = {
        month: createdDate.getMonth().toString().padStart(2, '0'),
        date: createdDate.getDate().toString().padStart(2, '0'),
        hour: createdDate.getHours().toString().padStart(2, '0'),
        minute: createdDate.getMinutes().toString().padStart(2, '0')
      }

      if (minutesDiff >= 60) {
        return `${day.month}/${day.date} ${day.hour}:${day.minute}`
      } else {
        return `${Math.ceil(minutesDiff)}분전`
      }
    },

    cmn_emptyCheck(t) {
      if (t) {
        return String(t).trim().length === 0
      } else {
        return true
      }
    },

    cmn_goMainPage() {
      this.$router.push('/')
    },

    cmn_openAlertPopup({ option }) {
      this.$AlertPopup.popupOption.isShow = true
      this.$AlertPopup.popupOption.title = option.title
      this.$AlertPopup.popupOption.content = option.content
      this.$AlertPopup.popupOption.type = option.type
      this.$AlertPopup.popupOption.confirmText = option.confirmText
      this.$AlertPopup.popupOption.cancelText = option.cancelText
      this.$AlertPopup.popupOption.confirmCallback = option.confirmCallback

      const instance = this.$AlertPopup
      const mount = document.createElement('div')
      mount.id = 'alert-' + Date.now()
      document.body.appendChild(mount)

      instance.$mount(mount)
    },

    cmn_logout() {
      this.cmn_openAlertPopup({
        option: {
          title: '로그아웃',
          content: '로그아웃 하시겠어요?',
          type: 'confirm',
          confirmText: '네',
          cancelText: '아니오',
          confirmCallback: () => {
            this.$cookies.remove('token')

            this.$store.commit('userInfo/setToken', { token: '' })
            this.$store.commit('userInfo/setInitLoginDone', {
              loginDone: false
            })
            this.$store.commit('userInfo/setDetail', { info: null })

            Cookies.remove('vuex')
            this.$bus.$emit('refreshCard', {})
            this.cmn_goMainPage()
          }
        }
      })
    },

    cmn_auto_logout() {
      this.$cookies.remove('token')

      this.$store.commit('userInfo/setToken', { token: '' })
      this.$store.commit('userInfo/setInitLoginDone', { loginDone: false })
      this.$store.commit('userInfo/setDetail', { info: null })

      Cookies.remove('vuex')
      this.$bus.$emit('refreshCard', {})
      this.cmn_goMainPage()
    },

    async copySomething(text) {
      try {
        await this.$copyText(text)
      } catch (e) {}
    },

    toastPopup(text) {
      this.$toasted.show(text, {
        position: 'bottom-right',
        duration: 1500
      })
    }
  }
}

Vue.mixin(common)
