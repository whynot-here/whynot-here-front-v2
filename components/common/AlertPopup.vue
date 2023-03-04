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
@import '@assets/scss/components/common/alert-popup.scss';
</style>