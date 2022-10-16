<template>
  <div id="CategoryPage">
      <Card
        ref="Card"
        :category-id="categoryId"
        :category-props="category"
        :search-text="searchText"
        @refreshCard="getPosts"
      />
  </div>
</template>

<script>
import Card from '@/components/main-page/Card'

export default {
  name: 'CategoryPage',
  components: {
    Card
  },
  layout: 'why-not',
  props: {
  },
  asyncData({ params, route, query, redirect }) {
    return {
      category: params.category,
      subCategory: route.query.sub,
      searchText: query.t,
      // isMyPostings: params.isMyPostings,
      // isBookMark: params.isBookMark
    }
  },
  data () {
    return {
      posts:[],
      loginPopupOpen: false,
      // isMyPostings: false,
      // isBookMark: false,
      categoryId: 1
    }
  },
  watch:{
    $route () {
      // 사간 간격 안 두면 keyword 반영이 안되는 경우가 있어서
      setTimeout(() => {
        this.$bus.$emit('refreshCard', {})
      }, 300)
    }
  },
  watchQuery: ['t'],
  created () {
    this.$bus.$off('setSubCategoryId')
    this.$bus.$off('getCategoryIdAndGetPosts')
    this.$bus.$off('refreshSearch')

    this.$bus.$on('setSubCategoryId', ({ id, name, catName }) => {
      this.setSubCategoryId({ id, name, catName })
    })
    this.$bus.$on('getCategoryIdAndGetPosts', () => {
      this.getCategoryIdAndGetPosts()
    })
    this.$bus.$on('refreshSearch', () => {
      this.getCategoryIdAndGetPosts()
    })
  },
  mounted () {
    // 대분류 카테고리 선택했을 때만 불러오도록
    // 소분류 카테고리 선택했을 때는 setSubCategoryId에서 호출
    if (this.subCategory === undefined) {
      this.getCategoryIdAndGetPosts()
    } else {
      this.geySubCategoryIdAndGetPosts()
    }
  },
  methods: {
    getCategoryIdAndGetPosts () {
      if (this.category !== 'mypostings' && this.category !== 'bookmark' && this.category !== 'search') {
        this.getCategoryId()
        // this.getPosts()
      } else {
        let categoryTitle = ''
        if (this.category === 'mypostings') {
          categoryTitle = 'My 모임'
        } else if (this.category === 'bookmark') {
          categoryTitle = '북마크'
        } else if (this.category === 'search') {
          categoryTitle = '검색 결과'
        }
        this.$bus.$emit('sendCategoryTitle', { categoryTitle })
      }
    },
    getCategoryId () {
      const category = this.categoryGroup.filter((category) => {
        return category.parentCode.toLowerCase() === this.category
      })
      this.categoryId = category[0].parentId
      this.categoryTitle = category[0].parentName
      this.subCategoryTitle = ''

      this.$bus.$emit('sendCategoryTitle', { categoryTitle: this.categoryTitle, subCategoryTitle: this.subCategoryTitle })
    },
    geySubCategoryIdAndGetPosts () {
      this.getSubCategoryId()
      // this.getPosts()
    },
    getSubCategoryId () {
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

      this.$bus.$emit('sendCategoryTitle', { categoryTitle: this.categoryTitle, subCategoryTitle: this.subCategoryTitle })
    },
    setSubCategoryId ({ id, name, catName }) {
      this.categoryId = id
      this.subCategoryTitle = name
      this.categoryTitle = catName
      this.getPosts()
    },
    getPosts () {
      this.$refs.Card.getPosts()
      // if (this.category === 'mypostings') {
      //   this.$axios.get(
      //   ('https://whynot-here.o-r.kr/v2/posts/own'),
      //   {
      //     withCredentials: true,
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: this.$store.state.userInfo.token
      //     }
      //   }
      //   )
      //   .then(res => {
      //     this.posts = []
      //     res.data.map((res) => {
      //       return this.posts.push(res)
      //     })
      //   })
      // } else {
      //   // this.$axios.get('https://whynot-here.o-r.kr/v2/posts')
      //   this.$axios.get(`https://whynot-here.o-r.kr/v2/posts/category/${this.categoryId}`)
      //   .then(res => {
      //     this.posts = []
      //     res.data.map((res) => {
      //       return this.posts.push(res)
      //     })
      //   })
      // }
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
  height: calc(100vh - 80px);
}
</style>