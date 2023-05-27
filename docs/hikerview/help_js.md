## JS里面编解码

::: info 说明：
JS处理规则支持base64和utf-8、gbk、gb2312编解码以及AES和RSA加解密
:::

示例
```js
base64Encode(input)
base64Decode(input)
aesDecode('key', input)
aesEncode('key', input)
```

示例
```js
decodeStr(input, 'UTF-8')
encodeStr(input, 'GBK')
```

示例
```js
rsaEncrypt(data, 'key', options)
rsaDecrypt(encryptBase64Data, 'key', options)
```
::: tip 解释：

1. ``options``是加密的额外选项（可选参数），包含加密配置、类型、分段长度等，都是可选的，默认值：``{config: "RSA/ECB/PKCS1Padding",type:1, long: 1, block: true}``
   ，``long`` 加密方式，``1`` 普通，``2`` 分段（可选，默认 ``1``），``block`` 分段长度，``false`` 固定``117``，``true`` 自动（可选，默认 ``true`` ）
2. ``rsaEncrypt``: ``type``为``1``时``key``填公钥，``type``为``2``则``key``填私钥
   ``rsaDecrypt``: 与``rsaEncrypt``相反，``type``为``1``时``key``填私钥，``type``为``2``则``key``填公钥
:::

::: tip 注意：
使用``fetch``发起请求不能直接使用该方法对请求后的内容进行解码，因为``fetch``返回的内容默认会用``UTF-8``解码，如果``response``本身不是``UTF-8``那么就已经乱码了，再次解码不能达到想要的结果，``fetch``使用方法请看后面“``JS``里面发起请求”
:::

## JS里面编解码增强

支持``JS``和插件调用``CryptoJS``功能，``JS``规则里面，先``eval(getCryptoJS())``然后再使用``CryptoJS.enc.Utf8.parse(word)``等语法，插件里面同样需要``eval(request('hiker://files/aes.js'))``

## JS里面常用方法

使用规则解析，示例
```js
parseDom('<html><body><a href='/'></body></html>', 'body&&a&&href')
// 缩写：pd，还可以传第三个参数，默认为MY_URL，也就是自动补全链接用到的地址
```

使用规则解析获取网页内容，``parseDomForHtml``（缩写：``pdfh``），和``parseDom``功能一致，但是``parseDomForHtml``不会对结果智能处理自动加上域名和``http``前缀，完全返回解析到的内容

使用规则解析获取网页内容，``parseDomForArray``（缩写：``pdfa``），和``parseDomForHtml``功能类似，``parseDomForHtml``是获取一个块的内容，而``parseDomForArray``是获取列表，返回一个数组对象，示例

```js
parseDomForArray('<body><a href='/'><a href='/'></body>', 'body&&li')
// 那么返回['<a href='/'>', '<a href='/'>']
```

获取当前规则，示例
```js
getRule()
```

获取当前网络请求地址，示例
```js
setError(MY_URL)
// 将会打印出当前网络请求地址，即MY_URL是一个变量，在执行JS前会注入进去，旧版使用getUrl()方法获取，但是可能不是特别准确
```

显示内容到界面上或者输出错误信息，示例
```js
setError(getRule())
// （缩写：error）
```

写入文件（后面会废弃，请用后面的saveFile和readFile，当前接口不支持写files目录）writeFile(String filePath, String content)，filePath可以为hiker://files/a.txt或者文件绝对路径，hiker://files/a.txt等效为软件根路径下的Documents文件夹下的a.txt，注意只有hiker://files/rules目录下的文件才会被备份和恢复备份，所以重要文件可放到rules目录，不重要的文件没必要放此目录。如果是私密内容请用setItem

存储和读取全局变量，示例
```js
putVar('name', '张三');setError(getVar('name'))
// 获取不到就返回默认值：
getVar("key","default")
// 该变量和插件里面的全局变量是一致的，重启软件后失效，如需长期有效，见文件存取
```

存储和读取规则内全局变量，示例
```js
putMyVar('name', '张三');
setError(getMyVar('name', 'defaultValue'))
// 用法同上，不同点仅同一个规则能读写，清除变量：
clearMyVar('name')
// 列出所有key：listMyVarKeys()
```

全局变量接口优化：新增``storage0``对象来支持存储``JSON``对象，如``storage0.putMyVar('a', {a: 1})``，``storage0.getMyVar('a')``，同理还有``storage0.putVar``、``storage0.getVar``、``storage0.setItem``、``storage0.getItem``

清除全局变量，示例
```js
clearVar('name')
```

## JS里面发起请求

示例
```js
fetch('http://www.a.cn')
fetch('http://www.a.cn', {body: 'a=b&c=d',method:'POST'})
```

完整示例
```js
fetch('http://www.a.cn', {headers:{'content-type':'application/json'},body:{},method:'POST'})
```

POST示例
```js
post('http://www.a.cn', {body:{a:'xx', b: 1}})
// 软件会自动将body转成a=xx&b=1
```

JSON示例
```js
fetch('http://www.a.cn', {body:{a:'xx', b: 1}})
// 软件会自动加application/json的Content-Type
```

