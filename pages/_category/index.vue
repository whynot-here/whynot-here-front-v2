<template>
  <div id="CategoryPage">
    <TopBar />
    <div class="panel">
      <Category />
    </div>
    <!-- <div>
      <h1>
        👋 난 {{ category }} 카테고리야 여기에 카드들이 들어가지
      </h1>
    </div>
    <nuxt-link style="text-decoration: none; color: #1e1e1e;" :to="`/${category}/posts/${1}`">
      <h2>
        😉 난 카드야 1번 포스팅 보러갈래?
      </h2>
    </nuxt-link> -->
  </div>
</template>

<script>
import TopBar from '@/components/common/TopBar'
import Category from '@/components/common/Category'

export default {
  name: 'CategoryPage',
  components: {
    TopBar,
    Category
  },
  asyncData({ params }) {
    return {
      category: params.category
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#CategoryPage {
  width: 100vw; height: 100vh;
  overflow: scroll;
  background: #FAFAFA;
  .panel {
    display: flex;
  }
}
</style>