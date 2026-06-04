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

## Architecture

```
App.vue (root — lifecycle hooks + global CSS)
  └── main.js (Vue instantiation + mount)
        └── pages.json (route table — 5 pages, all custom nav)
              ├── pages/home/index.vue     首页 / Home
              ├── pages/search/index.vue   搜索 / Search & Discover
              ├── pages/note/index.vue     笔记 / Notes (waterfall)
              ├── pages/mine/index.vue     我的 / Profile
              └── pages/login/index.vue    登录 / Login
```

**Shared components** (`components/`):
- `bottom-tab.vue` — reusable bottom tab bar (accepts `active` prop: `"home"` | `"search"` | `"note"` | `"mine"`). Navigates via `uni.reLaunch`. Used by all four main pages.
- `mini-player.vue` — fixed bottom mini player with spinning record animation. Used by all pages except login.

**Data layer** (`common/data.js`):
Central mock data file exporting all constants used across pages: theme colors, home cards/songs/playlists, discover icons, note list, user profile, playlist data, and the `STUDENT` login credentials object. Also exports `LOGIN_KEY` (`'musicFinalLoginUser'`) — the storage key for login session persistence.

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

## Styling conventions

- Theme background: `#665D5F`, text: `#F6F4F4`, accent red: `#FF2D55`
- All dimensions use `rpx` for cross-platform responsive sizing
- Scrollbars are globally hidden via `::-webkit-scrollbar { width: 0; height: 0; }`
- On H5, the app is constrained to a phone-width container to avoid stretching on desktop browsers
- Each page uses scoped `<style scoped>` blocks

## Default test account

Defined in `common/data.js`:
- 学号: `2312505051`, 姓名: `马望轩`, 密码: `123456`

## Static assets

`static/images/` contains 25 placeholder JPEG/PNG images (covers, songs, playlists, notes, avatar). To customize visuals, replace these files keeping the same filenames — no code changes needed.
