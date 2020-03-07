# 安装

``` bash
### 安装依赖
npm install

# 打包优化
npm run dll

# 运行 at localhost:8989
npm run dev

# 打包项目
npm run build

# 生产构建并查看bundle analyzer报告
npm run build --report
```

# 配置 DllPlugin 插件优化打包性能
`参考博客：https://blog.csdn.net/przlovecsdn/article/details/82761912`
1.  在build文件夹下新建 webpack.dll.conf.js 文件(即和webpack.base.conf.js同级)
```js
const path = require('path')
const webpack = require('webpack');
 
module.exports = {
    output: {
        filename: 'dll/[name].dll.js',
        path: path.resolve(__dirname, '../static/js/'),
        library: '[name]_library', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    },
    plugins: [
        new webpack.DllPlugin({
        path: path.resolve(__dirname, './manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
        name: '[name]_library',
        }),
    ],
}
```
2. 在webpack.base.conf.js文件中配置 

`在参考文档中少了 entry 字段的设置，报错 Configuration file found but no entry configured. 请自行设置需要优化打包项`
```js
const webpack = require('webpack')

module.exports = {
    entry: {
        vendor: ['vue-router']
    },
    entry: {
        app: './src/main.js'
    },
   //.......
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: require('./manifest.json')
        })
    ],
}
```
3. 在package.json文件script中添加
```json
"scripts": {
    "dll": "webpack -p --progress --config build/webpack.dll.conf.js",
}
```
4. 在index.html中引入 vendor.dll.js 文件
```html
<body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script type="text/javascript" src="./static/js/dll/vendor.dll.js"></script>
</body>
```
5. 在打包之前首先运行npm run dll  (只需运行一次即可，只要package.json中dependencies的依赖包(即通过import引入的依赖包)没有变化)
```bash
只运行一次即可
npm run dll

首次打包时间较长，后续打包时间明显减少
npm run build
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

