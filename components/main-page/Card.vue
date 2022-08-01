<template>
  <div id="Card">
    <div
      v-for="(post, idx) in postsListProc"
      :key="idx"
      class="card-wrp"
    >
      <nuxt-link style="text-decoration: none; color: #181818" :to="`/project/posts/${idx}`">
        <div class="card-top">
          <div class="card-title">
            {{ post.br_title }}
          </div>
          <div class="book-mark" @click="post.selected = !post.selected">
            <img v-if="!post.selected" src="@/assets/img/category/bookmark.png" alt="">
            <img v-if="post.selected" src="@/assets/img/category/bookmark-selected.png" alt="">
          </div>
        </div>
        <div class="card-middle">
          <div class="line-01">
            {{ post.writer.nickname }}
          </div>
          <div class="line-02">
            {{ post.content_light }}
          </div>
        </div>
        <div class="card-bottom">
          <div v-if="post.jobs[0] !== undefined" class="role">📝 기획자</div>
          <div v-if="post.jobs[1] !== undefined" class="role">🖌 디자이너</div>
          <div v-if="post.jobs[2] !== undefined" class="role">⚙️ 개발자</div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhynotCard',
  components: {
  },
  props: {
    postsList: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    postsListProc () {
      return this.postsList.map((post) => {
        if (post.title.length > 16) {
          post.br_title = post.title.split(' ', 3).join(' ') + '\n' + post.title.split(' ').slice(3)
        } else {
          post.br_title = post.title
        }
        post.selected = false
        if (post.content.length > 40) {
          post.content_light = post.content.substr(0, 40) + '...'
        } else {
          post.content_light = post.content
        }
        // console.log(post.jobs[2])
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
