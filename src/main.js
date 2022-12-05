// Import Core
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './shared/store'

// Import Plugins
import './plugins/validation'
import './plugins/antdesign'
import i18n from './plugins/i18n'
import './plugins'

// Import Filter || Directive
import './shared/directives'
import './shared/filters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n, // setting languages
  render: h => h(App),
}).$mount('#app')
