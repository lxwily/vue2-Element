import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Readme from '../../page/readme.vue'
import Basetable from '../../page/basetable.vue'
import Vuetable from '../../page/vuetable.vue'
import Baseform from '../../page/baseform.vue'
import Upload from '../../page/upload.vue'
import Vueeditor from '../../page/vueeditor.vue'
import Basecharts from '../../page/basecharts.vue'
import Login from '../components/login.vue'
import Home from '../main.vue'



import VueQuillEditor from 'vue-quill-editor'
import Schart from 'vue-schart';
import echarts from 'echarts';
Vue.use(VueQuillEditor)
Vue.use(Schart)
Vue.use(echarts)
// 引入组件



Vue.use(Router)

export default new Router({
 
  routes: [
    //自述
    {
      path: '/login',
      component: Login,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name: '导航一',
      children: [
        { path: '/readme', component: Readme,},
        { path: '/basetable', component: Basetable,},
        { path: '/vuetable', component: Vuetable,},
        { path: '/baseform', component: Baseform,},
        { path: '/upload', component: Upload,},
        { path: '/vueeditor', component: Vueeditor,},
        { path: '/basecharts', component: Basecharts,},
      ],
      meta : { requiresAuth : true}
    },
  ]
})
