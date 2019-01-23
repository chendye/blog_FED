# 开发和维护个人开源项目之npm发布

## 项目的引入
开始编码之前，项目如何被引入使用也需要考虑清楚。个人觉得使用`npm`包的方式引入是最佳选择：项目完全没有bug的可能性非常小，引入的打包后的结果基本无法调试，只能提`issues`或者另开环境，流程十分麻烦也不方便`bug`回溯；让使用者能够直接使用源码进行调试（只需安装相关依赖包），就显得很酸爽了。

另外`webpack`，提供了`UMD(Universal Module Definition)`的配置
```javascript
module.exports = {
  //...
  output: {
    library: 'MyLibrary',
    libraryTarget: 'umd'
  }
};
```
打包的输出：
```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports['MyLibrary'] = factory();
  else
    root['MyLibrary'] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```
[详细webpack配置点我。](https://webpack.docschina.org/configuration/output/#output-library)
这样项目的引入方式基本能满足所有情况了。

## npm发布

发布流程：
1. `npm init` //初始化项目，名字版本等信息，后面可以改
2. [注册npm帐号](https://www.npmjs.com/)
3. `npm login`
4. `npm publish`


### pagekage.json
对pagekage.json中2个字段进行说明

#### main
模块的入口，例如：模块名字`foo`，`reuqire('foo')`，引入的文件路径（相对于当前包的根目录）由`main`字段定义，打包输出的结果为`dist/index.js`，配置即应该是：
```
{
 "main":"dist/index.js"
}
```

#### peerDependencies
表示预记宿主会安装的依赖。例如，安装`babel-loader`时，提示：
![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzgilhvtxvj20qt02d0sr.jpg) 
又比如开发一个`vue`的组件，已知宿主会一定会安装：
```
 "peerDependencies": {
    "vue": "^2.5.0"
  }
```
其他字段详细介绍[点我看官方文档](https://docs.npmjs.com/files/package.json)

## npm login
如果`npm login`报错如下：
```
npm ERR! code E409
npm ERR! Conflict

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Louis\AppData\Roaming\npm-cache\_logs\2019-01-23T06_55_37_738Z-debug.log
```
有可能是你当前使用的是淘宝的镜像，尝试
```
npm config set registry https://registry.npmjs.org/
```
再进行`npm login`

## 总结
本文对项目的引入方式作了总结，再加上[开发和维护个人开源项目之代码仓库管理](https://segmentfault.com/a/1190000017981241)，项目前期的周边设计基本完成了，接下来开始专注编码。