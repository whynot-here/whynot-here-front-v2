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
#SelectBox {
  .disabled .label {
    // background-color: #F9F9F9 !important;
    // border-radius: 8px;
  }
  .select-box * {
    box-sizing: border-box;
    font-size: .88rem;
  }
  .select-box {
    position: relative;
    width: 100%;
    height: 46px;
    border-radius: 8px;
    // border: 1px solid #CFD5CF;
    border-radius: 8px;
    background: url('@/assets/img/dropdown-icon.jpeg') calc(100% - 7px) center no-repeat #FFFFFF;
    background-size: 20px;
    cursor: pointer;
  }

  .select-box:after {
    content: '';
    display: block;
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 35px;
    // background: lightcoral;
  }

  .select-box {
    // margin-right: 20px;
  }

  .select-box .label {
    color: #AAAAAA;
    display: flex;
    align-items: center;
    width: inherit;
    height: inherit;
    border: 0 none;
    outline: 0 none;
    padding-left: 15px;
    border-radius: 8px;
    background-color: transparent;
    // background-color: #ffffff;
    cursor: pointer;
  }

  .select-box .option-list {
    position: absolute;
    top: 40px;
    // left: 0;
    width: 100%;
    padding: 0px 8px;
    background: #FFFFFF;
    box-shadow: 0px 8px 16px rgba(0, 54, 2, 0.08);
    border-radius: 8px;
    font-size: .88rem;
    color: #181818;
    list-style-type: none;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    max-height: 0;
    transition: .3s ease-in;
  }

  .select-box .option-list::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .select-box.active {
    // border: 1.5px solid #009345;
    // box-shadow: 0px 8px 16px rgba(0, 54, 2, 0.08);
    // border-radius: 8px;
  }

  .select-box.active .option-list {
    max-height: 500px;
  }

  .select-box .option-item {
    width: 130px; height: 42px; line-height: 42px;
    font-size: .88rem;
    // border-bottom: 1px dashed rgb(132, 132, 132);
    padding: 0px 5px;
    margin-top: 8px;
    transition: .3s;
  }

    .select-box .option-item:last-child {
    margin-bottom: 8px;
  }

  .select-box .option-item:hover {
    background: #F3F7FE;
    border-radius: 6px;
    color: #005B9A;
  }

  .select-box .option-item:last-child {
    border-bottom: 0 none;
  }

  // 스크롤 커스텀
  .select-box .option-list::-webkit-scrollbar {width: 6px;}
  .select-box .option-list::-webkit-scrollbar-track {background: transparent; }
  .select-box .option-list::-webkit-scrollbar-thumb {background: #303030; border-radius: 45px;}
  .select-box .option-list::-webkit-scrollbar-thumb:hover {background: #303030;}
}
</style>
