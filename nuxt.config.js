export default {
  target: 'static',
  generate: {
    fallback: true
  },
  env: {
    frontUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://why-not-here.netlify.app'
        : 'http://127.0.0.1:3000'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'whynot-here-front',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/common.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/mixins/common.js',
    '~/plugins/main.js',
    '~/plugins/vue-cookies.js',
    {
      src: '~plugins/persistedState.js',
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
    // '@nuxtjs/auth-next'
  ],
  // nuxt auth 모듈을 사용할 때. 지금은 사용하지 않고 api 서버에서 처리
  // auth: {
  //   redirect: {
  //     callback: '/oauth/redirect',
  //     logout: '/signed-out'
  //   },
  //   strategies: {
  //     google: {
  //       clientId: '233320917463-3dse7qmlpfpq0b2ph6lcfjvt1esbijtm.apps.googleusercontent.com',
  //       codeChallengeMethod: '',
  //       responseType: 'token id_token',
  //       token: {
  //         property: 'access_token',
  //         type: 'Bearer',
  //         maxAge: 1800
  //       },
  //       refreshToken: {
  //         property: 'refresh_token',
  //         maxAge: 60 * 60 * 24 * 30
  //       },
  //       scope: ['openid', 'profile', 'email'],
  //     }
  //   }
  // },
  
  router: {
    middleware: 'auth'
  },

  axios: {
    baseURL: 'https://whynot-here.o-r.kr'
    // baseURL: 'http://localhost:9000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
