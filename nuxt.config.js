export default {
  server: {
    host: process.env.HOST
  },
  target: 'server',
  env: {
    frontUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://why-not-here.o-r.kr'
        : 'http://localhost:3000',
    apiUrl: 'https://whynot-here.o-r.kr'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'whynot-here',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Why Not Here'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '🙋‍♂️ 사람을 모으기 쉬워지는 곳 _ why not here'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/og-img.jpeg'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/common.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/mixins/common.js',
    '~/plugins/main.js',
    '~/plugins/vue-cookies.js',
    '~/plugins/vue-gtag',
    {
      src: '~plugins/persistedState.js'
    },
    { src: '~/plugins/v-calendar.js', mode: 'client' },
    { src: '~/plugins/vue-toasted.js', mode: 'client' },
    { src: '~/plugins/vue-persian-datetime-picker.js', mode: 'client' },
    { src: '~/plugins/v-owl-carousel.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', 'bootstrap-vue/nuxt', 'nuxt-user-agent'],

  bootstrapVue: {
    bootstrapCss: false,
    bootstrapVueCSS: false
  },

  router: {
    middleware: 'auth'
  },

  axios: {
    baseURL: 'https://whynot-here.o-r.kr'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true
    }
  }
}
