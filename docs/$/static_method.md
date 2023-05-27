## $.toString()
:::tip
将函数转化为立即执行函数的字符串 。

后面的lazyRule,rule等方法都是以这个函数为基准(用法都差不多)。
:::

语法:
```js
$.toString(func,arg1,...argN)
```

参数值：
| 参数         |      是否必须      |  描述 |
| -------      | ------------- | -------------- |
| func          | 是 | 需要转化的函数 。 |
| arg1,...argN      |   否    |   向func函数传入参数。支持类型：json对象，函数。 TS:传递参数时需要func有对应形参接收 |

返回值：
| 类型         |      描述      |
| -------      | ------------- |
| String          | "(function(){})()" |

示例：
```js
//传递单个参数
let url = $.toString(index => {//箭头函数单个参数可以不用()
	log(index);
}, 1);
log(typeof url);	//string
log(url);	//((index)=>{log(index);})(1)

//传递多个参数
let url2 = $.toString((a, b, c)=>{//箭头函数多个参数需要用(),不传参数需要用()占位
	log(a + b + c);
}, 1, 2, 3);//这里a对应1,b对应2,c对应3
log(typeof url2);	//string
log(url2);	//((a,b,c)=>{log(a+b+c);})(1,2,3)
```

典型用例：
::: code-group
```js [input样式的url]
{
  col_type: "input",
  url: $.toString(() => "toast://"+input)
}
//点击后弹出通知，通知内容为输入框的输入内容
```
```js [addListener监听事件]
addListener("close", $.toString(() => {
  clearVar("test");
}))
//关闭页面时，清除test全局变量
```
:::

## $.stringify()
:::tip
将基本数据类型和部分引用型数据类型转化为字符串，如 json对象，函数。
:::

语法:
```js
$.stringify(object)
```

参数值：
| 参数         |      是否必须      |  描述 |
| -------      | ------------- | -------------- |
| Object          | 是 | 需要转化的对象 |

返回值：
| 类型         |      描述      |
| -------      | ------------- |
| String          | String	字符串 |

示例：
```js
let obj = {
  tisp: "hello",
  time: 2021,
  log() {
  	log(this.tisp + this.time);
  }
};
let objectStr = $.stringify(obj);
log(typeof objectStr);	//string
```

## $.require()
:::tip
将基本数据类型和部分引用型数据类型转化为字符串，如 json对象，函数。
:::

语法:
```js
$.require(path,importParam)
```

参数值：
| 参数         | 类型         |      是否必须      |  描述 |
| -------      | -------      | ------------- | -------------- |
| path          | path          | 是 | 模块路径，可以是子页面、本地文件、远程文件 |
| importParam          | -          | 否 | 	仅在生成模块时可用的外部参数 |

返回值：
| 类型         |      描述      |
| -------      | ------------- |
| $.exports的类型         | 返回$.exports的值 |

示例：

详见[$.exports](./static_property.html#exports)

::: tip 说明
1. 使用$.require()时，会先执行路径文件中的代码，然后返回$.exports，因此代码中必须定义$.exports。
2. 为防止影响引用环境，$.require()设计成了闭包，因此调用$.exports中的函数时无法直接使用外部变量。要使用外部变量应通过传参的方式传入，或者使用$.hiker.a的方式调用外部变量（不建议也不应这样用）。
:::

## $.type()
:::tip
比typeof更加强大的数据类型判断。
:::

语法:
```js
$.type(param)
```

参数值：
| 参数         |      是否必须      |  描述 |
| -------      | ------------- | -------------- |
| param          | 是 | 任意数据类型 |

返回值：
| 类型         |      描述      |
| -------      | ------------- |
| String          | 传入参数的数据类型 |

示例：
```js
log($.type(a)); //'undefined'
log($.type(null)); //'null'
log($.type(true)); //boolean
log($.type(0)); //number
log($.type('test')); //string
log($.type(function(){})); //function
log($.type([1,2])); //array
log($.type(new Date)); //date
log($.type(new RegExp)); //regexp
log($.type({})); //object
log($.type(new Error)); //error
log($.type(Symbol())); //symbol
```

## $.dateFormat()
:::tip
格式化日期
:::

语法:
```js
$.dateFormat(date, text)
```

参数值：
| 参数         | 类型         |      是否必须      |  描述 |
| -------      | -------      | ------------- | -------------- |
| date          | Date或Number          | 是 | 要格式化的日期 |
| text          | String        | 是 | 	日期格式化的格式 |

返回值：
| 类型         |      描述      |
| -------      | ------------- |
| String         | 格式化后的日期 |

示例：
```js
let text = "yyyy年-MM月-dd日-hh时-mm分-ss秒";
log(new Date(),text);
log(1640667814055,text); //2021年12月28日1时3分34秒
```

说明：
| 日期字符        | 含义 |
| -------      | ------------- |
| G        | Era 标志符 |
|G	|Era 标志符|
|y	|年|
|M	|月份|
|w	|年中的周数|
|W	|月中的周数|
|D	|年中的天数|
|d	|月中的天数|
|F	|月份中的星期数|
|E	|星期中的天数|
|a	|am/pm标记|
|H	|一天中的小时数(0-23)|
|k	|一天中的小时数(1-24)|
|K	|am/pm中的小时数(0-11)|
|h	|am/pm中的小时数(1-12)|
|m	|小时中的分钟数|
|s	|分钟中的秒数|
|S	|毫秒数|
|z、Z	|时区|

## $.log()
:::tip
格式化字符串输出。
:::

语法:
```js
$.type(param)
```

参数值：
| 参数         |      是否必须      |  描述 |
| -------      | ------------- | -------------- |
| param          | 是 | 要输出的内容 |
| arg1,...,argN          | 否 | 否	格式化输出的参数 |

返回值：
| 类型         |      描述      |
| -------      | ------------- |
| param的类型          | 返回传入的第一个参数 |

示例：
```js
$.log([1,2,3]); //"[1,2,3]"( 相当于log($.stringify([1,2,3])) )
$.log("%s","hello"); //"hello"

//可以用以下方式方便地进行log
function test(text){ return text};
let text = $.log(test("hello"));
```

::: tip 说明
格式化输出详见 https://www.cnblogs.com/zhongjunbo555/p/11383159.html
:::

