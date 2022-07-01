<template>
  <div id="PostingPage">
    <TopBar
      :category="category"
    />
    <div class="panel">
      <section class="info">
        <div class="title">프로젝트 정보</div>
        <div class="line">
          <div class="form-wrp _01">
            <div class="sub-title">카테고리</div>
            <select name="" class="sub-wrp">
              <option value="">사이드 프로젝트</option>
            </select>
          </div>
          <div class="form-wrp _02">
            <div class="sub-title">모집 인원 수</div>
            <div class="sub-wrp">개발자</div>
          </div>
        </div>
        <div class="line">
          <div class="form-wrp _03">
            <div class="sub-title">연락수단</div>
            <div class="sub-wrp">수단 선택</div>
          </div>
          <div class="form-wrp _03">
            <div class="sub-title">예상 기간</div>
            <div class="sub-wrp">YY.MM.DD</div>
          </div>
          <div class="form-wrp _01">
            <div class="sub-title">진행방식</div>
            <div class="sub-wrp">만나서</div>
          </div>
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

export default {
  name: 'CategoryPage',
  components: {
    TopBar
  },
  asyncData({ params }) {
    return {
      category: params.category
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
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
    width: 914px;
    margin: 117px auto;
    .info, .content {
      .title {
        font-size: 1.38rem; font-weight: 700;
      }
      .line {
        display: flex;
        margin-top: 30px;
        .form-wrp {
          .sub-title {
            font-size: 1.25rem; font-weight: 500;
            color: #454545;
          }
          .sub-wrp {
            width: 90%; height: 50px; line-height: 50px;
            margin-top: 12px; padding-left: 12px;
            background: #FFFFFF;
            border: 1px solid #E7E7E7;
            border-radius: 8px;
          }
        }
        ._01 {
          width: 206px;
          margin-right: 30px;
        }
        ._02 {
          width: 442px;
        }
        ._03 {
          width: 324px; 
        }
      }
    }
  }
}
</style>