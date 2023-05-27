# 常用规则

## 搜索引擎链接

用**作为关键词的占位符

如果用**会冲突，那么可以用%%作为关键词的占位符

::: tip 示例
网页内搜索'我'，网址变为：``https://quark.sm.cn/s?q=%E6%88%91``，'%'后面的即关键词'我'的编码后的关键词，因此规则为：``https://quark.sm.cn/s?q=**``
:::

## 首页频道链接

举例：``https://movie.dban.com/j/new_search_subjects?range=0,10&start=fypage@-1@*20@&tags=fyclass&year_range=fyarea&year1=fyyear&sort=fysort``

说明1：真正请求时会把``fyclass``替换为分类替换词，``fyarea``替换为地区替换词，``fyyear``替换为年代替换词，``fysort``替换为排序替换词，``fypage``为页数，从1，2，3一直递增，fypage@-1@*20@代表0，20，40递增

说明2：页数规则不可放最末尾，已经忘了会不会有影响，如果页数确实是最末尾比如：``https://movie.douban.com/1``，那么在后面加无效字符串，比如``https://movie.dban.com/1?_t=0``

说明3：如果类型并没有分为年代、地区、分类，只是一个类型比如地区，但是类型太多放一行不太爽，因此用fyAll，那么分类、年代和地区替换词都会去替换fyAll，有fyAll就不能有别的替换词，页数规则同上

说明4：如果第一页不能使用``fypage``，那么可以这样写``http://a.com/fypage.html[firstPage=http://a.com/]``，那么第一页就会加载``http://a.com/``，第二页``http://a.com/2.html``

## 首页频道链接增强

举例：``https://movie.dban.com/j/new_search_subjects?ra;get;GBK;{User-Agent@Windows&&Cookie@id}``

说明1：第一个分号后面的都可以不要，但是要编码格式GBK，就必须有get或POST请求方式，依次类推

说明2：大括号内的为``header``，如果里面的内容原本有英文分号的，需要用两个中文分号代替，真正请求的时候会替换回英文分号，``header``里面的值支持用js处理，如``Cookie@id.js:input``

## 首页频道解析规则 + 选择器语法说明

格式：列表;标题;图片;描述;链接

示例
```txt
body&&#post-list&&li;a&&title;img&&src;.index-intro&&Text;a&&href
```

::: info 说明：
每个规则末尾的Text代表获取文字，Html代表获取包含标签的文本，其余的默认是获取属性，中间的&&是取子元素，#取id，.取class，tag则直接写，和querySelector类似
:::

与&&相反的是--，即排除，如body--a&&a&&href代表排除第一个a标签后取剩下的第一个a标签的href属性

如果要获取的不是第一个子元素，那么用逗号分隔，后面写索引，比如body&&a,1表示取第二个a标签，可以用负数倒着取，如body&&a,-1&&href表示获取倒数第一个a标签的href属性

除此之外，还可以用jsoup原生的选择器语法，如body img[src$=.png]&&src表示获取body下src属性以.png结尾的img标签的src属性

增强：文本支持多个选择器结果拼接，示例
```txt
body&&li;a,0&&title+'--'+a,1&&title;img&&src;.c&&Text;a&&href，即多个选择器用+分隔，如果末尾要用.js:处理，那么用中文＋，中间要拼接字符串则将字符串用'包裹
```

增强：获取文字或者属性后面可以用js来再处理，比如a&&href.js:'https://h5.vmovier.com/index.html?id='+input.spilt('?from')[0].replace('/','')

增强：完全使用JS来写解析规则，用js:开头，后面加JS代码即可

## 搜索解析规则

格式：列表;标题;链接;描述;详情;图片

示例
```txt
.list-content&&.u-movie;h2&&Text;a&&href;.pingfen&&Text;.meta&&Text;img&&data-original
```

::: info 说明：
前三个为必选，后三个可以不要，比如``.list-content&&.u-movie;h2&&Text;a&&href``
:::

