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
App.vue (root — lifecycle hooks + global CSS)
  └── main.js (Vue instantiation + mount)
        └── pages.json (route table — 6 pages, all custom nav)
              ├── pages/home/index.vue     首页 / Home
              ├── pages/search/index.vue   搜索 / Search & Discover
              ├── pages/note/index.vue     笔记 / Notes (waterfall)
              ├── pages/mine/index.vue     我的 / Profile
              ├── pages/login/index.vue    登录 / Login
              └── pages/index/index.vue    演示 / SideDrawer demo
```

**Shared components** (`components/`):
- `bottom-tab.vue` — reusable bottom tab bar (accepts `active` prop: `"home"` | `"search"` | `"note"` | `"mine"`). Navigates via `uni.reLaunch`. Used by all four main pages.
- `mini-player.vue` — fixed bottom mini player with spinning record animation. Used by all pages except login. Note: song/artist text is currently hardcoded in the template (not driven by `playerInfo` from `data.js`).
- `SideDrawer/SideDrawer.vue` — left-side slide-out drawer menu, 80vw wide, z-index 10000 (above mini-player and bottom-tab). Supports `v-model` for open/close, left-swipe gesture to dismiss, and emits `item-click`/`setting-click`/`more-click`. Includes SVIP card, activity banner, and scrollable menu items. Used by `pages/index/index.vue`.

**Custom navigation pattern**: All pages set `navigationStyle: "custom"` in `pages.json`, so every page implements its own status bar (`<view class="status-bar">`) and header/nav bar. There is no shared nav component — each page repeats this pattern.

**Page layout convention**: Every main page follows the same stacking order:
1. Status bar placeholder (compensates for system status bar height)
2. Page-specific top bar / header
3. `<scroll-view>` with main content
4. `<mini-player>` (fixed, z-index 9998)
5. `<bottom-tab>` (fixed, z-index 9999, except on login page)
6. `<side-drawer>` (fixed, z-index 10000, only on pages that use it)

The login page is the only page that omits mini-player and bottom-tab.

**Data layer** (`common/data.js`):
Central mock data file exporting all constants used across pages: `STUDENT` credentials, `LOGIN_KEY`, `theme` colors, `homeTabs`/`homeCards`/`recommendSongs`/`recommendPlaylists`, `discoverIcons`/`quickDiscover`/`browseAll`, `noteList`, `profile`, `myPlaylists`, and `playerInfo` (mini-player song metadata — currently unused by the component, which has hardcoded strings instead).

**Login flow**:
1. `mine/index.vue` checks `uni.getStorageSync(LOGIN_KEY)` on each `onShow`.
2. If no session, user taps "去登录" → navigates to `login/index.vue`.
3. Login form validates against `STUDENT` in `common/data.js` (fields: 学号/姓名/密码).
4. On success, writes `{ id, name }` to storage under `LOGIN_KEY` and redirects back.
5. Logout removes the key via `uni.removeStorageSync`.

## Key files

| File | Role |
|------|------|
| `pages.json` | Route registration and global style (background `#665D5F`, custom nav on all pages) |
| `manifest.json` | uni-app app manifest (appid, version, platform configs) |
| `App.vue` | Root component — global CSS reset, scrollbar hiding, box-model normalization |
| `main.js` | Vue 2 entry point, no plugins or global config beyond `productionTip = false` |
| `common/data.js` | All mock data and constants — the single source of truth for the entire app |
| `components/SideDrawer/SideDrawer.vue` | Left-side drawer menu — highest z-index (10000), v-model driven, gesture-enabled |

## Styling conventions

- Theme background: `#665D5F`, text: `#F6F4F4`, accent red: `#FF2D55`
- All dimensions use `rpx` for cross-platform responsive sizing
- Scrollbars are globally hidden via `::-webkit-scrollbar { width: 0; height: 0; }`
- On H5, the app is constrained to a phone-width container to avoid stretching on desktop browsers
- Each page uses scoped `<style scoped>` blocks

## Default test account

Defined in `common/data.js`:
- 学号: `2312505051`, 姓名: `马望轩`, 密码: `123456`

To customize for a different student, edit the `STUDENT` object's `id`, `name`, and `password` fields. The login page has a "一键填入测试账号" button that fills the form from `STUDENT`.

## Static assets

`static/images/` contains 25 placeholder JPEG/PNG images (covers, songs, playlists, notes, avatar). To customize visuals, replace these files keeping the same filenames — no code changes needed.
