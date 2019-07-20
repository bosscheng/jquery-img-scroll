/**
 * date: 2017/6/26
 * desc:  img scroll 插件
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.imgScroll = factory(root.jQuery);
    }
}(this, function ($) {
    var imgScroll = function (opt) {
        //默认参数
        var _d = {
            wrap: null,//图片滚动容器
            listTag: "ul",//图片列表标签
            itemTag: "li",//图片列表项标签
            btn01: null,//图片滚动控制按钮1(水平方向为向左控制按钮，垂直方向为向上控制按钮)
            btn02: null,//图片滚动控制按钮2(水平方向为向右控制按钮，垂直方向为向下控制按钮)
            direction: "horizontal",//滚动方向 [horizontal,vertical]
            step: null,//滚动步长
            speed: 500,//滚动动画时间
            isSeamless: true,//是否无缝滚动
            isScreen: true,//是否整屏滚动
            count: 1//单屏图片显示个数,只有isScreen设置为false的时候才需设置值
        };
        //合并参数
        var arg = $.extend(_d, opt);

        var list = $(arg.wrap).find(arg.listTag);
        var items = list.find(arg.itemTag);
        var btn01 = $(arg.wrap).find(arg.btn01);
        var btn02 = $(arg.wrap).find(arg.btn02);
        var len = items.length;
        var index = 0;
        var direction = arg.direction;
        var s = arg.speed;
        var isSeamless = arg.isSeamless;
        var isScreen = arg.isScreen;
        var c = arg.count;
        var l = Math.ceil(len / c);

        function lazyLoad(index, items) {
            items.eq(index).find("img").each(function () {
                if ($(this).attr("src3")) {
                    $(this).attr("src", $(this).attr("src3"));
                    $(this).removeAttr("src3");
                }
            });
        }

        //
        if (direction === "horizontal") {//水平方向滚动
            var w = arg.step;
            $(btn01).click(function () {
                if (len <= c || list.is(":animated")) {
                    return false;
                }
                if (isSeamless) {
                    if (isScreen) {
                        var last = list.find(arg.itemTag).last();
                        index--;
                        if (index == -1) {
                            last.css({"position": "relative", "left": -w * len});
                            list.stop().animate({"margin-left": w}, s, function () {
                                if (index == -1) {
                                    index = len - 1
                                }
                                ;
                                list.css({"margin-left": -w * (len - 1)});
                                last.removeAttr("style");
                            });
                        } else {
                            list.stop().animate({"margin-left": -w * index}, s);
                        }
                        lazyLoad(index, items);
                    } else {
                        index--;
                        if (index == -len) {
                            index = 0;
                        }
                        lazyLoad(index, items);
                        list.css("margin-left", -w);
                        list.find(arg.itemTag).last().clone().prependTo(list);
                        list.stop().animate({"margin-left": 0}, s, function () {
                            list.find(arg.itemTag).last().remove();
                        });
                    }
                } else {
                    index--;
                    if (isScreen) {
                        if (index == -1) {
                            index = len - 1;
                        }
                        lazyLoad(index, items);
                    } else {
                        if (index == -1) {
                            index = len - c;
                            for (var i = len - c; i < len; i++) {
                                lazyLoad(i, items);
                            }
                        }
                        var j = index + c;
                        lazyLoad(j - 1, items);
                    }
                    list.stop().animate({"margin-left": -w * index}, s);
                }
            });
            $(btn02).click(function () {
                if (len <= c || list.is(":animated")) {
                    return false;
                }
                if (isSeamless) {
                    if (isScreen) {
                        var first = list.find(arg.itemTag).first();
                        index++;
                        if (index == len) {
                            first.css({"position": "relative", "left": w * len});
                            list.stop().animate({"margin-left": -w * len}, s, function () {
                                if (index == len) {
                                    index = 0
                                }
                                ;
                                list.css({"margin-left": 0});
                                first.removeAttr("style");
                            });
                        } else {
                            list.stop().animate({"margin-left": -w * index}, s);
                        }
                        lazyLoad(index, items);
                    } else {
                        index++;
                        if (index == len - 1) {
                            index = 0;
                        }
                        lazyLoad(index + c - 1, items);
                        list.css("margin-left", 0);
                        list.find(arg.itemTag).first().clone().appendTo(list);
                        list.stop().animate({"margin-left": -w}, s, function () {
                            list.find(arg.itemTag).first().remove();
                            list.css("margin-left", 0);
                        });
                    }
                } else {
                    index++;
                    if (isScreen) {
                        if (index == len) {
                            index = 0;
                        }
                        lazyLoad(index, items);
                    } else {
                        if (index == len - c + 1) {
                            index = 0
                        }
                        var j = index + c;
                        lazyLoad(j - 1, items);
                    }
                    list.stop().animate({"margin-left": -w * index}, s);
                }
            });
        } else if (direction === "vertical") {//垂直方向滚动
            var h = arg.step;
            $(btn01).click(function () {
                if (len <= c || list.is(":animated")) {
                    return false;
                }
                if (isSeamless) {
                    if (isScreen) {
                        var last = list.find(arg.itemTag).last();
                        index--;
                        if (index == -1) {
                            last.css({"position": "relative", "top": -h * len});
                            list.stop().animate({"margin-top": h}, s, function () {
                                if (index == -1) {
                                    index = len - 1
                                }
                                ;
                                list.css({"margin-top": -h * (len - 1)});
                                last.removeAttr("style");
                            });
                        } else {
                            list.stop().animate({"margin-top": -h * index}, s);
                        }
                        lazyLoad(index, items);
                    } else {
                        index--;
                        if (index == -len) {
                            index = 0;
                        }
                        lazyLoad(index, items);
                        list.css("margin-top", -h);
                        list.find(arg.itemTag).last().clone().prependTo(list);
                        list.stop().animate({"margin-top": 0}, s, function () {
                            list.find(arg.itemTag).last().remove();
                        });
                    }
                } else {
                    index--;
                    if (isScreen) {
                        if (index == -1) {
                            index = len - 1;
                        }
                        lazyLoad(index, items);
                    } else {
                        if (index == -1) {
                            index = len - c;
                            for (var i = len - c; i < len; i++) {
                                lazyLoad(i, items);
                            }
                        }
                        var j = index + c;
                        lazyLoad(j - 1, items);
                    }
                    list.stop().animate({"margin-top": -h * index}, s);
                }

            });
            $(btn02).click(function () {
                if (len <= c || list.is(":animated")) {
                    return false;
                }
                if (isSeamless) {
                    if (isScreen) {
                        var first = list.find(arg.itemTag).first();
                        index++;
                        if (index == len) {
                            first.css({"position": "relative", "top": h * len});
                            list.stop().animate({"margin-top": -h * len}, s, function () {
                                if (index == len) {
                                    index = 0
                                }
                                ;
                                list.css({"margin-top": 0});
                                first.removeAttr("style");
                            });
                        } else {
                            list.stop().animate({"margin-top": -h * index}, s);
                        }
                        lazyLoad(index, items);
                    } else {
                        index++;
                        if (index == len - 1) {
                            index = 0;
                        }
                        lazyLoad(index + c - 1, items);
                        list.css("margin-top", 0);
                        list.find(arg.itemTag).first().clone().appendTo(list);
                        list.stop().animate({"margin-top": -h}, s, function () {
                            list.find(arg.itemTag).first().remove();
                            list.css("margin-top", 0);
                        });
                    }
                } else {
                    index++;
                    if (isScreen) {
                        if (index == len) {
                            index = 0;
                        }
                        lazyLoad(index, items);
                    } else {
                        if (index == len - c + 1) {
                            index = 0
                        }
                        var j = index + c;
                        lazyLoad(j - 1, items);
                    }
                    list.stop().animate({"margin-top": -h * index}, s);
                }
            });
        }
    };

    // 绑定jquery 插件
    $.fn.imgScroll = function (opt) {
        // 绑定 wrap 对象
        var ext = {
            wrap: $(this)
        };

        opt = $.extend(opt, ext);

        imgScroll(opt);
    };

    return imgScroll;
}));
