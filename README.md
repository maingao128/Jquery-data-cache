# jQuery 思路简单实现data数据缓存

####简单的介绍一下jquery的data缓存机制，我们都知道html的标签上可以通过自定义熟悉存储一些数据，比如简单的字符串和数字等等，
但是如果在自定义属性上存储对象数据，如果存储的对象数据有引用了当前dom，就会造成内存泄露，所有jquery建立了一个中间对象间接的
对应联系


```
elem[expando] = uid;
#其中expando是一个随机数，不同的data对象，expando不同

this.cashe[uid] = data;

```

####每次data操作先获取对象elem的uid,然后根据uid到对应的cashe中寻找数据，进行操作


```
<div id="test" data-id="123">
#如果对象这html5的data标签，也可以通过elem.attributes，然后匹配'data-'获取其数据；

```

####关于data缓存用的地方很多，有一个比较巧妙的用法就是再写jquery插件使用，可以防止重复定义插件，也可以直接调用插件内部的某个方法

```
#引用自写的移动端banner NewBanner()插件
function plugin(option){

#这里可以对option参数进行一些处理
	return this.each(function(){
		var data = $(this).data("banner");
		var options = typeof option === "object" ? option : {};
		options.target = $(this);
		if(!data) $(this).data("banner",datas = new NewBanner(options));
		if(typeof option === "string") data[option]();
	})
}

$.fn.NewBanner = plugin;

```
