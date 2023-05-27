## $.hiker
:::tip
海阔顶层作用域,你可以在局部作用域中快速访问全局属性。
:::

```js
var a1 = 1;
const a2 = 2;
let a3 = 3;
(function () {
  var a1 = 10;
  const a2 = 20;
  let a3 = 30;
  log(a1);	//10
  log(a2);	//20
  log(a3);	//30
  log($.hiker.a1);	//1
  log($.hiker.a2);	//2
  log($.hiker.a3);	//'undefined'
})()
```

:::tip 说明
1. 不知道是不是海阔的特性，使用var或者const定义变量时会定义在全局作用域，而使用let定义变量时则不会。
2. 此功能适用范围很小，除极个别情况一般不会也不应使用。
:::

## $.exports
:::tip
导出模块，默认值{}，需要配合$.require()使用。
:::

::: code-group
```js [hiker://page/test(子页面)]
if ($.importParam === 1) {//用法1
    $.exports.tips = "hello";
    $.exports.setLog = text=>log(text);
} else if ($.importParam === 2) {//用法2
    $.exports = ()=>log("hello2");
}
```
```js [引用环境]
//用法1
const mylog = $.require("hiker://page/test", 1);
mylog.setLog(mylog.tips);	//"hello"

//用法1(解构赋值)
const { tips, setLog } = $.require("hiker://page/test", 1);
setLog(tips); //'hello'

//用法2
const mylog = $.require("hiker://page/test", 2);
mylog()	//"hello2"
```
::: 