### 编码问题：
``fetch('http://www.a.cn', {headers:{'content-type':'application/json; charset=GBK'},body:{"a":"b"},
method:'POST'})``那么解析返回内容时时会使用GBK来解码，``content-type``里面没有设置``charset``默认使用``UTF-8``

### 如何获取返回的``header``：
``fetch('http://www.a.cn', {headers:{},body:'a=1&b=2',method:'POST',withHeaders:true})``，那么返回的内容为'``{body:'字符串内容',headers:{'Set-Cookie':['a=b','b=c']}}``'，即返回的是个``json``字符串，注意是字符串，``header``里面每个``key``对应一个``array``

### 如何获取返回的状态码：
``fetch('http://www.a.cn', {withStatusCode:true})``，那么返回的内容为'``{body:'字符串内容',headers:{},statusCode:200}``'

### 支持链接为
``hiker://files/a.txt``的形式

### 如何禁止重定向：
``fetch('http://www.a.cn', {redirect:false})``

### 使用电脑端UA：
``fetchPC``代替``fetch``，``postPC``代替``post``，其余使用方法和``fetch/post``完全一致

### 设置超时时间：
``fetch('http://www.a.cn', {timeout:5000})``，单位为毫秒，默认10秒超时

### 如何引用UA：
``fetch('http://www.a.cn', {headers:{"User-Agent":MOBILE_UA}})``，``fetch('http://www.a.cn', {headers:{"User-Agent":PC_UA}})``，当然也可以自定义

### byte[]转16进制：
``fetch('http://www.a.cn', {toHex:true})``

### GET请求拼接参数：
``fetch(buildUrl('http://www.a.cn', {a:'b', c: 'd'}))``

### 只获取header不获取body：
``fetch('http://www.a.cn', {onlyHeaders:true})``

### 获取InputStream：
```js
let stream = fetch(url, {inputStream: true});
try { 
    //执行逻辑 
} catch(e){} 
closeMe(stream);
// 记住用完一定要关闭！ 
```


### 自定义DNS：
```js
let html = fetch(url, { dns: 'https://dns.alidns.com/dns-query' })
// dns属性可以是DNS-over-HTTPS地址，也可以是多个用空格隔开的IP地址，也可以使用registerDNS方法批量注册
```

## 自定义DNS

``registerDNS({ 'www.themoviedb.org': '1.1.1.1 2.2.2.2' })``，多个IP地址用空格隔开

也可以使用``DNS-over-HTTPS``地址，如``registerDNS({ 'www.themoviedb.org': 'https://dns.alidns.com/dns-query' })``

支持半匹配，比如所有``themoviedb.org``域名的包含``www``和``image``子域名：``registerDNS({ '.themoviedb.org': '1.1.1.1' })``

可一次性注册多个：``registerDNS({ 'b.com': '1.1.1.1', 'a.com': '2.2.2.2' })``

注意注册一次会全局生效，且该操作需要用户同意授权，否则执行无效果（第一次调用此方法，软件会自动弹出授权申请）

## ipping，获得可用IP地址

示例
```js
let ok = ipping('1.1.1.1', 2000)
// 第一个参数为IP地址，第二个参数为超时毫秒数，默认3000可不传
```

批量检测：``let ip = findReachableIP(['1.1.1.1', '2.2.2.2'], 2000);``软件会多线程批量检测，找到一个即返回，第二个参数为单个检测超时毫秒数

可以配合``registerDNS``使用，如``let ip = findReachableIP(['1.1.1.1', '2.2.2.2']); registerDNS({'a.com': ip})``

## JS里面发起请求类似ajax

和ajax差远了，只是封装方便调用

示例
```js
http.fetch('http://a.com/1.json', {}).headers({'X-Req-X', 'test'}).success(data=>{log(data.code)}).error(msg=>log(msg)).start()
```

连续发起请求：``http.fetch('http://a.com').success(data=>{log(data)}).start().fetch('http://b.com').success(data=>{log(data)}).start()``

如果返回数据为``json``会自动使用``JSON.parse``转成对象，即``success``的``data``为对象，如果使用了``withHeaders``则``data.body``为``response``对象

同时也支持``post``、``request``等方法，只是改成了``http.post``、``http.request``

## JS里面发起批量请求

示例
```js
var data = batchFetch(
    [
        {url:'http://www.a.cn', options:{headers:{},body:'a=1&b=2',method:'POST'}},
        {url:'http://www.b.cn'}
    ]
);
setError(data[0] + '=====' + data[1]);
```

缩写：bf

::: info 说明：
参数为一个数组，数组每一项是一个对象，每个对象包含``url``和``options``属性，分别对应``fetch``方法的第一二个参数，返回一个字符串数组对象，注意是对象，顺序和参数顺序严格一致
:::

::: warning 注意：
数组参数长度超过16时，会自动分批，同步循环执行，比如20个参数，那么会先16个并发请求，请求完再发起4个并发请求，最后再返回结果
:::

## JS里面获取Cookie

示例
```js
fetchCookie('http://www.a.cn', {headers:{'content-type':'application/json'},body:'a=1&b=2',method:'POST'})
```

和``fetch``方法类似，返回的是数组的json字符串，如``['a=b','c=d']``，注意是字符串，该方法适合单独获取``cookie``的情况，如果需要同时获取响应内容，请用``fetch``方法，``withHeaders:true``，详情请看上一条

