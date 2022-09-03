<template>
  <div id="Card">
    <div class="category-wrp">

    </div>
    <div class="cards-wrp">
      <div
        v-for="(post, idx) in postsProc.slice().reverse()"
        :key="idx"
        class="card-wrp"
      >
        <div @click="moveDetailPage(post.id)">
          <div class="card-top">
            <div class="writer-title-wrp">
              <div class="writer">
                {{ post.writer.nickname }}
              </div>
              <div class="card-title">
                {{ post.title_short }}
              </div>
            </div>
            <div v-if="category === 'mypostings'" class="sub-menu-btn">
              <img src="@/assets/img/common/dot-btn.png" alt="" @click.stop="openSubMenuPopup(post.id)">
              <div v-if="!post.isOpenSubMenu" class="sub-menu">
                <div @click.stop="editPosting(post.id)">수정하기</div>
                <div>모집완료</div>
                <div @click.stop="deletePosting(post.id)">삭제</div>
              </div>
            </div>
            <div v-else class="book-mark" @click="post.selected = !post.selected">
              <img v-if="!post.selected" src="@/assets/img/category/bookmark.png" alt="">
              <img v-if="post.selected" src="@/assets/img/category/bookmark-selected.png" alt="">
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
    posts: {
      type: Array,
      default: null
    },
    category: {
      type: String,
      default: ''
    },
    subCategory: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    postsProc () {
      return this.posts.map((post) => {
        if (post.title.length > 16) {
          post.title_short = post.title.substr(0, 20) + '...'
        } else {
          post.title_short = post.title
        }
        post.selected = false
        if (post.content.length > 30) {
          post.content_light = post.content.substr(0, 30) + '...'
        } else {
          post.content_light = post.content
        }
        post.isOpenSubMenu = false
        return post
      })
    }
  },
  methods: {
    openSubMenuPopup (id) {
      this.posts.forEach((post) => {
        if (post.id === id) {
          post.isOpenSubMenu = true
        }
      })
    },
    moveDetailPage (id) {
      console.log('?')
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/card.scss';
</style>
