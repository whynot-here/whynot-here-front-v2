<template>
  <div id="Card">
    <div
      v-for="(card, idx) in cardList"
      :key="idx"
      class="card-wrp"
    >

    </div>
  </div>
</template>

<script>
export default {
  name: 'WhynotCard',
  components: {
  },
  data () {
    return {
      cardList: [
        1,2,3,4,5,6,7,8
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main-page/card.scss';
</style>