增强：也可以部分不要，比如``.list-content&&.u-movie;h2&&Text;a&&href;*;*;img&&data-original``

## POST传参

::: info 说明：
POST传参和get一样，真正请求时会自动转到body里面，如果链接里面有问号的，用两个中文问号代替，真正请求时会自动转回英文问号
:::

示例
```txt
http://www.google.com？？action=search?q=1&s=**;POST;gbk;{User-Agent@Windows&&Cookie@id}
```

## POST请求传json

::: info 说明：
POST请求用一个参数``JsonBody``，代表json参数，注意引号的使用（不同类型）
:::

示例
```txt
http://www.google.com?q=1&JsonBody={"key1":"**","key2":233};POST;gbk;{User-Agent@Windows&&Cookie@id}
```

## 参数/header用JS处理

::: info 说明：
每一个url参数和header值都可以用js处理，比如生成时间戳，header里面的也可以，注意只能对值（value）进行处理，不能对键（key）用js处理
:::

示例
```txt
http://www.google.com?q=**.js:decodeStr(input,'GBK');POST;gbk;{User-Agent@Windows&&Timestamp@.js:new Date().getTime()}
```

示例说明
```txt
网页内容会被GBK编码显示，但是url使用utf-8编码（默认会同样被GBK编码，``.js:decodeStr(input,'GBK')``会再把关键词解码，然后真正请求时会默认使用UTF-8编码）
```

## url链接用JS处理

::: info 说明：
之前有url参数js处理，这次还可以对链接本身js处理，如``http://a.com.js:input+'/'?a=b.js:input+'a'``
:::

## 自定义图片的Referer、UA、Cookie等header请求头

::: info 说明：
自定义图片的Referer、UA、Cookie等，示例``http://a.jpg@headers={"User-Agent": "Windows", "Cookie":"111111"}``
:::

::: info 说明：
即图片链接加``@headers=``加header的JSON字符串
:::

旧的用法（不再推荐）：``http://a.jpg@Referer=http://haikuoshijie.cn/@User-Agent=Windows@Cookie=111111``

::: warning 注意：
@Cookie必须在@Referer和@User-Agent后面，如果混用@headers=（不推荐），@headers=需在它们之后
:::

::: warning 注意：
小程序规则和搜索规则默认会加上规则链接的首页地址作为Referer，默认会使用浏览器UA作为图片UA，链接里面的Referer和UA优先级最高
:::

## 小程序规则、二级列表动态解析

即点击二级列表或者首页列表结果时，根据规则再次解析链接，获取真正要用网页访问的链接

示例
```txt
body&&.stui-content__playlist,fyIndex&&li;a&&Text;*;*;a&&href.js:input+'@lazyRule=body＆＆＆＆a＆＆＆＆href'
```

即链接后面加上``@lazyRule=body＆＆＆＆a＆＆＆＆href``（&&要用中文＆＆＆＆来代替），那么点击结果时就会请求链接然后用规则去解析获取真正的链接，然后视界再对真正的链接进行处理，比如检测为视频或者音乐则直接播放，检测为图片直接大图显示，否则用网页查看

::: warning 注意：
不能嵌套使用，只能用在最后一级解析规则
:::

## 视频播放支持header

如需要cookie和referer，链接为``https://a.baid.com/2.mp4;{Cookie@aaa&&Referer@a.baid.com}``，即和首页频道链接规则一致

## 视频播放进度记忆

在extra里面使用id字段来保证正确记忆播放进度：``{url:'http://xxx/1.mp4',extra:{id:'http://xxx/1'}}``

id的值常来源于唯一选集页面链接，或者规则名+资源ID，注意必须全局唯一，不能只当前规则唯一，否则会和其它规则串

如果没设置该字段，那么取链接无参数下的地址，比如http://1.m3u8?k=v和http://1.m3u8?k=b的播放位置会记忆为一样的，如果不希望这样就把链接变成``http://1.m3u8?k=v&memoryPosition=full``

## 小程序规则、二级列表支持点击导入规则

