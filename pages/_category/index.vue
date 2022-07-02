<template>
  <div id="CategoryPage">
    <TopBar
      :category="category"
    />
    <div class="panel">
      <Category />
      <Card />
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
import TopBar from '@/components/main-page/TopBar'
import Category from '@/components/main-page/Category'
import Card from '@/components/main-page/Card'

export default {
  name: 'CategoryPage',
  components: {
    TopBar,
    Category,
    Card
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
  mounted () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      this.$axios.get('/v1/posts')
      .then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#CategoryPage {
  width: 100vw; height: 100vh;
  overflow: scroll;
  background: #FAFAFA;
  #TopBar {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .panel {
    display: flex;
    width: max-content;
    margin: 0 auto;
    #Category {
      position: sticky;
      top: 15vh;
      height: max-content;
    }
  }
}
</style>