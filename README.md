# 云音乐复刻 uni-app 最终版

仿网易云音乐风格的 uni-app 课程作业项目，10 个页面，无后端，全 mock 数据。

## 页面

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `pages/home/index` | 推荐页：横向卡片、推荐歌单、推荐歌曲 |
| 搜索 | `pages/search/index` | 搜索 & 分类发现 |
| 笔记 | `pages/note/index` | 双列瀑布流 |
| 我的 | `pages/mine/index` | 个人中心、歌单、登录态 |
| 登录 | `pages/login/index` | 学号 + 姓名 + 密码登录 |
| 播放器 | `pages/player/index` | 全屏播放器：唱片旋转、进度条、歌词 |
| 歌单详情 | `pages/playlist/index` | 歌单歌曲列表 |
| 设置 | `pages/settings/index` | 账号设置、缓存清理、退出登录 |
| 消息 | `pages/messages/index` | 消息中心 |
| 演示 | `pages/index/index` | SideDrawer 组件演示 |

## 运行方式

1. 用 HBuilderX 打开项目文件夹
2. 运行到浏览器或手机模拟器

## 默认测试账号

在 `common/data.js` 中定义：

```js
export const STUDENT = {
  id: '2312505051',
  name: '马望轩',
  password: '123456'
}
```

提交前把三个值改成自己的：`id`（学号）、`name`（姓名）、`password`（自定义密码）。

登录方式：点击底部"我的" → "去登录" → 输入账号信息 → 或点击"一键填入测试账号"自动填充。

## 素材替换

`static/images/` 中的占位图可直接替换，文件名保持不变即可，无需修改代码。

## 版本

v1.4.0 — SideDrawer 修复为内联模板（解决 App 端子组件渲染隔离问题），全站 99+ 标记移除，CSS 变量补全，菜单按钮触控区修复，播客主界面 + 我的页面重构。
