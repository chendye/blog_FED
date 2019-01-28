# 开发和维护个人开源项目之徽章收集

> 常常在`github`、`npm`上看到一个个花花绿绿的`badges`，花点时间整理下。
> 这是一篇介绍徽章的文章，同时后面会贴出demo（get到常用的`badges`）。希望对你也有帮助，欢迎评论或者提`issues`交流。

决定是否使用一个开源项目，最基本两点：
* 是否满足需求；
* 项目质量如何。

本文要介绍的徽章就是**项目质量**的体现之一，它有几个好处：
* 体现项目当前**质量**；
* 体现项目自动化程度（迭代开发效率）；
* 体现项目当前使用情况。


看下`Vue`的徽章：
![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzil4ty4j9j20ii07kjrk.jpg)

这些徽章不仅使`README.md`更加美观，通过它们我们也可以获知`Vue`的构建状态、测试覆盖率，使用情况，最新版本号等等。我整理了一下比较常用的进行了简单分类。

## 常用徽章

### 代码相关
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim22re01j202i00kgld.jpg) 
    > 是否构建通过，可以通过持续集成工具获取。
    > Vue使用的是[CircleCI](https://circleci.com/)，我用的[Travis CI](https://travis-ci.org/)。
    > 构建过程，可以看下`Vue`的配置文件[.circleci/config.yml](https://github.com/vuejs/vue/blob/dev/.circleci/config.yml)。大致是：下载依赖 => 代码lint => 测试覆盖率统计 => 端到端测试 => srr-weex测试 => 回归测试 。

  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim2kddgkj202y00kmwx.jpg)
    > 测试覆盖率统计，数据来源上面的构建过程，将跑完的结果发送到对应平台。
    > Vue使用的[codecov.io](https://codecov.io)，我用的 [coveralls.io](https://coveralls.io/) 。
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim43scx0j202600kgld.jpg)
    > 代码质量分析，通过 [codebeat.co](https://codebeat.co/a/field/projects) 获取。这个是独立的，从复杂度，代码复用等方面进行分析。Vue没有上这个徽章。

### 应用程度
  其他的徽章就都可以从[shields.io](https://shields.io/#/)上直接获取了，里面有很多很多的徽章。 选择相应的平台，填写好链接，拿到数据后，[shields.io](https://shields.io/#/) 就能帮你生成相应的`badges`，还可以进行自定义。
  
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim55pv23j202800k741.jpg) ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim4ztxdxj202800k3y9.jpg)
    > `github` 数据
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim5gn2nlj202s00kgld.jpg)
    > 下载量，一般使用`npm`的下载数据。
### 其他
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzimh2y190j202g00ka9t.jpg)
    > `npm`上项目的当前版本
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzim61jml1j202s00ka9t.jpg)
    > 证书
  * ![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fzimrz28wzj202c00kgld.jpg)
    > 文件大小

这些徽章的数据都是**动态实时**的。代码相关的几个徽章，在仓库有变动时会自动构建分析，从而生成新的数据。

## 总结

我觉得最重要的是**代码相关**的那三个徽章，有点ISO9001认证的感觉，这也正是我们想要的 :) 。[最后上个demo，折腾这个demo花了三四天时间，主要在配置karma时绕了很多弯路，点我查看demo](https://www.npmjs.com/package/@chendye/bages-demo)。