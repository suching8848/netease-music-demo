# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A uni-app (Vue 2) mobile web app that clones the NetEase Cloud Music UI. It is a course assignment project ("云音乐复刻" / Cloud Music Replica). There is no backend — all data is hardcoded mock data.

## How to run

This project has no `package.json`, no Node-based tooling, and no CLI. It is built and run exclusively through **HBuilderX** (DCloud's proprietary IDE):

1. Open the project folder in HBuilderX.
2. Use HBuilderX's built-in runner to launch in a browser or device simulator.

There are no tests, no linters, and no build scripts.

## Tech stack

- **Framework**: uni-app (DCloud cross-platform framework targeting H5, WeChat Mini Program, and native App)
- **UI layer**: Vue 2 (Options API, single-file `.vue` components)
- **Language**: JavaScript (no TypeScript)
- **Styling**: Scoped CSS with `rpx` units (uni-app's responsive pixel unit, 750rpx = screen width)
- **State**: Component-local `data()` + `uni.setStorageSync`/`uni.getStorageSync` for login persistence. No Vuex or Pinia.
- **Routing**: File-based routing declared in `pages.json`. Navigation via `uni.navigateTo`, `uni.reLaunch`, `uni.navigateBack`. No Vue Router.
- **Build output**: `unpackage/` — HBuilderX generated build artifacts (gitignored). Never edit these files directly.

## Architecture

```
App.vue (root — lifecycle hooks + global CSS incl. drawer styles)
  └── main.js (Vue instantiation + mount)
        └── pages.json (route table — 10 pages, all custom nav)

Primary pages (tab bar — reLaunch navigation):
  ├── pages/home/index.vue      首页 / Home
  ├── pages/search/index.vue    搜索 / Search & Discover
  ├── pages/note/index.vue      笔记 / Notes (waterfall)
  └── pages/mine/index.vue      我的 / Profile

Secondary pages (pushed via navigateTo):
  ├── pages/login/index.vue     登录 / Login
  ├── pages/player/index.vue    全屏播放器 / Full-screen Player
  ├── pages/playlist/index.vue  歌单详情 / Playlist Detail
  ├── pages/settings/index.vue  设置 / Settings
  └── pages/messages/index.vue  消息中心 / Messages

Demo page:
  └── pages/index/index.vue     演示 / SideDrawer demo (uses SideDrawer.vue component)
```

**Navigation hierarchy**: The four primary pages are tab-bar pages that switch via `uni.reLaunch`. Secondary pages are pushed onto the navigation stack via `uni.navigateTo` and popped via `uni.navigateBack`.

**Shared components** (`components/`):
- `bottom-tab.vue` — reusable bottom tab bar (accepts `active` prop: `"home"` | `"search"` | `"note"` | `"mine"`). Navigates via `uni.reLaunch`. Used by all four main pages.
- `mini-player.vue` — fixed bottom mini player with spinning record animation. Used by all pages except login. Displays song info from `playerInfo` in `data.js`, initialized at mount and updated reactively via the `uni.$on('playSong')` event bus. Clicking it navigates to the full-screen player page. Emits `playingChange` events so other components can react to play/pause state.
- `SideDrawer/SideDrawer.vue` — left-side slide-out drawer **component** (used only by the demo page `pages/index/index.vue`). On the App platform, this component does NOT work reliably due to uni-app's sub-component rendering isolation (see known issues below).

## SideDrawer architecture (critical)

**The four main pages do NOT use `<side-drawer>` as a component.** Instead, the drawer template is **inlined directly into each page's template** and controlled by `drawerMixin.js`. This is the result of extensive App-platform debugging.

### Why inline

uni-app's App platform renders sub-components in an **isolated native view layer**. This means:
- `position: fixed` inside a sub-component is **not** relative to the screen viewport — it's relative to the component's own native view
- Component-internal `v-if` data changes may not trigger visible re-renders on App platform
- The component's DOM exists (`mounted()` fires) but all visual elements are invisible

The inline approach eliminates the component boundary entirely — the drawer's DOM is part of the page's rendering context, so `position: fixed` works correctly.

### How it works

```
drawerMixin.js          ← provides data (drawerActive, drawerMenuItems, …),
                           watch (showDrawer → _animateIn),
                           methods (openDrawer, closeDrawer, handleDrawer*)

App.vue <style>         ← global (non-scoped) drawer CSS classes (drawer-root,
                           drawer-mask, drawer-panel, drawer-menu-*, …)

Each page template      ← inline <view v-if="showDrawer" class="drawer-root">…</view>
                           placed as sibling of .page, inside .page-root
```

### Page layout convention (updated)

```
<view class="page-root">        ← overflow: visible; position: relative
  <view class="page">           ← overflow: hidden (content clipping)
    <status-bar />
    <top-bar />
    <scroll-view>…</scroll-view>
    <mini-player />
    <bottom-tab />
  </view>
  <!-- Drawer is sibling of .page, NEVER inside overflow:hidden container -->
  <view v-if="showDrawer" class="drawer-root">…</view>
</view>
```

**Critical rules for drawer visibility**:
1. The drawer element must be a **sibling** of the `overflow: hidden` content container, never inside it
2. No ancestor of the drawer can have `overflow: hidden`, `transform`, `filter`, `perspective`, `will-change`, or `contain` — these create containing blocks that break `position: fixed`
3. The drawer's `.drawer-root` has `z-index: 2147483647` (max) and `position: fixed`

### Menu button requirement

The ☰ button on all pages must have `margin-left: 24rpx` (minimum) to avoid `Not found -1,XX` errors on the App platform. On Android, touch coordinates too close to the left screen edge can become negative, causing uni-app to fail to locate the target view. The button should be a fixed-size touch target (88rpx × 88rpx) with `@tap.stop` on a `<view>` element (not `<text>`).

## Cross-component communication

(no Vuex — two patterns are used):

1. **Event bus** (`uni.$on` / `uni.$emit` / `uni.$off`): The mini-player listens for `playSong` (to update displayed song and start playing) and `togglePlay` events. It emits `playingChange` so other components (e.g., the full-screen player) can sync play/pause state.

2. **Shared mutable object** (`currentPlaySong` in `data.js`): Before calling `uni.navigateTo({ url: '/pages/player/index' })`, the caller writes the song into `currentPlaySong.song`. The player page reads it on load. This pattern exists because `navigateTo` URL parameters have serialization timing issues — the shared object is synchronous and reliable.

## Data layer (`common/data.js`)

Central mock data file exporting all constants used across pages. Key exports:

| Export | Purpose |
|--------|---------|
| `STUDENT` | Default test account (id, name, password) |
| `LOGIN_KEY` | Storage key for login session (`'musicFinalLoginUser'`) |
| `theme` | Color palette (bg, panel, text, subText, red) |
| `homeTabs`, `homeCards`, `recommendSongs`, `recommendPlaylists` | Home page content |
| `discoverIcons`, `quickDiscover`, `browseAll` | Search/discover page content |
| `noteList` | Note cards with varying heights (`h` field) for waterfall layout |
| `profile`, `myPlaylists` | User profile and playlist data |
| `playerInfo` | Default mini-player song metadata |
| `currentPlaySong` | **Mutable shared object** `{ song }` — workaround for passing song data between pages across `navigateTo` |
| `allSongs` | Complete song database (10 songs with id, name, singer, album, duration, cover) |
| `playlistDetailMap` | Maps playlist ID → { title, image, desc, playCount, songIds[] }. The playlist page resolves `songIds` against `allSongs` to build its track list. |
| `mockLyrics` | Timed lyric lines for the full-screen player |
| `mockMessages` | Message center items with read/unread state |

## Login flow

1. `mine/index.vue` checks `uni.getStorageSync(LOGIN_KEY)` on each `onShow`.
2. If no session, user taps "去登录" → navigates to `login/index.vue`.
3. Login form validates against `STUDENT` in `common/data.js` (fields: 学号/姓名/密码).
4. On success, writes `{ id, name }` to storage under `LOGIN_KEY` and redirects back.
5. Logout removes the key via `uni.removeStorageSync`.

## Key files

| File | Role |
|------|------|
| `pages.json` | Route registration (10 pages) and global style (background `#665D5F`, custom nav on all pages) |
| `manifest.json` | uni-app app manifest (appid `__UNI__305FB91`, platform configs for app-plus/weixin/h5) |
| `App.vue` | Root component — global CSS reset + **global drawer CSS classes** (non-scoped) + page-fade-in animation |
| `main.js` | Vue 2 entry point, no plugins or global config beyond `productionTip = false` |
| `common/data.js` | All mock data and constants — the single source of truth for the entire app |
| `common/drawerMixin.js` | **Central drawer logic**: data (`drawerActive`, `drawerMenuItems`), watch, animation (`_animateIn`/`closeDrawer`), event handlers. Used by all 4 main pages. |
| `components/bottom-tab.vue` | Reusable tab bar with 4 tabs, active indicator bar, red dot on 笔记 tab |
| `components/mini-player.vue` | Fixed mini player — spinning disc, event-bus-driven song updates, entry point to full-screen player |
| `components/SideDrawer/SideDrawer.vue` | SideDrawer **component** — used only by demo page. Does NOT work reliably on App platform. |
| `pages/player/index.vue` | Full-screen player — spinning disc, seekable progress bar, play controls, auto-scrolling lyrics |
| `pages/playlist/index.vue` | Playlist detail — resolves `songIds` from `playlistDetailMap` against `allSongs`, tap-to-play |
| `pages/settings/index.vue` | Settings page — logout (clears `LOGIN_KEY`), cache clearing, navigation to profile |
| `pages/messages/index.vue` | Message center — displays `mockMessages`, mark-all-read, read/unread styling |

## Styling conventions

- Theme background: `#665D5F`, text: `#F6F4F4`, accent red: `#FF2D55`
- All dimensions use `rpx` for cross-platform responsive sizing
- Scrollbars are globally hidden via `::-webkit-scrollbar { width: 0; height: 0; }`
- On H5, the app is constrained to a phone-width container to avoid stretching on desktop browsers
- Drawer styles are in `App.vue` **global** (non-scoped) `<style>` — class names use `drawer-*` prefix

## CSS variable pattern

Pages that use `calc()` with status bar height must set the `--status-bar-height` CSS variable on the `.page` element:

```html
<view class="page" :style="{ '--status-bar-height': statusBarPx }">
```

And in data/created:
```js
data() { return { statusBarPx: '44px' } },
created() {
  this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44
  this.statusBarPx = this.statusBarHeight + 'px'
}
```

Pages using this pattern: search, note, mine. (The home page uses `overflow-x: hidden` instead of `overflow: hidden` on `.page` and does not need the CSS variable.)

## Default test account

Defined in `common/data.js`:
- 学号: `2312505051`, 姓名: `马望轩`, 密码: `123456`

To customize for a different student, edit the `STUDENT` object's `id`, `name`, and `password` fields. The login page has a "一键填入测试账号" button that fills the form from `STUDENT`.

## Known platform issues

### App platform: sub-component rendering isolation

uni-app App platform (`compilerVersion: 3` + `usingComponents: true`) renders each sub-component in an isolated native view layer. Consequences:
- `position: fixed` inside sub-components is relative to the component's native view, NOT the screen
- Internal `v-if` data changes may not trigger visible re-renders
- Component `mounted()` fires and DOM exists, but CSS may not paint correctly

**Workaround**: For elements that need `position: fixed` (like the side drawer), inline the template directly into the page. Use a mixin for shared logic and App.vue global styles for shared CSS.

### App platform: touch coordinates at screen edge

On Android App platform, tap coordinates at the very left screen edge can become negative (e.g., `-1,72`), causing uni-app's `Not found` error and preventing `@tap` from firing. Fix: add `margin-left: 24rpx` minimum to any button near the left edge, and bind `@tap.stop` on a `<view>` with explicit `width`/`height` (not on `<text>`).

### App platform: CSS transition/animation on v-if mount

CSS `@keyframes animation` on a `v-if`-mounted element may not trigger on App platform because the element is "born" with the animation already set. Use `v-if` mount → initial closed state → `setTimeout(20-50ms)` → change to open state → CSS `transition` detects the change and plays. This pattern is implemented in `drawerMixin._animateIn()`.

### App platform: will-change creates containing block

`will-change: transform` on any element inside a `position: fixed` container can create a new containing block, breaking fixed positioning on some mobile WebViews. Avoid this property on drawer elements.

## Static assets

`static/images/` contains 25 placeholder JPEG/PNG images (covers, songs, playlists, notes, avatar). To customize visuals, replace these files keeping the same filenames — no code changes needed.
