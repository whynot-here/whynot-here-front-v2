<template>
  <div id="CategoryPage">
    <Card ref="Card" :search-text="searchText" />
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
  props: {},
  asyncData({ params, route, query, redirect }) {
    return {
      category: params.category,
      subCategory: route.query.sub,
      searchText: query.t
    }
  },
  data() {
    return {
      posts: [],
      categoryId: 0
    }
  },
  watch: {
    $route() {
      // 사간 간격 안 두면 keyword 반영이 안되는 경우가 있어서
      setTimeout(() => {
        this.$refs.Card.toggleIsSubCategory(
          false,
          this.category,
          this.subCategory
        )
      }, 300)
    }
  },
  watchQuery: ['t'],
  created() {
    this.$bus.$off('setSubCategoryId')
    this.$bus.$off('getCategoryIdAndGetPosts')
    this.$bus.$off('refreshSearch')

    this.$bus.$on('setSubCategoryId', ({ id, name, catName, subType }) => {
      this.subCategory = subType
      this.$refs.Card.toggleIsSubCategory(true, this.category, subType)
    })
    this.$bus.$on('getCategoryIdAndGetPosts', () => {
      this.$refs.Card.toggleIsSubCategory(
        false,
        this.category,
        this.subCategory
      )
    })
    this.$bus.$on('refreshSearch', () => {
      this.getCategoryIdAndGetPosts()
    })
  },
  mounted() {
    // 로그인 안되어 있으면 로그인 팝업 뜨도록
    if (this.category === 'mypostings' || this.category === 'bookmark') {
      this.$bus.$emit('checkLogin', {})
    }
    // 대분류 카테고리 선택했을 때만 불러오도록
    // 소분류 카테고리 선택했을 때는 setSubCategoryId에서 호출
    if (this.subCategory === undefined) {
      this.$refs.Card.toggleIsSubCategory(
        false,
        this.category,
        this.subCategory
      )
      this.getCategoryIdAndGetPosts()
    } else {
      this.$refs.Card.toggleIsSubCategory(true, this.category, this.subCategory)
      this.geySubCategoryIdAndGetPosts()
    }
  },
  methods: {
    getCategoryIdAndGetPosts() {
      if (
        this.category === 'mypostings' ||
        this.category === 'bookmark' ||
        this.category === 'search'
      ) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/category-main.scss';
</style>
