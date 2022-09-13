import Cookies from 'js-cookie'
import Vue from 'vue'

const common = {
  data() {
    return {
      // category: '',
      // subCategory: '',
      // categoryTitle: '',
      // subCategoryTitle: '',
      categoryGroup: [
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
          parentId: 6,
          parentCode: 'FRIEND',
          parentName: '친목',
          children: [
            { id: 7, code: 'WALK', name: '산책', parentCode: 'FRIEND' },
            { id: 8, code: 'NIGHT', name: '야식모임', parentCode: 'FRIEND' },
            { id: 9, code: 'TEA', name: '티타임', parentCode: 'FRIEND' },
            { id: 10, code: 'DATING', name: '소개팅', parentCode: 'FRIEND' },
            { id: 11, code: 'ALCOHOL', name: '알코올', parentCode: 'FRIEND' },
            { id: 12, code: 'ETC-FRIEND', name: '그 외', parentCode: 'FRIEND' }
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
          parentId: 29,
          parentCode: 'GAME',
          parentName: '게임',
          children: [
            { id: 30, code: 'BOARD', name: '보드게임', parentCode: 'GAME' },
            { id: 31, code: 'ROL', name: '롤', parentCode: 'GAME' },
            { id: 32, code: 'ETC-GAME', name: '그 외', parentCode: 'GAME' }
          ]
        },
        {
          parentId: 33,
          parentCode: 'FAITH',
          parentName: '신앙',
          children: [
            { id: 34, code: 'PRAY', name: '기도모임', parentCode: 'FAITH' },
            { id: 35, code: 'ETC-FAITH', name: '그 외', parentCode: 'FAITH' }
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
        }
      ]
    }
  },
  computed: {},
  methods: {
    cmn_setCookie(cname, cvalue, exhour) {
      const d = new Date()
      d.setTime(d.getTime() + exhour * 60 * 60 * 1000)
      const expires = 'expires=' + d.toUTCString()
      // todo: 배포시 분리 필요
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;'
      if (window.location.href.search('127.0.0.1') > -1) {
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;'
      } else {
        // document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;domain=;'
      }
    },
    
    cmn_getUserInfo(accessToken) {
      this.$axios
        .get('https://whynot-here.o-r.kr/v2/account/info', {
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
        })
    },


    cmn_emptyCheck (t) {
      if (t) {
        return String(t).trim().length === 0
      } else {
        return true
      }
    },

    cmn_logout() {
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
