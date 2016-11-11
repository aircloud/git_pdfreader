pdfreader  for 智能终端软件设计,ZJU

本pdf阅读器由笔者独立设计开发完成，采用react native混合编程, 优先支持iOS
____

###核心功能介绍


* pdf列表
* 阅读指定链接的PDF
* 横屏阅读
* 增加标注
* 增加注释
* 云协作


###测试使用

请邮件onlythen@yeah.net


###难点分析

 1.react native 组件状态通知

react native约束和规范较多，虽然这个app是一个入门级的app，但是还是遇到了一个比较严重的问题：

自己在写首页组件的时候，父组件中包含一个ListView，但是ListView不能根据父组件传递的props进行及时更新，造成的结果就是：自己填写增加了一个新的pdf网址但是ListView并不能及时显示出来，这个问题应用redux单向数据流等也并不能很好的解决。

实际上目前自己也没有寻找到特别好的方案，只能通过增加一个刷新的按钮进行手动刷新(react native本身也提供了下拉刷新)，希望我能在以后开发自己的大app时候充分解决这个问题。

 2.socket编程

由于涉及到实时数据同步，所以需要和服务端建立socket链接，而这个过程较为复杂，这里面我列举一个获取别人的标注的socket通信过程(假设用户A要获取用户B的记录)

A向服务器推送事件请求B用户内容，携带Aid和Bid  =>

服务器收到事件，缓存A用户id，广播事件“根据id获取内容”，携带Bid  =>

B收到事件，比对id正确，推送给服务器事件“id匹配，发送内容”，携带json格式的内容 =>

服务器收到事件，解析内容，推送事件“回传内容”，携带缓存的Aid和json格式的内容  =>

A收到事件，匹配Aid和自身id一致，解析json内容，更新dom，结束。

这个过程根据网速不同，处理时间有所不同，在10M带宽正常网速下，大约200-300ms即可处理完。

 3.触摸事件响应

由于涉及进行增加底纹标注，并且iOS本身自带一定的触摸事件，因此增加触摸事件很难协调好从而给用户一个良好的体验。

我采用的是判断用户各类触摸事件时间，时间不同，响应结果不同。
