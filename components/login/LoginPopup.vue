<template>
  <div id="LoginPopup" @click.self="$emit('closePopup')">
    <div class="popup-wrp">
      <div class="popup-top">
        <div class="close-btn" style="cursor: pointer;" @click="$emit('closePopup')">
          X
        </div>
        <h1>
          Why Not Here 시작하기
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPopup'
}
</script>

<style lang="scss" scoped>
#LoginPopup {
  z-index: 100;
  position: fixed;
  width: 100vw; height: 100vh;
  top: 0; left: 0;
  background: rgba(34,34,38,.6);
  transition: opacity .2s;
  .popup-wrp {
    max-width: 800px; height: 600px;
    margin: calc((100vh - 600px) / 2) auto;

    background: #fff;
    box-shadow: 0 0 20px 0 rgb(92 95 112 / 20%);
    border-radius: 10px;
    color: #18191b;
    overflow: hidden;
    text-align: center;
    .popup-top {
      .close-btn {
        height: 60px; line-height: 60px;
        padding-right: 20px;
        text-align: right;
      }
    }
  }
}
</style>
