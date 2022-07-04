<template>
  <div id="Card">
    <div
      v-for="(post, idx) in postsList"
      :key="idx"
      class="card-wrp"
    >
      <div>
        {{ post.title }}
      </div>
      <div>
        {{ post.writer.nickname }}
      </div>
      <div>
        {{ post.content }}
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
    postsList: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    postsListProc () {
      return 1
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/card.scss';
</style>
