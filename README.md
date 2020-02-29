# 安装

``` bash
### 安装依赖
npm install

# 运行 at localhost:8989
npm run dev

# 打包项目
npm run build

# 生产构建并查看bundle analyzer报告
npm run build --report
```
### 安装 font-awesome
`参考文档：https://www.cnblogs.com/muzs/p/8521609.html`
```
npm install font-awesome
main.js 文件中 import 'font-awesome/css/font-awesome.css'
使用 在需要的地方 <span class="fa fa-xxx"></span>

# 一下看项目是否已经安装过，按需安装配置即可
npm install style-loader css-loader sass-loader --save-dev
npm install  node-sass --save-dev  //(sass-loader 依赖于node-sass)
npm install extract-text-webpack-plugin  //(这个是webpack抽离css的插件，这个cli自带了，可以-v检查下)
在webpack.base.config.js 文件中
rule:[
    {
        test:/\.scss$/,
        loaders:["style","css","sass"]
    }
]
```

### 安装 使用 axios ElementUI
```js
//安装
npm install axios -S

//使用
import axios from 'axios'
axios({
    method: 'post',
    url: '/login',
    data: {
        userName: 'yezq',
        password: '123456'
    },
    timeout:10000,
    headers:{ 'Content-Type':'application/json; charset=utf-8' }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
 ```
 ```js
//安装
npm i element-ui -S

//使用 main.js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
 ```

 ## 如果需要安装 scss 环境（css预处理器）
  ```js
//安装
npm install node-sass sass-loader --save-dev

// 在build文件夹下的webpack.base.conf.js的rules里面添加配置
{
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass']
}

//解决版本过高~~~~~~~~~~~~~~~~~~~~~~~~
// Modele build failed: TypeError: this.getResolve is not a function at Object.loader...
//卸载当前版本   
npm uninstall sass-loader
//安装     
npm install sass-loader@7.3.1 --save-dev
 ```

### 文件说明
+ api/http.js 封装 axios 请求（部分其它的方法：时间格式、base64加密）
+ api.js api 请求集中管理
+ data/menulistjson.js  登录后的左侧菜单按钮数据
+ utils/menuUtils.js 左侧菜单动态路由加载数据遍历
+ utils/lazyLoading.js  左侧菜单模板获取模板 component 内容

