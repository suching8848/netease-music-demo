<!--
  pages/player/index.vue — 全屏播放器页面
  从迷你播放器点击进入，展示完整播放界面
-->
<template>
  <view class="page">
    <!-- 状态栏 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 顶部栏：返回 + 歌曲信息 -->
    <view class="top-bar">
      <view class="back" @tap="goBack">‹</view>
      <view class="top-info">
        <text class="top-song">{{ song.name }}</text>
        <text class="top-singer">{{ song.singer }}</text>
      </view>
      <view class="top-share">↗</view>
    </view>

    <!-- 可滚动主体 -->
    <scroll-view scroll-y class="content" :show-scrollbar="false">
      <!-- 专辑封面 + 唱片效果 -->
      <view class="disc-area">
        <view class="disc-outer">
          <!-- 旋转唱片底纹 -->
          <view class="disc-record" :class="{ spinning: playing }">
            <view class="disc-groove" v-for="i in 6" :key="i"></view>
          </view>
          <!-- 专辑封面 -->
          <image
            class="disc-cover"
            :src="song.cover"
            mode="aspectFill"
          />
        </view>
      </view>

      <!-- 进度条 -->
      <view class="progress-area">
        <text class="time">{{ formatTime(currentTime) }}</text>
        <view class="progress-bar" @tap="seekProgress">
          <view class="progress-track"></view>
          <view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
          <view class="progress-dot" :style="{ left: progressPercent + '%' }"></view>
        </view>
        <text class="time">{{ formatTime(duration) }}</text>
      </view>

      <!-- 控制按钮 -->
      <view class="controls">
        <view class="ctrl-btn" @tap="toggleLike">
          <text :class="{ liked: isLiked }">{{ isLiked ? '❤' : '♡' }}</text>
        </view>
        <view class="ctrl-btn" @tap="prevSong">
          <text>⏮</text>
        </view>
        <view class="ctrl-btn play" @tap="togglePlay">
          <text>{{ playing ? '⏸' : '▶' }}</text>
        </view>
        <view class="ctrl-btn" @tap="nextSong">
          <text>⏭</text>
        </view>
        <view class="ctrl-btn" @tap="showPlaylist">
          <text>☰</text>
        </view>
      </view>

      <!-- 歌词区域 -->
      <view class="lyric-area">
        <view
          v-for="(line, i) in lyrics"
          :key="i"
          class="lyric-line"
          :class="{ active: currentLyricIndex === i }"
        >
          {{ line.text }}
        </view>
      </view>

      <!-- 底部留白 -->
      <view class="bottom-safe"></view>
    </scroll-view>
  </view>
</template>

<script>
import { allSongs, mockLyrics, currentPlaySong } from '../../common/data.js'

export default {
  data() {
    return {
      statusBarHeight: 44,
      song: currentPlaySong.song || allSongs[0],
      songIndex: Math.max(0, allSongs.findIndex(s => s.id === (currentPlaySong.song || allSongs[0]).id)),
      playing: false,
      isLiked: false,
      currentTime: 0,
      duration: 240, // 秒
      lyrics: mockLyrics,
      tickTimer: null
    }
  },
  computed: {
    progressPercent() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0
    },
    currentLyricIndex() {
      let idx = 0
      for (let i = this.lyrics.length - 1; i >= 0; i--) {
        if (this.currentTime >= this.lyrics[i].time) {
          idx = i
          break
        }
      }
      return idx
    }
  },
  onLoad() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44

    // 监听外部切歌
    uni.$on('playSong', this._onPlaySong)
    // 恢复迷你播放器传来的播放状态
    uni.$on('playingChange', this._onPlayingChange)
  },
  onUnload() {
    this.stopTick()
    uni.$off('playSong', this._onPlaySong)
    uni.$off('playingChange', this._onPlayingChange)
  },
  methods: {
    _onPlaySong(song) {
      if (song && song.id) {
        this.song = song
        this.songIndex = Math.max(0, allSongs.findIndex(s => s.id === song.id))
        this.currentTime = 0
        this.playing = true
        this.startTick()
      }
    },
    _onPlayingChange(playing) {
      if (typeof playing === 'boolean') {
        this.playing = playing
        if (playing) this.startTick()
        else this.stopTick()
      }
    },
    goBack() {
      // 把播放状态回传给迷你播放器
      uni.$emit('togglePlay', this.playing)
      uni.navigateBack()
    },

    togglePlay() {
      this.playing = !this.playing
      uni.$emit('togglePlay', this.playing)
      if (this.playing) {
        this.startTick()
      } else {
        this.stopTick()
      }
    },

    toggleLike() {
      this.isLiked = !this.isLiked
      uni.showToast({
        title: this.isLiked ? '已添加到我喜欢的音乐' : '已取消喜欢',
        icon: 'none',
        duration: 1000
      })
    },

    prevSong() {
      this.songIndex = (this.songIndex - 1 + allSongs.length) % allSongs.length
      this.song = allSongs[this.songIndex]
      this.currentTime = 0
      uni.$emit('playSong', this.song)
    },

    nextSong() {
      this.songIndex = (this.songIndex + 1) % allSongs.length
      this.song = allSongs[this.songIndex]
      this.currentTime = 0
      uni.$emit('playSong', this.song)
    },

    /** 点击进度条跳转 */
    seekProgress(e) {
      // #ifdef H5
      const bar = e.currentTarget
      const rect = bar.getBoundingClientRect()
      const ratio = (e.clientX - rect.left) / rect.width
      this.currentTime = Math.max(0, Math.min(this.duration, ratio * this.duration))
      // #endif
    },

    /** 进度条计时器 — 模拟播放进度 */
    startTick() {
      this.stopTick()
      this.tickTimer = setInterval(() => {
        if (this.currentTime >= this.duration) {
          this.nextSong()
        } else {
          this.currentTime += 1
        }
      }, 1000)
    },

    stopTick() {
      if (this.tickTimer) {
        clearInterval(this.tickTimer)
        this.tickTimer = null
      }
    },

    showPlaylist() {
      uni.showToast({ title: '播放列表开发中', icon: 'none', duration: 1200 })
    },
    formatTime(seconds) {
      const m = Math.floor(seconds / 60)
      const s = Math.floor(seconds % 60)
      return m + ':' + String(s).padStart(2, '0')
    }
  }
}
</script>

