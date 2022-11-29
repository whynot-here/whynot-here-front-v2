<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="WhyNotLayout">
    <main>
      <div class="category-wrp">
        <Category
          :category-in-layout="categoryInLayout"
          :sub-category-in-layout="subCategoryInLayout"
          @setSubCategoryId="setSubCategoryId"
          @getCategoryIdAndGetPosts="getCategoryIdAndGetPosts"
        />
      </div>
      <div class="top-bar-wrp">
        <TopBar
          ref="TopBar"
          :category-title-props="categoryTitle"
          :sub-category-title-props="subCategoryTitle"
        />
        <Nuxt />
      </div>
    </main>
    <div>
      <Review />
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/main-page/TopBar'
import Category from '@/components/main-page/Category'
import Review from '@/components/main-page/Review'

export default {
  components: {
    TopBar,
    Category,
    Review
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
@import '@/assets/scss/util.scss';

  #WhyNotLayout {
    height: 100vh;
    overflow: hidden;
    main {
      display: flex;
      width: 100vw; height: calc(100vh - 44px);

      @include desktop {
        #TopBar {
          position: sticky;
          top: 0;
          z-index: 100;
        }
      }
      
      @include screen {
        #TopBar {
          position: sticky;
          top: 0;
          z-index: 100;
        }
      }

      @include mobile {
        .top-bar-wrp {
          position: fixed;
        }
        .category-wrp {
          z-index: 10;
        }
      }
    }
  }
  </style>