## JS里面刷新页面

``refreshPage()``，可以和动态解析、``toast://``结合，比如``@lazyRule=.js:putVar('settingMode', '1')；；refreshPage()；；'toast://已设置为简洁模式'``

即可以用``js``执行一些操作，然后想要立即生效，那就刷新页面，返回'``toast://已设置为简洁模式``'来提示用户

如何刷新页面不滚动到顶部？``refreshPage(false)``，默认会自动滚动到顶部

## JS预处理

方便规则快速获取``cookie``，在执行首页解析规则和搜索解析规则前都会执行一遍再执行对应规则，注意必须是JS代码，无需js:开头，该代码里面可以使用变量MY_RULE来获取当前规则，注意该变量是一个对象，比如用``MY_RULE.find_rule``来获取解析规则

## 解析规则增强

::: info 说明：
可以全部用js来代替首页频道解析规则，或者搜索解析规则，那么规则以js:开头
:::

示例
```js
var s = getResCode();
var json = {};
eval('json=' + s);
var next = json.nextPageUrl;
var s2 = fetch(next,{});
var j2 = {};
eval('j2=' + s2);
for(var i = 0; i < j2.itemList.length; i++){
    json.itemList.push(j2.itemList[i]);
}

var d=[];
for(var i = 0; i < json.itemList.length; i++) {
    var j = json.itemList[i];
    if (j.type != "followCard") continue;
    
    var r = {};
    r.pic_url = j.data.content.data.cover.feed;
    r.title = j.data.content.data.title;
    r.desc = j.data.header.description;
    r.url = 'https://www.kaiyanapp.com/detail.html?vid=' + j.data.header.id + '&utm_source=eyepetizer-homepage&utm_medium=internal&utm_campaign=routine';
    d.push(r);
}
setHomeResult(d);
```

::: info 说明：
``setHomeResult``返回内容为数组对象，格式为``[{title:'标题',pic_url:'图片',desc:'描述',url:'链接'}]``，（最新版也可以用``img``表示图片地址）
:::

::: info 说明：
``setSearchResult``返回内容为数组对象，格式为``[{title:'标题',img:'图片',desc:'描述', content:'详情', url:'链接'}]``，（最新版也可以用``pic_url``表示图片地址）
:::

::: info 说明：
``setHomeResult``返回首页结果，``setSearchResult``返回搜索结果，``setError('111')``返回报错信息（可用来调试），更多用法请参考现有规则
:::

::: info 说明：
``setHomeResult``和set``SearchResult``支持混用，两者效果和``setResult``一致，软件会自动识别回调类型
:::

## 参数/header用JS处理

::: info 说明：
每一个``url``参数和``header``值都可以用js处理，比如生成时间戳，``header``里面的也可以，注意只能对值（``value``）进行处理，不能对键（``key``）用js处理
:::

示例
```txt
http://www.google.com?q=**.js:decodeStr(input,'GBK');POST;gbk;{User-Agent@Windows&&Timestamp@.js:new Date().getTime()}
```

::: info 示例说明
网页内容会被GBK编码显示，但是url使用utf-8编码（默认会同样被GBK编码，``.js:decodeStr(input,'GBK')``会再把关键词解码，然后真正请求时会默认使用UTF-8编码）
:::

## url链接用JS处理

::: info 说明：
之前有url参数js处理，这次还可以对链接本身js处理，如``http://a.com.js:input+'/'?a=b.js:input+'a'``
:::

## 本地文件下载

::: info 说明：
因为有部分网址播放到一半会无法继续播放，然后就有大佬直接将m3u8文件缓存到本地，然后播放，但是本地m3u8不支持下载，因此可以在本地地址后面加上?url=原地址，这样视界下载前会解析后面的地址，但是不保证这样处理后能正确下载（毕竟都不能正确播放）
:::

## 关闭页面并刷新前一个页面

``back()`` 或 ``back(true)`` 关闭页面并刷新前一个页面，``back(false)`` 只关闭页面

::: tip 注意：
该函数限制只能在二级页面使用，一级页面已屏蔽该函数调用
:::

## 获取我的规则订阅

``var subscribeRecords = getHomeSub();``

返回一个数组，获取标题：``subscribeRecords[0].title``，获取订阅地址：``subscribeRecords[0].url``

判断是否已经订阅某个地址：``var hasSub = hasHomeSub('http://1.com')``

## 刷新X5链接或者内容

``refreshX5WebView('http://1.com')``

``refreshX5Desc('float&&255')``，该方法只会刷新高度等信息，不会刷新网页

## 获取常用历史规则

``getLastRules(count)``，比如``getLastRules(12)``

## 获取小程序数量

``getRuleCount()``，注意返回的是字符串

## 复制文本信息到剪贴板

``copy('text')``，禁止频繁调用，正常使用``copy://text``的路由放在链接里面即可

## 获取所有可选首页样式

``getColTypes()``，返回一个字符串数组

## 图片保存

保存图片：``saveImage('http://x.com/1.png||http://x.com/2.png','hiker://files/1.png')``，会先下载1.png,如果下载失败会尝试下载第二个图片地址，检测图片是否存在: ``fileExist('hiker://files/1.png')``

## 检测文件是否存在

