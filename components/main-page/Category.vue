<template>
  <div
    :class="
      !isFromPc ? `category-wrp-m ${isOpenCategoryPanel}` : 'category-wrp'
    "
    @click.self="!isFromPc ? toggleCategoryPanel() : ''"
  >
    <div v-show="isFromPc || isOpenCategoryPanel" id="Category">
      <section class="logo">
        <div v-if="isFromPc" class="logo-desc">사람이 모이는 공간</div>
        <div v-if="!isFromPc" class="category-close">
          <img
            src="@/assets/img/common/close-review.png"
            alt=""
            @click.self="toggleCategoryPanel"
          />
        </div>
        <div class="logo-img" @click="isFromPc ? mainPage() : ''">
          <img src="@/assets/img/common/whynot-here-logo.png" alt="" />
        </div>
      </section>
      <section class="category">
        <div class="sub-menu-wrp">
          <div class="search">
            <div class="search-box">
              <input
                v-model="searchText"
                class="total-search"
                type="text"
                placeholder="통합검색"
                @keyup.enter="search()"
              />
            </div>
            <div class="search-img">
              <img
                src="@/assets/img/category/search.png"
                alt=""
                @click="search()"
              />
            </div>
          </div>
          <div
            :class="
              selectedCategory === 'mypostings' ? 'menu selected' : 'menu'
            "
            @click="moveMyPostingsPage()"
          >
            <div>⭐️ My 모임</div>
            <div>
              <img src="@/assets/img/category/right-arrow.png" alt="" />
            </div>
          </div>
          <div
            :class="selectedCategory === 'posting' ? 'menu selected' : 'menu'"
            @click="movePostingPage()"
          >
            <div>📝 글쓰기</div>
            <div>
              <img src="@/assets/img/category/right-arrow.png" alt="" />
            </div>
          </div>
          <div
            :class="selectedCategory === 'bookmark' ? 'menu selected' : 'menu'"
            @click="moveBookmarkPage()"
          >
            <div>🔖 좋아요</div>
            <div>
              <img src="@/assets/img/category/right-arrow.png" alt="" />
            </div>
          </div>
          <div
            :class="selectedCategory === 'aboutus' ? 'menu selected' : 'menu'"
            @click="moveAboutUsPage()"
          >
            <div>About us</div>
            <div>
              <img src="@/assets/img/category/right-arrow.png" alt="" />
            </div>
          </div>
          <div class="menu" @click="isOpenAskPopup = true">
            <div>문의하기</div>
            <div>
              <img src="@/assets/img/category/right-arrow.png" alt="" />
            </div>
          </div>
        </div>
        <div
          v-for="(cat, idx) in categoryGroup"
          :key="idx"
          class="category-wrp"
        >
          <div
            :class="
              cat.parentCode.toLowerCase() === selectedCategory
                ? `categoryId-${cat.parentId} title selected`
                : `categoryId-${cat.parentId} title`
            "
            @click="
              selectCategory({
                id: cat.parentId,
                type: cat.parentCode.toLowerCase()
              })
            "
          >
            {{ cat.parentName }}
          </div>
        </div>
      </section>
      <div
        v-if="isOpenAskPopup"
        class="ask-popup"
        @click.self="isOpenAskPopup = false"
      >
        <div class="content-wrp">
          <div class="close">
            <img
              src="@/assets/img/common/close-review.png"
              alt=""
              @click.self="isOpenAskPopup = false"
            />
          </div>
          <div class="top">
            <div>아래 이메일로 문의주세요</div>
            <div>system1whynot@gmail.com</div>
          </div>
          <div class="btn" @click="copyUrl()">
            <div class="btn-content-wrp">
              <div class="copy">
                <img src="@/assets/img/posting/copy-detail.png" alt="" />
              </div>
              <div>문의 메일 복사</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhynotCategory',
  components: {},
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
  data() {
    return {
      selectedCategory: '',
      selectedSubCategory: '',
      searchText: '',
      isOpenCategoryPanel: false,
      isOpenAskPopup: false
    }
  },
  async fetch() {
    this.selectedCategory = await this.categoryInLayout
    this.selectedSubCategory = await this.subCategoryInLayout
  },
  created() {
    this.$bus.$off('toggleCategoryPanel')
    this.$bus.$on('toggleCategoryPanel', () => {
      this.toggleCategoryPanel()
    })
  },
  methods: {
    toggleCategoryPanel() {
      this.isOpenCategoryPanel = !this.isOpenCategoryPanel
    },
    mainPage() {
      this.$router.push('/')
    },
    resetCategory() {
      this.selectedCategory = ''
      this.selectedSubCategory = ''
    },
    search() {
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
    moveMyPostingsPage() {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
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
    movePostingPage() {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
            content: '로그인 후 이용해 주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }
      if (this.selectedCategory !== '') {
        this.$router.push(`/posting?m=write&type=${this.selectedCategory}`)
      } else {
        this.$router.push(`/posting?m=write`)
      }
    },
    moveBookmarkPage() {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
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
    moveAboutUsPage() {
      this.selectedCategory = 'aboutus'
      this.$router.push('/aboutus')
      this.$bus.$emit('sendCategoryTitle', { categoryTitle: 'About us' })
      this.toggleCategoryPanel()
    },
    selectCategory({ id, type }) {
      this.$bus.$emit('getCategoryIdAndGetPosts', {})
      this.selectedCategory = type
      this.selectedSubCategory = ''
      this.$router.push(`/gather/${type}`)
      this.toggleCategoryPanel()
    },
    selectSubCategory({ id, type, subType, name, catName }) {
      this.$bus.$emit('setSubCategoryId', { id, name, catName })
      this.selectedCategory = type
      this.selectedSubCategory = subType
      this.$router.push(
        `/gather/${this.selectedCategory}?sub=${this.selectedSubCategory}`
      )
      this.toggleCategoryPanel()
    },
    checkLogin() {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.$router.push('/login')
      } else {
        this.$router.push('/posting?m=write')
      }
    },

    copyUrl() {
      this.copySomething('system1whynot@gmail.com')
      this.toastPopup('문의 메일이 복사되었습니다.')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/category.scss';
</style>
