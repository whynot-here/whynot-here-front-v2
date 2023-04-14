<template>
  <div id="SelectBoxDouble">
    <div class="select-box-wrp">
      <div
        :class="`select-box ${postingType == 'must-eat' ? 'left' : 'right'} ${
          disabled01 ? 'disabled' : ''
        }`"
      >
        <button :class="`label _01 ${labelFirst}`" @click="openOptions">
          {{ labelFirst }}
        </button>
        <ul class="option-list main">
          <li
            v-for="(item, idx) in categoryList"
            :key="idx"
            :class="
              item.id === parentId ? 'option-item selected' : 'option-item'
            "
            @click="selectOptionMain(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div
        v-if="postingType == 'must-eat'"
        :class="`select-box right ${disabled02 ? 'disabled' : ''}`"
      >
        <button :class="`label _02 ${labelSecond}`" @click="openOptions">
          {{ labelSecond }}
        </button>
        <ul class="option-list sub">
          <li
            v-for="(item, idx) in subCategoryList"
            :key="idx"
            :class="
              item.id === childrenId
                ? 'option-item-sub selected-sub'
                : 'option-item-sub'
            "
            @click="selectOptionSub(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDownCategoryComponent',
  props: {
    labelFirst: {
      type: String,
      default: ''
    },
    labelSecond: {
      type: String,
      default: ''
    },
    disabled01: {
      type: Boolean,
      default: false
    },
    disabled02: {
      type: Boolean,
      default: false
    },
    postingType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedCategoryId: 1,
      parentId: 1,
      childrenId: 2
    }
  },
  computed: {
    categoryList() {
      const result = []

      this.categoryGroup.forEach((category) => {
        const item = {
          id: category.parentId,
          name: category.parentName,
          code: category.parentCode
        }
        if (this.postingType === 'must-eat') {
          if (item.code === 'MUST-EAT') {
            result.push(item)
          }
        }

        if (this.postingType !== 'must-eat') {
          if (item.code !== 'MUST-EAT') {
            result.push(item)
          }
        }
      })
      return result
    },
    subCategoryList() {
      const result = []

      const category = this.categoryGroup.filter((category) => {
        return category.parentId === this.selectedCategoryId
      })
      category[0].children.forEach((subCategory) => {
        const item = {
          id: subCategory.id,
          name: subCategory.name,
          code: subCategory.code
        }
        result.push(item)
      })
      return result
    }
  },
  mounted() {
    if (this.postingType === 'must-eat') {
      this.selectOptionMain(this.categoryList[0])
    }
  },
  methods: {
    openOptions() {
      if (
        document
          .querySelector(`.${this.labelFirst}`)
          .parentNode.classList.contains('active')
      ) {
        document
          .querySelector(`.${this.labelFirst}`)
          .parentNode.classList.remove('active')
        if (this.postingType === 'must-eat') {
          document
            .querySelector(`.${this.labelSecond}`)
            .parentNode.classList.remove('active')
        }
      } else {
        document
          .querySelector(`.${this.labelFirst}`)
          .parentNode.classList.add('active')
        if (this.postingType === 'must-eat') {
          document
            .querySelector(`.${this.labelSecond}`)
            .parentNode.classList.add('active')
        }
      }
    },
    selectOptionMain(item) {
      document.querySelector(`.${this.labelFirst}`).innerHTML = item.name + ''
      document.querySelector(`.${this.labelFirst}`).style.color = '#000'
      this.selectedCategoryId = item.id
      this.parentId = item.id
      if (this.subCategoryList.length === 0) {
        document
          .querySelector(`.${this.labelFirst}`)
          .parentNode.classList.remove('active')
        if (this.postingType === 'must-eat') {
          document
            .querySelector(`.${this.labelSecond}`)
            .parentNode.classList.remove('active')
        }
      }
      this.$emit('get-label', item)
    },
    selectOptionSub(item) {
      // 처음에 메인 카테고리 선택 안하고 서브 카테고리 바로 선택한 경우 때문에
      if (this.selectedCategoryId === 1) {
        const firstItem = {
          name: '스터디',
          id: 1
        }
        this.selectOptionMain(firstItem)
      }
      document.querySelector(`.${this.labelSecond}`).innerHTML = item.name + ''
      document.querySelector(`.${this.labelSecond}`).style.color = '#000'
      document
        .querySelector(`.${this.labelFirst}`)
        .parentNode.classList.remove('active')
      document
        .querySelector(`.${this.labelSecond}`)
        .parentNode.classList.remove('active')
      this.childrenId = item.id
      this.$emit('get-label', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/common/dropdown-category.scss';
</style>
