## 设置状态栏颜色

```js
fy_bridge_app.setAppBarColor('#ffffff')
```

提示：``fy_bridge_app``可以简写为``fba``，即``fba.setAppBarColor('#ffffff')``

## 播放视频或音乐

```js
fy_bridge_app.playVideo(url)
```

## 播放多集视频或音乐

```js
fy_bridge_app.playVideos(JSON.stringify([{"title":"测试","url":"http://111.40.205.87/PLTV/88888888/224/3221225710/index.m3u8","use":true}]))
```

属性``use``为``true``代表是正在播放的，因为可能传的是完整的，但是正在播放不是第一个视频，那么支持上一集

如果需要动态解析``lazyRule``的功能，那么还需要传属性``codeAndHeader:";get"``，和``originalUrl``属性，``originalUrl``为带动态解析规则的完整地址，``use``为``true``的那个视频必须设置``url``属性

即需要立即播放的需要在调用播放器前自行解出播放地址，然后别的视频不需要立即解出，传带动态解析规则的``originalUrl``属性即可

‘‘注意参数是字符串’’

## 显示图片

```js
fy_bridge_app.showPic(url)
```

## 设置网页标题

```js
fy_bridge_app.setWebTitle(title)
```

## 设置网页UA

```js
fy_bridge_app.setWebUa(ua)
```

::: info 说明：
UA仅当前域名生效
:::

## 导入规则口令

```js
fy_bridge_app.importRule('rule')
```

::: info 说明：
口令为软件能够识别的口令，无法识别的无效
:::

## 写入文件

```js
fy_bridge_app.writeFile(String filePath, String content)
```

::: info 说明：
filePath可以为hiker://files/a.txt或者文件绝对路径，hiker://files/a.txt等效为软件根路径下的Documents文件夹下的a.txt
:::

## 同步请求（支持本地文件）

```js
request(url, {headers:{},body:'',method:'POST'})
```

::: info 说明：
第二个参数可以为空，即``request(url)``，返回格式为字符串，获取``header``和状态码的使用方法同JS里面发起请求
:::

url支持``hiker://files/a.txt``，或``file://``开头的绝对文件路径，但是文件必须在软件可读路径内，否则无法读取

注意事项：需要页面加载完成才能使用该方法（避免宿主页面中也定义了该方法），如果要立即使用可以用``request00``

``javascript:``模式下使用见后文

## 异步请求（支持本地文件）

```js
requestAsync(url, param, key, callback)
```

::: info 说明：
第二个参数和``request``方法的第二个参数一样，``key``为标识符，方便``callback``里面区分请求，``callback``为两个参数的方法，即请求成功后会调用``callback(key, result)``
:::

``key``可以不传，即``requestAsync(url, param, callback)``，那么``key=url``

``param``可以不传，即``requestAsync(url, callback)``，此时``key=url``

``url``支持``hiker://files/a.txt``，或``file://``开头的绝对文件路径，但是文件必须在软件可读路径内，否则无法读取

``javascript:``模式下使用见后文

## 存储全局变量

```js
fba.putVar('key', 'value')
```

::: info 说明：
两个参数都是字符串，可以在不同网页之间共享，变量只在软件本次运行时间内有效，重启后失效，永久存储请参考写入文件和同步请求
:::

并且首页、搜索引擎等规则里面，用js也能读写到，和规则的js里面用法一致

## 读取全局变量

```js
fba.getVar('key')
```

::: info 说明：
可以在不同网页之间共享，变量只在软件本次运行时间内有效，重启后失效，永久存储请参考写入文件和同步请求
:::

并且首页、搜索引擎等规则里面，用js也能读写到，规则的js里面用法为``getVar('key')``，和网页里面一致

## 清除全局变量

```js
fba.clearVar('key')
```

## 编解码增强

支持JS和插件调用``CryptoJS``功能，JS规则里面，先``eval(getCryptoJS())``然后再使用``CryptoJS.enc.Utf8.parse(word)``等语法，插件里面同样需要``eval(request('hiker://files/aes.js'))``

## 读取网站Cookie

```js
fy_bridge_app.getCookie('http://a.com/')

// 获取当前网页的cookie：
fy_bridge_app.getCookie('')
```


::: info 说明：
获取的地址的域名必须和当前网页域名一致，如果不一致会报错。即使网页使用了``http-only``也能获取到cookie
:::

## 刷新二级页面

```js
fy_bridge_app.refreshPage(true)
```
和JS里面使用``refreshPage``类似

::: warning 注意：
只能在X5WebView组件里面使用
:::

## javascript:模式下使用

``javascript:``模式下因为浏览器内核的问题，无法使用``request``等视界封装好的方法，可以先执行``eval(fy_bridge_app.getInternalJs())``