<style scoped>
.page {
  height: 100vh;
  background: linear-gradient(180deg, #3a2f33 0%, #221c1e 35%, #1a1517 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ---- 顶部栏 ---- */
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
  line-height: 1;
  transition: opacity 0.15s;
}
.back:active { opacity: 0.5; }

.top-info {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-song {
  color: #fff;
  font-size: 30rpx;
  font-weight: 700;
  max-width: 400rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top-singer {
  margin-top: 4rpx;
  color: rgba(255, 255, 255, 0.5);
  font-size: 24rpx;
}

.top-share {
  width: 80rpx;
  text-align: right;
  color: #fff;
  font-size: 38rpx;
}

/* ---- 专辑封面区 ---- */
.content {
  flex: 1;
}

.disc-area {
  display: flex;
  justify-content: center;
  padding-top: 70rpx;
}

.disc-outer {
  width: 540rpx;
  height: 540rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 外部光晕 */
.disc-outer::after {
  content: '';
  position: absolute;
  width: 580rpx;
  height: 580rpx;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

/* 旋转唱片底纹 */
.disc-record {
  position: absolute;
  width: 540rpx;
  height: 540rpx;
  border-radius: 50%;
  background: radial-gradient(circle,
    #1a1a1a 0%, #2a2a2a 27%,
    #1a1a1a 29%, #2a2a2a 48%,
    #1a1a1a 50%, #2a2a2a 68%,
    #1a1a1a 70%, #2a2a2a 100%);
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.5);
}

.disc-record.spinning {
  animation: discSpin 7s linear infinite;
}

@keyframes discSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* 唱片同心圆纹理 */
.disc-groove {
  position: absolute;
  border-radius: 50%;
  border: 2rpx solid rgba(255, 255, 255, 0.04);
}

.disc-groove:nth-child(1) { width: 460rpx; height: 460rpx; }
.disc-groove:nth-child(2) { width: 380rpx; height: 380rpx; }
.disc-groove:nth-child(3) { width: 300rpx; height: 300rpx; }
.disc-groove:nth-child(4) { width: 220rpx; height: 220rpx; }
.disc-groove:nth-child(5) { width: 140rpx; height: 140rpx; }
.disc-groove:nth-child(6) { width: 60rpx;  height: 60rpx; }

/* 专辑封面 */
.disc-cover {
  position: relative;
  z-index: 2;
  width: 320rpx;
  height: 320rpx;
  border-radius: 50%;
  box-shadow: 0 24rpx 64rpx rgba(0, 0, 0, 0.5);
  border: 4rpx solid rgba(255, 255, 255, 0.06);
}

/* ---- 进度条 ---- */
.progress-area {
  display: flex;
  align-items: center;
  padding: 60rpx 46rpx 0;
}

.time {
  color: rgba(255,255,255,0.5);
  font-size: 22rpx;
  font-family: monospace;
  width: 80rpx;
}

.progress-bar {
  flex: 1;
  height: 40rpx;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 16rpx;
}

.progress-track {
  width: 100%;
  height: 4rpx;
  background: rgba(255,255,255,0.15);
  border-radius: 2rpx;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -2rpx;
  height: 4rpx;
  background: #ff2d55;
  border-radius: 2rpx;
  transition: width 0.3s linear;
}

.progress-dot {
  position: absolute;
  top: 50%;
  margin-top: -10rpx;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.3);
  transform: translateX(-50%);
  transition: left 0.3s linear;
}

/* ---- 控制按钮 ---- */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40rpx;
  padding-top: 50rpx;
}

.ctrl-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 42rpx;
  transition: all 0.15s ease;
}

.ctrl-btn:active {
  opacity: 0.5;
  transform: scale(0.88);
}

.ctrl-btn.play {
  width: 124rpx;
  height: 124rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  font-size: 50rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.3);
}

.ctrl-btn.play:active {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(0.9);
}

.liked {
  color: #ff2d55;
}

/* ---- 歌词 ---- */
.lyric-area {
  padding: 60rpx 36rpx 0;
}

.lyric-line {
  text-align: center;
  padding: 16rpx 0;
  color: rgba(255,255,255,0.35);
  font-size: 28rpx;
  transition: all 0.3s ease;
}

.lyric-line.active {
  color: #fff;
  font-size: 32rpx;
  font-weight: 700;
  text-shadow: 0 0 20rpx rgba(255,255,255,0.3);
}

.bottom-safe {
  height: 120rpx;
}
</style>
