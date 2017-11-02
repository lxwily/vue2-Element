// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUi from 'element-ui'
import store from './vuex/store'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(Vuex)
import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: ['']
});
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
    
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (sessionStorage.getItem("user")) {
          next();
      } else {
        next({ path: '/login' })
      }
  } else {
      next();
  }
});
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  render : h => h(App)
})

