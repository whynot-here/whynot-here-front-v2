import Vue from 'vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// import { BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.prototype.$bus = new Vue()