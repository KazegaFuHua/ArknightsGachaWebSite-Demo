# 明日方舟抽卡统计网站-Beta

#### 介绍
一个菜鸡自学PHP写的练习作品，用于统计明日方舟抽卡数量，出货率等，我知道写的东西很辣鸡，别骂了别骂了

由于PHP初学者，相关的DDos防护，流量访问限制，网站数据安全等都没有那么了解，（再加上没钱买服务器）所以暂时没有能力（主要是没钱）上线网站供大家使用，目前只能开放源码给大家下载，各位请自行搭建Web页面

网站后台基于PHP7.4开发，PHP7.x版本应该都能使用

#### 如何使用这一堆文件？

1.  首先你需要一个可以运行PHP后台程序的软件，例如各种集成环境
- Windows系统

  [小皮集成环境PHPStudy](https://www.xp.cn/download.html)

  [XAMPP(原名LAMPP)](https://www.apachefriends.org/index.html)

  [宝塔Windows面板](https://www.bt.cn/new/download.html)

  三个推荐的集成环境

  小皮是国内开发的软件中文友好。

  XAMPP是国外开发的知名Windows Web集成环境。

  宝塔的Linux Web面板更加知名一些，Linux面板的功能非常多，但我上一次使用宝塔的Windows面板发现宝塔Windows面板功能相对Linux版少很多，使用体验也没有Linux版好用，但他距离我上次使用已经更新了很多个版本，可以试试

- Linux系统

  [宝塔的Linux面板](https://www.bt.cn/new/download.html)

  Linux没啥好说的，我只知道一个宝塔面板
2.  下载网站源码，在当前页面上方有个橙色的`克隆/下载`的按钮，点击出现二级菜单，点击下载zip，[或者直接点我下载](https://gitee.com/xcfuhua/ArknightsGachaWebsite/repository/archive/master.zip)
    下载完了之后得到`ArknightsGachaWebsite-master.zip`的一个压缩包，将里面的`ArknightsGachaWebsite-master`文件夹解压到你电脑上的任意位置，例如`E:\WWW\ArknightsGachaWebsite-master`
3.  安装好Web集成环境之后，根据不同的集成环境操作建立一个网站，具体可以百度关键词"集成环境的名字"+"建站教程"，主要演示以 [小皮集成环境PHPStudy](https://www.xp.cn/download.html) 为主
- 打开小皮集成环境，选择左侧“首页”，在“套件”选项中，将点击Apache右侧启动
- 左侧选择“网站”，这里会默认有一个网站域名为`localhost`的网站，如果没有我们也可以点击左上角创建网站来创建一个。
- 创建网站，点击创建网站后，弹出基本配置，域名可以写成任意域名，但是我不建议这么做，可能会导致你无法访问这个域名原本的网站，我就以他自带的`localhost`为例，点击右侧的管理->修改，你可以看到“根目录”中这个网站的文件存放位置，你可以将刚才第二步解压出来的`ArknightsGachaWebsite-master`整个文件夹移动到他自动生成的目录中去，也可以将根目录改为`E:\WWW\ArknightsGachaWebsite-master`，程序类型勾选PHP，版本选择PHP7.3，PHP7.4都可以，到期日不用管，点击确认
4.  一切顺利的话现在你已经拥有了你自己的明日方舟抽卡网站，在同一台电脑上，打开浏览器，输入`http://localhost/ArknightsGachaWebsite-master`或者如果你更改了根目录，那就直接`http://localhost`就可以进入网站了

tips: 就国内大部分的网络环境来说，你当前搭建出来的这个网站，只能你自己使用，例如你是用你家里的电脑A搭建的网站，如果不经过一系列设置(防火墙允许通行，路由器端口映射，光猫获取公网IP等一些列复杂操作)你只能在这台电脑A上用浏览器访问这个网站，且搭建网站的集成环境软件必须打开！！

当然！！你也可以通过网络查找一些列的方法，使得你的网站可以让更多人访问到！！！
（没钱买服务器导致Web的便利性全无，反而复杂难搞很多，就当做学习交流了）
#### 如何更新网站

Gitee上的代码会我一直更新（更新频率不好说，老鸽子了），当你看到你心仪的功能更新或者严重的BUG被修复了之后要怎么更新你本地的文件呢？
前去上一条目第一步下载新的源码压缩包，打开本地的网站根目录例`E:\WWW\ArknightsGachaWebsite-master`，删除里面的除了`data`文件夹以外的所有内容，然后打开下载的源码压缩包，打开里面的`ArknightsGachaWebsite-master`文件夹，将里面的一堆文件选中，再解压到本地的网站根目录例`E:\WWW\ArknightsGachaWebsite-master`，然后在小皮集成环境中重启Apache服务就更新完成了

#### 目录解释说明

| 目录文件                | 解释                      |
|---------------------|-------------------------|
| data文件夹             | 存放抽卡数据（查询过后会创建）         |
| img文件夹              | 存放图片素材                  |
| favicon.png         | 网站图标                    |
| echarts.min.js      | js库文件-图表库               |
| jquery-3.6.0.min.js | js库文件-JQ库               |
| jquery-ui.min.js    | js库文件-JQUI库             |
| main.css            | 网站主要css样式               |
| main.js             | 网站主要js代码                |
| gacha.php           | 抽卡数据获取分析php             |
| amiya_title.wav     | 网页点击start播放的语音          |
| amiya_hello.wav     | 网页提交token播放的语音          |
| index.html          | 网页HTML结构文件              |
| README.md           | 你现在看到的这个就是README.md文件里的 |
| README.en.md        | README.md的英文版           |
| LICENSE             | 开源协议                    |
#### 参与贡献

如果有大佬看了这个项目不仅没有高血压，甚至还想贡献代码，请直接联系我的邮箱xuanchuanfuhua@qq.com

#### 相关视频

1.  我自己做的前期推广视频[Bilibili](https://www.bilibili.com/video/BV1BY411g76G/)
2.  小皮集成环境自建web视频教程(制作中)

#### 计划更新的内容

- 开发中:
    1. 右侧悬浮功能按钮
       - ~~阿米娅语音开关~~√
       - 小提示
       - 抽卡数据解释
       - ~~下载你的抽卡数据json格式~~√
       - 分享你的抽卡数据
- 计划开发：
    1. 六星出货历史记录显示为各自干员立绘的代表色（这也是参考原神抽卡记录软件的功能，觉得统一颜色有点单调）五星干员由于数量众多暂不考虑
    2. 优化CSS样式（CSS样式目前重复率有点高）
    3. 出货历史记录中，点击干员头像出现干员立绘预览，同时增加一个开关，可以关闭所有干员头像与立绘的展示（减小网站体积和更多功能二选一）
    4. 添加新获取到的干员样式