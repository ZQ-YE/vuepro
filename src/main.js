// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import routes from './routes'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Router);

const router= new Router({
  mode:"history",
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
      sessionStorage.removeItem("Token")
  }
  let Token = sessionStorage.getItem("Token");
  if(!Token && to.path != '/login'){
    next({path:'/login'})
  }else{
    if(to.path){
      next()
    }else{
      next({path:'/404'})
    }
  }
})

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
  router,
  render:h=>h(App)
}).$mount("#app")
