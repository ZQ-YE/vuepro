import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        isLogin:false
    },
    mutations:{
        login(state){
            state.isLogin=true;
        },
        logout(state){
            state.isLogin=false;
        }
    },
    actions:{
        // 参数1：vuex传递的上下文context:{commit,dispatch,state,...}
        login({commit},username){
            // 模拟登录api调用，1秒后返回
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    if(username=='admin'){
                        commit('login')
                        resolve();
                    }else{
                        reject();
                    }
                },1000)
            })
        }
    },
    modules:{

    }
})


