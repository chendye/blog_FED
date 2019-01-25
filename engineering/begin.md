# 开发和维护个人开源项目之徽章收集

![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzil4ty4j9j20ii07kjrk.jpg)

开局一张图，下面开始编。
小伙伴对这些花花绿绿的徽章肯定不会陌生，查看[npm](https://www.npmjs.com/)、[github](https://github.com/)`README`时， 通过这些徽章可以获知项目的最新版本号、构建状态、测试覆盖率。

徽章有几类，本文主要对能够标识**项目质量**和比较常用的`badges`进行收集汇总，文末会放出一个实践demo，希望能帮助大家了解并拿到自己想要的徽章。

## 目录
* 代码相关
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim22re01j202i00kgld.jpg) 
    > 构建通过，自动化测试完成，通过 [Travis CI](https://travis-ci.org/) 获取
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim2kddgkj202y00kmwx.jpg)
    > 测试覆盖统计，通过 [coveralls.io](https://coveralls.io/) 获取
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim43scx0j202600kgld.jpg)
    > 代码质量分析，通过 [codebeat.co](https://codebeat.co/a/field/projects) 获取 
* 应用程度
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim55pv23j202800k741.jpg) ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim4ztxdxj202800k3y9.jpg)
    > `github` 数据，通过[shields.io](https://shields.io/#/examples/social) 获取
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim5gn2nlj202s00kgld.jpg)
    > 下载量，一般使用`npm`的下载数据，通过[shields.io](https://shields.io/#/examples/downloads) 获取
* 其他
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzimh2y190j202g00ka9t.jpg)
    > `npm`上项目的当前版本
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim61jml1j202s00ka9t.jpg)
    > 证书
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzimrz28wzj202c00kgld.jpg)
    > 文件大小  

[shields.io](https://shields.io/#/) 还有更多的徽章。 选择相应的平台，填写好链接，拿到数据后，[shields.io](https://shields.io/#/) 就能帮你生成相应的`badges`，还可以进行自定义。

### 代码相关