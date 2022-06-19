<template>
  <div>
    <div>
      <h1>
        👋 난 {{ category }} 카테고리야 여기에 카드들이 들어가지
      </h1>
    </div>
    <nuxt-link style="text-decoration: none; color: #1e1e1e;" :to="`/${category}/posts/${1}`">
      <h2>
        😉 난 카드야 1번 포스팅 보러갈래?
      </h2>
    </nuxt-link>
    <div style="cursor: pointer; width: max-content;" @click="loginPopupOpen = true">
      🔑 로그인
    </div>
    <LoginPopup
      v-if="loginPopupOpen"
      @closePopup="closeLoginPopup"
    />
  </div>
</template>

<script>
import LoginPopup from '@/components/login/LoginPopup'

export default {
  name: 'CategoryPage',
  components: {
    LoginPopup
  },
  asyncData({ params }) {
    return {
      category: params.category
    }
  },
  data () {
    return {
      loginPopupOpen: false
    }
  },
  methods: {
    closeLoginPopup () {
      this.loginPopupOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>