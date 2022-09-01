<template>
  <div id="CategoryPage">
    <TopBar
      ref="TopBar"
    />
    <div class="panel">
      <Category
        :is-my-postings="isMyPostings"
        :is-book-mark="isBookMark"
        :category="category"
        :sub-category="subCategory"
        @sendCategoryId="sendCategoryId"
        @setLoginPopupOpen="setLoginPopupOpen"
      />
      <Card
        :posts="posts"
        :category="category"
        :sub-category="subCategory"
        :category-title="categoryTitle"
        :sub-category-title="subCategoryTitle"
      />
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/main-page/TopBar'
import Category from '@/components/main-page/Category'
import Card from '@/components/main-page/Card'

export default {
  name: 'CategoryPage',
  components: {
    TopBar,
    Category,
    Card
  },
  asyncData({ params, route, redirect }) {
    console.log('?')
    return {
      category: params.category,
      subCategory: route.query.sub,
      isMyPostings: params.isMyPostings,
      isBookMark: params.isBookMark
    }
  },
  data () {
    return {
      posts:[],
      categoryTitle: '',
      subCategoryTitle: '',
      loginPopupOpen: false,
      categoryId: 1,
      isMyPostings: false,
      isBookMark: false
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    sendCategoryId ({ id }) {
      this.categoryId = id
      this.getPosts()
    },
    getPosts () {
      if (this.category === 'mypostings') {
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
            return this.posts.push(res)
          })
        })
      } else {
        // this.$axios.get('https://whynot-here.o-r.kr/v2/posts')
        this.$axios.get(`https://whynot-here.o-r.kr/v2/posts/category/${this.categoryId}`)
        .then(res => {
          this.posts = []
          res.data.map((res) => {
            return this.posts.push(res)
          })
        })
      }
    },
    setLoginPopupOpen () {
      this.$refs.TopBar.openLoginPopup()
    }
  }
}
</script>

<style lang="scss" scoped>
#CategoryPage {
  width: 100vw; height: 100vh;
  background: #FAFAFA;
  #TopBar {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .panel {
    display: flex;
    width: 100vw; 
    height: calc(100vh - 80px);
    overflow: scroll;
    margin: 0 auto;
    #Category {
      width: 30%;
      position: sticky;
      top: 0px;
    }
  }
}
</style>