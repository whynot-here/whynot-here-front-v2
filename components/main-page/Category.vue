<template>
  <div id="Category">
    <section class="category">
      <div class="posting-btn">
        📝 글쓰기
      </div>
      <div class="sub-menu-wrp">
        <div class="menu">
          <div>
            ⭐️ My 모임
          </div>
          <div>
            <img src="@/assets/img/category/right-arrow.png" alt="">
          </div>
        </div>
        <div class="menu">
          <div>
            🔖 북마크
          </div>
          <div>
            <img src="@/assets/img/category/right-arrow.png" alt="">
          </div>
        </div>
      </div>
      <div
        v-for="(cat, idx) in categoryGroup"
        :key="idx"
        class="category-wrp"
      >
        <div
          :class="cat.type === selectedCategory ? 'title selected' : 'title'"
          @click="selectCategory({ type: cat.type })"
        >
          {{ cat.title }}
        </div>
        <div
          v-for="(sub, sIdx) in cat.subCategory"
          :key="sIdx"
          :class="sub.type === selectedSubCategory ? 'sub-title selected' : 'sub-title'"
          @click="selectSubCategory({ type: cat.type, subType: sub.type })"
        >
          {{ sub.title }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'WhynotCategory',
  components: {
  },
  props: {
    category: {
      type: String,
      default: ''
    },
    subCategory: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedCategory: '',
      selectedSubCategory: '',
      categoryGroup: [
        {
          title: '📂 스터디',
          type: 'study',
          subCategory: [
            {
              title: '프로젝트',
              type: 'project'
            },
            {
              title: '전공공부',
              type: 'major'
            },
            {
              title: '리크루팅',
              type: 'recruit'
            },
            {
              title: '그 외',
              type: 'study-etc'
            }
          ]
        },
        {
          title: '🕺 친목',
          type: 'amity',
          subCategory: [
            {
              title: '산책',
              type: 'walk'
            },
            {
              title: '야식 모임',
              type: 'snack'
            },
            {
              title: '티타임',
              type: 'tea'
            },
            {
              title: '소개팅',
              type: 'meeting'
            },
            {
              title: '알코올',
              type: 'alcohol'
            },
            {
              title: '그 외',
              type: 'amity-etc'
            }
          ]
        },
        {
          title: '🚌 교통수단',
          type: 'transportation',
          subCategory: [
            {
              title: '카풀',
              type: 'carpool'
            },
            {
              title: 'KTX 동반석',
              type: 'ktx'
            },
            {
              title: '그 외',
              type: 'transportation-etc'
            }
          ]
        },
        {
          title: '💰 중고거래',
          type: 'selling',
          subCategory: [
            {
              title: '양도',
              type: 'assign'
            },
            {
              title: '전공책',
              type: 'majorbook'
            },
            {
              title: '그 외',
              type: 'selling-etc'
            }
          ]
        },
        {
          title: '⚽️ 운동',
          type: 'exercise',
          subCategory: [
            {
              title: '풋살',
              type: 'putsal'
            },
            {
              title: '탁구',
              type: 'pingpong'
            },
            {
              title: '그 외',
              type: 'exercise-etc'
            }
          ]
        },
        {
          title: '🧑‍🌾 알바',
          type: 'part-time',
          subCategory: [
            {
              title: '교내',
              type: 'oncampus'
            },
            {
              title: '교외',
              type: 'outcampus'
            },
            {
              title: '그 외',
              type: 'part-time-etc'
            }
          ]
        },
        {
          title: '🎮 게임',
          type: 'game',
          subCategory: [
            {
              title: '보드게임',
              type: 'board'
            },
            {
              title: '롤',
              type: 'lol'
            },
            {
              title: '그 외',
              type: 'game-etc'
            }
          ]
        },
        {
          title: '⛪️ 신앙',
          type: 'faith',
          subCategory: [
            {
              title: '기도모임',
              type: 'pray'
            },
            {
              title: '그 외',
              type: 'faith-etc'
            }
          ]
        },
        {
          title: '🧾 공동구매',
          type: 'buying',
          subCategory: [
            {
              title: '물건',
              type: 'product'
            },
            {
              title: 'OTT 구독',
              type: 'OTT'
            },
            {
              title: '그 외',
              type: 'buying-etc'
            }
          ]
        },
      ]
    }
  },
  mounted () {
    this.selectedCategory = this.category
    this.selectedSubCategory = this.subCategory
  },
  methods: {
    selectCategory ({ type }) {
      this.selectedCategory = type
      this.selectedSubCategory = ''
      this.$router.push(`/gather/${type}`)
    },
    selectSubCategory ({ type, subType }) {
      this.selectedCategory = type
      this.selectedSubCategory = subType
      // this.$router.push({ path: `/${this.selectedCategory}`, params: { sub: `${type}` } })
      this.$router.push(`/gather/${this.selectedCategory}?sub=${this.selectedSubCategory}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/category.scss';
</style>