只要链接为``rule://``开头，并且后面接上由base64格式完整编码的规则，何为完整编码呢，就是海阔视界这几个字也要有，就是我们平时分享的口令，再base64编码一下

## JS预处理

方便规则快速获取cookie，在执行首页解析规则和搜索解析规则前都会执行一遍再执行对应规则，注意必须是JS代码，无需js:开头，该代码里面可以使用变量MY_RULE来获取当前规则，注意该变量是一个对象，比如用``MY_RULE.find_rule``来获取解析规则

## text_1字体颜色混排

首页样式text_1的标题和描述支持红色和橙色混排，比如标题设置为""““小棉袄””""''‘‘真帅’’''啊（这里用英文代替中文，实际使用要用中文引号），那么小棉袄三个字就是红色，真帅两个字是橙色，啊这个字还是原本的黑色

## 高级选择器语法

或语法：``body&&#app||#app2&&Text``，即先找#app,找不到再找#app2

更多语法：比如根据有没有src属性来获取元素等，参考Jsoup原生的语法，``https://www.open-open.com/jsoup/selector-syntax.htm``，只要不和&&、||等视界自带的冲突就能使用

## 嗅探识别优化

在二级、动态解析或者首页点击时，会自动根据链接判断是否为图片或者音视频，然后分别跳转图片查看器、视频播放器和网页

如果链接里面含有``#ignoreImg=true#``则不会被识别为图片，兼容部分链接含有jpg之类的关键词但是不是图片的情况，识别完会自动清除该标记

如果链接里面含有``#ignoreVideo=true#``或者``#ignoreMusic=true#``则不会被识别为视频或者音乐，兼容部分链接含有mp4之类的关键词但是不是视频和音乐的情况，识别完会自动清除该标记

如果链接里面含有``#isVideo=true#``或者``#isMusic=true#``则会强制被识别为视频或者音乐，识别完会自动清除该标记

## 不要记录足迹

在二级页面点击时默认会记录当前点击位置，除非文本字数超过25

但是有时候少于25个字符也期望不记录足迹，因此可以在页面url或者按钮url里面加上``#noHistory#``，请求时会自动删除该标识，仅做标识用

注意该功能是放在前一级上的，要想二级没足迹，那就要在一级跳二级的链接上加该标志

## 不要记录历史记录

在页面url加上``#noRecordHistory#``，那么进入该页面就会不记录历史记录，该标识可以加在链接的任意位置，真正请求时会自动删除该标识

## 禁止刷新页面

在页面url加上``#noRefresh#``即可，真正请求时会自动删除该标识

## 规则有二级解析规则，如何继续用网页打开链接

链接地址前加``web://``，即完整地址为``web://http://baidu.com``

使用场景：因为有些按钮点击需要根据二级规则跳二级页面，但是有些按钮就是简单的网页入口

## 音视频预加载预解析

默认提前三分钟自动预加载

强制预加载：默认预加载会执行两次，如果两次结果不一致那么会放弃预处理结果（因为这样的地址很可能有时效性），可以给链接加上``#pre#``强制保留预加载

强制不要预加载：如果不希望预加载可以给链接加上``#noPre#``

## 不要识别为M3U8格式

默认视频链接包含.m3u8则认为是m3u8格式，如果存在误识别，可以在视频链接加上``#ignoreM3U8#``标识

## 视频多线路、外挂字幕、弹幕、歌词

视频链接使用json代替，示例
```json
{urls:['http://xxx/1.mp4','http://xxx/2.mp4'],names:['超清','高清']}
```

线路名可以不填，示例``{urls:['http://xxx/1.mp4','http://xxx/2.mp4']}``

带header，示例``{urls:['http:///1.mp4','http://2.mp4'], headers: [{'Referer': 'xxx'}, {'Referer': 'yyy'}]}``

带header时如果header里面有英文分号;的需用两个中文分号；；代替

外挂字幕（支持srt、vtt、ass几种格式）
```json
{urls:['http://xxx/1.mp4'],subtitle:'http://xxx/1.srt'}
```

