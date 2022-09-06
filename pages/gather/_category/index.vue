<template>
  <div id="CategoryPage">
    <div>
      <Category
        :is-my-postings="isMyPostings"
        :is-book-mark="isBookMark"
        :category="category"
        :sub-category="subCategory"
        @setSubCategoryId="setSubCategoryId"
        @getCategoryId="getCategoryId"
        @setLoginPopupOpen="setLoginPopupOpen"
      />
    </div>
    <div>
      <TopBar
        ref="TopBar"
      />
      <Card
        :posts="posts"
        :category="category"
        :sub-category="subCategory"
        :category-title="categoryTitle"
        :sub-category-title="subCategoryTitle"
        @refreshCard="getPosts"
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
  asyncData({ params, route, query, redirect }) {
    return {
      category: params.category,
      subCategory: route.query.sub,
      // isMyPostings: params.isMyPostings,
      isBookMark: params.isBookMark
    }
  },
  data () {
    return {
      posts:[],
      categoryTitle: '',
      subCategoryTitle: '',
      loginPopupOpen: false,
      isMyPostings: false,
      isBookMark: false,
      categoryId: 1
    }
  },
  mounted () {
    // 대분류 카테고리 선택했을 때만 불러오도록
    // 소분류 카테고리 선택했을 때는 setSubCategoryId에서 호출
    if (this.subCategory === undefined) {
      this.getCategoryId()
    }
  },
  methods: {
    getCategoryId () {
      const category = this.categoryGroup.filter((category) => {
        return category.parentCode.toLowerCase() === this.category
      })
      this.categoryId = category[0].parentId
      this.getPosts()
    },
    setSubCategoryId ({ id }) {
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
  display: flex;
  width: 100vw; height: 100vh;
  // background: #FAFAFA;
  #TopBar {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  // .panel {
  //   display: flex;
  //   width: 100vw; 
  //   height: calc(100vh - 80px);
  //   overflow: scroll;
  //   margin: 0 auto;
  //   #Category {
  //     width: 30%;
  //     position: sticky;
  //     top: 0px;
  //   }
  // }
}
</style>