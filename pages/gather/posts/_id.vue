<template>
  <div id="PostingPage">
    <div class="panel-wrp">
      <section class="detail-panel">
        <div class="top">
          <div class="d-day">
            마감 D - 8
          </div>
          <div class="img-wrp">
            <img src="@/assets/img/posting/copy-detail.png" alt="">
          </div>
          <div class="img-wrp">
            <img src="@/assets/img/posting/bookmark-detail.png" alt="">
          </div>
        </div>
        <div class="title">
          {{ postComp.title }}
        </div>
        <div class="info">
          <div>
            {{ postComp.categoryName }}
          </div>
          <div>
            {{ postComp.communicationToolText }}
          </div>
          <div>
            {{ postComp.recruitCurrentCnt }} / {{ postComp.recruitTotalCnt }}
          </div>
        </div>
        <div class="content">
          {{ postComp.content }}
        </div>
      </section>
      <section class="comment-panel">
  
      </section>
    </div>
    <!-- <div>
      <img :src="postComp.writer.profileImg" alt="">
      {{ postComp.writer.nickname }}
    </div> -->
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
      if (this.post.category === undefined) {
        return this.post
      }
      const result = this.post
      result.communicationToolText = {'ONLINE' : '온라인', 'OFFLINE' : '만나서'}[this.post.communicationTool]
      result.categoryName = this.post.category.name
      return result
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
#PostingPage {
  background-color: #F3F3F3;
  height: calc(100vh - 80px);
  overflow: scroll;
  .panel-wrp {
    display: flex;
    width: 1070px;
    margin: 40px auto;
    .detail-panel {
      width: 582px; 
      // height: 582px;
      padding: 24px;
      background: #FFFFFF;
      border: 1px solid #E7E7E7;
      box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 8px 16px rgba(0, 52, 138, 0.08);
      border-radius: 12px;
      .top {
        display: flex;
        .d-day {
          width: 80px; height: 30px; line-height: 30px;
          padding: 0 6px;
          font-size: .88rem; font-weight: 600;
          color: #3E82F1;
          text-align: center;
          background: #FFFFFF;
          border: 1px solid #3E82F1;
          box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 4px 8px rgba(0, 52, 138, 0.06);
          border-radius: 24px;
        }
        .img-wrp {
          margin-left: 16px;
          img {
            width: 36px; height: 36px;
          }
        }
        div:nth-child(2) {
          flex-grow: 1;
          text-align: right;
        }
      }
      .title {
        margin-top: 16px;
        font-size: 1.38rem;
        font-weight: 600;
      }
      .info {
        display: flex;
        height: 54px;
        margin-top: 42px;
        div {
          height: 30px; line-height: 30px;
          padding: 0 14px; margin-right: 12px;
          font-size: .88rem;
          background: #F5F5F5;
          border-radius: 16px;
        }
      }
      .content {
        border-top: 1px solid #E7E7E7;
        padding: 24px 8px;
        font-size: .88rem;
        color: #484848;
      }
    }
    .comment-panel {
      width: 410px; height: 290px;
      margin-left: 30px;
      background: #FFFFFF;
      border: 1px solid #E7E7E7;
      box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 8px 16px rgba(0, 52, 138, 0.08);
      border-radius: 12px;
    }
  }
}
</style>