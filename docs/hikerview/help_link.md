## hiker://home

展开首页频道

``hiker://home@V电影``，跳转频道名称为V电影的首页频道

``hiker://home@V电影``这种形式，仅支持小程序里面用，网页里面不支持跳转，``hiker://home``两者都支持

``hiker://home@规则名``支持补偿，如``hiker://home@规则1||规则2||http://haikuoshijie.cn``，那么会先找规则1，找不到找规则2，还找不到则进入网页

## hiker://bookmark

跳转书签页面

小程序和网页里面均可以使用

## hiker://js

跳转网页插件管理页面

仅支持小程序里面用，网页里面不支持跳转

## hiker://download

跳转下载中心

小程序和网页里面均可以使用

## hiker://history

跳转历史记录页面

小程序和网页里面均可以使用

高级用法：``hiker://history?rule=xxx``，显示指定规则的历史记录

## hiker://collection

跳转收藏页面

小程序和网页里面均可以使用

``hiker://collection?group=收藏分组名``，可直接弹出该分组的收藏弹窗

高级用法：``hiker://collection?rule=xxx``，显示指定规则的收藏记录

## hiker://adUrl

跳转网址拦截管理页面

仅支持小程序里面用，网页里面不支持跳转

## hiker://adRule

跳转元素拦截页面

仅支持小程序里面用，网页里面不支持跳转

## hiker://setting

跳转设置页面

仅支持小程序里面用，网页里面不支持跳转

## hiker://settingMore

跳转更多设置页面

仅支持小程序里面用，网页里面不支持跳转

## hiker://search

支持跳转搜索页面

``hiker://search?s=测试``，将会打开搜索弹窗，自动填充搜索的关键词“测试”，由用户自己选择分组和规则后搜索

``hiker://search?s=测试&group=②影搜``，将会打开搜索弹窗，自动填充搜索的关键词“测试”并且自动切换分组为“②影搜”，用户可切换分组和规则

``hiker://search?s=测试&rule=海阔视界``，将会直接跳转搜索结果界面，自动选择标题为“海阔视界”的规则进行搜索，并且该界面不可切换别的规则

``hiker://search?s=测试&rule=海阔视界&simple=false``，将会自动填充搜索的关键词“测试”，并且自动切换分组为“①推荐”、自动选中标题为“海阔视界”的规则，用户可切换分组和规则，并自动开始搜索

## hiker://search

跳转搜索关键词页面

仅支持网页里面用，小程序里面不支持

## hiker://empty

直接返回空字符串，比如需要在二级页面再用fetch去请求，不希望一进入二级就自动请求，那么可以这样：

``hiker://empty#http://a.com@rule=js:fetch(MY_URL.split('#')[1],{})``

## rule://口令

即完全编码的规则，当url为此形式时，点击即可识别口令，提示剪贴板检测到口令，是否立即导入

比如写一个类似规则仓库的规则，点击即可直接导入

## 海阔视界...

即海阔视界开头的口令，只要url为海阔视界开头，那么视界将会把这个链接识别为口令，尝试解析并提示导入

## pics://url
``pics://https://a.com/1.jpg&&https://a.com/2.jpg``

即``pics://``开头，后面为多张图片地址用``&&``连接

视界将会识别为多图模式（类似漫画），下拉会尝试执行下一集的动态解析，实现自动下一章

## javascript:

视界叫其彩蛋模式，实际上就是一段javascript代码，类似电脑上存一段javascript书签，点击后视界会跳转浏览器执行后面的代码

## toast://文本

url为``toast://``开头，那么视界会提示后面的文本信息，比如``toast://加载失败，请换源``

## hiker://webdav

点击即可快速备份规则到webdav，前提必须先设置好webdav账号

## hiker://webRule

点击即可开启Web编辑规则模式

## hiker://debug

点击即可打开开发助手页面，用于放在首页按钮的链接上，点击即可快速跳转

## 从二级页面跳转多图模式（类似漫画）

链接格式：``pics://https://a.com/1.jpg&&https://a.com/2.jpg``

## 提示文本信息

链接格式：``toast://提示内容``

## 弹出输入框

用法：
```txt
input://{"value":"默认填充内容", "js": "'toast://你输入的是'+input", "hint": "提示信息"}
```

自动获取剪贴板内容填充，``{"value": "{{clipboard}}"}``

## 弹出确认框

链接格式：``confirm://提示信息.js:'toast://你点击了确认'``

## 复制文本

链接格式：``copy://要复制到剪贴板的内容.js:'http://1.com'``，可以只``copy://要复制到剪贴板的内容``，不要后面的``.js:xxx``

## 进入编辑文件界面

链接格式：``editFile://hiker://files/file.txt``

## 使用第三方软件打开文件

链接格式：``openFile://hiker://files/file.txt``

## 在二级页面导入规则口令

