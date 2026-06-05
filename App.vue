<script>
export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style>
/* ============================================================
   全局样式 — 云音乐复刻主题
   背景使用深灰渐变 + 暖色调过渡，更接近真实 App 质感
   ============================================================ */

/* 全局页面 */
page {
  min-height: 100vh;
  background: linear-gradient(180deg, #5a5053 0%, #665D5F 30%, #4a4245 100%);
  color: #F6F4F4;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  letter-spacing: 0.3rpx;
}

/* H5 浏览器 */
html,
body {
  width: 100%;
  min-height: 100%;
  margin: 0;
  background: #665D5F;
  overflow-x: hidden;
  overflow-y: auto;
}

uni-page,
uni-page-wrapper,
uni-page-body {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background: transparent;
}

/* 统一盒模型 */
view,
text,
image,
input,
button,
scroll-view,
swiper,
swiper-item {
  box-sizing: border-box;
}

/* 去掉按钮默认样式 */
button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
}

button::after {
  border: none;
}

/* 隐藏滚动条，但不影响滚动 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 全局过渡 — 所有页面切换有淡入效果 */
uni-page {
  animation: pageFadeIn 0.25s ease;
}

@keyframes pageFadeIn {
  from { opacity: 0; transform: translateY(6rpx); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 全局 tap 反馈 — 可点击元素统一按压态 */
view:active,
text:active {
  transition: opacity 0.1s;
}

/* 全局状态栏占位 — 毛玻璃半透明，统一各页面顶部 */
.status-bar {
  background: rgba(40, 35, 37, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* ============================================================
   全局 SideDrawer 样式 — 内联到各页面模板中，放全局避免重复
   ============================================================ */
.drawer-root {
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  width: 100%; height: 100%;
  z-index: 2147483647;
  pointer-events: auto;
  overflow: visible;
}
.drawer-mask {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  opacity: 0;
  transition: opacity 300ms ease;
}
.drawer-panel {
  position: absolute;
  top: 0; left: 0;
  width: 600rpx; height: 100%;
  z-index: 2147483647;
  background: linear-gradient(180deg, #50484a 0%, #5c5456 20%, #4a4345 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 12rpx 0 48rpx rgba(0, 0, 0, 0.35);
  transform: translateX(-100%);
  transition: transform 300ms ease;
}
.drawer-top { flex-shrink: 0; height: 170rpx; display: flex; align-items: center; justify-content: space-between; padding: 0 28rpx; }
.drawer-user-info { display: flex; align-items: center; flex: 1; min-width: 0; }
.drawer-avatar { width: 58rpx; height: 58rpx; border-radius: 50%; background: #888; flex-shrink: 0; }
.drawer-user-name-row { display: flex; align-items: center; margin-left: 16rpx; min-width: 0; }
.drawer-user-name { color: #fff; font-size: 28rpx; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.drawer-user-arrow { color: rgba(255,255,255,0.5); font-size: 32rpx; margin-left: 6rpx; }
.drawer-user-actions { display: flex; align-items: center; gap: 28rpx; flex-shrink: 0; }
.drawer-scroll { flex: 1; overflow-y: auto; }
.drawer-scroll-spacer { height: 40rpx; }

/* SVIP */
.drawer-svip { margin: 0 36rpx; padding: 28rpx 28rpx 24rpx; border-radius: 12rpx; background: linear-gradient(145deg, #fdf3d0 0%, #f3dc92 40%, #e6c87c 100%); }
.drawer-svip-top { display: flex; justify-content: space-between; align-items: center; }
.drawer-svip-title-row { display: flex; align-items: center; }
.drawer-svip-icon { font-size: 30rpx; color: #8b6f2e; margin-right: 8rpx; }
.drawer-svip-title { font-size: 28rpx; font-weight: 700; color: #4a3510; }
.drawer-svip-arrow { font-size: 26rpx; color: #8b6f2e; margin-left: 4rpx; }
.drawer-svip-btn { padding: 8rpx 20rpx; border-radius: 24rpx; background: #fff; color: #5c3d0a; font-size: 22rpx; font-weight: 600; white-space: nowrap; }
.drawer-svip-sub { margin-top: 12rpx; color: #8b6f2e; font-size: 22rpx; }
.drawer-svip-bottom { margin-top: 22rpx; display: flex; justify-content: space-between; align-items: center; }

/* Banner */
.drawer-banner { margin: 0 36rpx; height: 106rpx; border-radius: 10rpx; background: #ffe0e5; position: relative; display: flex; align-items: center; padding: 0 24rpx; }
.drawer-banner-triangle { position: absolute; top: -14rpx; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 16rpx solid transparent; border-right: 16rpx solid transparent; border-bottom: 16rpx solid #ffe0e5; }
.drawer-banner-body { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.drawer-banner-left { display: flex; align-items: center; flex: 1; min-width: 0; }
.drawer-banner-badge { background: #d43030; color: #fff; font-size: 18rpx; font-weight: 700; padding: 4rpx 10rpx; border-radius: 6rpx; margin-right: 12rpx; flex-shrink: 0; }
.drawer-banner-text { color: #a02030; font-size: 24rpx; font-weight: 500; white-space: nowrap; }
.drawer-banner-action { color: #c0392b; font-size: 24rpx; font-weight: 600; flex-shrink: 0; }

/* Menu */
.drawer-menu-card { margin: 24rpx 36rpx 0; border-radius: 14rpx; background: rgba(255,255,255,0.07); overflow: hidden; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.12); }
.drawer-menu-item { height: 112rpx; display: flex; align-items: center; justify-content: space-between; padding: 0 28rpx; }
.drawer-menu-left { display: flex; align-items: center; flex: 1; min-width: 0; }
.drawer-menu-icon { width: 52rpx; font-size: 34rpx; text-align: center; flex-shrink: 0; color: rgba(255,255,255,0.85); }
.drawer-menu-title { color: #fff; font-size: 30rpx; font-weight: 600; margin-left: 16rpx; white-space: nowrap; }
.drawer-menu-right { display: flex; align-items: center; flex-shrink: 0; margin-left: 16rpx; }
.drawer-menu-badge { background: #ff2d55; color: #fff; font-size: 20rpx; font-weight: 600; padding: 6rpx 16rpx; border-radius: 20rpx; white-space: nowrap; }
.drawer-menu-subtitle { color: rgba(255,255,255,0.45); font-size: 24rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220rpx; }
.drawer-menu-arrow { color: rgba(255,255,255,0.35); font-size: 30rpx; }
.drawer-menu-divider { height: 2rpx; background: rgba(255,255,255,0.12); margin: 0 28rpx; }

/* Bottom */
.drawer-bottom { flex-shrink: 0; height: 132rpx; display: flex; align-items: center; justify-content: space-between; padding: 0 36rpx; background: #5c5c5c; }
.drawer-bottom-btn { width: 278rpx; height: 96rpx; border-radius: 12rpx; background: rgba(255,255,255,0.10); display: flex; align-items: center; justify-content: center; }
.drawer-bottom-icon { color: #fff; font-size: 32rpx; margin-right: 12rpx; }
.drawer-bottom-text { color: #fff; font-size: 30rpx; font-weight: 500; }
</style>
