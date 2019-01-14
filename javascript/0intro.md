# JavaScript 简介

> 一般来说，完整的JavaScript包括以下几个部分：
> * ECMAScript，描述了该语言的语法和基本对象；
> * 文档对象模型（DOM），描述处理网页内容的方法和接口；
> * 浏览器对象模型（BOM），描述与浏览器进行交互的方法和接口。
>
> 本文（系列）主要探讨ECMAScript的特性以及使用，因为平时交流习惯用JavaScript，后面都用JavaScript代替，实际上JavaScript是ECMAScript标准的实现和扩展。

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
  * 对象任意扩展；
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

> 多了个年份的叫法，不查资料都搞不清哪来这么多标准。更多请查阅[ecma-262](http://www.ecma-international.org/ecma-262/) 或者[维基百科-ECMAScript](https://zh.wikipedia.org/wiki/ECMAScript)

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
1. 写法随意，在没有良好编程规范的情况下写出来的可能是个雷区，维护困难。
2. 无法预检查。例如下面的函数，期望是数值，传入数值型字符串不会报错，返回的不是预期值从而导致bug：
    ```javascript
    function add(a,b){
        return a+b;
    }
    //期望，return 3
    add(1,2)
    //可能，return '12'
    add('1',2)
    ```

构建大型项目时，弱类型的缺点容易导致bug，调试又要花费很多时间，F5刷来刷去~。

   



## 参考链接

MDN：[A re-introduction to JavaScript (JS tutorial)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
阮一峰老师：[Javascript诞生记](http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html)
云栖社区：[《JavaScript核心概念及实践》——1.2 JavaScript语言特性](https://yq.aliyun.com/articles/97475/)
维基百科：[JavaScript](https://zh.wikipedia.org/wiki/JavaScript)、[ECMAScript](https://zh.wikipedia.org/wiki/ECMAScript)