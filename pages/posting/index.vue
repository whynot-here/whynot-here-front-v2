<template>
  <div id="PostingPage">
    <TopBar />
    <div class="panel">
      <section class="form">
        <div class="title">📝 글쓰기</div>
        <div class="group info">
          <div class="posting-group">모집 정보</div>
          <div class="line">
            <div class="form-wrp category">
              <div class="sub-title">카테고리</div>
              <div name="" class="sub-wrp">
              </div>
            </div>
            <div class="form-wrp d-day">
              <div class="sub-title">모집 마감일</div>
              <div class="sub-wrp"></div>
            </div>
            <div class="form-wrp process">
              <div class="sub-title">진행방식</div>
              <div class="sub-wrp">
                <DropDown
                  :label="'방식'"
                  :option-list="processList"
                  @get-label="setProcess"
                />
              </div>
            </div>
          </div>
          <div class="line">
            <div class="form-wrp people-count">
              <div class="sub-title">모집 인원 수</div>
              <input class="sub-wrp" placeholder="모집 인원">
            </div>
            <div class="form-wrp call">
              <div class="sub-title">연락수단</div>
              <div class="sub-wrp">
                <div class="call-dropdown">
                  <DropDown
                    :label="'연락수단'"
                    :option-list="callList"
                    @get-label="setCall"
                  />
                </div>
                <input class="call-input" type="text" placeholder="입력">
              </div>
            </div>
          </div>
        </div>
        <div class="group">
          <div class="posting-group">모집 소개</div>
          <div class="line">
            <div class="form-wrp">
              <textarea
                class="content"
                name="introduce"
                cols="30"
                rows="10"
                placeholder="카테고리와 관련된 내용을 입력해 주세요."
              ></textarea>
            </div>
          </div>
          <div>
            <div class="add-img">
              <div>
                <img src="@/assets/img/posting/camera.png" alt="">
              </div>
              <div>
                이미지 추가 (최대 4장)
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="upload">
          📄 글 업로드
        </div>
      </section>
      <!-- <section class="content">
        <div class="title">프로젝트 소개</div>
        <div>
          <div class="sub-title">한줄소개</div>
          <div>
            <input type="text">
          </div>
        </div>
        <div>
          <div class="sub-title">내용</div>
          <div>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
      </section> -->
      <!-- <section>
        <div>업로드</div>
      </section> -->
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/main-page/TopBar'
import DropDown from '@/components/common/dropdown'

export default {
  name: 'CategoryPage',
  components: {
    TopBar,
    DropDown
  },
  asyncData({ params }) {
    return {
      category: params.category
    }
  },
  data () {
    return {
      callList: [
        {
          value: '이메일'
        },
        {
          value: '카카오톡 오픈채팅'
        },
        {
          value: '구글폼'
        },
        {
          value: '전화번호'
        }
      ],
      processList: [
        {
          value: '만나서'
        },
        {
          value: '줌으로'
        },
      ]
    }
  },
  mounted () {
  },
  methods: {
    setCall () {

    },
    setProcess () {

    }
  }
}
</script>

<style lang="scss" scoped>
#PostingPage {
  width: 100vw; height: 100vh;
  overflow: scroll;
  background: #FAFAFA;
  #TopBar {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .panel {
    width: 770px;
    margin: 117px auto;
    .form {
      .group {
        &.info {
          padding-bottom: 52px;
          border-bottom: 1px solid #E7E7E7;
        }
      }
      .title {
        font-size: 1.38rem; font-weight: 700;
      }
      .posting-group {
        margin-top: 52px;
        font-size: 1.25rem; font-weight: 500;
      }
      .line {
        display: flex;
        margin-top: 30px;
        .form-wrp {
          .sub-title {
            font-size: .88rem; font-weight: 500;
            color: #7A7A7A;
          }
          .sub-wrp {
            height: 50px; line-height: 50px;
            margin-top: 12px;
            // padding-left: 12px;
            background-color: #ffffff;
            border: 1px solid #E7E7E7;
            border-radius: 8px;
          }
          .content {
            width: 706px; height: 400px;
            padding: 32px;
            font-size: 1rem;
            background: #FFFFFF;
            border: 1px solid #E7E7E7;
            border-radius: 8px;
          }
          .content::placeholder {
            color: #C8C8C8;
          }
        }
        .category {
          width: 370px;
          .sub-wrp {
            width: 100%;
          }
        }
        .process, .d-day {
          flex-grow: 1;
          margin-left: 30px;
          .sub-wrp {
            width: 170px;
          }
        }
        .people-count {
          width: 170px;
          .sub-wrp {
            width: 155px;
            padding-left: 12px;
          }
        }
        .call {
          width: 470px;
          margin-left: 30px;
          .sub-wrp {
            display: flex;
            padding-left: 0px;
            .call-dropdown {
              width: 146px;
            }
            .call-input {
              width: 200px; height: 28px;
              padding: 0 20px; margin: 10px 0px;
              border: none;
              border-left: 1px solid #E7E7E7;
            }
            .call-input:focus {
              outline: none;
            }
            .call-input::placeholder {
              color: #C8C8C8;
            }
          }
        }
      }
      .add-img {
        display: flex;
        width: 746px; height: 70px; line-height: 70px;
        margin: 16px 0 42px 0; padding-left: 24px;
        font-size: 1rem; font-weight: 500;
        color: #A3A3A3;
        background: #FAFAFA;
        border: 1px solid #E7E7E7;
        border-radius: 8px;
        div:first-child {
          padding: 5px 16px 0 0;
          img {
            width: 26px; height: 22px;
          }
        }
        div:nth-child(2) {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .upload {
      width: 146px; height: 47px; line-height: 47px;
      margin: 0 auto;
      font-size: 1rem; font-weight: 500;
      background: #FFFFFF;
      border: 1px solid #E1E2E3;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>