<template>
  <div id="Card">
    <div class="sts-i-wrp">
      <div>
        <input type="checkbox" name="color" value="blue">
      </div>
      <div>
        모집중만 보기
      </div>
    </div>
    <div class="cards-wrp">
      <div
        v-for="(post, idx) in postsProc.slice().reverse()"
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
            <div v-if="categoryProps === 'mypostings'" class="sub-menu-btn">
              <img v-if="post.recruiting" src="@/assets/img/common/dot-btn.png" alt="" @click.stop="openSubMenuPopup(post.id)">
              <div v-if="post.isOpenSubMenu" class="sub-menu">
                <div @click.stop="editPosting(post.id)">수정하기</div>
                <div @click.stop="compModalToggle(post.id)">모집마감</div>
                <div @click.stop="deletePosting(post.id)">삭제</div>
              </div>
            </div>
            <div v-else class="book-mark" @click.stop="bookMark(post.id)">
              <img v-if="post.isBookMarked === undefined || !post.isBookMarked" src="@/assets/img/category/bookmark.png" alt="">
              <img v-if="post.isBookMarked" src="@/assets/img/category/bookmark-selected.png" alt="">
            </div>
          </div>
          <div class="card-middle">
            <div class="content">
              {{ post.content_light }}
            </div>
          </div>
          <div class="card-bottom">
            <div />
            <div class="gather-d-day">
              마감 D-8
            </div>
          </div>
        </div>
        <div v-if="!post.recruiting" class="comp-card">
          <div class="close">
            <img src="@/assets/img/common/close-gray.png" alt="">
          </div>
          <div class="notice">
            <div class="check">
              <img src="@/assets/img/common/check.png" alt="" @click="deletePosting(post.id)">
            </div>
            <div class="comp-text">
              모집마감
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="compModalOpen" class="comp-modal">
      <div class="comp-wrp">
        <div class="notice">
          모집 마감을 누르시면 해당 글<br>
          <strong>수정 / 모집이 불가합니다.</strong><br>
          그래도 진행 하시겠습니까?
        </div>
        <div class="select-wrp">
          <div @click="compModalOpen = false">아니요</div>
          <div @click="compRecruit()">네</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhynotCard',
  components: {
  },
  props: {
    // postsProps: {
    //   type: Array,
    //   default: null
    // },
    categoryId: {
      type: Number,
      default: 1
    },
    categoryProps: {
      type: String,
      default: ''
    },
    searchText: {
      type: String,
      default: ''
    }
    // subCategory: {
    //   type: String,
    //   default: ''
    // }
  },
  data () {
    return {
      posts: [],
      category: '',
      bookMarkComp: false,
      compModalOpen: false,
      compRecruitId: ''
    }
  },
  computed: {
    postsProc () {
      // 북마크 받아오는 시점 이후에 처리 가능하도록
      if (!this.bookMarkComp) {
        return []
      }
      return this.posts.map((post) => {
        if (post.title.length > 16) {
          post.title_short = post.title.substr(0, 20) + '...'
        } else {
          post.title_short = post.title
        }
        // post.selected = false
        if (post.content.length > 30) {
          post.content_light = post.content.substr(0, 30) + '...'
        } else {
          post.content_light = post.content
        }

        // post.bookMark = post.selected
        // post.isOpenSubMenu = false
        return post
      })
    }
  },
  watch: {
    // bookMarkMode: {
    //   deep: true,
    //   handler () {
    //     if (this.bookMarkMode) {
    //       this.bookMarkMode = false
    //     }
    //   }
    // },
    // postsProps: {
    //   deep: true,
    //   handler () {
    //   }
    // }
  },
  created () {
    this.$bus.$off('refreshCard')
    this.$bus.$on('refreshCard', () => {
      this.refreshCard()
    })
  },
  mounted () {
    this.category = this.categoryProps
    this.refreshCard()
  },
  methods: {
    refreshCard() {
      this.getPosts()
      this.getBookMark()
    },
    getPosts () {
      if (this.categoryProps === 'mypostings') {
        this.$axios.get(
        ('https://whynot-here.o-r.kr/v2/posts/own'),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
        )
        .then(res => {
          this.posts = []
          res.data.map((res) => {
            res.isOpenSubMenu = false
            return this.posts.push(res)
          })
        })
      } else if (this.categoryProps === 'bookmark') {
        this.$axios.get(
        ('https://whynot-here.o-r.kr/v2/posts/favorite'),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
        )
        .then(res => {
          this.posts = []
          res.data.map((res) => {
            res.isBookMarked = true
            return this.posts.push(res)
          })
        })
      } else if (this.categoryProps === 'search') {
        this.$axios.get(
        (`https://whynot-here.o-r.kr/v2/posts/search?keyword=` + this.searchText),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
        )
        .then(res => {
          this.posts = []
          res.data.map((res) => {
            return this.posts.push(res)
          })
        })
      } else {
        // this.$axios.get('https://whynot-here.o-r.kr/v2/posts')
        this.$axios.get(`https://whynot-here.o-r.kr/v2/posts/category/${this.categoryId}`)
        .then(res => {
          this.posts = []
          res.data.map((res) => {
            res.selected = false
            return this.posts.push(res)
          })
        })
      }
    },
    getBookMark () {
      this.bookMarkComp = false
      if (this.$store.state.userInfo.initLoginDone && this.categoryProps !== 'bookmark' && this.categoryProps !== 'mypostings') {
        this.$axios.get(
          ('https://whynot-here.o-r.kr/v2/posts/favorite'),
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
          )
          .then(res => {
            res.data.forEach(bookMark => {
              this.posts.map((post) => {
                if (bookMark.id === post.id) {
                  post.isBookMarked = true
                }
                return post
              })
            });
            this.bookMarkComp = true
          })
      } else {
        this.bookMarkComp = true
      }
      // setTimeout(() => {
      //   this.bookMarkComp = false
      // }, 1000)

    },
    bookMark (id) {
      this.posts.map((post) => {
        if (id === post.id) {
          if (post.isBookMarked) {
            (this.$axios.delete(
              (`https://whynot-here.o-r.kr/v2/posts/favorite/${id}`),
              {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.$store.state.userInfo.token
                }
              }
            )
            ).then(res => {
              post.isBookMarked = false
            }).catch((error) => {
              window.alert(error.response.data.message)
            })
          } else {
            (this.$axios.post(
              (`https://whynot-here.o-r.kr/v2/posts/favorite/${id}`),
              {},
              {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.$store.state.userInfo.token
                }
              }
            )
            ).then(res => {
              post.isBookMarked = true
            }).catch((error) => {
              window.alert(error.response.data.message)
            })
          }
        }
        return post
      })
      // this.refreshCard()
      // 사간 간격 안 두면 결과 반영이 안되는 경우가 있어서
      setTimeout(() => {
        this.getBookMark()
      }, 300)
      // this.bookMarkMode = true
    },
    openSubMenuPopup (id) {
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
    moveDetailPage (id) {
      this.$router.push(`/gather/posts/${id}`)
    },
    editPosting (id) {
      this.$router.push(`/posting?m=edit&id=${id}`)
    },
    deletePosting (id) {
      if(confirm("삭제하시겠습니까?")) {
        this.$axios.delete(
        (`https://whynot-here.o-r.kr/v2/posts/${id}`),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
        )
        .then(res => {
          // 카드 새로고침
          alert('삭제했습니다')
          this.$emit('refreshCard', {})
        })
      }
    },
    compModalToggle (id) {
      if (this.compModalOpen) {
        this.compModalOpen = false
      } else {
        this.compModalOpen = true
      }

      this.compRecruitId = id
    },
    compRecruit () {
      (this.$axios.post(
        (`https://whynot-here.o-r.kr/v2/posts/own/${this.compRecruitId}`),
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
      ).then(res => {
        this.compModalOpen = false
        this.compRecruitId = ''
        this.refreshCard()
        alert('모집이 마감되었습니다.')
      }).catch((error) => {
        window.alert(error.response.data.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/card.scss';
</style>
