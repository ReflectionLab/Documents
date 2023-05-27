## 投屏开发

### 获取投屏播放地址：

``/playUrl``，该接口会返回可播放的视频地址，如果手机端更新了链接，该接口也会自动刷新，因此可以定时检测

``/playUrl?enhance=true``，增强接口，返回``{title:'xxx-第一集', url:'',headers:{},jumpStartDuration:0,jumpEndDuration:0}``即带``header``和片头片尾

``/getPlayList``：获取选集列表，返回字符串数组，如``['第一集','第二集']``

``/playMe?index=0&title=第一集``，``index``和``title``参数为从``/getPlayList``获取的结果，返回``true``表示执行成功（软件会自动更新播放地址到``/playUrl``接口），返回``false``可能用户关闭了播放页

``/playNext``，播放下一集

## 广告拦截订阅

### 广告订阅格式：
```json
{
    "urlV2": "https://ad_v2.txt",
    "domBlockRuleUrl": "https://domBlockRules.txt"
}
```

``urlV2``为网址过滤，文件内容格式参考：广告过滤拦截里面分享为订阅文件

``domBlockRuleUrl``为网页元素过滤，文件内容格式参考：网页元素拦截里面分享为订阅文件

## WebDav开放接口
```js
let webdav = buildWebDav('http://xxx/dav', user, password);
let list = JSON.parse(webdav.list());
log(list)
```

### 播放文件：
```js
for (let it of list) {
  log(it.playUrl)
}
```

### 下载文件：
```js
for (let it of list) {
 log('download://' + it.playUrl)
}
```

### 手动下载子文件(如显示图片)：
```js
let webdav = buildWebDav('http://xxx/dav', user, password);
webdav.download(it.name, 'hiker://files/cache/_fileSelect_' + it.name)
```

### 上传文件：
```js
webdav.upload('a.mp4', 'hiker://files/cache/a.mp4')
```

### 删除文件/文件夹：
```js
webdav.delete('a.mp4')
```

### 创建文件夹：
```js
webdav.makeDir('视频')
```

### 子文件夹
只需要将``list``子元素的``url``属性拿来``buildWebDav``即可：
```js
let childWebdav = buildWebDav(it.url, user, password)
```

## EPUB开放接口

### 解析章节目录：
```js
let c = getEpubChapters(path)
log(c[0].title+'-' + c[0].url)
```
注意此方法是耗时方法，可以适当缓存结果

### 获取正文：
```js
let c = getEpubContent(path, chapter.url)
```
第二个参数为getEpubChapters获取到的url属性（建议不要用``getEpubContent0``）

### 获取更多信息：
```js
let meta = getEpubMetadata(path)
```
可以打印出来看里面的内容``log(meta)``

::: tip 说明：
其中包含的图片不用特殊处理，软件会自动识别，另外获取的正文请用``rich_text``加载，正文页链接可以搭配阅读模式``#readTheme#``、自动翻页``#autoPage#``使用
:::
