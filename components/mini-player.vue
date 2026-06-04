<template>
  <view class="mini-player">
    <view class="cover">
      <view class="disc"></view>
    </view>

    <view class="info">
      <view class="song">游戏《Orzmic》第九章魔王曲</view>
      <view class="singer">CS4W</view>
    </view>

    <view class="play-btn">▶</view>
    <view class="list-btn">☰</view>
  </view>
</template>

<script>
export default {
  name: 'MiniPlayer'
}
</script>

<style scoped>
.mini-player {
  position: fixed;
  left: 26rpx;
  right: 26rpx;
  bottom: 132rpx;
  height: 104rpx;
  border-radius: 56rpx;
  background: rgba(92, 83, 85, 0.96);
  z-index: 9998;
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  box-shadow: 0 8rpx 28rpx rgba(0, 0, 0, 0.18);
}

.cover {
  width: 76rpx;
  height: 76rpx;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #ff4d8b, #ff8cb3);
  position: relative;
}

.disc {
  position: absolute;
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(0, 0, 0, 0.26);
  left: 16rpx;
  top: 16rpx;
}

.disc::after {
  content: '';
  position: absolute;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.86);
  left: 50%;
  top: 50%;
  margin-left: -8rpx;
  margin-top: -8rpx;
}

.info {
  flex: 1;
  margin-left: 20rpx;
  overflow: hidden;
}

.song {
  font-size: 28rpx;
  font-weight: 800;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.singer {
  margin-top: 4rpx;
  font-size: 22rpx;
  color: #d6d0d1;
}

.play-btn {
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.9);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  flex-shrink: 0;
}

.list-btn {
  width: 62rpx;
  margin-left: 18rpx;
  color: #fff;
  font-size: 42rpx;
  text-align: center;
  flex-shrink: 0;
}
</style>