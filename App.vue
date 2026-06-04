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
/* 全局页面 */
page {
  min-height: 100vh;
  background: #665D5F;
  color: #F6F4F4;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
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
  background: #665D5F;
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
</style>