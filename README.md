# 基于jQuery的图片滚动插件

## 特点

1、支持无缝滚动,回头滚动；
2、支持水平方向和垂直方向（CSS样式需自行定义）；

## 参数

``` javascript
import imgScroll from 'web-img-scroll'

imgScroll({ [wrap], [listTag], [itemTag], [btn01], [btn02], [direction], [step], [speed], [isSeamless], [isScreen], [count] });
```

``` javascript
// jquery 插件
$([wrap]).imgScroll({[listTag], [itemTag], [btn01], [btn02], [direction], [step], [speed], [isSeamless], [isScreen], [count] });

```

***

|名称	|类型	|默认值	|描述
|:------|:------|:------|:------
|wrap	|string	|null	|最外层容器，值为id名或者唯一class类名
|listTag	|string	|"ul"	|图片列表标签，默认值为"ul"
|itemTag	|string	|"li"	|图片列表项标签，默认值为"li"
|btn01	|string	|null	|控制按钮，水平方向为向左控制按钮，垂直方向为向上控制按钮，值为id名或者class类名
|btn02	|string	|null	|控制按钮，水平方向为向右控制按钮，垂直方向为向下控制按钮，值为id名或者class类名
|direction	|string	|"horizontal"	|图片滚动方向，默认值为"horizontal"，即水平方向，还可设置为"vertical",即垂直方向
|step	|number	|null	|图片滚动步长，默认值为null，控制图片滚动的距离
|speed	|number	|500	|滚动动画时间，默认值为500，单位毫秒，控制滚动速度
|isSeamless	|boolean	|true	|是否为无缝滚动，默认值为true，即无缝滚动，设为false，即回头滚动
|isScreen	|boolean	|true	|是否为整屏滚动，默认值为true，即整屏滚动，设为false，即单图滚动
|count	|number	|1	|一屏中的图片列表项个数，默认值为1，即整屏滚动时一屏中只有一个图片列表项，用以判断当图片总总列表项个数少于一屏的图片列表项个数时取消按钮操作

