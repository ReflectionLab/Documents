## 首页合集

标识：``home_rule_url``

```txt
海阔视界，首页频道合集￥home_rule_url￥https://bbs.fy-sys.cn/rule.json，支持单个规则或者合集规则的json格式
```

## 首页频道

标识：``home_rule``

```txt
海阔视界，首页频道￥home_rule￥{'title':'VIP'}
```

## 搜索引擎合集

标识：``search_engine_url``

```txt
海阔视界，搜索引擎合集￥search_engine_url￥https://bbs.fy-sys.cn/rule
```

## 搜索引擎

标识：``search_engine_v2``

```txt
海阔视界，搜索引擎￥search_engine_v2￥{'title':'VIP'}
```

## 网页插件

标识：``js_url``

```txt
海阔视界，网页插件￥js_url￥global_movie@https://bbs.fy-sys.cn/rule
```

说明1：``@``前面的是插件名称，``global``是全局的意思，可以是别的域名比如``k.baidu.com_1_去广告@https://bbs.fy-sys.cn/rule``

说明2：插件``k.baidu.com_1_去污垢``加载时间会早于``k.baidu.com_2_去牛皮藓``插件，也就是根据域名后的名称排序来加载的

## 广告网址拦截

标识：``ad_url_rule``

```txt
海阔视界，广告网址拦截￥ad_url_rule￥https://bbs.baidu.cn/rule&&xn--
```

## 书签规则

标识：``bookmark``

```txt
海阔视界，书签规则￥bookmark￥{'title':'VIP'}
```

## 书签合集

标识：``bookmark_url``

```txt
海阔视界，书签规则￥bookmark_url￥hiker://files/share/share-bookmarks.json
```

## 本地文件

标识：``file_url``

```txt
海阔视界，本地文件￥file_url￥hiker://files/a.txt@https://bbs.fy-sys.cn/rule
```

## 快速播放白名单

标识：``fast_play_urls``

```txt
海阔视界，快速播放白名单￥fast_play_urls￥https://bbs.fy-sys.cn/rule
```

## 嗅探弹窗黑名单

标识：``xt_dialog_rules``

```txt
海阔视界，嗅探弹窗黑名单￥xt_dialog_rules￥bbs.fy-sys.com
```

## 广告拦截订阅

标识：``ad_subscribe_url``

```txt
海阔视界，广告拦截订阅￥ad_subscribe_url￥{"urlV2": "https://cdn.jsdelivr.net/gh/qiusunshine/hiker-rules/ad-urls.txt","domBlockRuleUrl": "https://cdn.jsdelivr.net/gh/qiusunshine/hiker-rules/ad-rules.txt"}
```

## 小程序规则订阅

标识：``home_sub``

```txt
海阔视界，合集规则订阅￥home_sub￥https://gitee.com/sub.json
```

## 云仓库账号密码设置

标识：``publish_account``

```txt
海阔视界，云仓库账号密码设置￥publish_account￥xiaomianao@12345678
```

## 更新依赖

标识：``require_url``

```txt
海阔视界，依赖更新￥require_url￥https://xxx.cn/test.js
```

## 剪贴板云口令自动识别

标识：``@import=js:``

用途：从云盘导入规则、更新规则配置文件等

### 写入文件示例
```txt
云口令，复制整条口令打开软件即可导入\nhttps://xxx.cn/test.js@import=js:writeFile('hiker://files/cache/test.js', fetch(input))
```


### 导入规则示例
即返回获取到的规则口令
```txt
云口令，复制整条口令打开软件即可导入\nhttps://xxx.cn/test.json@import=js:fetch(input)
```

注意事项：云口令等中文可以自定义或者不写，``@import=js:``和前面的换行符中间的内容为input变量的值，可以为任意内容（不能包含换行符）

## 浏览器代理规则

标识：``web-proxy``

```txt
海阔视界，浏览器代理规则，复制整条口令打开软件就会自动导入￥web-proxy￥{"name": "test", "match": "test"}
// 后面的内容支持数组
```

