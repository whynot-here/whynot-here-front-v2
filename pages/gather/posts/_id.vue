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
        <div class="top">
          <div>
            <img :src="postComp.writerProfileImage" alt="">
          </div>
          <div>
            {{ postComp.writerName }}
          </div>
          <div>
            {{ postComp.contactText }} 연락
          </div>
        </div>
        <div class="bottom">
          <div class="comment-count">
            댓글 <strong>{{ commentCount }}</strong>
          </div>
          <div class="comment-wrp">
            <textarea class="comment-input" rows="10" placeholder="Why Not Here에 가입하고 댓글을 달아보세요!"></textarea>
            <div class="comment-register">댓글달기</div>
          </div>
        </div>
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
      },
      commentCount: 0
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
      result.contactText = {'EMAIL' : '이메일', 'KAKAO_OPEN_CHAT' : '카카오톡', 'PHONE' : '휴대전화'}[this.post.ownerContact.type]
      result.writerName = this.post.writer.nickname
      result.writerProfileImage = this.post.writer.profileImg
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
      width: 362px; height: 250px;
      padding: 24px;
      margin-left: 30px;
      background: #FFFFFF;
      border: 1px solid #E7E7E7;
      box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 8px 16px rgba(0, 52, 138, 0.08);
      border-radius: 12px;
      .top {
        display: flex;
        div:first-child {
          margin-right: 12px;
          img {
            width: 32px; height: 32px;
            margin-top: 7px;
            border-radius: 30px;
          }
        }
        div:nth-child(2) {
          flex-grow: 1;
          line-height: 44px;
          font-size: .88rem;
          font-weight: 500;
          color: #737373;
        }
        div:nth-child(3) {
          width: 121px; height: 44px; line-height: 44px;
          font-size: .88rem;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          background: #FF8A00;
          border-radius: 10px;
        }
      }
      .bottom {
        margin-top: 32px;
        .comment-count {
          font-size: .88rem;
          font-weight: 500;
          strong {
            color: #3E82F1;
          }
        }
        .comment-wrp {
          position: relative;
          .comment-input {
            width: 332px; height: 106px;
            padding: 15px; margin-top: 14px;
            background: #FAFAFA;
            border-radius: 8px;
            border: none !important;
            resize: none;
          }          
          .comment-input:focus {
            outline: none;
          }
          .comment-input::placeholder {
            color: #C8C8C8;
          }
          .comment-register {
            position: absolute;
            margin-top: -50px;
            margin-left: 260px;
            width: 77px; height: 33px; line-height: 33px;
            padding: 0 4px;
            font-size: .88rem;
            font-weight: 500;
            color: #737373;
            text-align: center;
            background: #FFFFFF;
            mix-blend-mode: normal;
            border: 1px solid #E7E7E7;
            border-radius: 32px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>