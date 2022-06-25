<template>
  <div id="Category">
    <section class="category">
      <div
        class="title"
        @click="selectCategory({ type: 'project' })"
      >
        📂 프로젝트
      </div>
      <div
        :class="selectedSubCategory === 'sideProject' ? 'sub-title selected' : 'sub-title'"
        @click="selectSubCategory({ type: 'sideProject' })"
      >
        사이드 프로젝트
      </div>
      <div
        :class="selectedSubCategory === 'capstone' ? 'sub-title selected' : 'sub-title'"
        @click="selectSubCategory({ type: 'capstone' })"
      >
        공프기 / 캡스톤
      </div>
      <div
        :class="selectedSubCategory === 'contest' ? 'sub-title selected' : 'sub-title'"
        @click="selectSubCategory({ type: 'contest' })"
      >
        공모전
      </div>
    </section>
    <div class="posting-btn">
      📄 글쓰기
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhynotCategory',
  components: {
  },
  data () {
    return {
      selectedCategory: 'project',
      selectedSubCategory: ''
    }
  },
  methods: {
    selectCategory ({ type }) {
      this.selectedCategory = type
      this.selectedSubCategory = ''
      this.$router.push(`/${type}`)
    },
    selectSubCategory ({ type }) {
      this.selectedSubCategory = type
      // this.$router.push({ path: `/${this.selectedCategory}`, params: { sub: `${type}` } })
      this.$router.push(`/${this.selectedCategory}?sub=${type}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/category.scss';
</style>
