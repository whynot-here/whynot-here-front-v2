<template>
  <div id="CategoryPage">
    <TopBar
      :category="category"
    />
    <div class="panel">
      <Category />
      <Card
        :posts-list="postsList"
      />
    </div>
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
    console.log('hihi')
    console.log(params)
    return {
      category: params.category
    }
  },
  data () {
    return {
      postsList:[]
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      this.$axios.get('https://whynot-here.o-r.kr/v1/posts')
      .then(res => {
        res.data.map((res) => {
          return this.postsList.push(res)
        })
      })
    }
  //   getPosts () {(
  //     this.$axios.get('/api/v2/posts'),
  //     {
  //       withCredentials: true,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer asdfadsfasdfsdfasf`
  //       }
  //     }
  //   ).then(res => {
  //       res.data.map((res) => {
  //         return this.postsList.push(res)
  //       })
  //     })
  //   }
  }
}
</script>

<style lang="scss" scoped>
#CategoryPage {
  width: 100vw; height: 100vh;
  // overflow: hidden;
  // overflow: scroll;
  background: #FAFAFA;
  #TopBar {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .panel {
    display: flex;
    width: 100vw; 
    height: calc(100vh - 80px);
    overflow: scroll;
    margin: 0 auto;
    // width: max-content;
    // width: 100vw;
    // margin: 0 auto;
    #Category {
      width: 300px;
      position: sticky;
      top: 0px;
      // height: max-content;
    }
  }
}
</style>