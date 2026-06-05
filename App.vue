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
</style>
