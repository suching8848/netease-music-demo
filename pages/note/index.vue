<template>
  <view class="page">
    <view class="status-bar"></view>

    <view class="note-top">
      <view class="menu">☰</view>

      <view class="tabs">
        <view class="tab follow">关注</view>
        <view class="tab active">推荐</view>
      </view>

      <view class="icons">
        <text class="search">⌕</text>
        <text class="plus">＋</text>
      </view>
    </view>

    <scroll-view scroll-y class="content" :show-scrollbar="false">
      <view class="waterfall">
        <view class="col">
          <view class="note-card" v-for="item in leftList" :key="item.id">
            <image class="note-img" :src="item.image" mode="aspectFill" :style="{ height: item.h + 'rpx' }"></image>
            <view class="note-body">
              <view class="note-title">{{ item.title }}</view>
              <view class="note-foot">
                <text class="user">{{ item.user }}</text>
                <text class="like">♡ {{ item.like }}</text>
              </view>
            </view>
          </view>
        </view>

        <view class="col">
          <view class="note-card" v-for="item in rightList" :key="item.id">
            <image class="note-img" :src="item.image" mode="aspectFill" :style="{ height: item.h + 'rpx' }"></image>
            <view class="note-body">
              <view class="note-title">{{ item.title }}</view>
              <view class="note-foot">
                <text class="user">{{ item.user }}</text>
                <text class="like">♡ {{ item.like }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="bottom-safe"></view>
    </scroll-view>

    <view class="feedback">✎ 意见反馈</view>
    <mini-player></mini-player>
    <bottom-tab active="note"></bottom-tab>
  </view>
</template>

<script>
import { noteList } from '../../common/data.js'
import MiniPlayer from '../../components/mini-player.vue'
import BottomTab from '../../components/bottom-tab.vue'

export default {
  components: {
    MiniPlayer,
    BottomTab
  },
  data() {
    return {
      leftList: [],
      rightList: []
    }
  },
  onLoad() {
    this.leftList = noteList.filter((item, index) => index % 2 === 0)
    this.rightList = noteList.filter((item, index) => index % 2 !== 0)
  }
}
</script>

<style scoped>
.page {
  height: 100vh;
  background: #665D5F;
  overflow: hidden;
}
.note-top {
  height: 96rpx;
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  border-bottom: 1rpx solid rgba(255,255,255,.08);
}
.menu {
  width: 112rpx;
  color: #fff;
  font-size: 52rpx;
}
.tabs {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab {
  margin: 0 34rpx;
  color: rgba(255,255,255,.45);
  font-size: 36rpx;
  font-weight: 900;
  position: relative;
  padding-bottom: 20rpx;
}
.follow::after {
  content: '';
  position: absolute;
  right: -22rpx;
  top: -8rpx;
  width: 14rpx;
  height: 14rpx;
  background: #ff1935;
  border-radius: 50%;
}
.tab.active {
  color: #fff;
}
.tab.active::after {
  content: '';
  position: absolute;
  left: -8rpx;
  right: -8rpx;
  bottom: 0;
  height: 6rpx;
  background: #fff;
  border-radius: 6rpx;
}
.icons {
  width: 160rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24rpx;
}
.search {
  color: #fff;
  font-size: 54rpx;
}
.plus {
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  background: #ff1935;
  color: #fff;
  font-size: 48rpx;
  line-height: 58rpx;
  text-align: center;
}
.content {
  height: calc(100vh - var(--status-bar-height) - 96rpx);
}
.waterfall {
  display: flex;
  padding: 14rpx 10rpx 0;
  gap: 12rpx;
}
.col {
  flex: 1;
  min-width: 0;
}
.note-card {
  background: #6D6466;
  border-radius: 8rpx;
  overflow: hidden;
  margin-bottom: 14rpx;
}
.note-img {
  width: 100%;
  background: #554d4f;
  display: block;
}
.note-body {
  padding: 22rpx 24rpx 20rpx;
}
.note-title {
  color: #fff;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 42rpx;
}
.note-foot {
  margin-top: 18rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255,255,255,.62);
  font-size: 25rpx;
}
.user {
  max-width: 190rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.like {
  color: rgba(255,255,255,.72);
}
.feedback {
  position: fixed;
  right: 0;
  top: 600rpx;
  z-index: 30;
  color: #fff;
  background: rgba(0,0,0,.55);
  padding: 18rpx 24rpx;
  border-radius: 40rpx 0 0 40rpx;
  font-size: 26rpx;
}
.bottom-safe {
  height: 260rpx;
}
</style>
