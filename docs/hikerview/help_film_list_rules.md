## 规则说明

::: info 说明：
二级列表就是首页或者搜索引擎的结果，点击后可以根据二级列表规则解析页面，二级列表页面形似首页频道，除了没有顶部的分类，其余和首页频道没有区别
:::

::: warning 不同点：
二级列表页规则和小程序规则类似，即列表;标题;图片;描述;链接，但是可以嵌套，可以设置col_type（显示样式）
:::

::: tip 显示样式：
即列表;标题;图片;描述;链接;显示样式，显示样式可以没有，如果没有显示样式则从上一级继承
:::

## 深层嵌套

### 嵌套使用：
列表;标题;图片;描述;链接;显示样式==>列表;标题;图片;描述;链接;显示样式==>列表;标题;图片;描述;链接;显示样式

### 链接继承：
即二级列表需要直接使用上一级的链接，那么链接的位置直接写\*即可，注意不能为空，需要用\*

### 点击位置：
即二级列表的规则需要根据不同点击位置，来使用不同的规则，用fyIndex占位符，实际解析的时候会自动将fyIndex替换为点击的位置

```txt
body&&.stui-pannel__head&&li;a&&Text;*;*;*==>body&&.stui-content__playlist,fyIndex&&li;a&&Text;*;*;a&&href;text_3
```

### JS解析的嵌套：
如果完全用js来解析规则，即二级列表规则为js:开头的，只要将链接后面加上``@rule=列表;标题;图片;描述;链接;``显示样式即可，如果二级列表里面还是用JS来解析，同样链接加上``@rule=js:规则``

###  JS解析的深层嵌套：
视界支持深层嵌套，即链接里面支持多个@rule=

## 动态解析

即点击二级列表或者首页列表结果时，根据规则再次解析链接，获取真正要用网页访问的链接

```txt
body&&.stui-content__playlist,fyIndex&&li;a&&Text;*;*;a&&href.js:input+'@lazyRule=body＆＆＆＆a＆＆＆＆href'
```

纯JS示例
```txt
body&&.stui-content__playlist,fyIndex&&li;a&&Text;*;*;a&&href.js:input+'@lazyRule=.js:input'
```

即链接后面加上``@lazyRule=body＆＆＆＆a＆＆＆＆href``（``&&``要用中文``＆＆＆＆``来代替），那么点击结果时就会请求链接然后用规则去解析获取真正的链接，然后视界再对真正的链接进行处理，比如检测为视频或者音乐则直接播放，检测为图片直接大图显示，否则用网页查看

不显示弹窗``#noLoading#``：``a&&href.js:input+'#noLoading#@lazyRule=.js:input'``，该标识识别完会自动清除，不会影响访问和代码执行

## 搜索规则的二级列表规则

如果搜索规则的二级列表规则和首页频道的二级规则完全一样，可以直接在搜索的二级列表规则写上*，那么解析时就会用首页的二级列表规则

## 动态解析和深层嵌套秘籍

如果是纯JS规则的深层嵌套和动态解析非常麻烦，因为三级四级规则都要写在一个字符串里面，换行书写和查看异常难受，因此LoyDglk大佬提供了一个方便书写动态解析和深层嵌套的方法

动态解析示例
```js
d.push({url:$('url').lazyRule(() => setError(input))})
// 最后生成 d.push({url:'url@lazyRule=.js:setError(input)'})
```

动态解析普通规则示例
```js
d.push({url:$('url','iframe&&src').lazyRule(() => setError(input))})
// 最后生成 d.push({url:'url@lazyRule=iframe&&src.js:setError(input)'})
```

动态解析参数传递示例
```js
$(parseDom(key, "a&&href")).lazyRule((obj) => {
  setError(obj.word);
  var html = fetch(input);
}, { word: "23eeee" })
```

深层嵌套示例
```js
d.push({url:$('url').rule(() => setError(input))})
// 最后生成 d.push({url:'url@rule=js:setError(input)'})
```

深层嵌套多级嵌套示例
```js
d.push({url:$('url').rule(() => $('url2').rule(() => setError(input)))})
// 一级生成 d.push({url:'url@rule=js:$('url2').rule(() => setError(input))
// 下一级生成 url2@rule=js:setError(input)'})
```

参数传递和普通规则都一样，即第一层方法第一个参数为链接，第二个参数为普通规则，第二层方法第一个参数为函数，第二个参数为函数的参数，目的是将当前的变量值传递到下一个页面读取

调用x5的弹窗：使用时必须有一个x5组件
```js
$("https://m.baidu.com").x5Rule(() => {
    alert("哈哈哈链接是"+input)
})
```

实际生成的是```(function(){})()``立即执行函数的形式，以上例子为了方便看就简化了

## $更多用法

基础用法见上一个“动态解析和深层嵌套秘籍”，下面只介绍更多用法

弹出输入框```$(default,hint).input(function)``方法, 如``$("小棉袄666","小棉袄是真的帅").input(() => "toast://"+input)``

弹出确认框``$(hint).confirm()``, 如``$("小棉袄是真的帅").confirm(()=>"toast://你说的很对")``

## 子页面

子页面其实类似二级页面，只是界面上做了优化，方便管理和查看

子页面标识形如index.html，那么如果一个按钮点击后要跳转此页面，就可以把此按钮链接url的值设置为``hiker://page/index.html``

参数传递：一种是通过url链接里面携带参数，示例
```txt
hiker://page/index.html?type=mp4&source=http://www.baidu.com
那么在index.html里面可以通过getParam方法来获取里面的type和source参数的值，具体可以搜索getParam查看其使用方法
```

参数传递：第二种是将参数对象，放到跳转子页面按钮项的``extra``字段，然后在子页面使用``MY_PARAMS``对象获取，如``extra:{key:'1'}``，然后子页面：``log(MY_PARAMS.key)``，注意一个参数也要用对象不能光字符串

进入此子页面的链接默认为原始链接``hiker://page/xxxx``，如果要进入子页面加载别的链接，那么可以把进入链接设置为``hiker://page/index.html?type=mp4&url=http://www.baidu.com``

那么进入该子页面时加载的链接就是url参数的值，如果url值包含``?``、``&``等冲突字符，可以使用两个中文``？``代替一个英文``?``，两个中文``＆``代替一个英文``&``

如果要使用别的小程序的子页面，可以加上一个``rule``参数，如``hiker://page/index?rule=xxx``，那么视界会自动找叫``xxx``的小程序，然后进入其子页面标识为``index``的页面

``extra``传递参数支持``url``属性，进入子页面时加载的链接即变成``ur``l属性的值

