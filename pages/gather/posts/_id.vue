<template>
  <div v-if="!isMobile" id="PostingPage">
    <div class="panel-wrp">
      <section class="detail-panel">
        <div class="top">
          <div class="d-day">
            마감 {{ postComp.dDay }}
          </div>
          <div class="img-wrp">
            <img src="@/assets/img/posting/copy-detail.png" alt="" @click="copyUrl()">
          </div>
          <div class="img-wrp">
            <img v-if="isBookmarked" src="@/assets/img/posting/bookmark-detail-selected.png" @click.prevent="bookMark()">
            <img v-else src="@/assets/img/posting/bookmark-detail.png" @click.prevent="bookMark()" />
          </div>
        </div>
        <div class="title">
          {{ postComp.title }}
        </div>
        <div class="info">
          <div class="left">
            {{ postComp.categoryName }}
          </div>
          <div class="left">
            {{ postComp.communicationToolText }}
          </div>
          <div class="left">
            <strong>{{ postComp.recruitCurrentCnt }}</strong> / {{ postComp.recruitTotalCnt }}
          </div>
          <div class="gap"></div>
          <div class="right">
            <img src="@/assets/img/common/views.png" alt="">
            <div>
              {{ post.views === null ? 0 : post.views }}
            </div>
          </div>
        </div>
        <div class="content">
          {{ postComp.content }}
        </div>
        <div class="content-img">
          <div
            v-for="(postImg, idx) in postComp.imageLinks"
            :key="idx"
          >
            <img :src=postImg.link class="postImg" />
          </div>
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
          <div class="contact" @click="copyContactInfo()">
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
                <img v-if="isMyComment(comment)" src="@/assets/img/common/close-page.png" alt="">
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
  <div v-else id="m-PostingPage">
    <main>
      <!-- <div class="m-detail-header">
        <div class="m-close">
          <img class="m-back-btn" src="@/assets/img/common/left-arrow.png" alt="" @click.prevent="$router.go(-1)">
        </div>
      </div> -->
      
      <div v-if="activeComponent === 'DetailView'">
        <div class="m-detail-container">
          <div class="m-detail-content">
            <div class="m-detail-content-header">
              <div class="writer">
                {{ postComp.writerName }}
              </div>
              <div class="title">
                {{ postComp.title }}
              </div>
              <div class="tags">
                <div class="tag d-day">
                  마감 {{ postComp.dDay }}
                </div>
                <div class="tag communication-tool">
                  {{ postComp.communicationToolText }}
                </div>
                <div class="tag recruit-people-cnt">
                  <strong>{{ postComp.recruitCurrentCnt }}</strong> / {{ postComp.recruitTotalCnt }}
                </div>
              </div>
            </div>
            <div class="m-detail-content-body">
              <div class="m-content-text">
                {{ postComp.content }}              
              </div>
              <div class="m-content-img">
                <div
                  v-for="(postImg, idx) in postComp.imageLinks"
                  :key="idx"
                >
                  <img :src=postImg.link class="m-postImg" />
                </div>
              </div>
            </div>

            <div class="m-detail-content-footer">
              <img class="views-icon" src="@/assets/img/common/views.png" />
              <div class="views-text">{{ post.views === null ? 0 : post.views }}</div>
            </div>
          </div>

          <div class="m-detail-transition" @click="renderComponent('CommentView')">
            <div class="m-trans-text">댓글</div> 
            <img class="m-trans-icon" src="@/assets/img/common/bottom-arrow.png" />
          </div>
        </div>
      </div>

      <div v-else-if="activeComponent === 'CommentView'">
        <div class="m-comment-container">
          <div class="m-detail-transition" @click="renderComponent('DetailView')">
            <div></div>
            <div class="m-trans-text">본문</div> 
            <img class="m-trans-icon" src="@/assets/img/common/upper-arrow.png" />
          </div>

          <div v-if="commentComp.length > 0" class="m-comment-list">
            <div
              v-for="(comment, idx) in commentComp"
              :key="idx"
              class="m-comment"
            >

              <div class="m-profile-info">
                <div>
                  <img class="m-profile-img" :src="comment.account.profileImg" alt="">
                </div>
                <div>
                  {{ comment.account.nickname }}
                </div>
                <div
                  v-if="comment.account.email === $store.state.userInfo.detail.email"
                  class="delete-comment"
                  @click="deleteComment(comment.commentId)"
                >
                  <img v-if="isMyComment(comment)" class="m-close-img" src="@/assets/img/common/close-page.png" alt="">
                </div>
              </div>

              <div class="m-comment-content">
                {{ comment.content }}
              </div>
            </div>
          </div>
          

          <div class="m-comment-wrp">
            <textarea v-model="currentComment" class="m-comment-input" rows="10" placeholder="Why Not Here에 가입하고 댓글을 달아보세요!"></textarea>
            <div class="m-comment-register" @click="registerComment()">댓글달기</div>
          </div>
        </div>
      </div>

      <div class="m-detail-footer">
        <div></div>
        <div class="m-img-wrp">
            <img src="@/assets/img/posting/copy-detail.png" alt="" @click="copyUrl()">
          </div>
          <div class="m-img-wrp">
            <img v-if="isBookmarked" src="@/assets/img/posting/bookmark-detail-selected.png" @click.prevent="bookMark()">
            <img v-else src="@/assets/img/posting/bookmark-detail.png" @click.prevent="bookMark()">
          </div>
          <div class="m-img-wrp">
            <img src="@/assets/img/posting/chat.png" alt="">
          </div>
          <div class="m-contact" @click="copyContactInfo()">
            <div> {{ postComp.contactText }} 연락</div>
          </div>
      </div>
    </main>    
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
      currentComment: '',
      activeComponent: 'DetailView',
      isBookmarked: false
    }
  },
  computed: {
    postComp() {
      if (this.post.category === undefined) {
        return this.post
      }
      const result = this.post
      result.communicationToolText = {'ONLINE' : '온라인', 'OFFLINE' : '만나서'}[this.post.communicationTool]
      let categoryName = ''
      this.categoryGroup.forEach((category) => {
        if (category.parentId === this.post.category.id) {
          categoryName = category.parentName
        } else {
          category.children.forEach((child) => {
            if (child.id === this.post.category.id) {
              categoryName = category.parentName + ' / ' + child.name
            }
          })
        }
      })
      result.categoryName = categoryName
      result.contactText = {'EMAIL' : '이메일', 'KAKAO_OPEN_CHAT' : '카카오톡', 'PHONE' : '휴대전화'}[this.post.ownerContact.type]
      result.writerName = this.post.writer.nickname
      result.writerProfileImage = this.post.writer.profileImg
      result.dDay = this.cmn_getDday(result.closedDt)
      return result
    },
    commentComp() {
      return this.comments
    }
  },
  created () {
    this.getPost()
    this.getComment()
    this.checkBookmark()
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
        this.currentComment = ''
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
    },
    renderComponent (component) {
			this.activeComponent = component;
		},
    copyContactInfo () {
      navigator.clipboard
      .writeText(this.postComp.ownerContact.value)
      .then(() => {
        alert(`'${this.postComp.ownerContact.value}' 가 복사되었습니다`);
      })
      .catch((err) => {
        alert("링크복사 실패", err);
      });
    },
    isMyComment (comment) {
      return this.$store.state.userInfo.detail.nickname === comment.account.nickname
    },
    checkBookmark() {
      this.$axios.get(
        ('https://whynot-here.o-r.kr/v2/posts/favorite'),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        }
        )
        .then(res => {
          res.data.forEach((res) => {
            if (res.id === this.post.id) {
              this.isBookmarked = true;
            }
          })
        });
    },
    bookMark() {
      if (!this.$store.state.userInfo.initLoginDone) {
        alert('로그인 후 이용해 주세요')
        return false
      }

      console.log("book mark : "+ this.isBookMarked)
      if (this.isBookMarked) {
        (this.$axios.delete(
          (`https://whynot-here.o-r.kr/v2/posts/favorite/${this.post.id}`),
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
        )
        ).then(res => {
          this.isBookMarked = false
        }).catch((error) => {
          window.alert(error.response.data.message)
        })
      } else {
        (this.$axios.post(
          (`https://whynot-here.o-r.kr/v2/posts/favorite/${this.post.id}`),
          {},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
        )
        ).then(res => {
          this.isBookMarked = true
        }).catch((error) => {
          window.alert(error.response.data.message)
        })
      }
      // this.refreshCard()
      // 사간 간격 안 두면 결과 반영이 안되는 경우가 있어서
      setTimeout(() => {
        this.checkBookmark()
      }, 300)
      // this.bookMarkMode = true
    },
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
          width: max-content; height: 30px; line-height: 30px;
          padding: 0 14px;
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
        flex-wrap: wrap;
        gap: 0px 12px;
        height: 54px;
        margin-top: 42px;
        .left {
          height: 30px; line-height: 30px;
          padding: 0 14px;
          font-size: .88rem; font-weight: 500;
          color: #484848;
          background: #F5F5F5;
          border-radius: 16px;
          strong {
            font-weight: 500;
            color: #181818;
          }
        }
        .gap {
          flex-grow: 1;
        }
        .right {
          display: flex;
          line-height: 18px;
          font-size: .75rem; font-weight: 500;
          color: #A1A2A3;
          img {
            width: 16px; height: 16px;
            margin-right: 8px;
          }
        }
      }
      .content {
        border-top: 1px solid #E7E7E7;
        padding: 24px 8px;
        font-size: .88rem;
        color: #484848;
      }

      .content-img {
        margin: 1vh 2vmax;
        width: 70%;
        display: grid;
        row-gap: 1vh;

        .postImg {
          width: 100%;
        }
      }
    }
    .comment-panel {
      width: 410px; min-height: 250px;
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
            width: 362px; height: 106px;
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
          width: 360px; min-height: 102px;
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

#m-PostingPage {
  main {
    height: 100%;
    font-size: 5vmin;
    .m-detail-header {
      height: 7vmax;
      display: grid;
      background-color: #FAFAFA;
      grid-template:
        "arrow title" 1fr / 1fr 5fr;
      .m-close {
        width: 3vw;
        padding-left: 5vw;
        grid-area: arrow;
        display: flex;
        align-self: center;
      }
    }

    .m-detail-container {
      height: 70vh;
      background-color: #F3F3F3;
      display: flex;
      flex-direction: column;
      align-items: center;

      .m-detail-content {
        margin-top: 5vmin;
        overflow: scroll;
        width: 90%;
        height: 63vh;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 4px 8px rgba(0, 52, 138, 0.06);
        border-radius: 12px;

        .m-detail-content-header {
          display: grid;
          height: 20vmin;
          margin: 1vh 2vmax;
          border-bottom: 1px solid #E7E7E7;
          grid-template: 
            "writer" 2fr
            "title" 2fr
            "tags" 2fr
            "." 1fr / 1fr;

          .writer {
            color: #A3A3A3;
            font-size: 0.55em;
            grid-area: writer;
            align-self: flex-end;
          }

          .title {
            color: #252A31;
            font-style: normal;
            font-weight: 600;
            font-size: 0.8em;
            grid-area: title;
          }

          .tags {
            grid-area: tags;
            display: flex;
            align-self: flex-end;
            flex-wrap: wrap;
            font-size: 0.55em;
            font-style: normal;
            display: flex;
            align-items: center;
            gap: 0em 1em;
            .tag {
              padding: 0.1em 0.6em;
              background-color: #F3F3F3;
              border-radius: 16px; 
              text-align: center;

              &.d-day {
                color: #3E82F1;
                font-weight: 600;
              }
            }
          }
        }

        .m-detail-content-body {
          overflow: scroll;
          height: 45vh;
          .m-content-text {
            margin: 1vh 2vmax;
            font-weight: 400;
            font-size: 0.6em;
            line-height: 160%;
            color: #454545;
          }
          
          .m-content-img {
            margin: 1vh 2vmax;
            width: 70vmin;
            display: grid;
            row-gap: 1vh;

            .m-postImg {
              width: 70vmin;
            }
          }
        }

        .m-detail-content-footer {
          margin: 0vh 2vmax;
          height: 5vmin;
          display: flex;
          justify-content: flex-end;
          align-self: flex-end;
          line-height: 26px;
          font-size: .6em;
          font-weight: 500;
          color: #A1A2A3;
          .views-icon {
            width: 16px; height: 16px;
            margin-top: 5px;
            margin-right: 8px;
          }
        }
      }

      .m-detail-transition {
        display: flex;
        height: 5vmax;
        align-items: center;

        .m-trans-text {
          font-size: 0.75em;
          letter-spacing: -0.005em;
          font-weight: 500;
          padding-right: 0.2em;
        }

        .m-trans-icon {
          padding-left: 0.2rem;
        }
      }
    }
    .m-detail-footer {
      display: grid;
      grid-template-columns: 22fr 42fr 42fr 86fr 138fr;
      justify-items: start;
      align-content: center;
      width: 100%;
      background-color: #FFFFFF;
      box-shadow: 0px 0px 4px rgba(0, 52, 138, 0.04), 0px 0px 0px #FFFFFF;
      height: 10vmax;
      border-radius: 20px 20px 0px 0px;

      .m-img-wrp {
        margin-left: 16px;
        img {
          width: 10vmin; height: 10vmin;
          cursor: pointer;
        }
      }

      .m-contact {
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        width: 35vmin; height: 12vmin; line-height: 44px;
        font-size: .88rem;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        background: #FF8A00;
        border-radius: 10px;
      }
    }

    .m-comment-container {
      height: 70vh;
      overflow: scroll;
      .m-detail-transition {
        display: grid;
        grid-template-columns: 107fr 22fr 168fr;
        height: 5vh;
        align-items: center;

        .m-trans-text {
          font-size: 0.75em;
          letter-spacing: -0.005em;
          font-weight: 500;
        }

        .m-trans-icon {
          padding-left: 5vmin;
        }
      }
      

      .m-comment-list {
        display: grid;
        justify-content: center;
        grid-template-columns: 81vw;
        grid-auto-flow: row;
        grid-auto-rows: minmax(12vh, max-content);
        row-gap: 2vh;
      }

      .m-comment {
        width: 100%;
        background-color: #FFFFFF;
        border-radius: 8px;
      }

      .m-profile-info {
        display: grid;
        justify-items: start;
        padding: 1vh 2vh;
        grid-template-columns: 46fr 265fr 21fr;
        align-items: center;
        font-size: 0.8rem;
        color: #737373;

        .m-profile-img {
          width: 8vmin;
          border-radius: 100%;
        }
        
        .m-close-img {
          width: 6vmin;
        }
      }

      .m-comment-content {
        font-size: 0.9rem;
        padding-left: 2em;
        padding-bottom: 1em;
        width: 90%;
      }

      .m-comment-wrp {
          position: relative;
          font-size: 0.9rem;
          display: flex;
          justify-content: center;
          .m-comment-input {
            width: 80vw; 
            height: 15vh;
            margin-bottom: 3vh;
            padding: 1em; 
            margin-top: 2vh;
            background: #FAFAFA;
            border-radius: 8px;
            border: none !important;
            resize: none;
          }          
          .m-comment-input:focus {
            outline: none;
          }
          .m-comment-input::placeholder {
            color: #C8C8C8;
          }
          .m-comment-register {
            position: absolute;
            bottom: 4vh;
            right: 12vw;
            width: 20vmin; 
            height: 4vmax; 
            line-height: 33px;
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

#WhyNotLayout {
  main {
    background-color: #F3F3F3;
  }
}
</style>