# Vue2.0 核心之响应式流程

> 看了部分Vue源码分析或运行机制的文章，接收到这些信息：
> * 使用`Object.defineProperty`实现响应监听，
> * 使用`Dep`，`Wacther`实现依赖收集追踪
> * 使用`Virtual Dom`、高效`diff`算法实现最小化更新
>
> 对整个流程还是没有理解，或者写了流程，也是作者自己实现的一套，不是Vue的源码。为了熟悉Vue真正的流程花了点时间看了Vue的源码，通过debugger（浏览器版本）自己梳理了一遍。

> 以下代码来源自Vue，只做了删减，保留核心。

`new Vue(options)`的执行流程，debugger的主体流程如下：
1. `beforeCreate Hook`
2. `initSate()`
   * `initData() -- oberve`
3. `created Hook`
4. `vm.$mount(vm.$options.el)`
   1. `根据template解析出render function`
   2. `声明 update function`
      ```javascript
        updateComponent = function () {
            vm._update(vm._render(), hydrating);
        };
      ```
   3. `new Watcher(vm, updateComponent, noop,{before...}`
   4. `mounted Hook`
   
不考虑`updateComponent`和`Hooks`剩下：
1. `initData() -- oberve`
2. `new Watcher(vm, updateComponent, noop,{before...}`

这两个步骤实现了依赖的收集与通知、以及初始化，我在github上的项目[learnVue](https://github.com/chendye/learnVue)截取了Vue核心代码进行流程学习，以下是我简化后的代码：
```javascript
    import {Observer} from './observer';
    import  Watcher  from "./watcher";
    let noop =function(){};
    let vm={
        _watchers:[],
        data :{
            name:'jack',
            age:12
        }
        // render:new Function("with(this){return _c('div',{attrs:{\"id\":\"app\"}},[_v(_s(name))])}")
    }
    new Observer(vm.data);

    new Watcher(vm,function(){
        //update function 
        var name=vm.data.name;
        var age=vm.data.age;
        console.log(name,age)
    },noop);
```
测试，控制台正常输出:
```javascript
setTimeout(()=>{
    vm.data.name='lucy';
    vm.data.age=10;
    vm.data.name='lili';
},1000)
```


### 依赖收集
什么优化都不做`Object.defineProperty` 定义`set`即可实现同步。后果就是任一属性更新都会同步dom，造成性能浪费。Vue使用*订阅/观察*模式做了第一步优化。

打开[vue项目下observer文件夹](https://github.com/vuejs/vue/tree/master/src/core/observer)，可以看到以下几个文件：
* `index.js(observer) //植入响应式钩子`
* `dep.js //依赖管理`
* `watcher.js //观察者，同步UI`

`index.js` 核心代码:
```javascript
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = val
            if (Dep.target) {
                dep.depend()
            }
            return value
        }
    })
```
调用`dep.js` 中的方法
```
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
```
那`Dep.target` 又是什么呢？这就是`new Watcher`的作用了。
watcher.js:

```javascript
    constructor(
        vm,
        expOrFn,
        cb
    ) {
        this.vm = vm
        this.getter = expOrFn
        this.value = this.get() //初始化
    }
    get() {
        pushTarget(this) //推送 Dep.target
        let value
        const vm = this.vm
        value = this.getter.call(vm, vm) //触发 get钩子

        popTarget() //还原 Dep.target
        this.cleanupDeps()
        return value
    }
```
在`Watcher.get()`函数中进行依赖收集，画了一下运行流程（绿色和蓝色线条）：
![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fz8j5rfx35j20m00egaan.jpg)

通过这个流程我们可以看到，Watcher 就是负责把内存的值同步到UI的。

## 异步更新
同步更新会导致大量的重绘，从而导致UI性能问题。Vue采用异步更新策略，把一个批次的修改一次更新给UI。来看下index.js中`set`方法。
```javascript
 set: function reactiveSetter(newVal) {
            const value = val
            /* eslint-disable no-self-compare */
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            val = newVal
        dep.notify()
    }
```
`dep.js` 
```javascript
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update() //Watcher.update
    }
  }
```

`watcher.js`
```javascript
    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    update() {
        /* istanbul ignore else */
        queueWatcher(this)
    }
```
`queueWatcher` 将`Watcher`给了`queueWatcher //scheduler.js` 调度中心，异步的实现，优先`promise`，降级`setTimeout`。
```javascript
export const nextTick = (function () {
    const callbacks = []
    let pending = false
    let timerFunc
  
    function nextTickHandler () {
      pending = false
      const copies = callbacks.slice(0)
      callbacks.length = 0
      for (let i = 0; i < copies.length; i++) {
        copies[i]()
      }
    }
  
    // the nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    /* istanbul ignore if */
    if (typeof Promise !== 'undefined') {
      var p = Promise.resolve()
      var logError = err => { console.error(err) }
      timerFunc = () => {
        p.then(nextTickHandler).catch(logError)
      }
    }else {
      // fallback to setTimeout
      /* istanbul ignore next */
      timerFunc = () => {
        setTimeout(nextTickHandler, 0)
      }
    }
  
    return function queueNextTick (cb, ctx) {
      let _resolve
      callbacks.push(() => {
        if (cb) cb.call(ctx)
        if (_resolve) _resolve(ctx)
      })
      if (!pending) {
        pending = true
        timerFunc()
      }
      if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
          _resolve = resolve
        })
      }
    }
  })()
```
流程图，黄色线条：

![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fz8jwf5crmj20q80ledgp.jpg)

## 未完待续
暂时只研究了`内存 => UI`，`UI => 内存` 以后再研究。框架的弯弯绕绕但没有一行冗余代码，好奇咋写出来的~
![](http://ww1.sinaimg.cn/large/e3ba9e6dgy1fz8jxqfwehj20vu0kvwfg.jpg)