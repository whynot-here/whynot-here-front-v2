<template>
  <div v-show="(!isMobile || isOpenCategoryPanel)" id="Category">
    <section class="logo">
      <div class="logo-desc">
        사람이 모이는 공간
      </div>
      <div class="logo-img" @click="mainPage">
        <img src="@/assets/img/common/whynot-here-logo.png" alt="">
      </div>
    </section>
    <section class="category">
      <!-- <div @click="checkLogin()">
        <div class="posting-btn">
          📝 글쓰기
        </div>
      </div> -->
      <div class="sub-menu-wrp">
        <div class="search">
          <input v-model="searchText" class="total-search" type="text" placeholder="통합검색" />
          <div class="search-img">
            <img src="@/assets/img/category/search.png" alt="" @click="search()">
          </div>
        </div>
        <div :class="selectedCategory === 'mypostings' ? 'menu selected' : 'menu'" @click="moveMyPostingsPage()">
          <div>
            ⭐️ My 모임
          </div>
          <div>
            <img src="@/assets/img/category/right-arrow.png" alt="">
          </div>
        </div>
        <div :class="selectedCategory === 'bookmark' ? 'menu selected' : 'menu'" @click="moveBookMarkPage()">
          <div>
            🔖 북마크
          </div>
          <div>
            <img src="@/assets/img/category/right-arrow.png" alt="">
          </div>
        </div>
      </div>
      <div
        v-for="(cat, idx) in categoryGroup"
        :key="idx"
        class="category-wrp"
      >
        <div
          :class="cat.parentCode.toLowerCase() === selectedCategory ? 'title selected' : 'title'"
          @click="selectCategory({ id: cat.parentId, type: cat.parentCode.toLowerCase() })"
        >
          {{ cat.parentName }}
        </div>
        <div
          v-for="(sub, sIdx) in cat.children"
          :key="sIdx"
          :class="sub.code.toLowerCase() === selectedSubCategory ? 'sub-title selected' : 'sub-title'"
          @click="selectSubCategory({ id: sub.id, type: cat.parentCode.toLowerCase(), subType: sub.code.toLowerCase(), name: sub.name, catName: cat.parentName })"
        >
          {{ sub.name }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'WhynotCategory',
  components: {
  },
  props: {
    categoryInLayout: {
      type: String,
      default: ''
    },
    subCategoryInLayout: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedCategory: '',
      selectedSubCategory: '',
      searchText: '',
      isOpenCategoryPanel: false
    }
  },
  async fetch () {
    this.selectedCategory = await this.categoryInLayout
    this.selectedSubCategory = await this.subCategoryInLayout
  },
  created () {
    this.$bus.$off('toggleCategoryPanel')
    this.$bus.$on('toggleCategoryPanel', ()=> {
      this.toggleCategoryPanel()
    })
  },
  methods: {
    toggleCategoryPanel() {
      this.isOpenCategoryPanel = !this.isOpenCategoryPanel
    },
    mainPage () {
      this.$router.push('/')
    },
    search () {
      this.selectedCategory = 'search'
      this.$router.push({
        name: 'gather-category',
        params: {
          category: 'search'
        },
        query: {
          t: this.searchText
        }
      })
    },
    moveMyPostingsPage () {
      if (!this.$store.state.userInfo.initLoginDone) {
        alert('로그인 후 이용해 주세요')
        return false
      }

      this.selectedCategory = 'mypostings'
      this.$router.push({
        name: 'gather-category',
        params: {
          category: 'mypostings'
        }
      })
    },
    moveBookMarkPage () {
      if (!this.$store.state.userInfo.initLoginDone) {
        alert('로그인 후 이용해 주세요')
        return false
      }

      this.selectedCategory = 'bookmark'
      this.$router.push({
        name: 'gather-category',
        params: {
          category: 'bookmark'
        }
      })
    },
    selectCategory ({ id, type }) {
      this.$emit('getCategoryIdAndGetPosts', {})
      this.selectedCategory = type
      this.selectedSubCategory = ''
      this.$router.push(`/gather/${type}`)
    },
    selectSubCategory ({ id, type, subType, name, catName }) {
      this.$emit('setSubCategoryId', { id, name, catName })
      this.selectedCategory = type
      this.selectedSubCategory = subType
      // this.$router.push({ path: `/${this.selectedCategory}`, params: { sub: `${type}` } })
      this.$router.push(`/gather/${this.selectedCategory}?sub=${this.selectedSubCategory}`)
    },
    checkLogin() {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.$emit('setLoginPopupOpen', {})
      } else {
        this.$router.push('/posting?m=write')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/category.scss';
</style>
