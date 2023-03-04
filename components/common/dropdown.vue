<template>
  <div id="SelectBox">
    <div :class="`select-box ${disabled ? 'disabled' : ''}`">
      <button :class="`label ${label}`" @click="openOptions">
        {{ label }}
      </button>
      <ul class="option-list">
        <li v-for="(item, idx) in optionList" :key="idx" class="option-item" @click="selectOption(item)">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDownComponent',
  props: {
    label: {
      type: String,
      default: ''
    },
    // [{ text: '',  }] 형식으로 보내주면 됨
    optionList: {
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openOptions () {
      if (this.optionList === null) {
        return false
      }
      if (document.querySelector(`.${this.label}`).parentNode.classList.contains('active')) {
        document.querySelector(`.${this.label}`).parentNode.classList.remove('active')
      } else {
        document.querySelector(`.${this.label}`).parentNode.classList.add('active')
      }
    },
    selectOption (item) {
      document.querySelector(`.${this.label}`).innerHTML = item.text + ''
      document.querySelector(`.${this.label}`).style.color = '#000'
      document.querySelector(`.${this.label}`).parentNode.classList.remove('active')
      this.$emit('get-label', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/common/dropdown.scss';
</style>
