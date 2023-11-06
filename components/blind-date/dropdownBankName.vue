<template>
  <div id="DropdownBankName">
    <div class="select-box-wrp">
      <div class="select-box right">
        <button :class="`label _01 ${labelFirst}`" @click="openOptions">
          {{ labelFirst }}
        </button>
        <ul class="option-list main">
          <li
            v-for="(item, idx) in getBankNameList"
            :key="idx"
            :class="
              item.id === parentId ? 'option-item selected' : 'option-item'
            "
            @click="selectOptionMain(item)"
          >
            {{ item.name }}
            <div class="hr"></div>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDownBankNameComponent',
  props: {
    labelFirst: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedBankNameId: 1,
      parentId: 1
    }
  },
  computed: {
    getBankNameList() {
      const result = []

      this.bankNameList.forEach((it) => {
        const item = {
          id: it.bankId,
          name: it.bankName
        }
        result.push(item)
      })
      return result
    },
  },
  mounted() {},
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
      } else {
        document
          .querySelector(`.${this.labelFirst}`)
          .parentNode.classList.add('active')
      }
    },
    selectOptionMain(item) {
      document.querySelector(`.${this.labelFirst}`).innerHTML = item.name + ''
      document.querySelector(`.${this.labelFirst}`).style.color = '#000'
      this.selectedBankNameId = item.id
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
@import '@/assets/scss/blind-date/dropdown-bankname.scss';
</style>
