const state={
    isLogin:false
}

const mutations={
    LOGIN(state){
        state.isLogin=true;
    },
    logout(state){
        state.isLogin=false;
    }
}
const actions={
    // 参数1：vuex传递的上下文context:{commit,dispatch,state,...}
    login({commit},username){
        // 模拟登录api调用，1秒后返回
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(username=='admin'){
                    commit('LOGIN')
                    resolve();
                }else{
                    reject();
                }
            },1000)
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