检测文件是否存在: ``fileExist('hiker://files/1.png')``

## 修改页面标题

默认软件会以当前页面标题加按钮``title``属性作为下一页的标题，如果希望定制下一页页面标题，可以在按钮的``extra``使用``pageTitle``属性，如：``{extra: {pageTitle: 'xxx简介'}}``

子页面定制页面标题：子页面可以在链接中使用pageTitle参数作为页面标题，如：```{url: 'hiker://page/xx?pageTitle=简介'}```，适用于``lazyRule``同时返回子页面地址和标题

不继承页面标题（默认当前页面标题加按钮title）：``{extra: {inheritTitle: false}}``，可用于不单独定制``pageTitle``，但又不希望使用当前页面标题

新页面代码里面动态修改：``setPageTitle('主页')``

获取当前页面标题：``let t = getPageTitle();``

## 修改页面图片地址

``setPagePicUrl('http://xxx.jpg')``

## 修改页面附加参数

``setPageParams({a: '1'});``

## 二级列表动态设置最新章节规则

``setLastChapterRule('最新章节规则')``

::: warning 注意：
传入的参数是个字符串，支持 js
:::

::: tip 使用技巧：
js 写法可配合 ``$.toString(()=>{ setResult('我是最新章节') })`` 进行规则编写
:::

::: tip 示例：
1. 普通写法：
   ``setLastChapterRule('.myui-content__list&&a&&Text')``
2. js 写法：
   ``setLastChapterRule('js:' + $.toString(()=>{ setResult('我是最新章节') }))``
:::

::: warning 注：
js 写法不可以将选集列表进行传参，只能在 $.toString 里重新获取，否则会导致收藏永远无法获取最新章节！！！
:::
## 记录日志

``log({key:'value'}})``，只支持一个参数，参数类型可以为字符串、对象、数组等

## 获取页面链接(MY_URL)里面的参数

``getParam('key', 'defaultValue')``，如``MY_URL``为``http://1.com?type=mp4``，那么``getParam('type', 'mp3')``的值为``mp4``

## 获取子页面的内容

``request('hiker://page/detail')``，返回对象字符串，'``{'name':'详情','path':'detail', 'rule':'js:xxx'}``'

## 页面变成沉浸式

只要页面链接包含``#immersiveTheme#``，那么页面就会沉浸，只能用于二级和子页面，不支持首页

## $工具（LoyDglk大佬提供）

““””在线文档：<a href="https://www.yuque.com/docs/share/d1b05e3b-6168-41be-b374-e87094dab126">点击查看$工具完整使用说明</a>

``$.exports``导出模块，使用``$.require``可以获取该值，如``$.exports={data:1}``，引用的地方: ``let a = $.require(xxx).data``

``$.require``获取模块（参数(path, force)，force为true即不使用缓存），类似node.js的模块，支持文件路径``file://``和``hiker://page/xxx``格式，支持不写``hiker://page/``，直接传子页面名称

``$(url).rule(()=>{})``生成二级规则链接，最后生成格式为``url@rule=.js:(function(){})()``

``$(url).lazyRule(()=>{})``生成动态解析规则链接

``$(url).x5Rule(()=>{})``生成``javascript:``链接

``$(url).input(()=>{})``生成输入框弹窗链接

``$.toString(()=>{})``将函数转成字符串

``$(url,headers).image(function,s1,s2...)``生成图片解密链接``url@headers={}@js=(
() => {
}
)()``

## 页面生命周期监听（事件）

目前只在首页和二级页面有效，搜索结果页面无效，且传递的方法内不能引用该函数外的变量

### 监听刷新事件（下一页和切换分类不算）：
```js
addListener('onRefresh', $.toString(()=>{log('refresh')}))
```

### 监听页面关闭事件：
```js
addListener('onClose', $.toString(()=>{}))
```

## 获取应用的版本号
```js
var v = getAppVersion();
```
返回整型如1800

## 显示和隐藏Loading弹窗

```js
showLoading('加载中')

hideLoading()
```

## 显示确认弹窗

特点：不用点击即可显示，比如一进入规则执行js过程中需要立即显示弹窗，那么可以使用此方法

示例
```js
confirm({
  title:'更新提示',
  content:'检测到你的规则版本小于服务器版本，是否立即更新？',
  confirm:$.toString(() => { refreshPage() }),
  cancel:$.toString(() => { refreshPage() }),
})
```

::: info 说明：
注意该代码无法直接引用当前js内的变量和方法
:::

## 私有化存储和读取

### 存储
```js
setItem('key', 'value')
```
注意value只能是字符串

### 读取
```js
getItem('key', 'defaultValue')
```
第二个参数为找不到时的默认值

### 接口优化

新增storage0对象来支持存储JSON对象，即``storage0.setItem('a', {a: 1})``，``storage0.getItem('a')``

移除：``clearItem('key')``

::: info 说明：
如果规则删除重新导入数据也会丢失，更新规则数据不会改变。
:::

### 私有文件写入
```java
saveFile(String fileName, String content)
```
fileName形如a.txt，最终文件路径为软件根路径下的``Documents/rules/files/${规则名}/a.txt``，写入时不加密``saveFile(fileName, content, 0)``

