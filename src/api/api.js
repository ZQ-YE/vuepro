import http from "api/http.js"

export const userLogin = params => { return http.post('/userlogin', params); };  //系统用户登录
export const getmenulist = params => { return http.post('/getmenulist', params); };  //获取左侧菜单列表

