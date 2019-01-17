# 解决.vue文件url引用文件的问题


遇到的问题：
* 在css中引入图片，明明目录结构是对的，还是`This dependency was not found`；
* `dev`好好的，`build` 之后凉凉，图片加载`404`
  
## 图片路径
### webpack 添加 alias 
```javascript
//webpack.base.conf.js
    alias: {
      '@': resolve('src'),
      //加入
      'assets': resolve('src/assets')
    }
```

### 路径书写规则
* `template` 可使用`@`、`~`
* `style` 只能使用`~`
* `script` 只能使用`@`
* 不需要经过打包的`static`文件写相对路径

根据`limit:10000`，使用两张图片：
```html
<template>
    <div>
        <div>
            img+src：@
            <img src="@/assets/images/jiaban.jpg" height="200px">
            <img src="@/assets/images/cat.png" alt="">
        </div>
        <div>
            img+src：~
            <img src="~assets/images/jiaban.jpg" height="200px">
            <img src="~assets/images/cat.png" alt="">
        </div>
        <div>
            img+js(attrs):
            <img :src="jiaban" height="200px">
            <img :src="cat" alt="">
            <ul>
                <li>{{jiaban}}</li>
                <li>{{cat}}</li>
            </ul>
        </div>
        <div class="css-bg">
            img+css(background-images):
            <span class="css-bg__1"></span>
            <span class="css-bg__2"></span>
        </div>
        <div>
            static：
             <img src="static/images/jiaban.jpg" height="200px">
            <img src="static/images/cat.png" alt="">
        </div>
    </div>
</template>

<script>
const jiaban = require('@/assets/images/jiaban.jpg');
const cat =  require('@/assets/images/cat.png');

export default {
    data(){
        return {
            jiaban,
            cat
        }
    }
}
</script>

<style lang="scss">
.css-bg__1,
.css-bg__2{
    display: inline-block;
}
.css-bg__1{
    height: 200px;
    width: 173px;
    background-image: url(~assets/images/jiaban.jpg);
    background-size: contain;
}
.css-bg__2{
    height: 49px;
    width: 49px;
     background-image: url(~assets/images/cat.png);
    background-size: contain;
}
</style>
```
开发环境截图：
![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fz9rxfv39lj21cy0rowqt.jpg)
## 构建路径
添加`ExtractTextPlugin`中`publicPath`配置，这里根据实际情况配：
```javascript
//build/util.js
    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../',   
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
```
生产环境截图：
![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fz9ry09lo8j21gm0rk4b5.jpg)
## 参考链接
[https://vue-loader.vuejs.org/zh/](https://vue-loader.vuejs.org/zh/)
[https://github.com/vuejs/vue-loader/issues/193](https://github.com/vuejs/vue-loader/issues/193)
[https://segmentfault.com/q/1010000004582219](https://segmentfault.com/q/1010000004582219)
