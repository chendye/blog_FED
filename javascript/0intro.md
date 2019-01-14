# JavaScript 简介

> 一般来说，完整的JavaScript包括以下几个部分：
> * ECMAScript，描述了该语言的语法和基本对象；
> * 文档对象模型（DOM），描述处理网页内容的方法和接口；
> * 浏览器对象模型（BOM），描述与浏览器进行交互的方法和接口。
>
> 本文（系列）主要探讨ECMAScript的特性和应用，因为平时交流习惯用JavaScript，后面都用JavaScript代替，实际上JavaScript是ECMAScript标准的实现和扩展。

JavaScript 是一门多范式的动态语言，包含类型、运算符、标准的内置对象和方法。
关于JavaScript 的设计思路，阮一峰老师是这么总结的：
1. 借鉴 C 语言的基本语法；
2. 借鉴 Java 语言的数据类型和内存管理；
3. 借鉴 Scheme 语言，将函数提升到"第一等公民"（first class）的地位；
4. 借鉴 Self 语言，使用基于原型（prototype）的继承机制。

综合各家所长，发展出了一门**多范式的动态语言**：
* 多范式：支持命令式编程（流程控制语句）、支持函数式编程（函数是一等公民）、支持面向对象编程（原型扩展）；
* 动态：
  * 弱类型，使用`var`声明变量；
  * 对象属性任意扩展；
  * 解释执行语言，代码不进行预编译（浏览器端）。

## JavaScript 发展历程
* 1995年创建——Brendan Eich（Netscape工程师）；
* 1996年首次发布——在Netscape 2上，当时被称为 LiveScript ，因为和 sun 合作，搭上Java这个编程语言“热词”，重命名为“JavaScript”；
* 1997年设立标准——ECMA以JavaScript语言为基础制定了ECMAScript标准规范ECMA-262；
* 1999年发布第3版；
* 2009年发布第5版（ES5）；
* 2015年发布第6版（ES6/ES2015）；
* 2016年发布第7版（ES7/ES2016）；
* 2017年发布第7版（ES8/ES2017）；
* 2018年发布第7版（ES9/ES2018）。

> 多了个年份的叫法，不查资料都搞不清哪来这么多标准。更多请查阅[ecma-262](http://www.ecma-international.org/ecma-262/) 或者[维基百科-ECMAScript](https://zh.wikipedia.org/wiki/ECMAScript)。
> 是不是有点奇怪，为啥没有ES4呢，因为ES4夭折了~~据说是BE大佬步子迈太大，组织上没同意，想简单了解下的童鞋可以看下知乎上[尤大](https://www.zhihu.com/question/24715618)的回答

## JavaScript 语言特性

### 弱类型

JavaScript使用`var`、`let`、`const`关键字来进行变量声明，除了`const`声明一个只读常量外，其他两种方式并不确定变量的类型：

```javascript
var a=1
a={
    name:'jack'
}
a='lucy'
```
在Java强类型语言中必须这么写：
```java
int a;
String b;
```

优点：
1. 可以写出非常简洁的代码。

缺点：
1. 写法随意，在没有良好编程规范的情况下写出来的可能是个雷区；
2. 无法预检查。例如下面的函数，期望是数值，传入数值型字符串不会报错，返回的不是预期值从而导致bug：
    ```javascript
    function add(a,b){
        return a+b;
    }
    //期望，return 3
    add(1,2)
    //bug，return '12'
    add('1',2)
    ```

弱类型的缺点容易导致bug，降低开发效率。开发建议：
1. 变量声明表意清楚唯一；
2. 写好JSDoc文档，函数的参数要求、返回值;
3. 使用TypeScript等严格超集 [阮一峰——强类型 JavaScript 的解决方案](http://www.ruanyifeng.com/blog/2015/02/strong-typing-javascript.html)。
   
### 对象属性任意扩展
强类型语言 对象结构在声明时已经确定好，添加字段需要修改声明，JavaScript 的对象声明简单，扩展容易，写起来更轻松自由。
```javascript
var cat={};
cat.name='mimi';
cat.age=1;
```

优点：
1. 写起来方便；
```javascript
var list=[];
$.ajax({
    ...
    onSuccess(res){
        list=res.data;
    }
})
```

缺点：
1. 不方便管理，使用不安全。

开发建议：
1. 关键字段在声明时定义清楚；
2. 不随意增删对象属性。


### 支持面向对象编程
JavaScript中一切都是对象。
```javascript
// '1'
1['toString']()
```
而且对象的继承实现简单：
* [Javascript面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)
* [Javascript面向对象编程（二）：构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
* [Javascript面向对象编程（三）：非构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)

开发建议：
1. 方式有很多种、使用prototype模式或者其他浅显易懂的方式来实现：
```javascript
　　function Cat(name,color){
　　　　this.name = name;
　　　　this.color = color;
　　}

　　Cat.prototype.type = "猫科动物";
　　Cat.prototype.eat = function(){alert("吃老鼠")};
```

### 支持函数式编程
安利一个系列[JavaScript 函数式编程（一）——佯真愚](https://juejin.im/post/5b7014d5518825612d6441f8)

## 总结
* JavaScript写法没有那么多的约束，入门简单；
* JavaScript灵活支持多种开发范式，能够适应多种开发要求。
软件开发是给工程性的活动，需要遵循原则，保障代码易用性，可阅读性。合理的利用JavaScript的特性，通过约束和规范高效的进行软件开发。


## 参考链接

MDN：[A re-introduction to JavaScript (JS tutorial)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
阮一峰老师：[Javascript诞生记](http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html)
云栖社区：[《JavaScript核心概念及实践》——1.2 JavaScript语言特性](https://yq.aliyun.com/articles/97475/)
维基百科：[JavaScript](https://zh.wikipedia.org/wiki/JavaScript)、[ECMAScript](https://zh.wikipedia.org/wiki/ECMAScript)