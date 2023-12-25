import Cookies from 'js-cookie'
import Vue from 'vue'
import categoryConst from '@/plugins/const/categoryConst'

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
          parentName: '얼리어답터(홍보)',
          children: []
        },
        {
          parentId: categoryConst.hanchelinCategoryId,
          parentCode: 'MUST-EAT',
          parentName: '한슐랭',
          children: [
            { id: 44, code: 'WESTERN', name: '양식', parentCode: 'MUST-EAT' },
            { id: 45, code: 'JAPANESE', name: '일식', parentCode: 'MUST-EAT' },
            { id: 46, code: 'KOREAN', name: '한식', parentCode: 'MUST-EAT' },
            { id: 47, code: 'CHINESE', name: '중식', parentCode: 'MUST-EAT' },
            { id: 48, code: 'NIGHT', name: '야식', parentCode: 'MUST-EAT' },
            {
              id: 49,
              code: 'CAFE',
              name: '카페/디저트',
              parentCode: 'MUST-EAT'
            },
            {
              id: 50,
              code: 'ETC-MUST-EAT',
              name: '기타',
              parentCode: 'MUST-EAT'
            }
          ]
        },
        {
          parentId: 17,
          parentCode: 'USED',
          parentName: '중고거래',
          children: [
            // { id: 18, code: 'HOUSE', name: '양도', parentCode: 'USED' },
            // { id: 19, code: 'TEXTBOOK', name: '전공책', parentCode: 'USED' },
            // { id: 20, code: 'ETC-USED', name: '그 외', parentCode: 'USED' }
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
            // { id: 2, code: 'PROJECT', name: '프로젝트', parentCode: 'STUDY' },
            // { id: 3, code: 'MAJOR', name: '전공공부', parentCode: 'STUDY' },
            // { id: 4, code: 'RECRUIT', name: '리쿠르팅', parentCode: 'STUDY' },
            // { id: 5, code: 'ETC-STUDY', name: '그 외', parentCode: 'STUDY' }
          ]
        },
        {
          parentId: 25,
          parentCode: 'PART-JOB',
          parentName: '알바',
          children: [
            // { id: 26, code: 'IN-SCHOOL', name: '교내', parentCode: 'PART-JOB' },
            // {
            //   id: 27,
            //   code: 'OUT-SCHOOL',
            //   name: '교외',
            //   parentCode: 'PART-JOB'
            // },
            // {
            //   id: 28,
            //   code: 'ETC-PART-JOB',
            //   name: '그 외',
            //   parentCode: 'PART-JOB'
            // }
          ]
        },
        {
          parentId: 21,
          parentCode: 'EXERCISE',
          parentName: '운동',
          children: [
            // { id: 22, code: 'FUTSAL', name: '풋살', parentCode: 'EXERCISE' },
            // { id: 23, code: 'PINGPONG', name: '탁구', parentCode: 'EXERCISE' },
            // {
            //   id: 24,
            //   code: 'ETC-EXERCISE',
            //   name: '그 외',
            //   parentCode: 'EXERCISE'
            // }
          ]
        },
        {
          parentId: 13,
          parentCode: 'TRANSPORT',
          parentName: '교통수단',
          children: [
            // { id: 14, code: 'CARPOOL', name: '카풀', parentCode: 'TRANSPORT' },
            // {
            //   id: 15,
            //   code: 'KTX',
            //   name: 'KTX 동반석',
            //   parentCode: 'TRANSPORT'
            // },
            // {
            //   id: 16,
            //   code: 'ETC-TRANSPORT',
            //   name: '그 외',
            //   parentCode: 'TRANSPORT'
            // }
          ]
        },
        {
          parentId: 36,
          parentCode: 'GROUP-BUY',
          parentName: '공동구매',
          children: [
            // { id: 37, code: 'STUFF', name: '물건', parentCode: 'GROUP-BUY' },
            // { id: 38, code: 'OTT', name: 'OTT 구독', parentCode: 'GROUP-BUY' },
            // {
            //   id: 39,
            //   code: 'ETC-GROUP-BUY',
            //   name: '그 외',
            //   parentCode: 'GROUP-BUY'
            // }
          ]
        },
        {
          parentId: 33,
          parentCode: 'FAITH',
          parentName: '기도실',
          children: [
            // { id: 34, code: 'PRAY', name: '기도모임', parentCode: 'FAITH' },
            // { id: 35, code: 'ETC-FAITH', name: '그 외', parentCode: 'FAITH' }
          ]
        }
      ],
      bankNameList: [
        {
          bankId: 1,
          bankName: '카카오뱅크'
        },
        {
          bankId: 2,
          bankName: '토스뱅크'
        },
        {
          bankId: 3,
          bankName: 'IBK기업은행'
        },
        {
          bankId: 4,
          bankName: 'KB국민은행'
        },
        {
          bankId: 5,
          bankName: '신한은행'
        },
        {
          bankId: 6,
          bankName: '하나은행'
        },
        {
          bankId: 7,
          bankName: 'NH농협'
        },
        {
          bankId: 8,
          bankName: '우리은행'
        },
        {
          bankId: 9,
          bankName: 'SC제일은행'
        },
        {
          bankId: 10,
          bankName: '케이뱅크'
        },
        {
          bankId: 11,
          bankName: '대구은행'
        },
        {
          bankId: 12,
          bankName: '부산은행'
        },
        {
          bankId: 13,
          bankName: '우체국'
        }
      ],
      majorList: [
        {
          majorId: 1,
          majorName: '글로벌리더쉽',
          code: 'GLOBAL'
        },
        {
          majorId: 2,
          majorName: '국제어문',
          code: 'INTERNATIONAL'
        },
        {
          majorId: 3,
          majorName: '경영경제',
          code: 'ECONOMICS'
        },
        {
          majorId: 4,
          majorName: '법학부',
          code: 'LAW'
        },
        {
          majorId: 5,
          majorName: '커뮤니케이션',
          code: 'COMMUNICATION'
        },
        {
          majorId: 6,
          majorName: '상담복지',
          code: 'PSYCHOLOGY'
        },
        {
          majorId: 7,
          majorName: '생명과학',
          code: 'BIO'
        },
        {
          majorId: 8,
          majorName: '공간환경시스템',
          code: 'ENVIRONMENT'
        },
        {
          majorId: 9,
          majorName: '전산전자',
          code: 'COMPUTER'
        },
        {
          majorId: 10,
          majorName: '콘텐츠융합디자인',
          code: 'CONTENTS'
        },
        {
          majorId: 11,
          majorName: '기계제어',
          code: 'MECHANICS'
        },
        {
          majorId: 12,
          majorName: 'ICT창업학부',
          code: 'ICT'
        },
        {
          majorId: 13,
          majorName: '언어교육원',
          code: 'LANGUAGE'
        },
        {
          majorId: 14,
          majorName: '창의융합교육원',
          code: 'CREATIVE'
        },
        {
          majorId: 15,
          majorName: 'AI융합교육원',
          code: 'AI'
        }
      ],
      heightList: [
        {
          heightId: 1,
          heightName: '160cm 이하'
        },
        {
          heightId: 2,
          heightName: '160~165'
        },
        {
          heightId: 3,
          heightName: '165~170'
        },
        {
          heightId: 4,
          heightName: '170~175'
        },
        {
          heightId: 5,
          heightName: '175~180'
        },
        {
          heightId: 6,
          heightName: '180 이상'
        }
      ],
      cityList: [
        {
          cityId: 1,
          cityName: '서울특별시',
          code: 'SEOUL'
        },
        {
          cityId: 2,
          cityName: '인천',
          code: 'INCHEON'
        },
        {
          cityId: 3,
          cityName: '경기 북부',
          code: 'GYEONGGI_NORTH'
        },
        {
          cityId: 4,
          cityName: '경기 남부',
          code: 'GYEONGGI_SOUTH'
        },
        {
          cityId: 5,
          cityName: '강원권',
          code: 'GANGWON'
        },
        {
          cityId: 6,
          cityName: '충청권',
          code: 'CHUNGCHEONG'
        },
        {
          cityId: 7,
          cityName: '대전',
          code: 'DAEJEON'
        },
        {
          cityId: 8,
          cityName: '세종',
          code: 'SEJONG'
        },
        {
          cityId: 9,
          cityName: '경상권',
          code: 'GYEONGSANG'
        },
        {
          cityId: 10,
          cityName: '대구',
          code: 'DAEGU'
        },
        {
          cityId: 11,
          cityName: '부산',
          code: 'BUSAN'
        },
        {
          cityId: 12,
          cityName: '울산',
          code: 'ULSAN'
        },
        {
          cityId: 13,
          cityName: '전라권',
          code: 'JEONLA'
        },
        {
          cityId: 14,
          cityName: '광주',
          code: 'GWANGJU'
        },
        {
          cityId: 15,
          cityName: '제주',
          code: 'JEJU'
        },
        {
          cityId: 16,
          cityName: '기타',
          code: 'ETC'
        }
      ],
      jobList: [
        {
          jobId: 1,
          jobName: '사기업 직장인',
          code: 'PRIVATE'
        },
        {
          jobId: 2,
          jobName: '공무원/공공기관',
          code: 'PUBLIC'
        },
        {
          jobId: 3,
          jobName: '특수직',
          code: 'SPECIAL'
        },
        {
          jobId: 4,
          jobName: '전문직',
          code: 'PROFESSIONAL'
        },
        {
          jobId: 5,
          jobName: '프리랜서',
          code: 'FREE'
        },
        {
          jobId: 6,
          jobName: '사업자',
          code: 'BUSINESS'
        },
        {
          jobId: 7,
          jobName: '기타',
          code: 'ETC'
        }
      ],
      applyParams: {
        season: 2,
        myStep: 0,
        favoriteStep: 0,
        name: '',
        gender: 'M',
        myAge: '',
        department: '',
        myHeight: '',
        myDrink: 'NEVER',
        myLocation: 'DORMITORY',
        myLocationDesc: '',
        myJob: 'PRIVATE',
        myJobDesc: '',
        hobby: '',
        hobbyDesc: '',
        myHobby: '',
        myHobbyDesc: '',
        myContactStyle: 'KAKAO_OFTEN',
        myCharacter: '',
        dateStyle: '',
        faith: 'NOTHING',
        smoke: 'N',
        mySmoke: 'N',
        mbti_01: 'E',
        mbti_02: 'S',
        mbti_03: 'T',
        mbti_04: 'J',
        commentForMate: '',
        commentForAdmin: '',
        kakaoLink: '',
        excludeCondList: [],
        imageLinks: [],
        favoriteAge: 'NO_MATTER', // UP, DOWN, SAME, NO_MATTER
        favoriteAgeImportant: true,
        favoriteHeight: '170~175', // 160미만, 160~165, 165~170, 170~175, 175~180, 180이상
        favoriteHeightImportant: true,
        favoriteSmoke: 'N', // Y, N
        favoriteSmokeImportant: true, // true, false
        favoriteDrink: 'NEVER', // SOMETIMES, ONETWO_OF_WEEK, FIVE_OF_WEEK, NEVER
        favoriteDrinkImportant: true, // true, false
        favoriteFaith: 'NO_MATTER', // CHRISTIAN, NO_MATTER
        favoriteFaithImportant: true, // true, false
        favoriteLocation: 'LONG_OK', // LONG_OK, LONG_NO
        favoriteLocationImportant: false // true, false
      }
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

    cmn_getCookie(cname) {
      return this.$cookies.get(cname)
    },

    cmn_removeCookie(cname) {
      return this.$cookies.remove(cname)
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
        month: (parseInt(createdDate.getMonth()) + 1)
          .toString()
          .padStart(2, '0'),
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

    cmn_httpsCheck(t) {
      if (t.length > 0 && t.substring(0, 5) !== 'https') {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
            content: '위치 url은 https로 시작해야합니다.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }
      return true
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
            this.$cookies.remove('close-notice')

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
      this.$cookies.remove('close-notice')

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
    },

    cmn_getNumOfWeek() {
      const today = new Date()
      const week1 = new Date('2023-08-27')
      const week2 = new Date('2023-09-03')
      const week3 = new Date('2023-09-10')
      const week4 = new Date('2023-09-17')
      const week5 = new Date('2023-09-24')
      const week6 = new Date('2023-10-01')
      const week7 = new Date('2023-10-08')
      const week8 = new Date('2023-10-15')
      const week9 = new Date('2023-10-22')
      const week10 = new Date('2023-10-29')
      const week11 = new Date('2023-11-05')
      const week12 = new Date('2023-11-12')
      const week13 = new Date('2023-11-19')
      const week14 = new Date('2023-11-26')
      const week15 = new Date('2023-12-03')
      const week16 = new Date('2023-12-10')
      const vacation = new Date('2023-12-17')

      let numOfWeek
      if (week1 <= today && today < week2) {
        numOfWeek = 1
      } else if (week2 <= today && today < week3) {
        numOfWeek = 2
      } else if (week3 <= today && today < week4) {
        numOfWeek = 3
      } else if (week4 <= today && today < week5) {
        numOfWeek = 4
      } else if (week5 <= today && today < week6) {
        numOfWeek = 5
      } else if (week6 <= today && today < week7) {
        numOfWeek = 6
      } else if (week7 <= today && today < week8) {
        numOfWeek = 7
      } else if (week8 <= today && today < week9) {
        numOfWeek = 8
      } else if (week9 <= today && today < week10) {
        numOfWeek = 9
      } else if (week10 <= today && today < week11) {
        numOfWeek = 10
      } else if (week11 <= today && today < week12) {
        numOfWeek = 11
      } else if (week12 <= today && today < week13) {
        numOfWeek = 12
      } else if (week13 <= today && today < week14) {
        numOfWeek = 13
      } else if (week14 <= today && today < week15) {
        numOfWeek = 14
      } else if (week15 <= today && today < week16) {
        numOfWeek = 15
      } else if (week16 <= today && today < vacation) {
        numOfWeek = 16
      } else {
        numOfWeek = 0
      }

      return numOfWeek
    },

    async cmn_getBlindOrFriendParticipation() {
      return await Promise.all([
        this.cmn_getIsBlindParticipation(),
        this.cmn_getIsFriendParticipation()
      ]).then(function (values) {
        console.log('⭐️')
        console.log(values)
        return values.includes(true)
      })
    },

    // 연애 탭 지원 여부 확인
    async cmn_getIsBlindParticipation() {
      return await this.$axios
        .get(`${process.env.apiUrl}/v2/blind-date/participation?season=2`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          return res.data
        })
    },
    // 친구 탭 지원 여부 확인
    async cmn_getIsFriendParticipation() {
      return await this.$axios
        .get(`${process.env.apiUrl}/v2/friend-meeting/participation?season=2`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          return res.data
        })
    },

    cmn_setApplyParams(curApplyParams) {
      for (const [key] of Object.entries(curApplyParams)) {
        this.applyParams[key] =
          curApplyParams[key] === null ? '' : curApplyParams[key]
      }
    },

    // async getParticipationType() {
    //   // 1-1. 친구탭인지
    //   return await this.$axios
    //     .get(`${process.env.apiUrl}/v2/friend-meeting/participation?season=2`, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: this.$store.state.userInfo.token
    //       }
    //     })
    //     .then((res) => {
    //       if (res.data) {
    //         return 'FRIEND'
    //       }

    //       // 1-2. 연애탭인지
    //       this.$axios
    //         .get(`${process.env.apiUrl}/v2/blind-date/participation?season=2`, {
    //           headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: this.$store.state.userInfo.token
    //           }
    //         })
    //         .then((res) => {
    //           console.log(res.data)
    //           if (!res.data) {
    //             console.log('daj;fkdja;kf;ld')
    //             return 'NO'
    //           }

    //           this.$axios
    //             .get(`${process.env.apiUrl}/v2/blind-date/finish?season=2`, {
    //               headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: this.$store.state.userInfo.token
    //               }
    //             })
    //             .then((res) => {
    //               if (res.data) {
    //                 return 'BLIND_DONE'
    //               } else {
    //                 return 'BLIND_ING'
    //               }
    //             })
    //         })
    //     })
    // },

    // 한대소 졸업생 신청일 때
    getGraduateParticipationType() {
      this.cmn_getUserInfo(this.$store.state.userInfo.token)
      return new Promise((resolve, reject) => {
        if (this.$store.state.userInfo.detail.roles.includes('ROLE_USER')) {
          // // 학교 인증 O
          this.$axios
            .get(`${process.env.apiUrl}/v2/blind-date/g-state?season=2`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: this.$store.state.userInfo.token
              }
            })
            .then((res) => {
              resolve(res.data)
            })
        } else {
          // 학생증 인증 X
          resolve('FAIL')
        }
      })
    },

    // 한대소 재학생 신청일 때
    getParticipationType() {
      this.cmn_getUserInfo(this.$store.state.userInfo.token)
      return new Promise((resolve, reject) => {
        if (this.$store.state.userInfo.detail.roles.includes('ROLE_USER')) {
          // 학생증 인증 O
          // 1-1. 친구탭인지
          this.$axios
            .get(
              `${process.env.apiUrl}/v2/friend-meeting/participation?season=2`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.$store.state.userInfo.token
                }
              }
            )
            .then((res) => {
              if (res.data) {
                resolve('FRIEND')
              }

              // 1-2. 연애탭인지
              this.$axios
                .get(
                  `${process.env.apiUrl}/v2/blind-date/participation?season=2`,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: this.$store.state.userInfo.token
                    }
                  }
                )
                .then((res) => {
                  if (!res.data) {
                    resolve('NO')
                  }

                  this.$axios
                    .get(
                      `${process.env.apiUrl}/v2/blind-date/finish?season=2`,
                      {
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: this.$store.state.userInfo.token
                        }
                      }
                    )
                    .then((res) => {
                      if (res.data) {
                        resolve('BLIND_DONE')
                      } else {
                        resolve('BLIND_ING')
                      }
                    })
                })
            })
        } else {
          // 학생증 인증 X
          // this.$router.push('/blind-date')
          resolve('FAIL')
        }
      })
    },

    nullCheck(params) {
      return params !== null
    },

    moveApplyIntroPage(type) {
      this.$router.push({
        name: 'blind-date-apply-intro',
        params: { type }
      }) // 작성중 페이지
    },

    moveGraduateApplyIntroPage(type) {
      this.$router.push({
        name: 'g-blind-date-apply-intro',
        params: { type }
      }) // 작성중 페이지
    },

    updateSharedData(newData) {
      this.$store.commit('updateSharedData', newData)
    },

    cmn_openCompleteModal({ option }) {
      this.$CompleteModal.modalOption.isShow = true
      this.$CompleteModal.modalOption.imageUrl = option.imageUrl
      this.$CompleteModal.modalOption.title = option.title
      this.$CompleteModal.modalOption.time = option.time
      this.$CompleteModal.modalOption.isContactPopup = option.isContactPopup
      this.$CompleteModal.modalOption.confirmCallback = option.confirmCallback

      const instance = this.$CompleteModal
      const mount = document.createElement('div')
      mount.id = 'complete-' + Date.now()
      document.body.appendChild(mount)

      instance.$mount(mount)
    },
  }
}

Vue.mixin(common)
