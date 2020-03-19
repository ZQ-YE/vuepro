import lazyLoading from './lazyLoading'
export default(routers,data) => {
	data = JSON.parse(data);
	generaMenu(routers,data);
}

function generaMenu(routers,data){
	data.forEach((item) => {
		let menu = Object.assign({},item);
		menu.component = lazyLoading(menu.remark);
		if(item.children) {
			menu.children = [];
			let dataItem = item.children;
			generaMenu(menu.children,dataItem);
        }
		routers.push(menu);
	});
}