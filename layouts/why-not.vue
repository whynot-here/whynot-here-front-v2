<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="WhyNotLayout">
    <div>
      <Category
        :category-in-layout="categoryInLayout"
        :sub-category-in-layout="subCategoryInLayout"
        @setSubCategoryId="setSubCategoryId"
        @getCategoryIdAndGetPosts="getCategoryIdAndGetPosts"
      />
    </div>
    <div>
      <TopBar
        ref="TopBar"
        :category-title-props="categoryTitle"
        :sub-category-title-props="subCategoryTitle"
      />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/main-page/TopBar'
import Category from '@/components/main-page/Category'

export default {
  components: {
    TopBar,
    Category
  },
  data () {
    return {
      isMyPostings: false,
      isBookMark: false,
      categoryTitle: '',
      subCategoryTitle: '',
      categoryInLayout: '',
      subCategoryInLayout: ''
    }
  },
  async fetch() {
    this.categoryInLayout = await this.$route.params.category
    this.subCategoryInLayout = await this.$route.query.sub
  },
  created () {
    this.$bus.$off('sendCategoryTitle')

    this.$bus.$on('sendCategoryTitle', ({ categoryTitle, subCategoryTitle }) => {
      this.sendCategoryTitle({ categoryTitle, subCategoryTitle })
    })
  },
  mounted () {
  },
  methods: {
    sendCategoryTitle ({ categoryTitle, subCategoryTitle }) {
      this.categoryTitle = categoryTitle
      this.subCategoryTitle = subCategoryTitle
    },
    getCategoryIdAndGetPosts () {
      this.$bus.$emit('getCategoryIdAndGetPosts', {})
    },
    setSubCategoryId ({ id, name, catName }) {
      this.categoryId = id
      this.subCategoryTitle = name
      this.categoryTitle = catName
      this.$bus.$emit('setSubCategoryId', { id, name, catName })
    }
  }
}
</script>


<style lang="scss" scoped>
  #WhyNotLayout {
    display: flex;
    width: 100vw; height: 100vh;
    #TopBar {
      position: sticky;
      top: 0;
      z-index: 100;
    }
  }
  </style>