import Vue from 'vue'

// import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import '@mdi/font/css/materialdesignicons.css'
// import InlineEditor from '@/views/InlineEditor';

Vue.config.productionTip = false

import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)

// use router
import Router from 'vue-router'
Vue.use(Router)

import App from './App.vue'
import GrapesEditor from '@/views/GrapesEditor';

new Vue({
  vuetify: new Vuetify(),
  router: new Router({
    routes: [
        {
        path: '/grapes',
        name: 'grapes',
        component: GrapesEditor
      },
    ]
  }),
  render: h => h(App)
}).$mount('#app')
