<template>
  <div id="SelectBoxDouble">
    <div class="select-box-wrp">
      <div :class="`select-box left ${disabled01 ? 'disabled' : ''}`">
        <button :class="`label _01 ${labelFirst}`" @click="openOptions">
          {{ labelFirst }}
        </button>
        <ul class="option-list main">
          <li v-for="(item, idx) in categoryList" :key="idx" class="option-item" @click="selectOptionMain(item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div :class="`select-box right ${disabled02 ? 'disabled' : ''}`">
        <button :class="`label _02 ${labelSecond}`" @click="openOptions">
          {{ labelSecond }}
        </button>
        <ul class="option-list sub">
          <li v-for="(item, idx) in subCategoryList" :key="idx" class="option-item" @click="selectOptionSub(item)">
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
    }
  },
  data () {
    return {
      selectedCategoryId: 1
    }
  },
  computed: {
    categoryList () {
      const result = []

      this.categoryGroup.forEach((category) => {
        const item = {
          id: category.parentId,
          name: category.parentName
        }
        result.push(item)
      })
      return result
    },
    subCategoryList () {
      const result = []

      const category = this.categoryGroup.filter((category) => {
        return category.parentId === this.selectedCategoryId
      })
      category[0].children.forEach((subCategory) => {
        const item = {
          id: subCategory.id,
          name: subCategory.name
        }
        result.push(item)
      })
      return result
    }
  },
  methods: {
    openOptions () {
      // if (this.optionList === null) {
      //   return false
      // }
      console.log('????')
      if (document.querySelector(`.${this.labelFirst}`).parentNode.classList.contains('active')) {
        document.querySelector(`.${this.labelFirst}`).parentNode.classList.remove('active')
        document.querySelector(`.${this.labelSecond}`).parentNode.classList.remove('active')
      } else {
        document.querySelector(`.${this.labelFirst}`).parentNode.classList.add('active')
        document.querySelector(`.${this.labelSecond}`).parentNode.classList.add('active')
      }
    },
    selectOptionMain (item) {
      document.querySelector(`.${this.labelFirst}`).innerHTML = item.name + ''
      document.querySelector(`.${this.labelFirst}`).style.color = '#000'
      this.selectedCategoryId = item.id
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
#SelectBoxDouble {
  .disabled .label {
    // background-color: #F9F9F9 !important;
    // border-radius: 8px;
  }
  .select-box-wrp * {
    box-sizing: border-box;
    font-size: .88rem;
  }
  .select-box-wrp {
    display: flex;
  }
  .select-box {
    position: relative;
    width: 50%;
    height: 46px;
    border-radius: 8px;
    // border: 1px solid #CFD5CF;
    border-radius: 8px;
    z-index: 10;
    cursor: pointer;
  }

  .right {
    background: url('@/assets/img/dropdown-icon.jpeg') calc(100% - 7px) center no-repeat #FFFFFF;
    background-size: 20px;
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
    width: 100%;
    height: 16px;
    margin-top: 16px;
    border: 0 none;
    outline: 0 none;
    padding-left: 15px;
    background-color: transparent;
    border-right: 1px solid #E7E7E7;
    // background-color: #ffffff;
    cursor: pointer;
  }
  
  ._01 {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  ._02 {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .select-box .option-list {
    position: absolute;
    top: 40px;
    // left: 0;
    width: 100%;
    padding: 0px 8px;
    background: #FFFFFF;
    // box-shadow: 0px 8px 16px rgba(0, 54, 2, 0.08);
    font-size: .88rem;
    color: #181818;
    list-style-type: none;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    max-height: 0;
    transition: .3s ease-in;
  }

  .select-box .main {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .select-box .sub {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
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
    min-height: 184px;
    max-height: 184px;
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
