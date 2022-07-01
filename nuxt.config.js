export default {
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
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth: {
    redirect: {
      callback: '/redirect-login',
      logout: '/signed-out'
    },
    strategies: {
      google: {
        clientId: '233320917463-3dse7qmlpfpq0b2ph6lcfjvt1esbijtm.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: 'token id_token',
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        // responseType: 'code',
        scope: ['openid', 'profile', 'email'],
        // endpoints: {
        //   token: undefined,
        //   userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
        // },
      }
      // social: {
      //   scheme: 'oauth2',
      //   endpoints: {
      //     authorization: 'https://accounts.google.com/o/oauth2/auth',
      //     token: undefined,
      //     userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
      //     logout: 'https://example.com/logout'
      //   },
      //   token: {
      //     property: 'access_token',
      //     type: 'Bearer',
      //     maxAge: 1800
      //   },
      //   refreshToken: {
      //     property: 'refresh_token',
      //     maxAge: 60 * 60 * 24 * 30
      //   },
      //   responseType: 'token',
      //   grantType: 'authorization_code',
      //   accessType: undefined,
      //   redirectUri: '/callback',
      //   logoutRedirectUri: '/logout',
      //   clientId: 'SET_ME',
      //   scope: ['openid', 'profile', 'email'],
      //   state: 'UNIQUE_AND_NON_GUESSABLE',
      //   codeChallengeMethod: '',
      //   responseMode: '',
      //   acrValues: '',
      //   // autoLogout: false
      // }
    }
  },
  
  router: {
    // middleware: ['auth']
  },

  axios: {
    // baseURL: 'https://whynot-here.o-r.kr'
    baseURL: 'http://localhost:9000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
