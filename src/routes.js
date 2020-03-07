const notFound = r => require.ensure([], () => r(require('./views/404.vue')),'notFound')
const login = r => require.ensure([], () => r(require('./views/Login.vue')),'login')
const home = r => require.ensure([], () => r(require('./views/Home.vue')),'home')
const homepage = r => require.ensure([], () => r(require('./views/Homepage.vue')),'homepage')
const resetpassword = r => require.ensure([], () => r(require('./views/Resetpassword.vue')),'resetpassword')
// import notFound from '@/views/404'
// import login from '@/views/Login'
// import home from '@/views/Home'
// import homepage from '@/views/Homepage'
// import resetpassword from '@/views/Resetpassword'

let routes = [
	{path:'*',redirect:{path:'/404'},hidden:true},
    {path:'/login',component:login,name:'',hidden:true},
    {path:'/404',component:notFound,name:'',hidden:true},
    {path:'/',component:home,name:'主页',hidden:true,children:[
        { path:'homepage',component:homepage,name:'首页',hidden:true},
        { path:'updatepwd',component:resetpassword,name:'修改密码',hidden:true}
    ]},
];

export default routes;