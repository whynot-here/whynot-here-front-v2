<template>
  <div>
    <h3>
      {{ postComp.title }}
    </h3>
    <!-- <div>
      <img :src="postComp.writer.profileImg" alt="">
      {{ postComp.writer.nickname }}
    </div> -->
    <div>
      {{ postComp.createdDt }}
    </div>
    <div>
      {{ postComp.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostingPage',
  layout: 'why-not',
  asyncData({ params }) {
    return {
      id: params.id
    }
  },
  data () {
    return {
      post: {
      }
    }
  },
  computed: {
    postComp () {
      return this.post
    }
  },
  created () {
    this.getPost()
  },
  methods: {
    getPost() {
      this.$axios.get(`https://whynot-here.o-r.kr/v2/posts/${this.id}`)
      .then(res => {
        this.post = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>