<template>
  <div id="ReviewComponent">
    why not here는 어떠셨나요?<strong>후기작성</strong>
  </div>
</template>

<script>
export default {
  name: 'ReviewComponent',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
#ReviewComponent {
  background-color: #181818;
  height: 44px; line-height: 44px;
  color: #ffffff;
  font-size: .88rem; font-weight: 400;
  text-align: center;
  strong {
    margin-left: 16px;
    font-size: .75rem; font-weight: 700;
    color: #A0C4FF;
    cursor: pointer;
  }
}
</style>
