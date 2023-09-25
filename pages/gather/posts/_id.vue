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
                v-dompurify-html="postComp.content"
                class="content"
                style="white-space: pre-line; word-wrap: break-word"
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
          <!-- <img
            src="@/assets/img/posting/copy-detail.png"
            alt=""
            @click="copyUrl()"
          /> -->
          <img
            src="@/assets/img/posting/posting-menu.png"
            alt=""
            @click="isOpenDetailMenu = true"
          />
        </div>
      </div>
    </main>
    <div
      v-if="isOpenDetailMenu"
      class="detail-menu-popup"
      @click.self="isOpenDetailMenu = false"
    >
      <div class="content-wrp">
        <div class="title" @click="openAccusationPopup()">
          <div><img src="@/assets/img/posting/accusation.png" alt="" /></div>
          <div>이 게시물 신고하기</div>
        </div>
        <div class="title" @click="blockAccount()">
          <div><img src="@/assets/img/posting/block.png" alt="" /></div>
          <div>사용자 및 게시물 차단하기</div>
        </div>
      </div>
    </div>
    <div
      v-if="isOpenAccusationPopup"
      class="accusation-popup"
      @click.self="isOpenAccusationPopup = false"
    >
      <div class="content-wrp">
        <div class="title">신고</div>
        <div class="desc">
          누적 신고하기가 3회 이상인 유저는 게시글을 작성할 수 없습니다.
        </div>
        <div v-for="(item, idx) in accusationList" :key="idx">
          <div class="select-wrp" @click="selectedAccusation = item.id">
            <div class="select-img">
              <img
                v-if="item.id * 1 != selectedAccusation * 1"
                src="@/assets/img/posting/accusation-unselected.png"
                alt=""
              />
              <img
                v-else
                src="@/assets/img/posting/accusation-selected.png"
                alt=""
              />
            </div>
            <div>{{ item.title }}</div>
          </div>
        </div>
        <div class="btn" @click="accusation()">신고하기</div>
      </div>
    </div>
    <div
      v-if="isOpenAccusationCompletePopup"
      class="complete-popup"
      @click.self="isOpenAccusationCompletePopup = false"
    >
      <div class="content-wrp">
        <div class="top">
          <div>신고가 접수되었습니다.</div>
          <div>검토까지는 최대 24시간이 소요됩니다.</div>
        </div>
        <div class="btn" @click.self="isOpenAccusationCompletePopup = false">
          확인
        </div>
      </div>
    </div>
    <div
      v-if="isOpenBlockAccountCompletePopup"
      class="complete-popup"
      @click.self="isOpenBlockAccountCompletePopup = false"
    >
      <div class="content-wrp">
        <div class="top">
          <div>해당 사용자 및 게시물 차단 완료</div>
          <div>마이페이지 - 차단한 계정에서<br />관리 가능합니다.</div>
        </div>
        <div
          class="btn"
          @click.self="
            isOpenBlockAccountCompletePopup = false
            cmn_goMainPage()
          "
        >
          확인
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostingPage',
  layout: 'why-not',
  asyncData({ params }) {
    return {
      id: params.id,
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
      isCommentView: false,
      isOpenAccusationPopup: false,
      isOpenDetailMenu: false,
      isOpenAccusationCompletePopup: false,
      isOpenBlockAccountCompletePopup: false,
      accusationList: [
        {
          id: 1,
          title: '상업적 광고 및 판매',
        },
        {
          id: 2,
          title: '음란물/불건전한 만남 및 대화',
        },
        {
          id: 3,
          title: '정당/정치인 비하 및 선거운동',
        },
        {
          id: 4,
          title: '욕설/비하',
        },
        {
          id: 5,
          title: '낚시/놀림/도배',
        },
        {
          id: 6,
          title: '게시판 성격에 부적절함',
        },
        {
          id: 7,
          title: '유출/사칭/사기',
        },
      ],
      selectedAccusation: 1,
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
        PHONE: '휴대전화',
      }[this.post.ownerContact.type]
      result.writerName = this.post.writer.nickname
      result.writerProfileImage = this.post.writer.profileImg
      result.dDay = this.cmn_getDday(result.closedDt)
      result.passedDay = this.cmn_getPassedDay(result.createdDt)
      if (this.post.locationUrl !== undefined) {
        result.locationUrl = this.post.locationUrl
      }
      result.content = this.autolink(result.content)
      return result
    },
    commentComp() {
      return this.comments
    },
  },
  created() {
    this.getPost()
    this.getComment()
    this.checkBookmark()
  },
  methods: {
    autolink(content) {
      const regURL =
        /(http|https|ftp|telnet|news|irc):\/\/([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)/gi
      return content.replace(
        regURL,
        "<a href='$1://$2' target='_blank'>$1://$2</a>"
      )
    },

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
          cancelText: '',
        },
      })
    },
    registerComment() {
      if (!this.$store.state.userInfo.initLoginDone) {
        this.cmn_openAlertPopup({
          option: {
            content: '로그인 후 이용해 주세요.',
            type: 'alert',
            confirmText: '확인',
            cancelText: '',
          },
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
            cancelText: '',
          },
        })
        return false
      }
      this.$axios
        .post(
          `${process.env.apiUrl}/v2/comments`,
          {
            postId: this.id,
            comment: this.currentComment,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token,
            },
          }
        )
        .then((res) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: '댓글이 등록되었습니다.',
              type: 'alert',
              confirmText: '확인',
              cancelText: '',
            },
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
              cancelText: '',
            },
          })
        })
    },
    deleteComment(id) {
      this.$axios
        .delete(`${process.env.apiUrl}/v2/comments/${id}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.state.userInfo.token,
          },
        })
        .then((res) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: '댓글이 삭제되었습니다.',
              type: 'alert',
              confirmText: '확인',
              cancelText: '',
            },
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
              cancelText: '',
            },
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
              cancelText: '',
            },
          })
        })
        .catch((error) => {
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: error.response.data.message,
              type: 'alert',
              confirmText: '확인',
              cancelText: '',
            },
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
            Authorization: this.$store.state.userInfo.token,
          },
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
            cancelText: '',
          },
        })
        return false
      }

      if (this.isBookmarked) {
        this.$axios
          .delete(`${process.env.apiUrl}/v2/posts/favorite/${this.post.id}`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token,
            },
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
                cancelText: '',
              },
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
                Authorization: this.$store.state.userInfo.token,
              },
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
                cancelText: '',
              },
            })
          })
      }

      // 사간 간격 안 두면 결과 반영이 안되는 경우가 있어서
      setTimeout(() => {
        this.getPost()
        this.checkBookmark()
      }, 300)
    },
    openAccusationPopup() {
      if (!this.$store.state.userInfo.token) {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
            content: '로그인 후 이용해 주세요',
            type: 'alert',
            confirmText: '확인',
            cancelText: '',
          },
        })
        return false
      }

      this.isOpenAccusationPopup = true
      this.isOpenDetailMenu = false
    },
    accusation() {
      this.$axios
        .post(
          `${process.env.apiUrl}/v2/accusation`,
          {
            postId: this.id,
            reason: this.accusationList[this.selectedAccusation - 1].title,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token,
            },
          }
        )
        .then((res) => {
          this.isOpenAccusationPopup = false
          this.isOpenAccusationCompletePopup = true
        })
    },
    blockAccount() {
      if (!this.$store.state.userInfo.token) {
        this.cmn_openAlertPopup({
          option: {
            title: '📣 알림',
            content: '로그인 후 이용해 주세요',
            type: 'alert',
            confirmText: '확인',
            cancelText: '',
          },
        })
        return false
      }

      this.$axios
        .post(
          `${process.env.apiUrl}/v2/account/block-account`,
          {
            postId: this.id,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token,
            },
          }
        )
        .then((res) => {
          this.isOpenDetailMenu = false
          this.isOpenBlockAccountCompletePopup = true
        })
        .catch((error) => {
          console.log(error)
          // window.alert(error.response.data.message)
          this.cmn_openAlertPopup({
            option: {
              title: '📣 알림',
              content: error.response.data.message,
              type: 'alert',
              confirmText: '확인',
              cancelText: '',
            },
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/detail-page/detail.scss';
</style>