### 私有文件读取
```java
readFile(String fileName)
```
读取未加密文件``readFile(fileName, 0)``

### 私有文件删除
```java
deleteFile(String fileName)
```

### 私有文件判断存在
```java
fileExist(String fileName)
```

私有文件存储::: info 说明：
写入和读取会自动加密和解密，规则删除时会自动删除这些文件，如果规则改名文件相当于不存在
:::

## 公开存储和读取

### 存储
```js
setPublicItem('key', 'value')
```
注意value只能是字符串

### 读取
```js
getPublicItem('key', 'defaultValue')
```
第二个参数为找不到时的默认值

接口优化：使用``storage0``对象来支持存储JSON对象，即``storage0.setPublicItem('a', {a: 1})``，``storage0.getPublicItem('a')``

### 移除
```js
clearPublicItem('key')
```

::: info 说明：
该系列接口对所有规则公开，且不会随着规则删除而删除，请勿存储私密内容
:::

## 云剪贴板

特点：使用内置接口即可快速分享、解析文本到云剪贴板

### 获取可以使用的云剪贴板
```js
var pastes = getPastes()
// 返回数组['云剪贴板1', '云剪贴板2']
```

### 分享到云剪贴板
```js
var url = sharePaste(content, paste)
// paste参数为空则自动使用第一个可用的剪贴板，返回云剪贴板地址
```

### 解析云剪贴板
```js
var content = parsePaste(url)
// 软件会自动匹配链接使用合适的云剪贴板来解析
```

## 页面单独窗口显示

只要在点击项的extra属性加上newWindow:true即可

示例
```js
{col_type:'text_1', title:'打开新窗口', url:'x5://http://1.cn', extra:{newWindow: true, windowId: MY_RULE.title}}
```

::: warning 注意：
新开窗口打开的页面内不支持``back(true)``，即退出当前页面同时刷新前一个页面
:::

回到打开的新窗口：``windowId``为其标识，再次点击按钮时会回到相同``windowId``的窗口

新开的页面如何隐藏到后台：按钮url使用``func://background``即可

## 远程模块（代码块）引用

示例
```js
require('http://xxx/t.js?v=1');
header({标题:'a&&Text'})
```

``http://xxx/t.js``是一个远程代码块地址，内容：``function header(rule){}``

完整示例
```js
require('http://xxx/t.js?v=1', {headers:{}}, 1); 
// 即require(链接, 请求头等信息, 版本号)
```

原理：使用``require``软件会对链接取``md5``，然后判断文件是否存在，存在则直接取文件内容，不存在则``fetch``到本地，然后执行``eval``

::: warning 注意：
远程模块里面不要直接引用非顶层作用域的变量或者函数，比如在箭头函数()->{}里面定义变量然后require里面直接引用此变量名，应该使用传递参数来引用此变量
:::

::: warning 注意：
如果远程文件有更新，同一个地址软件是不会更新文件的，推荐给链接加上?v=1这样的标志来缓存新版本的文件，这样不影响其它规则使用旧版本，如果非要更新缓存文件也可以增加版本号来强制更新
:::

如果需要用到header：``require('http://xxx/t.js?v=1', {headers:{}})``，用法和fetch基本一致

临时缓存：``requireCache('http://xxx/t.js', 24)``，那么文件会缓存24小时，超过会重新下载，缩写：rc

临时缓存只获取不执行eval：``fetchCache('http://xxx/t.js', 24)``，那么文件会缓存24小时，超过会重新下载，缩写：fc

删除本地缓存、强制更新：``deleteCache('http://xxx/t.js')``，删除缓存到本地的文件，再次执行require则会重新下载，删除该规则下所有缓存：``deleteCache()``

强制更新：修改版本号就会无视时间强制刷新，版本号参数均为最后一个参数

## 全局模块引用

即CommonJS规范的模块引用（只是使用requirejs，因为require被占用了）

示例
```js
let {test} = requirejs('a')
// 将会加载libs/a.js，并且一次加载全局生效
```

为方便使用，加载本地模块也可以使用``require('a')``，效果和``requirejs('a')``是完全一样的

加载远程模块：``requirejs('http://xxx/t.js')``，和``require``类似，会自动缓存文件到``libs``目录，只是两者作用域不同，``require``是在顶层作用域``eval``代码，而``requirejs``则是``CommonJS``规范

更新模块：首页长按规则名选择清除缓存，默认会全局缓存模块，即A页面读取文件加载了模块代码，再打开B页面不会再次读取文件执行

## md5

```js
const a = md5('xxx')
```

### 取文件MD5
```js
md5('hiker://files/xxx.zip')
```

## hexToBytes

::: info 说明：
将16进制字符串转成Uint8Array，可以搭配``fetch(url, {toHex: true})``使用
:::

```js
const a = hexToBytes('aaa')
```

## writeHexFile

::: info 说明：
将16进制字符串转成二进制写入文件，主要用来搭配fetch(url, {toHex: true})使用
:::

```js
const hex = fetch(url, {toHex: true});
writeHexFile('hiker://files/cache/a.mp3', hex)
```

## 缓存m3u8索引文件

::: info 说明：
某些视频地址只能访问一次，避免后面无法播放，可以将索引文件缓存起来
:::

