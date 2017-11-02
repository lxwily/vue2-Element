
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const store = new Vuex.Store({
    // 定义状态
    state: {
        user: ''
    },
    mutations: {
        // 提交载荷 Payload
        user(state, newUser) {
          state.user = newUser
        }
      },
})
 
export default store