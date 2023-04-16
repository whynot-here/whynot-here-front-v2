<template>
  <div id="hanchelin-sub-filter" :class="isSubFilterOn ? 'hanchelin-sub-filter selected' : 'hanchelin-sub-filter'" >
    <div class="select-box-wrp">
      <div :class="`select-box right ${disabled01 ? 'disabled' : ''}`">
        <button :class="`label _01 ${labelFirst}`" @click="openOptions">
          {{ labelFirst }}
        </button>
        <div v-if="isSubFilterOn" class="bottom-arrow">
          <img src="@/assets/img/common/bottom-arrow-selected.png"/>
        </div>
        <div v-else class="bottom-arrow">
          <img src="@/assets/img/common/bottom-arrow.png"/>
        </div>
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
    </div>
  </div>
</template>

<script>
import categoryConst from '@/plugins/const/categoryConst';

export default {
  name: 'DropDownCategoryComponent',
  props: {
    labelFirst: {
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
    }
  },
  data() {
    return {
      selectedCategoryId: 1,
      parentId: 1,
      childrenId: 2,
      isSubFilterOn: false
    }
  },
  computed: {
    categoryList() {
      const result = [
        {
          id: categoryConst.hanchelinCategoryId,
          name: "전체"
        }
      ]

      this.categoryGroup.forEach((category) => {
        if (category.parentId === categoryConst.hanchelinCategoryId) {
          category.children.forEach((it) => {
            const item = {
              id: it.id,
              name: it.name
            }
            result.push(item)
          })
        }
      })
      return result
    }
  },
  methods: {
    openOptions() {
      this.isSubFilterOn = true
      if (
        document
          .querySelector(`.${this.labelFirst}`)
          .parentNode.classList.contains('active')
      ) {
        document
          .querySelector(`.${this.labelFirst}`)
          .parentNode.classList.remove('active')
      } else {
        document
          .querySelector(`.${this.labelFirst}`)
          .parentNode.classList.add('active')
      }
    },
    selectOptionMain(item) {
      this.isSubFilterOn = false
      document.querySelector(`.${this.labelFirst}`).innerHTML = item.name + ''
      document.querySelector(`.${this.labelFirst}`).style.color = '#000'
      this.selectedCategoryId = item.id
      this.parentId = item.id
      document
        .querySelector(`.${this.labelFirst}`)
        .parentNode.classList.remove('active')
      this.$emit('get-label', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/common/sub-filter-dropdown.scss';
</style>
