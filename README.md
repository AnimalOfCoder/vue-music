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
│   │   ├── singer.js（获取歌手列表数据）
│   │   └── song.js
│   ├── base（技术组件）
│   │   ├── confirm
│   │   │   └── confirm.vue
│   │   ├── listview（列表组件）
│   │   │   └── listview.vue
│   │   ├── loading
│   │   │   ├── loading.gif
│   │   │   └── loading.vue（加载圈组件）
│   │   ├── no-result
│   │   │   ├── no-result.vue
│   │   │   ├── no-result@2x.png
│   │   │   └── no-result@3x.png
│   │   ├── progress-bar（进度条组件）
│   │   │   └── progress-bar.vue
│   │   ├── progress-circle（环形进度条）
│   │   │   └── progress-circle.vue
│   │   ├── scroll（滚动组件）
│   │   │   └── scroll.vue
│   │   ├── search-box
│   │   │   └── search-box.vue
│   │   ├── search-list
│   │   │   └── search-list.vue
│   │   ├── slider (轮播图组件)
│   │   │   └── slider.vue
│   │   ├── song-list（通用歌曲列表组件）
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
│   │   │   ├── dom.js （DOM相关操作）
│   │   │   ├── jsonp.js (封装jsonp请求)
│   │   │   ├── mixin.js
│   │   │   ├── singer.js（歌手类的封装）
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
│   │   ├── disc（歌单详情）
│   │   │   └── disc.vue
│   │   ├── m-header（头部）
│   │   │   ├── logo@2x.png
│   │   │   ├── logo@3x.png
│   │   │   └── m-header.vue
│   │   ├── music-list（歌手详情-歌曲列表组件）
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
│       ├── index.js（组装模块并导出 store）
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

## 首页（recommend）
### 轮播图组件（slider）
#### 总结
1.滚动利用better-scroll插件。</br>
2.轮播图组件采用动态计算的方式实现自适应。</br>
3.当fastclick插件与better-scroll插件的点击事件冲突时，可以通过fastclick的样式needsclick解决。</br>

### 歌单组件（listview）
#### 总结
1.由于部分请求头信息受浏览器控制，js无法设置。因此在webpack.dev.conf.js文件中配置一个node.js代理，经其转发然后返回所需数据。</br>
2.整体滚动仍然用betterScroll，由于多次使用到它，因此在此处抽出一个通用sroll组件。由于轮播图、歌单是两个不同接口数据渲染的，scroll组件需刷新两次，轮播图加载时刷新，歌单加载时刷新这样便能实现整体滚动。</br>
3.使用vue-lazyload实现歌单图片懒加载。</br>
4.通过一个loading组件优化用户体验。</br>

### 歌单详情组件（disc）
#### 总结
复用歌手详情页的歌曲列表（music-list）即可。

## 歌手页面
### 歌手列表页面（singer）
#### 总结
1.利用出左侧每组歌手高度形成的区间，通过计算y轴滚动距离落在哪个区间内，从而实现左右菜单联动。</br>
2.通过观测标题栏与固定标题栏之间的间距变化，计算出固定标题栏需要上移的距离，实现标题栏重合时的推动效果。</br>
## 歌手详情页（singer-detail）
#### 总结
1.引入vuex管理应用状态，实现歌手详情数据的传递</br>
2.列表滚动依然使用better-scroll。


## 播放器组件
### 总结
1.相关数据由vuex统一管理。如播放状态、播放器伸缩、歌曲切换等。</br>
2.播放器展开或缩小时唱片的动画，通过第三方库 create-keyframe-animation（一个使用js动态创建CSS3的框架）实现。</br>
3.接口返回歌词是base64格式的，解码base64的库为 js-base64。歌词解析使用的库为 lyric-parser。</br>
4.底部播放器适配推荐列表、歌曲列表、歌手列表，通过 vue提供的混入(mixins) 提高代码复用率。</br>

