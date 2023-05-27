## movie_3

一行三列，适合每一列显示图片、名称和描述的影视频道，图片为圆角矩形，““默认就是该样式””

## movie_3_marquee

同movie_3，只是标题太长会跑马灯滚动显示

## movie_2

一行两列，适合每一列显示图片、名称和描述的直播或者视频，图片为圆角矩形

## movie_1

一行一列，适合每一列显示图片、名称和描述，适合标题或者描述特别多的情况

隐藏底部分界线：``{col_type: 'movie_1',extra: {lineVisible: false}}``

## movie_1_left_pic

和``movie_1``一样，只是图片在左，标题和描述在右

隐藏底部分界线：``{col_type: 'movie_1_left_pic',extra: {lineVisible: false}}``

## movie_1_vertical_pic

和``movie_1``一样，只是图片在左，标题和描述在右，并且图片是竖向的，也就是图片高度大于宽度

隐藏底部分界线：``{col_type: 'movie_1_vertical_pic',extra: {lineVisible: false}}``

## movie_1_vertical_pic_blur

和``movie_1_vertical_pic``一样，不同之处在于该样式背景会显示图片的高斯模糊处理后的图像

背景渐变：``{col_type: 'movie_1_vertical_pic_blur',extra: {gradient: true}}``

## text_1

显示文本，一行只有一列

支持红色和橙色混排，比如标题设置为““小棉袄””‘‘真帅’’啊，那么小棉袄三个字就是红色，真帅两个字是橙色，啊这个字还是原本的黑色

隐藏底部分界线：``{col_type: 'text_1',extra: {lineVisible: false}}``

## text_center_1

显示文本，一行一列，文本居中

隐藏底部分界线：``{col_type: 'text_center_1',extra: {lineVisible: false}}``

## text_2

显示文本，一行两列

文本左对齐：``{col_type: 'text_2',extra: {textAlign: 'left'}}``，textAlign默认为center居中

## text_3

显示文本，一行三列

文本左对齐：``{col_type: 'text_3',extra: {textAlign: 'left'}}``，textAlign默认为center居中

## text_4

显示文本，一行四列

文本左对齐：``{col_type: 'text_4',extra: {textAlign: 'left'}}``，textAlign默认为center居中

## text_5

显示文本，一行五列

文本左对齐：``{col_type: 'text_5',extra: {textAlign: 'left'}}``，textAlign默认为center居中

## long_text

显示文本，长文本，不限制长度

高级用法：设置字体大小，示例
```js
{col_type:'long_text', extra: {textSize: 18}}
// 默认值16.5（但是大家用的时候必须为整数）
```

## rich_text

富文本，示例
```html
<span>111<font color="#666666"></font></span>
```

高级用法：设置字体大小，示例
```js
{col_type:'rich_text', extra: {textSize: 18}}
// 默认值16
```

高级用法：设置行间距，示例
```js
{col_type:'rich_text', extra: {lineSpacing: 10}}
// 阅读模式下以用户设置为准
```

高级用法：小图片避免横向放大，只需在src链接后加个#originalSize#，示例
```js
{col_type:'rich_text', title: '<img src="http://xx.com/1.png#originalSize#">'}
```

## pic_3

一行三列，““只””显示图片，因此只适合图片类型的频道

## pic_3_square

一行三列，和pic_3类似，只是是正方形

## pic_2

一行两列，适合每一列显示图片、名称和描述，图片为矩形，和movie_2基本上一样，只有图片一个为直角，一个为圆角矩形

## pic_2_card

一行两列，图片为竖向，适合手机壁纸类规则

## pic_1

一行一列，图片显示得比较大，适合每一列显示图片、名称和描述的频道，且图片和标题比较重要，描述较少的情况

## pic_1_full

一行一列，图片显示得比较大，宽度为手机屏幕宽度，高度为根据图片宽高比自动适应

## pic_1_center

一行一列，图片显示在中间，宽高自适应，适用于验证码等小图片，请不要显示大图片

## icon_4

一行四列，顶部为图片，底部为标签，类似桌面图标

## icon_4_card

