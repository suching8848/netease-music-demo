<template>
  <!-- 迷你播放器 — 毛玻璃质感，点击进入全屏播放器 -->
  <view class="mini-player" @tap="goFullPlayer">
    <!-- 封面区域 -->
    <view class="cover" :class="{ spinning: playing }">
      <image
        class="cover-img"
        :src="currentSong.cover"
        mode="aspectFill"
      />
      <view class="disc-ring"></view>
    </view>

    <!-- 歌曲信息 -->
    <view class="info">
      <view class="song">{{ currentSong.song }}</view>
      <view class="singer">{{ currentSong.singer }}</view>
    </view>

    <!-- 播放/暂停 -->
    <view class="play-btn" @tap.stop="togglePlay">
      <text class="play-icon">{{ playing ? '⏸' : '▶' }}</text>
    </view>

    <!-- 播放列表入口 -->
    <view class="list-btn">☰</view>

    <!-- 播放中底部流光条 -->
    <view v-if="playing" class="active-bar"></view>
  </view>
</template>

<script>
import { playerInfo, currentPlaySong } from '../common/data.js'

export default {
  name: 'MiniPlayer',
  data() {
    return {
      currentSong: { ...playerInfo },
      playing: false
    }
  },
  mounted() {
    uni.$on('playSong', this.onPlaySong)
    uni.$on('togglePlay', this.onTogglePlay)
  },
  beforeDestroy() {
    uni.$off('playSong', this.onPlaySong)
    uni.$off('togglePlay', this.onTogglePlay)
  },
  methods: {
    togglePlay() {
      this.playing = !this.playing
      uni.$emit('playingChange', this.playing)
    },
    goFullPlayer() {
      currentPlaySong.song = this.currentSong
      uni.$emit('playingChange', this.playing)
      uni.navigateTo({ url: '/pages/player/index' })
    },
    onPlaySong(song) {
      if (song) {
        this.currentSong = { ...song }
        this.playing = true
      }
    },
    onTogglePlay(playing) {
      this.playing = playing
    }
  }
}
</script>

<style scoped>
.mini-player {
  position: fixed;
  left: 20rpx;
  right: 20rpx;
  /* 底部导航栏 tab-item 高度 108rpx + 安全区间距 */
  bottom: calc(108rpx + env(safe-area-inset-bottom));
  height: 104rpx;
  border-radius: 56rpx;
  /* 毛玻璃效果 */
  background: rgba(40, 35, 37, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 9998;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  box-shadow:
    0 8rpx 32rpx rgba(0, 0, 0, 0.35),
    0 2rpx 4rpx rgba(0, 0, 0, 0.2),
    inset 0 1rpx 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

/* 底部流光指示条 */
.active-bar {
  position: absolute;
  bottom: 0;
  left: 30rpx;
  right: 30rpx;
  height: 3rpx;
  background: linear-gradient(90deg, transparent, #ff2d55, #ff6b81, #ff2d55, transparent);
  border-radius: 2rpx;
  animation: barShine 2s ease-in-out infinite;
}

@keyframes barShine {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 1; }
}

/* 封面 */
.cover {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.4);
}

.cover-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.disc-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2rpx solid rgba(255, 255, 255, 0.15);
  pointer-events: none;
}

/* 旋转动画 */
.cover.spinning {
  animation: discSpin 5s linear infinite;
}

@keyframes discSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* 歌曲信息 */
.info {
  flex: 1;
  margin-left: 18rpx;
  overflow: hidden;
}

.song {
  font-size: 27rpx;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.5rpx;
}

.singer {
  margin-top: 4rpx;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 播放按钮 */
.play-btn {
  width: 58rpx;
  height: 58rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.play-btn:active {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(0.92);
}

.play-icon {
  color: #fff;
  font-size: 26rpx;
}

/* 列表按钮 */
.list-btn {
  width: 54rpx;
  margin-left: 12rpx;
  color: rgba(255, 255, 255, 0.7);
  font-size: 38rpx;
  text-align: center;
  flex-shrink: 0;
  transition: opacity 0.15s;
}

.list-btn:active {
  opacity: 0.5;
}
</style>
