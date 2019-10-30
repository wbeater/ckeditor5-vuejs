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
// import InlineEditor from '@/views/InlineEditor';
import ImageEditor from '@/views/ImageEditorTest';

new Vue({
  vuetify: new Vuetify(),
  router: new Router({
    routes: [
      {
        path: '/image',
        name: 'image',
        component: ImageEditor
      },
        {
        path: '/grapes',
        name: 'grapes',
        component: GrapesEditor
      },
      // {
      //   path: '/inline',
      //   name: 'inline',
      //   component: InlineEditor
      // },
    ]
  }),
  render: h => h(App)
}).$mount('#app')
