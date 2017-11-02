import Vuex from 'vuex';
Vue.use(Vuex);

const  vuex_store = new Vuex.Store({
    state:{
        user_name:""
    },
    mutations:{
        showUserName(state){
            alert(state.user_name);
        }
    }
})