```js
const a = cacheM3u8('http://xx.m3u8')
// 返回：file:///storage/Android/data/com.example.hikerview/files/Documents/cache/video.m3u8##http://xx.m3u8
```


高级用法：传入header：``const a = cacheM3u8('http://xx.m3u8',{headers:{}})``用法和``fetch``一致

高级用法：自定义文件名：``const a = cacheM3u8('http://xx.m3u8',{}, 'video.m3u8')``，注意``options``即第二个参数一定要传（无值就{}）

批量多线程缓存：``var data = batchCacheM3u8([{url:'http://www.a.cn', options:{headers:{},body:'a=1&b=2',method:'POST'}}, {url:'http://www.b.cn'}])``;用法和``batchFetch``差不多，返回字符串数组，缩写bcm

如果链接包含``.mp4``但是不包含``m3u8``那么认为不是``m3u8``格式，不支持缓存索引文件，可以给链接加上``#m3u8``强制识别为``m3u8``

强制识别：默认情况下会校验``content-type``的header，如果是mp4等格式直接返回原链接，可以给链接加上``#isM3u8#``，那么软件会忽略header校验

## 修正m3u8索引路径

::: info 说明：
用于在不能直接使用``cacheM3u8``来缓存m3u8文件，需要自行生成m3u8文件的场景，而m3u8文件里面的ts文件路径又不想自行拼接
:::

示例
```js
const a = fixM3u8('http://yy/xx.m3u8', '#EXT-X-KEY:xxx.key\nxxx.ts')
```

返回：修正后的文件内容，如
```txt
#EXT-X-KEY:http://yy/xxx.key\nhttp://yy/xxx.ts
```

## 配置管理

::: info 说明：
封装的配置管理，管理个性设置、依赖版本、依赖地址等
:::

写入配置：预处理里面使用``initConfig({二级样式:'顺承天意', pako: 'https://cdn.com/v3.5.js'})``;

读取配置：``config.pako``

## 执行加密代码

使用``evalPrivateJS(code)``直接运行

设置->开发者模式里面可以得到加密后的代码

不要直接引用非顶层作用域的变量或者函数，比如在箭头函数()->{}里面定义变量然后加密代码块里面直接引用此变量名，建议把变量定义一起加密，或者使用传参来引用

## 聚合搜索代理

```{col_type: 'input', url: "'hiker://search?s=' + input", extra: {rules: "fetch('hiker://files/rules.json')"}}```

即使用``extra``的``rules``，来代理规则列表，注意：``rules``为一段JS代码，并非规则列表，rules代码里面最后返回一个规则列表的数组字符串即可

注意点1：rules字段为js代码，并非规则文件地址

注意点2：需要返回数组字符串，并非数组，比如可以JSON.stringify(data)

注意点3：软件自带搜索解析规则不能使用此功能，该功能仅能用于首页，但不限于输入样式

## 下载文件到本地

```js
downloadFile('http://xxx.jar', 'hiker://files/cache/xxx.jar')
```

### 带headers
```js
downloadFile('http://xxx.jar', 'hiker://files/cache/xxx.jar', {'User-Agent': 'xxx'})
```

### 仅下载一次：
```txt
requireDownload('http://xxx.jar', 'hiker://files/cache/xxx.jar')
```

## 批量多线程任务

###方法：（缩写be）
```js
batchExecute(tasks, listener, successCount)
```
::: info 示例
<a href="https://github.com/qiusunshine/hiker-rules/blob/master/%E7%A4%BA%E4%BE%8B/batchExecute.js">点击查看示例代码</a>
:::

::: info 说明：
第一个参数为任务对象数组，每个任务对象包含func执行方法、param参数、id任务ID，注意func方法内不能直接引用外部变量，需要通过param传入
:::

::: info 说明：
第二个参数为任务进度监听（可为空），包含func监听逻辑方法、param外部参数，func属性包含三个参数：第一个即param参数，第二个为任务ID，第三个为该任务失败原因，第四个为task返回值
:::

::: info 说明：
第三个参数为要求任务成功个数，不传则表示要求需等待所有任务完成，比如``tasks``传了5个任务，``successCount``传3，那么``listener``只会执行3次，3个任务完成后其余任务直接中断丢弃，继续执行be后面的逻辑
:::

::: info 说明：
在``listener``里面主动中断，只需要在``listener``里面return 'break' 即可
:::

同步异步::: info 说明：
任务为异步多线程执行，最大线程数16（任务数无限制），监听方法为同步执行不用担心并发问题，单个任务耗时不能超过30秒
:::

## 同步锁定任务

```js
syncExecute({ func: (param) => {}, param: { a: 1 } })
```

::: info 说明：
该方法用于需要全局线程同步的情况，因为``putVar``、``putMyVar``、``setItem``等方法都是线程不安全的，比如``batchExecute``传入的多线程任务，如果在多线程任务里面读写putVar那么是无法保证数据准确的（不过be推荐在listener内读写，因为listener是当前be内线程同步的）
:::

## 加载java字节码

```js
requireDownload('https://gitee.com/qiusunshine233/hikerView/raw/master/rules/d.dex', 'hiker://files/cache/t.dex');
var test = loadJavaClass('hiker://files/cache/t.dex', 'com.test.code.TestCode');
log(test.hello());
```

