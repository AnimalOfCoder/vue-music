# vue-music

> 音乐播放器

## 项目树
```
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package.json
├── prod.server.js
├── src
│   ├── App.vue
│   ├── api（后端请求相关代码，包括ajax、jsonp这些请求）
│   │   ├── config.js
│   │   ├── rank.js
│   │   ├── recommend.js （获取推荐页面的图片）
│   │   ├── search.js
│   │   ├── singer.js
│   │   └── song.js
│   ├── base（技术组件）
│   │   ├── confirm
│   │   │   └── confirm.vue
│   │   ├── listview
│   │   │   └── listview.vue
│   │   ├── loading
│   │   │   ├── loading.gif
│   │   │   └── loading.vue（加载圈组件）
│   │   ├── no-result
│   │   │   ├── no-result.vue
│   │   │   ├── no-result@2x.png
│   │   │   └── no-result@3x.png
│   │   ├── progress-bar
│   │   │   └── progress-bar.vue
│   │   ├── progress-circle
│   │   │   └── progress-circle.vue
│   │   ├── scroll（滚动组件）
│   │   │   └── scroll.vue
│   │   ├── search-box
│   │   │   └── search-box.vue
│   │   ├── search-list
│   │   │   └── search-list.vue
│   │   ├── slider (轮播图组件)
│   │   │   └── slider.vue
│   │   ├── song-list
│   │   │   ├── first@2x.png
│   │   │   ├── first@3x.png
│   │   │   ├── second@2x.png
│   │   │   ├── second@3x.png
│   │   │   ├── song-list.vue
│   │   │   ├── third@2x.png
│   │   │   └── third@3x.png
│   │   ├── switches
│   │   │   └── switches.vue
│   │   └── top-tip
│   │       └── top-tip.vue
│   ├── common（存放通用静态资源）
│   │   ├── fonts（字体文件）
│   │   │   ├── music-icon.eot
│   │   │   ├── music-icon.svg
│   │   │   ├── music-icon.ttf
│   │   │   └── music-icon.woff
│   │   ├── image（公用图片）
│   │   │   └── default.png
│   │   ├── js（公用js库）
│   │   │   ├── cache.js
│   │   │   ├── config.js
│   │   │   ├── dom.js （DOM相关操作的代码）
│   │   │   ├── jsonp.js (jsonp请求的封装)
│   │   │   ├── mixin.js
│   │   │   ├── singer.js
│   │   │   ├── song.js
│   │   │   └── util.js
│   │   └── stylus（通用样式）
│   │       ├── base.styl
│   │       ├── icon.styl
│   │       ├── index.styl
│   │       ├── mixin.styl
│   │       ├── reset.styl
│   │       └── variable.styl
│   ├── components（业务组件）
│   │   ├── add-song
│   │   │   └── add-song.vue
│   │   ├── disc
│   │   │   └── disc.vue
│   │   ├── m-header（头部）
│   │   │   ├── logo@2x.png
│   │   │   ├── logo@3x.png
│   │   │   └── m-header.vue
│   │   ├── music-list
│   │   │   └── music-list.vue
│   │   ├── player
│   │   │   └── player.vue
│   │   ├── playlist
│   │   │   └── playlist.vue
│   │   ├── rank（排名）
│   │   │   └── rank.vue
│   │   ├── recommend（推荐）
│   │   │   └── recommend.vue
│   │   ├── search（搜索）
│   │   │   └── search.vue
│   │   ├── singer（歌手）
│   │   │   └── singer.vue
│   │   ├── singer-detail
│   │   │   └── singer-detail.vue
│   │   ├── suggest
│   │   │   └── suggest.vue
│   │   ├── tab (导航栏)
│   │   │   └── tab.vue
│   │   ├── top-list
│   │   │   └── top-list.vue
│   │   └── user-center
│   │       └── user-center.vue
│   ├── main.js（入口文件）
│   ├── router（路由）
│   │   └── index.js
│   └── store（存放vuex相关代码）
│       ├── actions.js
│       ├── getters.js
│       ├── index.js
│       ├── mutation-types.js
│       ├── mutations.js
│       └── state.js
└── static
    ├── 1.png
    ├── 2.png
    ├── 3.png
    ├── 4.png
    └── 5.png

```

## 首页
### 轮播图组件
#### 技术点：
1.滚动利用better-scroll插件。
2.轮播图组件采用动态计算的方式实现自适应。
3.当fastclick插件与better-scroll插件的点击事件冲突时，可以通过fastclick的样式needsclick解决。
#### 数据来源：
利用QQ音乐的Jsonp接口：
https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1&jsonpCallback=__jp0

# 歌单组件
#### 技术点：
1.由于部分请求头信息受浏览器控制，js无法设置。因此在webpack.dev.conf.js文件中配置一个node.js代理，经其转发然后返回所需数据。
2.整体滚动仍然用betterScroll，由于多次使用到它，因此在此处抽出一个通用sroll组件。由于轮播图、歌单是两个不同接口数据渲染的，scroll组件需刷新两次，轮播图加载时刷新，歌单加载时刷新这样便能实现整体滚动。
3.使用vue-lazyload实现歌单图片懒加载。
4.通过一个loading组件优化用户体验。
