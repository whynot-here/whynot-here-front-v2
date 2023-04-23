<template>
  <div v-if="isFromPc" id="PostingPage">
    <div class="panel-wrp">
      <section class="detail-panel">
        <div v-if="postComp.dDay !== ''">
          <div class="top">
            <div class="d-day">마감 {{ postComp.dDay }}</div>
            <div class="img-wrp">
              <img
                src="@/assets/img/posting/copy-detail.png"
                alt=""
                @click="copyUrl()"
              />
            </div>
            <div class="img-wrp">
              <img
                v-if="isBookmarked"
                src="@/assets/img/posting/bookmark-detail-selected.png"
                @click.prevent="bookmark()"
              />
              <img
                v-else
                src="@/assets/img/posting/bookmark-detail.png"
                @click.prevent="bookmark()"
              />
            </div>
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
            {{ postComp.passedDay }}
          </div>
          <div class="gap"></div>
          <div class="right">
            <img src="@/assets/img/common/views.png" alt="" />
            <div>
              {{ post.views === null ? 0 : post.views }}
            </div>
          </div>
        </div>
        <div
          class="content"
          style="white-space: pre-line; word-wrap: break-word"
          v-text="postComp.content"
        ></div>
        <div class="content-img">
          <div v-for="(postImg, idx) in postComp.imageLinks" :key="idx">
            <img :src="postImg.link" class="postImg" />
          </div>
        </div>
      </section>
      <section class="comment-panel">
        <div class="top">
          <div>
            <div
              v-if="
                postComp.writerProfileImage !== '' &&
                postComp.writerProfileImage !== null
              "
            >
              <img :src="postComp.writerProfileImage" alt="" />
            </div>
            <div v-else>
              <img src="@/assets/img/common/default-profile.png" alt="" />
            </div>
          </div>
          <div>
            {{ postComp.writerName }}
          </div>
        </div>
        <div class="bottom">
          <div class="comment-count">
            댓글 <strong>{{ comments.length }}</strong>
          </div>
          <div class="comment-wrp">
            <textarea
              v-model="currentComment"
              class="comment-input"
              rows="10"
              placeholder="Why Not Here에 가입하고 댓글을 달아보세요!"
            ></textarea>
            <div class="comment-register" @click="registerComment()">
              댓글달기
            </div>
          </div>
        </div>
        <div v-if="commentComp.length > 0" class="comment-list">
          <div v-for="(comment, idx) in commentComp" :key="idx" class="comment">
            <div class="top">
              <div>
                <div
                  v-if="
                    comment.account.profileImg !== '' &&
                    comment.account.profileImg !== null
                  "
                >
                  <img :src="comment.account.profileImg" alt="" />
                </div>
                <div v-else>
                  <img src="@/assets/img/common/default-profile.png" alt="" />
                </div>
              </div>
              <div>
                {{ comment.account.nickname }}
              </div>
              <div
                v-if="
                  comment.account.email === $store.state.userInfo.detail.email
                "
                class="delete-comment"
                @click="deleteComment(comment.commentId)"
              >
                <img
                  v-if="isMyComment(comment)"
                  src="@/assets/img/common/close-page.png"
                  alt=""
                />
              </div>
            </div>
            <div class="comment-content">
              {{ comment.content }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div v-else id="m-PostingPage">
    <main>
      <div v-if="activeComponent === 'DetailView'">
        <div class="m-detail-container">
          <div class="m-detail-content">
            <div class="m-detail-content-header">
              <div v-if="postComp.dDay !== ''">
                <div class="d-day">마감 {{ postComp.dDay }}</div>
              </div>
              <div class="m-profile-info-main">
                <div
                  v-if="
                    postComp.writerProfileImage !== '' &&
                    postComp.writerProfileImage !== null
                  "
                >
                  <img
                    class="m-profile-img"
                    :src="postComp.writerProfileImage"
                    alt=""
                  />
                </div>
                <div v-else>
                  <img
                    class="m-profile-img"
                    src="@/assets/img/common/default-profile.png"
                    alt=""
                  />
                </div>
                <div class="writer">
                  {{ postComp.writerName }}
                </div>
              </div>
              <div class="title">
                {{ postComp.title }}
              </div>
              <div class="tags-wrp">
                <div class="tags">
                  <div class="tag">
                    {{ postComp.passedDay }}
                  </div>
                </div>

                <div class="m-detail-content-footer">
                  <img class="views-icon" src="@/assets/img/common/views.png" />
                  <div class="views-text">
                    {{ post.views === null ? 0 : post.views }}
                  </div>
                </div>
              </div>
            </div>
            <div class="m-detail-content-body">
              <a
                v-if="postComp.locationUrl !== null"
                :href="postComp.locationUrl"
                target="_blank"
                style="text-decoration: none"
              >
                <div>📍 위치 링크로 이동하기</div>
              </a>
              <br />
              <div
                class="content"
                style="white-space: pre-line; word-wrap: break-word"
                v-text="postComp.content"
              ></div>
              <br />
              <div class="m-content-img">
                <div v-for="(postImg, idx) in postComp.imageLinks" :key="idx">
                  <img :src="postImg.link" class="m-postImg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeComponent === 'CommentView'">
        <div class="m-comment-container">
          <div v-if="commentComp.length > 0" class="m-comment-list">
            <div
              v-for="(comment, idx) in commentComp"
              :key="idx"
              class="m-comment"
            >
              <div class="m-profile-info">
                <div class="m-profile-info-main">
                  <div
                    v-if="
                      comment.account.profileImg !== '' &&
                      comment.account.profileImg !== null
                    "
                  >
                    <img
                      class="m-profile-img"
                      :src="comment.account.profileImg"
                      alt=""
                    />
                  </div>
                  <div v-else>
                    <img
                      class="m-profile-img"
                      src="@/assets/img/common/default-profile.png"
                      alt=""
                    />
                  </div>
                  <div>
                    {{ comment.account.nickname }}
                  </div>
                </div>

                <div
                  v-if="
                    comment.account.email === $store.state.userInfo.detail.email
                  "
                  class="delete-comment"
                  @click="deleteComment(comment.commentId)"
                >
                  <img
                    v-if="isMyComment(comment)"
                    class="m-close-img"
                    src="@/assets/img/common/close-page.png"
                    alt=""
                  />
                </div>
              </div>

              <div class="m-comment-content">
                {{ comment.content }}
              </div>
            </div>
          </div>

          <div class="m-comment-wrp">
            <textarea
              v-model="currentComment"
              class="m-comment-input"
              rows="10"
              placeholder="Why Not Here에 가입하고 댓글을 달아보세요!"
            ></textarea>
            <div class="m-comment-register" @click="registerComment()">
              댓글달기
            </div>
          </div>
        </div>
      </div>

      <div class="m-detail-footer">
        <div class="m-comment-posting-toggle">
          <div
            v-if="activeComponent === 'DetailView'"
            class="m-img-wrp btn-text-comment"
            @click="renderComponent('CommentView')"
          >
            <img
              class="comment-img"
              src="@/assets/img/posting/comment-black.png"
              alt=""
            />
            <span
              >댓글 <strong>{{ comments.length }}</strong></span
            >
          </div>
          <div
            v-else
            class="m-img-wrp btn-text-detail"
            @click="renderComponent('DetailView')"
          >
            <img
              class="detail-img"
              src="@/assets/img/posting/posting-black.png"
              alt=""
            />
            <span>본문</span>
          </div>
        </div>
        <div class="sub-menu">
          <img
            v-if="isBookmarked"
            src="@/assets/img/posting/like-filled-selected.png"
            @click.prevent="bookmark()"
          />
          <img
            v-else
            src="@/assets/img/posting/like-filled.png"
            @click.prevent="bookmark()"
          />
          <span>{{ postComp.likes }}</span>
        </div>
        <div class="copy-url">
          <img
            src="@/assets/img/posting/copy-detail.png"
            alt=""
            @click="copyUrl()"
          />
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
  data() {
    return {
      post: {},
      comments: [],
      commentCount: 0,
      currentComment: '',
      activeComponent: 'DetailView',
      isBookmarked: false,
      isCommentView: false
    }
  },
  computed: {
    postComp() {
      if (this.post.category === undefined) {
        return this.post
      }
      const result = this.post
      result.communicationToolText = { ONLINE: '온라인', OFFLINE: '만나서' }[
        this.post.communicationTool
      ]
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
      result.contactText = {
        EMAIL: '이메일',
        KAKAO_OPEN_CHAT: '카카오톡',
        PHONE: '휴대전화'
      }[this.post.ownerContact.type]
      result.writerName = this.post.writer.nickname
      result.writerProfileImage = this.post.writer.profileImg
      result.dDay = this.cmn_getDday(result.closedDt)
      result.passedDay = this.cmn_getPassedDay(result.createdDt)
      if (this.post.locationUrl !== undefined) {
        result.locationUrl = this.post.locationUrl
      }
      return result
    },
    commentComp() {
      return this.comments
    }
  },
  created() {
    this.getPost()
    this.getComment()
    this.checkBookmark()
  },
  methods: {
    getPost() {
      this.$axios
        .get(`${process.env.apiUrl}/v2/posts/${this.id}`)
        .then((res) => {
          this.post = res.data
        })
    },
    getComment() {
      this.$axios
        .get(`${process.env.apiUrl}/v2/comments/${this.id}`)
        .then((res) => {
          this.comments = res.data
        })
    },
    copyUrl() {
      this.copySomething(window.document.location.href)

      this.cmn_openAlertPopup({
        option: {
          title: '📣 알림',
          content: 'URL이 복사되었습니다.',
          type: 'alert',
          confirmText: '확인',
          cancelText: ''
        }
      })
    },
    registerComment() {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.cmn_openAlertPopup({
          option: {
            content: '로그인 후 이용해 주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }
      if (!this.currentComment.length > 0) {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
            content: '댓글을 입력해주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }
      this.$axios
        .post(
          `${process.env.apiUrl}/v2/comments`,
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
        .then((res) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: '댓글이 등록되었습니다.',
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
          this.currentComment = ''
          this.getComment()
        })
        .catch((error) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: error.response.data.message,
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
        })
    },
    deleteComment(id) {
      this.$axios
        .delete(`${process.env.apiUrl}/v2/comments/${id}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: '댓글이 삭제되었습니다.',
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
          this.getComment()
        })
        .catch((error) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: error.response.data.message,
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
        })
    },
    renderComponent(component) {
      this.activeComponent = component
    },
    copyContactInfo() {
      navigator.clipboard
        .writeText(this.postComp.ownerContact.value)
        .then(() => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: `'${this.postComp.ownerContact.value}' 가 복사되었습니다`,
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
        })
        .catch((error) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: error.response.data.message,
              type: 'alert',
              confirmText: '확인',
              cancelText: ''
            }
          })
        })
    },
    isMyComment(comment) {
      return (
        this.$store.state.userInfo.detail.nickname === comment.account.nickname
      )
    },
    checkBookmark() {
      if (!this.$store.state.userInfo.token) {
        return false
      }
      this.$axios
        .get(`${process.env.apiUrl}/v2/posts/favorite`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token
          }
        })
        .then((res) => {
          res.data.forEach((res) => {
            if (res.id === this.post.id) {
              this.isBookmarked = true
            }
          })
        })
    },
    bookmark() {
      if (!this.$store.state.userInfo.initLoginDone) {
        // alert('로그인 후 이용해 주세요')
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
            content: '로그인 후 이용해 주세요',
            type: 'alert',
            confirmText: '확인',
            cancelText: ''
          }
        })
        return false
      }

      if (this.isBookmarked) {
        this.$axios
          .delete(`${process.env.apiUrl}/v2/posts/favorite/${this.post.id}`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          })
          .then((res) => {
            this.isBookmarked = false
          })
          .catch((error) => {
            this.cmn_openAlertPopup({
              option: {
                title: '📣 알림',
                content: error.response.data.message,
                type: 'alert',
                confirmText: '확인',
                cancelText: ''
              }
            })
          })
      } else {
        this.$axios
          .post(
            `${process.env.apiUrl}/v2/posts/favorite/${this.post.id}`,
            {},
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                Authorization: this.$store.state.userInfo.token
              }
            }
          )
          .then((res) => {
            this.isBookmarked = true
          })
          .catch((error) => {
            this.cmn_openAlertPopup({
              option: {
                title: '📣 알림',
                content: error.response.data.message,
                type: 'alert',
                confirmText: '확인',
                cancelText: ''
              }
            })
          })
      }

      // 사간 간격 안 두면 결과 반영이 안되는 경우가 있어서
      setTimeout(() => {
        this.getPost()
        this.checkBookmark()
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/detail-page/detail.scss';
</style>
