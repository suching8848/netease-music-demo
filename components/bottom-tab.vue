<template>
  <view class="bottom-tab">
    <view
      class="tab-item"
      :class="{ active: active === 'home' }"
      @tap="goPage('home')"
    >
      <text>首页</text>
    </view>

    <view
      class="tab-item"
      :class="{ active: active === 'search' }"
      @tap="goPage('search')"
    >
      <text>搜索</text>
    </view>

    <view
      class="tab-item"
      :class="{ active: active === 'note' }"
      @tap="goPage('note')"
    >
      <text>笔记</text>
      <view class="red-dot"></view>
    </view>

    <view
      class="tab-item"
      :class="{ active: active === 'mine' }"
      @tap="goPage('mine')"
    >
      <text>我的</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: 'home'
    }
  },
  methods: {
    goPage(name) {
      if (name === this.active) return
      const urls = {
        home: '/pages/home/index',
        search: '/pages/search/index',
        note: '/pages/note/index',
        mine: '/pages/mine/index'
      }
      uni.reLaunch({ url: urls[name] })
    }
  }
}
</script>

<style scoped>
.bottom-tab {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 126rpx;
  background: #352B2E;
  z-index: 9999;
  display: flex;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -8rpx 24rpx rgba(0, 0, 0, 0.12);
}

.tab-item {
  flex: 1;
  height: 126rpx;
  color: #cfc8ca;
  font-size: 32rpx;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.tab-item.active {
  color: #ffffff;
}

.red-dot {
  position: absolute;
  top: 24rpx;
  right: 42%;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #ff1935;
}
</style>