### 携带so文件
```js
loadJavaClass('hiker://files/cache/t.dex', 'com.test.code.TestCode', 'hiker://cache/dir/a.so')
```

### 携带多个so文件
```js
loadJavaClass('hiker://files/cache/t.dex', 'com.test.code.TestCode', 'hiker://cache/dir')
// so文件都放cache/dir目录
```

### 获取手机ABI
```js
let abi = getCpuAbi()
// 返回arm64-v8a、armeabi-v7a等
```

::: warning 注意：
该方法为高危险方法，需征得用户授权才能执行
:::

## 动态刷新界面元素

### 动态更新
```js
updateItem('test_id1', {url:'hiker://files/cache/t.dex', extra: {id: 'test_id1'}});
```

支持刷新所有属性包含url、title、desc等，可以一起刷新，也可以只刷新某一项

::: warning 注意：
extra中的id必须全局唯一，如果多个页面有重复的，那么所有页面都会刷新，如果某个页面中有多行有重复ID，那么只会更新第一个
:::

### 动态删除
```js
deleteItem('test_id2');
```

### 批量删除
```js
deleteItem(['test_id2', 'test_id3'])
```

### 按cls删除
```js
deleteItemByCls('box123')
```
即删除``extra:{cls: 'box123'}``的所有元素，推荐cls相同的连续，不要有多段相同cls的元素，否则删除时没有动画和input组件失焦

### 动态新增
```js
addItemAfter('test_id1', {url:'hiker://files/cache/t.dex', extra: {id: 'test_id2'}});
```

### 动态新增在前面
```js
addItemBefore('test_id1', {url:'hiker://files/cache/t.dex', extra: {id: 'test_id2'}});
```

### 批量新增
```js
addItemAfter('test_id1', [{url:'xxx', extra: {id: 'test_id2'}}]);
```

### 批量新增在前面
```js
addItemBefore('test_id1', [{url:'xxx', extra: {id: 'test_id2'}}]);
```

### 查询界面元素信息
```js
let obj = findItem('test_id1');log(obj.title)
```

### 根据cls查询界面元素信息
```js
let arr = findItemsByCls('test_cls');
log(arr)
```

cls支持多个，多个用空格分隔，比如``cls: 'tab sel'``，那么``findItemsByCls('sel')``也会查询到

““注意：
使用动态刷新界面接口时，尽量不要同时存在``input``和``flex_button/scroll_button``，因为刷新``flex/scroll``会全局刷新导致input失焦和数据混乱，同理在有input的界面也不要批量删除不连续的元素（可循环逐个删除）
:::

## 消息提示

示例
```js
toast('点这里干啥呢');
```

## 获取文件绝对路径

```js
getPath('hiker://files/a.txt')
// 返回file:///storage/emulated/0/xxx/xx/a.txt
```

推荐不要在规则里面直接把路径写为``file:///storage/emulated/0/xxx``，避免分身应用等情况下不可用

## JS域内变量

获取当前网络请求地址，示例
```js
js: log(MY_URL)
// 将会打印出当前网络请求地址
```

获取主页地址，示例
```js
js: log(MY_HOME)
```
该值由``MY_URL``计算而来，比如``MY_URL``为``https://a.com/xxx/html``，那么``MY_HOME``为``https://a.com``

动态获取主页地址，示例
```js
js: log(getHome(MY_RULE.url))
```
如果不传值则自动传入``MY_URL``，适用于MY_URL会在JS里面修改的情况，比如轻合集

获取当前规则，示例
```js
js: log(MY_RULE.title)
```

获取当前页数，示例
```js
js: log(MY_PAGE)
// 第一页为1，第二页为2
```

移动端UA，示例
```js
js: log(MOBILE_UA)
```

电脑端UA，示例
```js
js: log(PC_UA)
```

获取页面类型，示例
```js
js: log(MY_TYPE)
// 首页将打印home，搜索为search
```

获取上一级页面传过来的参数（上级页面点击元素的extra）：``log(MY_PARAMS.a)``，详情搜索子页面

## 获取手机IP

示例
```js
let ip = getIP()
```

## 执行XPath规则

```js
let href = xpath(getResCode(), '//div[@id=root]/a[1]/@href');
log(href)
```

列表示例
```js
let urls = xpathArray(getResCode(), '//div/a/@href');
log(urls)
// 返回字符串数组，缩写xpa
```

## RC4加解密

```js
let a = rc4.encode('aaaa', 'bbb', 'UTF-8');
let b = rc4.decode(a, 'bbb', 'UTF-8');
log(a);
log(b);
```

## 使用WebView获取源码

示例
```js
let a = fetchCodeByWebView('http://a.com');
log(b)
```

复杂示例
```js
let a = fetchCodeByWebView('http://a.com', {headers: {'Referer': 'http://b.com'}, 'blockRules': ['.png', '.jpg'], timeout: 5000});
log(b)
```

第一个参数为加载链接，第二个参数为对象，和``fetch``用法类似，``headers``即加载``header``，可以定义``Referer``和``User-Agent``等属性，``blockRules``是WebView加载过程中屏蔽链接的规则，timeout超时时间，默认30000即30秒