弹幕（B站的xml格式）：``{urls:['http://xxx/1.mp4'],danmu:'http://xxx/1.xml'}``

弹幕（JSON格式）：``{urls:['http://xxx/1.mp4'],danmu:'http://xxx/1.json'}``，链接必须包含.json，内容格式：``[{"text":"弹幕", "time": 5.23}]``

弹幕（webSocket等格式）：``{urls:['http://xxx/1.mp4'],danmu:'web://hiker://files/1.html'}``，即软件会加载一个webview到播放器上，``web://``后面为加载的网址

弹幕（webSocket等格式）：监听``window.isPlaying``为``true``则播放，``false``或者``null``则暂停，监听``window.seek``获取滑动进度（不会实时更新，仅在用户操作时更新），监听显示行数：``window.lineCount``

音乐播放也支持弹幕

歌词（lyric）：``{urls:['http://xxx/1.mp3'],lyric:'http://xxx/1.lrc'}``

## 全屏模式

给页面链接加上``#fullTheme#``

## 阅读模式

给页面链接加上``#readTheme#``

正文列表项：``{col_type:'rich_text', extra: {click: true}}``，即点击/音量上下键翻页

## 游戏模式

给页面链接加上``#gameTheme#``，页面会全屏显示，右上角显示菜单按钮

## 音频分离

元素为：``{url: JSON.stringify({urls: [url], audioUrls: [audio]}), col_type: 'text_3'}``

即链接为多线路的json格式，新增``audioUrls``字段，值为字符串数组，如果数组只有一个元素，那么多线路复用同一个音频地址，否则数组长度应该和urls的一致

## 网络请求代理 proxy

格式为一行一个，原地址=>新地址，会同时对``fetch``、``request``、``require``、``requireCache``、首页链接、搜索链接等生效

默认使用包含匹配，比如aaa.com=>bbb.net，那么一旦require地址包含aaa.com就会把链接中的aaa.com替换为bbb.net，要替换完整的就写上完整的地址即可，链接支持``file://``或者``hiker://``开头的本地地址

## Cookie管理

默认会自动解析响应的``set-cookie``请求头，然后将cookie存起来下次发起请求自动携带

如果在发起请求时手动注入了cookie那么以手动注入的为准

获取``cookie：getCookie(url)``

## 应用标识

MY_NAME变量为应用名，在海阔视界它的值为'海阔视界'，在嗅觉浏览器它的值为'嗅觉浏览器'

## 图片解密

pic_url: ``http://1.jpg@js=input``'，注意这里的input对象为``InputStream``类型，返回也应该是InputStream类型

如何使用``byte[]``解密：<a href="http://gh.haikuoshijie.cn/https://github.com/qiusunshine/hiker-rules/blob/master/%E7%A4%BA%E4%BE%8B/imageDecode.js">点击查看示例代码</a>

注意尽量不要把代码全写在图片链接上，而应该封装在规则子页面或者本地文件里面，比如``http://1.jpg@js=$.require("hiker://page/des?rule=示例")``，不过代码没有规则环境，使用子页面需带上规则名?rule=示例

注意@js=需放在链接最后，即在``@Referer=``、``@Cookie=``、``@headers=``等标识的最后面，不能在前面

## 自定义长按操作

示例
```js
d.push({title: 'test', extra: { longClick: [{title: '操作1', js: $.toString(()=>{ return 'toast://点击了'})}] } })
```

按钮数量无限制，js代码支持返回子页面地址等逻辑，input为按钮名称title的值

## 连续选集/章节标识

软件默认会将连续的同一col_type识别为连续选集/章节

如何自定义：只需要同为选集/章节的每一个item的extra的cls属性加上playlist字符（提示cls属性支持空格分隔多个，类似html的class）

常用于选集/章节之间加了一些别的样式按钮的情况

多线路：只需要cls加上playlist再保证不一样即可，比如线路1的cls为``playlist r1``，线路2的cls为``playlist r2``

