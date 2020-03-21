const notFound = r => require.ensure([], () => r(require('./views/404.vue')),'notFound')
const login = r => require.ensure([], () => r(require('./views/Login.vue')),'login')
const layout = r => require.ensure([], () => r(require('./layout/index.vue')),'layout')
const home = r => require.ensure([], () => r(require('./views/Home.vue')),'home')
const resetpassword = r => require.ensure([], () => r(require('./views/Resetpassword.vue')),'resetpassword')

let routes = [
	{path:'*',redirect:{path:'/404'},name:'404',hidden:true},
    {path:'/login',component:login,name:'登录',hidden:true},
    {path:'/404',component:notFound,name:'404',hidden:true},
    {path:'/',component:layout,name:'主页',hidden:true,redirect:'/home',children:[
        { path:'home',component:home,name:'首页',hidden:true,meta: { title: '首页' }},
        { path:'updatepwd',component:resetpassword,name:'修改密码',hidden:true,meta: { title: '修改密码' }}
    ]}
];

export default routes;