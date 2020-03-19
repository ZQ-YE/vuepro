// vue components  列表数据字段名对应 Remark
const layout = import('@/layout/index.vue');  //外层框架
const home = import('@/views/Home.vue');  //主页

const list1 = import('@/views/table/list1.vue');  //列表
const list2 = import('@/views/table/list2.vue');  

const tree = import('@/views/tree');  


function look(n){
	switch(n){
		case 'home':
  			return home;
			  break;
		case 'layout':
			return layout;
			break;
	    case 'list1':
	    	return list1;
			break;
		case 'list2':
			return list2;
			break;
		case 'tree':
			return tree;
			break;
		default:
			return home;
			break;
	}
}

export default (name) => () => look(name);