一行四列，顶部为图片，底部为标签，类似桌面图标，只是图片为圆角矩形

## icon_small_4

一行四列，顶部为图片，底部为标签，类似桌面图标，只是图片小一些

## icon_small_3

一行三列，左边为图片，右边为标签，类似论坛列表中点赞、回复、浏览

## icon_round_4

一行四列，顶部为图片，底部为标签，类似桌面图标，只是图片自动裁切为圆形

## icon_round_small_4

一行四列，顶部为图片，底部为标签，类似桌面图标，图片自动裁切为圆形，图片小一些

## icon_2

一行两列，左边图标，右边标题

## icon_2_round

一行两列，左边圆形图标，右边标题

## 混用

在js中可以对每个结果设置``col_type``，比如``j[0].col_type='text_3'``, ``j[1].col_type='text_2'``，没有单独对每个结果设置的，默认赋值为规则中统一的col_type，使用非js来解析的不支持混用

## line

分割线

## line_blank

空白块分割线，和pic_1的分割线一样

## avatar

头像样式，需要标题和图片

可选desc属性，有值时显示在最右侧，支持富文本格式

## text_icon

左侧文字，右侧图标

## blank_block

空白块，宽度为屏幕宽度，高度为1dp

## x5_webview_single

腾讯X5浏览器组件，宽度为屏幕宽度，高度默认为240，可以将高度写入desc字段，若设置为auto那么会自适应，常用于视频显示或者复杂样式显示的页面，如果和视界交互逻辑较为复杂，不建议使用此组件

::: warning 注意：
一个二级/首页页面只能有一行使用此组件，样式标识中的single就是让大家谨记
:::

如何刷新页面：一个是更新页面返回结果，自动刷新，第二个就是类似toast://，使用返回链接为x5WebView://http://a.com的形式，视界会自动刷新，如：

``url@lazyRule=.js:'x5WebView://http://a.com'``

第三个就是js里面调用``refreshX5WebView('http://a.com')``

如何悬浮悬停：desc里面用float，比如desc:'240 && float'，那么就会悬停显示，并且高度为240，列表显示用desc:'240&&list'，默认为列表显示模式，支持高度100%，但是必须是float模式，即'float&&100%'，

高度为屏幕宽度9/16:'float&&video'、'list&&video'，高度为屏幕高度：'list&&screen'，高度为屏幕高度减去部分高度：'list&&screen-100'、'float&&screen-100'

顶部网页底部分类：desc: 'float&&top'，那么x5组件会占满除了分类的高度，用于分类切换链接显示不同的网站

高级用法：和网页里面一样支持``fy_bridge_app.getVar``等方法，具体支持的方法列表见‘‘网页接口’’，和网页一样会自动注入网页插件和拦截广告，但是不支持adblockplus

用x5全屏打开网页：``url@lazyRule=.js:'x5://http://a.com'``

启用返回键：```{col_type: 'x5_webview_single', extra: {canBack: true}}```

设置UA：```{col_type: 'x5_webview_single', extra: {ua: MOBILE_UA}}```，MOBILE_UA/PC_UA是视界内置变量，也可以使用自定义的字符串

注入JS：``{col_type: 'x5_webview_single', extra: {js: 'console.log("我加载了")'}}``，每次网页加载完都会执行

注入JS（加载中也注入）：``{col_type: 'x5_webview_single', extra: {js: 'console.log("我加载了")', jsLoadingInject: true}}``，可以让JS快速生效，也就是会执行两次，需要自行处理重复加载的问题

拦截资源：``{col_type: 'x5_webview_single', extra: {blockRules: ['baidu.*.png','.jpg']}}``，拦截部分让网页更快加载

设置Referer：``{col_type: 'x5_webview_single', extra: {referer: 'http://xx.com'}}``

拦截页面跳转：``{extra: {urlInterceptor: $.toString(()=>{if(input.includes('/ad/')) return true})}}``，注意该代码不是在网页中执行的，没有fy_bridge_app