在中链接使用：只要链接前面加``webview://``即可，比如``webview://http://a.com;get;UTF-8;{}``，即``webview://``后面的和普通链接格式一致

高级用法：只有获取到内容才提取源码：``fetchCodeByWebView('http://a.com', { checkJs: $.toString(() => { return document.querySelector('#main a') } )})``，也就是只有checkJs执行返回内容不为null软件才会获取源码返回

## base64、atob、btoa

示例
```js
let a = window0.btoa(code);
let b = window0.atob(a);
```

可以用with来简化：
```js
with(window0){
  let a = btoa(code);
  let b = atob(a);
}
```

## 图片转base64编码格式

示例
```js
let a = convertBase64Image(url)
// 返回格式：data:image/jpeg;base64,xxxxxx
```

查看实现原理：
```js
log(convertBase64Image.toString())
```

## base64 byte数组

示例
```js
let bytes1 = _base64.decode(bytes, _base64.NO_WRAP)
// 快捷输入base64java
```

更多方法：
```java
decode(String str, int flags)
decodeToString(String str, int flags)
encodeToString(byte[] input, int flags)
```

## 精准搜索模式

::: info 说明：
获取搜索模式
:::

示例
```js
let mode = getSearchMode();
// 返回值目前只有0和1，0为默认模式，1代表精准搜索模式
```

示例
```js
if (mode == 1) {
  //精准搜索模式，可以自行根据搜索关键词过滤搜索结果
}
```

修改：``setSearchMode(1);``参数可选0和1

精准匹配封装：``if(searchContains(text, key, false)){//精准匹配}`` 第三个参数为是否忽略大小写，软件默认不忽略，相比直接includes该方法会使用空格分词匹配，如文本“2022梦醒了”能匹配“22 梦醒”，但不匹配“梦2022”、“梦 2022”

## 执行定时周期性任务

示例
```js
let id = 'abc';
let time = 10000;
let obj = {};
registerTask(id, time, $.toString((obj)=> { log('执行了') } , obj))
```

::: info 说明：
id可传null，软件会自动生成uuid作为任务id，time为执行间隔，单位毫秒，最小值500，第三个参数为执行的JS代码字符串
:::

::: info 说明：
任务会自动绑定当前显示页面，离开页面时软件会自动删除任务，也可以手动删除任务：unRegisterTask(id)
:::

注意事项1：定时任务间隔不一定完全准确，最大有500毫秒误差

注意事项2：任务执行耗时不要超过间隔时间，否则会延时执行，间隔时间误差增大

## 启动代理服务器

示例
```js
let url = startProxyServer($.toString(() => { return MY_PARAMS.a })) + '?a=b';
```

::: info 说明：
参数为接受到请求时执行的JS代码字符串，需返回请求内容，也可以通过在``startProxyServer``返回链接上加参数后给播放器播放，然后在JS代码字符串中使用MY_PARAMS变量获取参数
:::

示例
```js
let url = startProxyServer($.toString(() => { return fetch(base64Decode(MY_PARAMS.u)) }));
url = url + '?u=' + base64Encode('http://1.com')
```

扩展：在JS代码中支持返回状态码和Header，示例
```js
startProxyServer($.toString(() => {
  return JSON.stringify({
    body:'aa',
    headers:{'Content-Type': 'text/html', 'Location': 'http://b.com'},
    statusCode: 302
  });
}))
```

::: warning 注意：
如果未使用扩展自定义请求头，那么``Content-Type``固定为``application/vnd.apple.mpegurl``，也就是m3u8格式
:::

::: warning 注意：
将代理地址传给播放器要在链接加参数来让地址唯一，否则可能播放进度会串，如果是m3u8要有m3u8字样，否则可能无法被播放器识别为m3u8格式
:::

## 移除M3U8广告片段

示例
```js
let url = clearM3u8AdLazy('http://1.com/1.m3u8', {headers: {}});
```

::: info 说明：
``clearM3u8AdLazy``方法会生成一个``lazyRule``动态解析字符串，在``lazyRule``方法中软件会缓存m3u8到本地，并检查和清理``#EXT-X-DISCONTINUITY``疑似广告的片段
:::

如果想立即清理AD片段而不是生成lazyRule，可以调用clearM3u8Ad('http://1.com/1.m3u8');那么会立即缓存m3u8到本地并返回可播放地址

::: info 说明：
第二个参数可不传，参数类型和cacheM3u8第二个参数相同
:::

## 16进制字符串转base64编码

示例
```js
let c = hexToBase64(a);
```

::: info 说明：
可以和fetch联用，如``hexToBase64(fetch(url, { toHex: true }))``
:::

## 播放image/png分段格式的m3u8

示例
```js
let path = cacheM3u8WithPngProxy(url, options, fileName);
// 和cacheM3u8基本一样
```

示例2
```js
content = convertM3u8WithPngProxy(content, { headers: {} })
// 这个方法可以直接转换m3u8内容，当不能用cacheM3u8WithPngProxy时可以用这个方法
```

::: info 说明：
使用以上两个方法，软件会调用``startProxyServer``方法，并且将原png分段地址改成代理地址，在代理方法中软件会自动下载png并转成ts格式，可以执行``log(convertM3u8WithPngProxy.toString())``查看实现源码
:::

