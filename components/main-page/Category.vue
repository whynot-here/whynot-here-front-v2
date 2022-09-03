<template>
  <div id="Category">
    <section class="category">
      <div @click="checkLogin()">
        <div class="posting-btn">
          📝 글쓰기
        </div>
      </div>
      <div class="sub-menu-wrp">
        <div class="menu">
          <div @click="moveMyPostingsPage()">
            ⭐️ My 모임
          </div>
          <div>
            <img src="@/assets/img/category/right-arrow.png" alt="">
          </div>
        </div>
        <div class="menu">
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
          @click="selectSubCategory({ id: sub.id, type: cat.parentCode.toLowerCase(), subType: sub.code.toLowerCase() })"
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
      selectedCategory: '',
      selectedSubCategory: ''
    }
  },
  mounted () {
    this.selectedCategory = this.category
    this.selectedSubCategory = this.subCategory
  },
  methods: {
    moveMyPostingsPage () {
      console.log('...')
      this.$router.push({
        name: 'gather-category',
        params: {
          category: 'mypostings'
        }
      })
    },
    selectCategory ({ id, type }) {
      this.$emit('sendCategoryId', { id })
      this.selectedCategory = type
      this.selectedSubCategory = ''
      this.$router.push(`/gather/${type}`)
    },
    selectSubCategory ({ id, type, subType }) {
      this.$emit('sendCategoryId', { id })
      this.selectedCategory = type
      this.selectedSubCategory = subType
      // this.$router.push({ path: `/${this.selectedCategory}`, params: { sub: `${type}` } })
      this.$router.push(`/gather/${this.selectedCategory}?sub=${this.selectedSubCategory}`)
    },
    checkLogin() {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.$emit('setLoginPopupOpen', {})
      } else {
        this.$router.push('/posting?m=wirte')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/category.scss';
</style>
