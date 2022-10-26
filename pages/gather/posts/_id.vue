<template>
  <div id="PostingPage">
    <div class="panel-wrp">
      <section class="detail-panel">
        <div class="top">
          <div class="d-day">
            마감 D - 8
          </div>
          <div class="img-wrp">
            <img src="@/assets/img/posting/copy-detail.png" alt="" @click="copyUrl()">
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
          <div class="contact">
            {{ postComp.contactText }} 연락
          </div>
        </div>
        <div class="bottom">
          <div class="comment-count">
            댓글 <strong>{{ comments.length }}</strong>
          </div>
          <div class="comment-wrp">
            <textarea v-model="currentComment" class="comment-input" rows="10" placeholder="Why Not Here에 가입하고 댓글을 달아보세요!"></textarea>
            <div class="comment-register" @click="registerComment()">댓글달기</div>
          </div>
        </div>
        <div v-if="commentComp.length > 0" class="comment-list">
          <div
            v-for="(comment, idx) in commentComp"
            :key="idx"
            class="comment"
          >
            <div class="top">
              <div>
                <img :src="comment.account.profileImg" alt="">
              </div>
              <div>
                {{ comment.account.nickname }}
              </div>
              <div
                v-if="comment.account.email === $store.state.userInfo.detail.email"
                class="delete-comment"
                @click="deleteComment(comment.commentId)"
              >
                <img src="@/assets/img/common/close-page.png" alt="">
              </div>
            </div>
            <div class="comment-content">
              {{ comment.content }}
            </div>
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
      comments: [],
      commentCount: 0,
      currentComment: ''
    }
  },
  computed: {
    postComp() {
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
    },
    commentComp() {
      return this.comments
    }
  },
  created () {
    this.getPost()
    this.getComment()
  },
  methods: {
    getPost() {
      this.$axios.get(`https://whynot-here.o-r.kr/v2/posts/${this.id}`)
      .then(res => {
        this.post = res.data
      })
    },
    getComment() {
      this.$axios.get(`https://whynot-here.o-r.kr/v2/comments/${this.id}`)
      .then(res => {
        this.comments = res.data
      })
    },
    copyUrl() {
      let url = '';
      const textarea = document.createElement("textarea");
      
      document.body.appendChild(textarea);
      url = window.document.location.href;
      textarea.value = url;
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      
      alert("URL이 복사되었습니다.")
    },
    registerComment() {
      if (!this.currentComment.length > 0) {
        alert('댓글을 입력해주세요')
        return false
      }
      (this.$axios.post(
        ('https://whynot-here.o-r.kr/v2/comments'),
        {
          postId: this.id,
          comment: this.currentComment
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
      )
      ).then(res => {
        alert('댓글이 등록되었습니다.')
        this.getComment()
      }).catch((error) => {
        window.alert(error.response.data.message)
      })
    },
    deleteComment (id) {
      (this.$axios.delete(
        (`https://whynot-here.o-r.kr/v2/comments/${id}`),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
      )
      ).then(res => {
        alert('댓글이 삭제되었습니다.')
        this.getComment()
      }).catch((error) => {
        window.alert(error.response.data.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#PostingPage {
  background-color: #F3F3F3;
  height: calc(100vh - 80px - 44px);
  overflow: scroll;
  .panel-wrp {
    display: flex;
    width: 1070px;
    margin: 40px auto;
    .detail-panel {
      width: 582px; 
      height: max-content;
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
            cursor: pointer;
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
      width: 362px; min-height: 250px;
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
        .contact {
          width: 121px; height: 44px; line-height: 44px;
          font-size: .88rem;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          background: #FF8A00;
          border-radius: 10px;
        }
        .delete-comment {
          line-height: 44px;
          img {
            width: 20px; height: 20px;
            cursor: pointer;
          }
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
      .comment-list {
        .comment {
          width: 330px; min-height: 102px;
          padding: 16px;
          .comment-writer {
            display:flex;
          }
          .comment-content {
            margin-top: 24px; margin-left: 13px;
            color: #454545;
            font-size: .88rem; font-weight: 500;
          }
        }
      }
    }
  }
}
</style>