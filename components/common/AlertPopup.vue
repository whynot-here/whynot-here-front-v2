<template>
  <div v-if="popupOption.isShow">
    <div class="popup-wrap">
      <div class="popup">
        <div class="popup-header">
          <h2>{{ popupOption.title }}</h2>
        </div>
        <div class="popup-body">
          <p>{{ popupOption.content }}</p>
        </div>
        <div class="popup-footer">
          <button v-if="popupOption.type === 'confirm'" @click="cancel">{{ popupOption.cancelText }}</button>
          <button @click="confirm">{{ popupOption.confirmText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertPopup',
  props: {
    option: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      popupOption: {
        isShow: false,
        title: '',
        content: '',
        type: 'confirm', // alert | confirm
        confirmText: '네', // 확인 | 네
        cancelText: '아니오', // '' | 아니오
        confirmCallback: null,
        cancelCallback: null
      }
    }
  },
  methods: {
    show(option) {
      this.popupOption.isShow = true;
      this.popupOption = Object.assign(this.popupOption, option);
    },
    hide() {
      this.popupOption.isShow = false;
    },
    confirm() {
      this.hide();
      this.popupOption.confirmCallback && this.popupOption.confirmCallback();
    },
    cancel() {
      this.hide();
      this.popupOption.cancelCallback && this.popupOption.cancelCallback();
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup {
    width: 300px;
    background-color: #fff;
    border-radius: 5px;
    .popup-header {
      padding: 20px;
      border-bottom: 1px solid #eee;
      h2 {
        font-size: 16px;
        font-weight: 600;
      }
    }
    .popup-body {
      padding: 20px;
      p {
        font-size: 14px;
      }
    }
    .popup-footer {
      padding: 20px;
      border-top: 1px solid #eee;
      text-align: right;
      button {
        padding: 5px 10px;
        border: 1px solid #eee;
        border-radius: 5px;
        background-color: #fff;
        font-size: 14px;
        cursor: pointer;
        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>