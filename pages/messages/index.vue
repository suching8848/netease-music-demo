<!-- 消息中心页面 -->
<template>
  <view class="page">
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <view class="top-bar">
      <view class="back" @tap="goBack">‹</view>
      <text class="top-title">我的消息</text>
      <view class="top-right" @tap="markAllRead">全部已读</view>
    </view>

    <scroll-view scroll-y class="content" :show-scrollbar="false">
      <view
        v-for="msg in messages"
        :key="msg.id"
        class="msg-item"
        :class="{ unread: !msg.read }"
        @tap="readMsg(msg)"
      >
        <view class="msg-icon" :class="msg.iconClass">{{ msg.icon }}</view>
        <view class="msg-body">
          <view class="msg-title">
            <text>{{ msg.title }}</text>
            <view v-if="!msg.read" class="msg-dot"></view>
          </view>
          <view class="msg-text">{{ msg.text }}</view>
          <view class="msg-time">{{ msg.time }}</view>
        </view>
        <text class="msg-arrow">›</text>
      </view>

      <view class="bottom-safe"></view>
    </scroll-view>
  </view>
</template>

<script>
import { mockMessages } from '../../common/data.js'

export default {
  data() {
    return {
      statusBarHeight: 44,
      messages: []
    }
  },
  onLoad() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44
    this.messages = mockMessages.map(m => ({ ...m }))
  },
  methods: {
    goBack() { uni.navigateBack() },
    readMsg(msg) {
      msg.read = true
      uni.showToast({ title: msg.title, icon: 'none', duration: 1200 })
    },
    markAllRead() {
      this.messages.forEach(m => { m.read = true })
      uni.showToast({ title: '全部已读', icon: 'success' })
    }
  }
}
</script>

<style scoped>
.page {
  height: 100vh;
  background: linear-gradient(180deg, #5a5053 0%, #665D5F 30%, #4a4245 100%);
  display: flex;
  flex-direction: column;
}

.top-bar {
  height: 96rpx;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  flex-shrink: 0;
}

.back {
  width: 80rpx;
  color: #fff;
  font-size: 60rpx;
  transition: opacity 0.15s;
}
.back:active { opacity: 0.5; }

.top-title {
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 32rpx;
  font-weight: 700;
}

.top-right {
  width: 140rpx;
  text-align: right;
  color: rgba(255,255,255,0.6);
  font-size: 26rpx;
}
.top-right:active { opacity: 0.6; }

.content { flex: 1; }

.msg-item {
  display: flex;
  align-items: center;
  padding: 28rpx 32rpx;
  border-bottom: 1rpx solid rgba(255,255,255,0.05);
  transition: background 0.12s;
}

.msg-item:active { background: rgba(255,255,255,0.04); }

.msg-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  flex-shrink: 0;
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.6);
}

.msg-icon.system { background: rgba(255,45,85,0.15); color: #ff2d55; }
.msg-icon.playlist { background: rgba(52,152,219,0.15); color: #3498db; }
.msg-icon.update { background: rgba(46,204,113,0.15); color: #2ecc71; }
.msg-icon.activity { background: rgba(241,196,15,0.15); color: #f1c40f; }
.msg-icon.notice { background: rgba(155,89,182,0.15); color: #9b59b6; }

.msg-body {
  flex: 1;
  margin-left: 20rpx;
  overflow: hidden;
}

.msg-title {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
}

.msg-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #ff2d55;
  margin-left: 10rpx;
}

.msg-text {
  margin-top: 6rpx;
  color: rgba(255,255,255,0.45);
  font-size: 24rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.msg-time {
  margin-top: 8rpx;
  color: rgba(255,255,255,0.25);
  font-size: 20rpx;
}

.msg-arrow {
  color: rgba(255,255,255,0.2);
  font-size: 30rpx;
  flex-shrink: 0;
}

.bottom-safe { height: 80rpx; }
</style>
