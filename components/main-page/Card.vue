<template>
  <div id="Card">
    <div :class="isFromPc ? 'pc-env' : 'mobile-env'">
      <div class="sts-i-wrp">
        <div>
          <input
            v-model="onlyRecruit"
            type="checkbox"
            name="color"
            value="blue"
          />
        </div>
        <div>모집중만 보기</div>
      </div>
      <div class="cards-wrp">
        <div
          v-for="(post, idx) in postsProc"
          v-show="onlyRecruit ? (post.recruiting ? true : false) : true"
          :key="idx"
          class="card-wrp"
        >
          <div @click.stop="moveDetailPage(post.id)">
            <div class="card-top">
              <div class="writer-title-wrp">
                <div class="writer">
                  {{ post.writer.nickname }}
                </div>
                <div class="card-title">
                  {{ post.title_short }}
                </div>
              </div>
              <div
                v-if="category === 'mypostings'"
                class="sub-menu-btn"
                @click.stop="openSubMenuPopup(post.id)"
              >
                <img
                  v-if="post.recruiting"
                  src="@/assets/img/common/dot-btn.png"
                  alt=""
                />
                <div v-if="post.isOpenSubMenu" class="sub-menu">
                  <div @click.stop="editPosting(post.id)">수정하기</div>
                  <div @click.stop="compModalToggle(post.id)">모집마감</div>
                  <div @click.stop="deletePosting(post.id)">삭제</div>
                </div>
              </div>
              <div v-else class="book-mark" @click.stop="bookmark(post.id)">
                <img
                  v-if="post.isBookmarked === undefined || !post.isBookmarked"
                  src="@/assets/img/category/bookmark.png"
                  alt=""
                />
                <img
                  v-if="post.isBookmarked"
                  src="@/assets/img/category/bookmark-selected.png"
                  alt=""
                />
              </div>
            </div>
            <div class="card-middle">
              <div class="content">
                {{ post.content_light }}
              </div>
            </div>
            <div class="card-bottom">
              <div
                v-if="category === 'mypostings' || category === 'bookmark'"
                class="category-name"
              >
                {{ post.categoryName }}
              </div>
              <div :class="'item created-day'">
                {{ post.passedDay }}
              </div>
              <div class="gap"></div>
              <div class="views">
                <img src="@/assets/img/common/views.png" alt="" />
                <div>
                  {{ post.views === null ? 0 : post.views }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="!post.recruiting" class="comp-card">
            <div v-if="category === 'mypostings'" class="close">
              <img
                src="@/assets/img/common/close-gray.png"
                alt=""
                @click="deletePosting(post.id)"
              />
            </div>
            <div
              :class="category === 'mypostings' ? 'notice mypage' : 'notice'"
            >
              <div class="check">
                <img src="@/assets/img/common/check.png" alt="" />
              </div>
              <div class="comp-text">모집마감</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhynotCard',
  components: {},
  props: {
    searchText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      posts: [],
      category: '',
      subCategory: '',
      bookmarkComp: false,
      compModalOpen: false,
      compRecruitId: '',
      onlyRecruit: false,
      isSubCategory: false,
      categoryId: ''
    }
  },
  computed: {
    categoryIdProc() {
      return this.categoryId
    },
    postsProc() {
      // 북마크 받아오는 시점 이후에 처리 가능하도록
      if (!this.bookmarkComp) {
        return []
      }
      return this.posts.map((post) => {
        if (post.title.length > 16) {
          post.title_short = post.title.substr(0, 20) + '...'
        } else {
          post.title_short = post.title
        }
        if (post.content.length > 30) {
          post.content_light = post.content.substr(0, 30) + '...'
        } else {
          post.content_light = post.content
        }

        let categoryName = ''
        this.categoryGroup.forEach((category) => {
          if (category.parentId === post.category.id) {
            categoryName = category.parentName
          } else {
            category.children.forEach((child) => {
              if (child.id === post.category.id) {
                categoryName = category.parentName + ' / ' + child.name
              }
            })
          }
        })

        post.categoryName = categoryName

        post.communicationToolText = { ONLINE: '온라인', OFFLINE: '만나서' }[
          post.communicationTool
        ]
        post.contactText = {
          EMAIL: '이메일',
          KAKAO_OPEN_CHAT: '카카오톡',
          PHONE: '휴대전화'
        }[post.ownerContact.type]

        post.passedDay = this.cmn_getPassedDay(post.createdDt)

        return post
      })
    }
  },
  created() {
    this.$bus.$off('refreshCard')
    this.$bus.$on('refreshCard', () => {
    })
  },
  mounted() {
  },
  methods: {
    refreshCard() {
      this.getPosts()
      setTimeout(() => {
        this.getBookmark()
      }, 300)
    },
    getPosts() {
      if (this.category === 'mypostings') {
        this.$axios
          .get('https://whynot-here.o-r.kr/v2/posts/own', {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            this.posts = []
            res.data.map((res) => {
              res.isOpenSubMenu = false
              return this.posts.push(res)
            })
          })
      } else if (this.category === 'bookmark') {
        if (!this.$store.state.userInfo.token) {
          return false
        }
        this.$axios
          .get('https://whynot-here.o-r.kr/v2/posts/favorite', {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            this.posts = []
            res.data.map((res) => {
              res.isBookmarked = true
              return this.posts.push(res)
            })
          })
      } else if (this.category === 'search') {
        this.$axios
          .get(
            `https://whynot-here.o-r.kr/v2/posts/search?keyword=` +
              this.searchText,
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                Authorization: this.$store.state.userInfo.token
              }
            }
          )
          .then((res) => {
            this.posts = []
            res.data.map((res) => {
              return this.posts.push(res)
            })
          })
      } else {
        if (this.isSubCategory) {
          this.getSubCategoryId()
        } else {
          this.getCategoryId()
        }

        if (this.categoryId > 0) {
          this.$axios
            .get(
              `https://whynot-here.o-r.kr/v2/posts/category/${this.categoryId}`
            )
            .then((res) => {
              this.posts = []
              res.data.map((res) => {
                res.selected = false
                return this.posts.push(res)
              })
            })
        } else {
          this.$axios
            .get('https://whynot-here.o-r.kr/v2/posts')
            .then((res) => {
              this.posts = []
              res.data.map((res) => {
                res.selected = false
                return this.posts.push(res)
              })
            })
        }
      }
    },
    toggleIsSubCategory(type, category, subCategory) {
      this.isSubCategory = type
      this.category = category
      this.subCategory = subCategory
      this.refreshCard()
    },
    getCategoryId() {
      const category = this.categoryGroup.filter((category) => {
        return category.parentCode.toLowerCase() === this.category
      })
      this.categoryId = category[0].parentId
      this.categoryTitle = category[0].parentName
      this.subCategoryTitle = ''

      this.$bus.$emit('sendCategoryTitle', {
        categoryTitle: this.categoryTitle,
        subCategoryTitle: this.subCategoryTitle
      })
    },
    getSubCategoryId() {
      const category = this.categoryGroup.filter((category) => {
        return category.parentCode.toLowerCase() === this.category
      })[0]

      const subCategory = category.children
      const selectedSubCategory = subCategory.filter((category) => {
        return category.code.toLowerCase() === this.subCategory
      })[0]

      this.categoryTitle = category.parentName
      this.categoryId = selectedSubCategory.id
      this.subCategoryTitle = selectedSubCategory.name

      this.$bus.$emit('sendCategoryTitle', {
        categoryTitle: this.categoryTitle,
        subCategoryTitle: this.subCategoryTitle
      })
    },
    getBookmark() {
      this.bookmarkComp = false
      if (
        this.$store.state.userInfo.initLoginDone &&
        this.category !== 'bookmark' &&
        this.category !== 'mypostings'
      ) {
        this.$axios
          .get('https://whynot-here.o-r.kr/v2/posts/favorite', {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            res.data.forEach((bookmark) => {
              this.posts.map((post) => {
                if (bookmark.id === post.id) {
                  post.isBookmarked = true
                }
                return post
              })
            })
            this.bookmarkComp = true
          })
          .catch(function (res) {
            this.cmn_openAlertPopup({
              option: {
                content: '다시 로그인 해주세요.',
                type: 'alert',
                confirmText: '확인',
                cancelText: ''
              }
            })
          })
      } else {
        this.bookmarkComp = true
      }
    },
    bookmark(id) {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.cmn_openAlertPopup({
          option: {
            content: '로그인 후 이용해 주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }

      this.posts.map((post) => {
        if (id === post.id) {
          if (post.isBookmarked) {
            this.$axios
              .delete(`https://whynot-here.o-r.kr/v2/posts/favorite/${id}`, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.$store.state.userInfo.token
                }
              })
              .then((res) => {
                post.isBookmarked = false
                this.toastPopup('북마크가 해제되었습니다.')
              })
              .catch((error) => {
                window.alert(error.response.data.message)
              })
          } else {
            this.$axios
              .post(
                `https://whynot-here.o-r.kr/v2/posts/favorite/${id}`,
                {},
                {
                  withCredentials: true,
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.$store.state.userInfo.token
                  }
                }
              )
              .then((res) => {
                post.isBookmarked = true
                this.toastPopup('북마크가 추가되었습니다.')
              })
              .catch((error) => {
                window.alert(error.response.data.message)
              })
          }
        }
        return post
      })
      // 사간 간격 안 두면 결과 반영이 안되는 경우가 있어서
      setTimeout(() => {
        this.getBookmark()
      }, 300)
    },
    openSubMenuPopup(id) {
      this.posts.map((post) => {
        if (post.id === id) {
          if (post.isOpenSubMenu) {
            post.isOpenSubMenu = false
          } else {
            post.isOpenSubMenu = true
          }
        }
        return post
      })
    },
    moveDetailPage(id) {
      this.$router.push(`/gather/posts/${id}`)
    },
    editPosting(id) {
      this.$router.push(`/posting?m=edit&id=${id}`)
    },
    deletePosting(id) {
      if (confirm('삭제하시겠습니까?')) {
        this.$axios
          .delete(`https://whynot-here.o-r.kr/v2/posts/${id}`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            // 카드 새로고침
            this.cmn_openAlertPopup({
              option: {
                title: '⚠️알림',
                content: '삭제했습니다.',
                type: 'alert',
                confirmText: '확인',
                cancelText: ''
              }
            })
            this.refreshCard()
          })
      }
    },
    compModalToggle(id) {
      this.cmn_openAlertPopup({
        option: {
          title: '⚠️알림',
          content:
            '모집 마감을 누르시면 해당 글 수정 / 모집이 불가합니다. 그래도 진행 하시겠습니까?',
          type: 'confirm',
          confirmText: '네',
          cancelText: '아니요',
          confirmCallback: () => {
            this.compRecruit()
          }
        }
      })
      this.compRecruitId = id
    },
    compRecruit() {
      this.$axios
        .post(
          `https://whynot-here.o-r.kr/v2/posts/own/${this.compRecruitId}`,
          {
            isRecruit: false
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
          this.compModalOpen = false
          this.compRecruitId = ''
          this.refreshCard()
          this.cmn_openAlertPopup({
            option: {
              title: '⚠️알림',
              content: '모집이 마감되었습니다.',
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/card.scss';
</style>
