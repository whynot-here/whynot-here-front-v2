<template>
  <div :class="!isFromPc ? `category-wrp-m ${isOpenCategoryPanel}` : 'category-wrp'">
    <div v-show="(isFromPc || isOpenCategoryPanel)" id="Category">
      <section class="logo">
        <div v-if="(isFromPc)" class="logo-desc">
          사람이 모이는 공간
        </div>
        <div v-if="!isFromPc" class="category-close">
          <img src="@/assets/img/common/close-review.png" alt="" @click.self="toggleCategoryPanel">
        </div>
        <div class="logo-img" @click="isFromPc ? mainPage() : ''">
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
            <div class="search-box">
              <input v-model="searchText" class="total-search" type="text" placeholder="통합검색" @keyup.enter="search()" />
            </div>
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
          <div :class="selectedCategory === 'bookmark' ? 'menu selected' : 'menu'" @click="moveBookmarkPage()">
            <div>
              🔖 북마크
            </div>
            <div>
              <img src="@/assets/img/category/right-arrow.png" alt="">
            </div>
          </div>
          <div :class="selectedCategory === 'aboutus' ? 'menu selected' : 'menu'" @click="moveAboutUsPage()">
            <div>
              About us
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
    resetCategory () {
      this.selectedCategory = ''
      this.selectedSubCategory = ''
    },
    search () {
      this.resetCategory()
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
      this.toggleCategoryPanel()
      this.$bus.$emit('getCategoryIdAndGetPosts', {})
    },
    moveMyPostingsPage () {
      if (!this.$store.state.userInfo.initLoginDone) {
        // alert('로그인 후 이용해 주세요')
        this.cmn_openAlertPopup({
          option: {
            title: '⚠️알림',
            content: '로그인 후 이용해 주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }

      this.resetCategory()
      this.selectedCategory = 'mypostings'
      this.$router.push({
        name: 'gather-category',
        params: {
          category: 'mypostings'
        }
      })
      this.toggleCategoryPanel()
    },
    moveBookmarkPage () {
      if (!this.$store.state.userInfo.initLoginDone) {
        // alert('로그인 후 이용해 주세요')
        this.cmn_openAlertPopup({
          option: {
            title: '⚠️알림',
            content: '로그인 후 이용해 주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }

      this.resetCategory()
      this.selectedCategory = 'bookmark'
      this.$router.push({
        name: 'gather-category',
        params: {
          category: 'bookmark'
        }
      })
      this.toggleCategoryPanel()
    },
    moveAboutUsPage () {
      this.selectedCategory = 'aboutus'
      this.$router.push('/aboutus')
      this.$bus.$emit('sendCategoryTitle', { categoryTitle: 'About us' })
      this.toggleCategoryPanel()
    },
    selectCategory ({ id, type }) {
      this.$bus.$emit('getCategoryIdAndGetPosts', {})
      this.selectedCategory = type
      this.selectedSubCategory = ''
      this.$router.push(`/gather/${type}`)
      this.toggleCategoryPanel()
    },
    selectSubCategory ({ id, type, subType, name, catName }) {
      this.$bus.$emit('setSubCategoryId', { id, name, catName })
      this.selectedCategory = type
      this.selectedSubCategory = subType
      // this.$router.push({ path: `/${this.selectedCategory}`, params: { sub: `${type}` } })
      this.$router.push(`/gather/${this.selectedCategory}?sub=${this.selectedSubCategory}`)
      this.toggleCategoryPanel()
    },
    checkLogin() {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.$router.push('/login')
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