然后就能调用``request``和``requestAsync``等方法

## 解析网页Dom元素parseDomForHtml、parseDomForArray

```js
fy_bridge_app.parseDomForHtml(html, rule)
```

用法和JS里面一样，见JS指南，不过``parseDomForArray``返回是一个数组字符串，需要自己用``JSON.parse``才能变成数组

## 刷新X5链接或者内容

```js
fy_bridge_app.refreshX5Desc('float&&255')
```
该方法只会刷新高度等信息，不会刷新网页

## 保存图片到相册

```js
fy_bridge_app.saveImage('http://x.com/1.png||http://x.com/2.png','hiker://files/1.png')
```
会先下载1.png,如果下载失败会尝试下载第二个图片地址

## 网页跳转二级详情页面（视界原生界面，已废弃）

```java
fy_bridge_app.toDetailPage(String title, String url, String group, String colType, String detailFindRule, String preRule)
```

``detailFindRule``如何优雅实现？
```js
var detailRule = 'js:' + $$$.toString((obj)=>{
  //你的代码
}, obj)
```
原理就是把写的方法生成为字符串，注意你的代码里面不要用到外部变量，如要用到需要通过obj参数传进去

和“二级列表”说明里面的``$().rule()``类似，具体看“二级列表”里面的深层嵌套秘籍（如果javascript:模式下使用须先执行``eval(fy_bridge_app.getInternalJs())）``

url参数支持``hiker://page/xxx``格式即子页面链接，后面的group等参数传空字符串，同时url参数必须携带参数``rule=xxx``，即哪个规则的子页面

## 网页跳转二级详情页面（视界原生界面）

```js
fba.open(JSON.stringify({rule: "规则名称", title: "页面标题", url: "链接", group: "", col_type: "", findRule: "", preRule: "", extra: {}}))
```

url参数支持``hiker://page/xxx``格式即子页面链接，后面的group等参数传空字符串，同时url参数必须携带参数``rule=xxx``，即哪个规则的子页面

注意open方法参数为一个对象的字符串，不是对象

## X5打开新页面

::: info 说明：
因为X5里面不能返回，一按返回键整个界面就销毁了，因此网页里面打开新页面之后如果还是在当前界面就无法返回，可以在网页里面使a标签点击事件改为下面的方式，即用视界新开一个页面来加载链接
:::

重要提示：非特殊场景没必要用此方法，主要考虑是否有必要按返回键回之前的网页

```js
fy_bridge_app.newPage(String title, String url)
```

## 解析动态解析规则

```js
var url = fy_bridge_app.parseLazyRule('http://x.com@lazyRule=.js:input')
```

动态解析规则只支持.js:格式，不支持形如``http://x.com@lazyRule=body&&a&&href``的格式

::: warning 注意：
该方法会阻塞整个页面，如果在页面加载中就执行该方法，会导致所有资源的加载阻塞，该方法执行完才会继续加载
:::

## 异步解析动态解析规则

```js
fy_bridge_app.parseLazyRuleAsync('http://x.com@lazyRule=.js:input', $$$.toString(()=>console.log(input)))
```

动态解析规则只支持.js:格式，不支持形如``http://x.com@lazyRule=body&&a&&href``的格式

第一个参数为链接，和parseLazyRule一样，第二个参数为回调方法，不过得写成字符串，原理是视界后台异步解析，解析完赋予结果为input变量，然后eval传的第二个参数

## 解析云剪贴板

```js
var content = fba.parsePaste('http://x.com')
```

## 获取带header的视频地址

```js
var videoUrl = fba.getHeaderUrl('http://x.com/111.m3u8')
```
参数必须是使用``_getUrls()``加载过的链接，返回地址会自动加上请求时的header信息

如``http://x.com/111.m3u8;{Cookie@xxx&&Referer=xxx}``

可用于``x5Rule``、``webRule``和X5组件

## 获取请求时携带的header

```js
var headers = getRequestHeaders('http://x.com/111.m3u8')
```
参数必须是使用``_getUrls()``加载过的链接

返回对象示例
```json
{
  "Cookie": "xxx",
  "Referer": "xxx"
}
```

可用于x5Rule、webRule和X5组件

## 获取当前网页UA

```js
var ua = fba.getUa()
```

## 唤起第三方APP软件处理链接

```js
fy_bridge_app.openThirdApp('legado://xxxxx')
```

## 移除M3U8广告片段

```js
let url = fy_bridge_app.clearM3u8Ad('http://1.com/1.m3u8');
```

::: info 说明：
使用和小程序JS引擎环境中的clearM3u8Ad方法类似，只是这里没有第二个参数，第二个参数会自动根据网页环境提取header
:::