拦截页面跳转原生界面：只需要返回一个JS代码字符串，在代码中跳转原生界面即可（注意代码为网页中执行，如``fy_bridge_app.open()``），““””<a href="https://github.com/qiusunshine/hiker-rules/blob/master/%E7%A4%BA%E4%BE%8B/urlInterceptor.js">点击查看示例</a>

悬浮嗅探播放
```js
extra: {floatVideo: true}
```
开启后该组件会自动嗅探网页中的视频，如果检测到视频就会弹出悬浮视频层，网页刷新会自动重新提取视频，嗅探播放时会自动暂停网页中的视频，部分网站无法暂停的可以直接全屏，全屏会暂停一切网页活动

不要显示进度条：``extra: {showProgress: false}``

音视频自动播放：``extra: {autoPlay: true}``

长按图片不显示菜单：``extra: {imgLongClick: false}``

浏览器代理替换：提前在解析规则JS代码里面执行``addWebProxyRule({ name: 'test.com', match: '.*test\\.com/.*', replace: 'input.replace("1", "2")', requestHeaders: {'dns': '192.1.1.122', 'x-requested-with': 'android'}, responseHeaders: [{ match: 'content-security-policy', replace: '' }] })``

## flex_button

自适应流式布局，多个``flex_button``组成一个布局，连续push多个，软件会自动识别和聚合，常用于作为分类按钮，和普通text_4类似，文本标题支持html

## scroll_button

自适应滚动布局，多个``scroll_button``组成一个布局，连续push多个，软件会自动识别和聚合，常用于作为分类按钮，和普通text_4类似，文本标题支持html，和flex_button类似，但是不会自动换行

## card_pic_2

方形卡片布局，一行两列，图片默认会高斯模糊，desc可以设置数字，0-25之间，默认为15，0代表不需要模糊

## card_pic_1

和card_pic_2完全一样，只是独占一行

## card_pic_2_2

方形卡片布局，一行两列，且一行会显示两个卡片，即上下两个卡片，也就是需要连续push两个，每个单独设置图片链接和跳转地址，软件会自动聚合，连续超过2个多的不显示

常用于左边一个card_pic_2，右边两个card_pic_2_2组成一个卡片组，该样式只能用于右侧显示，放左侧会导致右侧空白，因为会自动换行

desc可以填入数字，表示组件高度，如80，那么组件高度就会自动变成120，默认不设置的情况下整个组件高度和宽度一致，两个card_pic_2_2则单个为宽度的一半

## card_pic_2_2_left

方形卡片布局，一行两列，且一行会显示两个卡片，即上下两个卡片，也就是需要连续push两个，每个单独设置图片链接和跳转地址，软件会自动聚合，连续超过2个多的不显示

常用于左边两个card_pic_2_2，右边一个card_pic_2组成一个卡片组，该样式只能用于左侧显示

## card_pic_3

一行三列，图片为圆角矩形

## input

单行输入框布局

示例
```js
{url:"'toast://你输入的是' + input", col_type:'input', title:'搜索'}
```
也就是用户点击确定的时候会执行一段url里面的js代码，输入框中的值就是input变量的值，使用title设置右侧按钮的值

高级用法：监听输入框变化，示例
```js
{url:"'toast://你输入的是' + input", col_type:'input', title:'搜索', extra: {onChange: "putVar('my-search',input)"}}
```

高级用法：隐藏确定按钮，示例
```js
{col_type:'input', extra: {titleVisible: false}}
```

高级用法：设置默认值，示例
```js
{col_type:'input', extra: {defaultValue: 'test'}}
```

高级用法：输入类型，示例
```js
{col_type:'input', extra: {type: 'textarea'}}
// 可选值：textarea、password、number
```

高级用法：设置高度，示例
```js
{col_type:'input', extra: {type: 'textarea',height: -1}}
// 可选值：-1和正整数，这里高度为倍数，-1代表自适应，整数代表单行输入框的高度的倍速，默认为3
```

高级用法：高亮编辑，示例
```js
{col_type:'input', extra: {type: 'textarea',highlight: true}}
// 注意此模式下title和url属性不生效
```

## icon_1_search

单行输入框样式，但是实际上不能输入，只能触发点击事件，可设置搜索图标

