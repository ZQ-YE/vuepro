// vue components  列表数据字段名对应 Remark
const home = import('@/views/Home.vue');  //外层框架
const homepage = import('@/views/Homepage.vue'); //空页面

const userlist = import('@/views/userlist.vue');  //用户管理 
const list2 = import('@/views/list2.vue');  

function look(n){
	switch(n){
		case 'home':
  			return home;
  			break;
		case 'homepage':
			return homepage;
			break;
	    case 'userlist':
	    	return userlist;
            break;
        case 'list2':
            return list2;
            break;
		default:
			return homepage;
			break;
	}
}

export default (name) => () => look(name);