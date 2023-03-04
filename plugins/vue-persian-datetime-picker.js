import Vue from 'vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

const locale = process.env.VUE_APP_I18N_LOCALE || 'en'
const localeConfig = () => ({
  en: {
    dow: 0,
    dir: 'ltr',
    displayFormat: (vm) => {
      switch (vm.type) {
        case 'date':
          return 'YYYY/MM/DD'
        case 'datetime':
          return 'YYYY/MM/DD HH:mm'
        case 'year':
          return 'YYYY'
        case 'month':
          return 'MM'
        case 'yearmonth':
          return 'YY/MM'
        case 'time':
          return 'HH:mm'
      }
    }
  }
})

Vue.use(VuePersianDatetimePicker, {
  name: 'custom-date-picker',
  props: {
    locale,
    localeConfig,
    inputFormat: 'YYYY-MM-DD HH:mm',
    format: 'YYYY-MM-DD HH:mm',
    editable: false,
    inputClass: 'form-control my-custom-class-name',
    placeholder: '날짜 선택',
    altFormat: 'YYYY-MM-DD HH:mm',
    color: '#00acc1',
    autoSubmit: false,
    simple: true
  }
})
