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