链接格式：``海阔视界，当前分享的是...``（只要海阔视界开头）

## 从二级页面跳转网页，直接加载js内容

链接格式：``javascript:var a = 'a'``

## 从二级页面跳转X5全屏显示

链接格式：``x5://http://a.com``

## 在二级页面刷新当前页面X5链接

链接格式：``x5WebView://http://a.com``

## 从X5跳转网页

链接格式：``web://http://a.com``

## 从二级强制跳转网页，忽略二级解析规则

链接格式：``web://http://a.com``

## 从二级强制调用X5播放器播放视频地址

链接格式：``x5Play://http://a.com/1.mp4``

## 弹出下拉选择框

用法：``select://{"title": "选择性别", "options" : ["选项一", "选项二"], col: 3, js: "'toast://你点击的是' + input"}``，col为列数，默认为3

## 自动拼接下一页

链接包含``#autoPage#``即可，使用场景：小说的章节页面每一项链接加上``#autoPage#``，不要包含``fypage``，然后点击章节进入详情页，详情页滚动到底部的时候会自动加载父级章节页下一章节的链接，并且自动更新章节页的足迹

## 网页资源嗅探X5

::: warning 注意：
现在推荐用``webRule://``链接``@JS``代码，格式一样只是不依赖X5内核
:::

链接格式：x5Rule://链接@JS代码

示例
```js
'x5Rule://' + parseDom(list[i], 'a&&href') + '@' + $.toString(() => {
    let div = document.querySelector("#playdiv audio");
    if (div != null) {
        return div.getAttribute("src")
    }
})
```

原理：点击按钮后视界会启动一个X5组件来加载链接，然后当页面加载完时会执行JS代码，完整的JS代码为视界会每隔250毫秒执行一下链接中的JS，获取返回值，一旦返回值不为空则表明获取到资源，然后自动销毁X5组件

::: warning 注意：
JS代码的设计如示例，获取到资源时返回资源地址，获取不到返回空，每隔250毫秒检测一次，30秒超时也会自动销毁X5组件
:::

JS支持获取加载过的资源链接，``fy_bridge_app.getUrls()``或者``window._getUrls()``，前者为字符串后者为数组，自动添加header
手册搜索‘获取带header的视频地址’

打印日志方便调试：``fy_bridge_app.log('msg')``

高级用法：设置UA：只要在链接所在项使用``extra``属性，如``{url: 'x5Rule://xxx', extra: {ua: PC_UA}}`` ``PC_UA``是视界内置变量，也可以使用自定义的字符串

高级用法：设置Referer：只要在链接所在项使用``extra``属性，如``{url: 'x5Rule://xxx', extra: {referer: 'http://test.cn'}}``

拦截资源：``{url: 'x5Rule://xxx', extra: {blockRules: ['baidu.*.png','.jpg']}}``，拦截部分让网页更快加载，或者避免部分资源访问一次就失效

## 网页资源嗅探Webkit

链接格式：``webRule://``链接``@JS``代码

用法和``x5Rule://``一致，webRule使用系统浏览器内核，而x5Rule使用腾讯Tbs X5内核

## 直接下载文件

链接格式：``download://http://a.com/1.mp4``

支持视频、音频、应用安装包APK

## 分享文件

链接格式：``share://hiker://files/a.txt``

用户点击该元素后会提示用户分享到的应用，请确保文件存在

## 选择文件、上传文件

链接格式：``fileSelect://log(input)``，即``fileSelect://加JS代码``，JS代码里面使用input变量获取文件路径

（该路径并非文件原始路径，因为系统限制非软件专属目录只能获取文件流，不能获取文件路径，因此软件会拷贝一份到内置目录，下次启动时自动删除，文件名会自动加一个_fileSelect_前缀）

## 自动提取视频

链接格式：``video://https://xxx.html``

软件会直接进入播放器界面，并且自动提取网页中的视频地址，和悬浮嗅探原理一致，并且解析到多个视频地址会自动切换测试，直到找到能播放的地址

加快提取、增强提取示例
```js
{url: 'video://https://xxx.html', extra: {blockRules: ['bb.*.png','.jpg']}}
// 和x5_webview_single样式一致
```

注入JS：``{url: 'video://https://xxx.html', extra: {js: 'console.log("我加载了")'}}``，和x5_webview_single样式一致

自定义嗅探规则：``{url: 'video://https://xxx.html', extra: {videoRules: ['videoType=1', 'video*m3u*.ts']}}``，使用包含匹配，*代表任意字符

自定义排除嗅探规则：``{url: 'video://https://xxx.html', extra: {videoExcludeRules: ['?url=']}}``，匹配到的识别为非视频地址，使用包含匹配，*代表任意字符

缓存m3u8索引文件：``{url: 'video://https://xxx.html', extra: {cacheM3u8: true}}``

