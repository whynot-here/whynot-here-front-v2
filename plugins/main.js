import Vue from 'vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import AlertPopup from '@/components/common/AlertPopup.vue'

Vue.use(VueClipboard)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueDOMPurifyHTML)
Vue.prototype.$bus = new Vue()
Vue.prototype.$AlertPopup = new Vue(AlertPopup)
