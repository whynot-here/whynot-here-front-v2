<template>
  <div id="Card">
    <div class="cards-wrp">
      <div
        v-for="(post, idx) in postsProc"
        :key="idx"
        class="card-wrp"
      >
        <nuxt-link style="text-decoration: none; color: #181818" :to="`/project/posts/${idx}`">
          <div class="card-top">
            <div class="writer-title-wrp">
              <div class="writer">
                {{ post.writer.nickname }}
              </div>
              <div class="card-title">
                {{ post.title_short }}
              </div>
            </div>
            <div class="book-mark" @click="post.selected = !post.selected">
              <img v-if="!post.selected" src="@/assets/img/category/bookmark.png" alt="">
              <img v-if="post.selected" src="@/assets/img/category/bookmark-selected.png" alt="">
            </div>
          </div>
          <div class="card-middle">
            <div class="content">
              {{ post.content_light }}
            </div>
          </div>
          <div class="card-bottom">
            <div />
            <div class="gather-d-day">
              마감 D-8
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhynotCard',
  components: {
  },
  props: {
    posts: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    postsProc () {
      return this.posts.map((post) => {
        if (post.title.length > 16) {
          post.title_short = post.title.substr(0, 20) + '...'
        } else {
          post.title_short = post.title
        }
        post.selected = false
        if (post.content.length > 30) {
          post.content_light = post.content.substr(0, 30) + '...'
        } else {
          post.content_light = post.content
        }
        return post
      })
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/card.scss';
</style>
