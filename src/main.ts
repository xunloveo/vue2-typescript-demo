import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import i18n from '@/lang'
import '@/icons/components'
import './permission'

import 'normalize.css'
import './styles/styles.scss'
import './styles/index.scss'

Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
