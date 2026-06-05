<!--
  pages/playlist/index.vue — 歌单详情页
  接收 playlistId 参数，展示歌单信息和歌曲列表
-->
<template>
  <view class="page">
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 顶部导航 -->
    <view class="top-bar">
      <view class="back" @tap="goBack">‹</view>
      <text class="top-title">歌单</text>
      <view class="placeholder"></view>
    </view>

    <scroll-view scroll-y class="content" :show-scrollbar="false">
      <!-- 暂无歌单数据 -->
      <view v-if="!playlist" class="empty">
        <text class="empty-icon">♪</text>
        <text class="empty-text">歌单不存在</text>
      </view>

      <template v-else>
        <!-- 歌单头部 -->
        <view class="playlist-header">
          <image
            class="playlist-cover"
            :src="playlist.image"
            mode="aspectFill"
          />
          <view class="playlist-info">
            <text class="playlist-name">{{ playlist.title }}</text>
            <text class="playlist-desc">{{ playlist.desc }}</text>
            <text class="playlist-count">▶ {{ playlist.playCount }}</text>
          </view>
        </view>

        <!-- 操作按钮 -->
        <view class="actions">
          <view class="action-btn primary" @tap="playAll">
            <text class="action-icon">▶</text>
            <text>播放全部</text>
          </view>
          <view class="action-btn">
            <text>♡ 收藏</text>
          </view>
          <view class="action-btn">
            <text>↗ 分享</text>
          </view>
        </view>

        <!-- 歌曲列表 -->
        <view class="song-list">
          <view
            v-for="(song, index) in songs"
            :key="song.id"
            class="song-item"
            @tap="playSong(song, index)"
          >
            <text class="song-num">{{ index + 1 }}</text>
            <image
              class="song-cover"
              :src="song.cover"
              mode="aspectFill"
            />
            <view class="song-info">
              <text class="song-name">{{ song.name }}</text>
              <text class="song-singer">{{ song.singer }} · {{ song.album }}</text>
            </view>
            <text class="song-duration">{{ song.duration }}</text>
          </view>
        </view>
      </template>

      <view class="bottom-safe"></view>
    </scroll-view>
  </view>
</template>

<script>
import { allSongs, playlistDetailMap, currentPlaySong } from '../../common/data.js'

export default {
  data() {
    return {
      statusBarHeight: 44,
      playlist: null,
      songs: []
    }
  },
  onLoad(options) {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44

    // 从路由参数获取歌单 ID
    const id = Number(options.playlistId) || 1
    this.playlist = playlistDetailMap[id] || null

    if (this.playlist) {
      // 根据 songIds 查找对应歌曲
      this.songs = (this.playlist.songIds || [])
        .map(sid => allSongs.find(s => s.id === sid))
        .filter(Boolean)
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    /** 播放全部 */
    playAll() {
      if (this.songs.length) {
        currentPlaySong.song = this.songs[0]
        uni.$emit('playSong', this.songs[0])
        uni.navigateTo({ url: '/pages/player/index' })
      }
    },
    /** 播放指定歌曲 */
    playSong(song, index) {
      currentPlaySong.song = song
      uni.$emit('playSong', song)
      uni.navigateTo({ url: '/pages/player/index' })
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
  overflow: hidden;
}

.top-bar {
  height: 96rpx;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  flex-shrink: 0;
  background: rgba(102, 93, 95, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.back {
  width: 80rpx;
  color: #fff;
  font-size: 60rpx;
  line-height: 1;
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

.placeholder {
  width: 80rpx;
}

.content {
  flex: 1;
}

/* 空状态 */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;
}

.empty-icon {
  font-size: 100rpx;
  color: rgba(255,255,255,0.3);
  margin-bottom: 24rpx;
}

.empty-text {
  color: rgba(255,255,255,0.4);
  font-size: 28rpx;
}

/* 歌单头部 */
.playlist-header {
  display: flex;
  padding: 40rpx 36rpx;
}

.playlist-cover {
  width: 260rpx;
  height: 260rpx;
  border-radius: 18rpx;
  flex-shrink: 0;
  background: #554d4f;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.35);
}

.playlist-info {
  flex: 1;
  margin-left: 28rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 0;
}

.playlist-name {
  color: #fff;
  font-size: 38rpx;
  font-weight: 900;
  margin-bottom: 16rpx;
}

.playlist-desc {
  color: rgba(255,255,255,0.6);
  font-size: 24rpx;
  line-height: 38rpx;
  margin-bottom: 12rpx;
}

.playlist-count {
  color: rgba(255,255,255,0.4);
  font-size: 24rpx;
}

/* 操作按钮 */
.actions {
  display: flex;
  align-items: center;
  padding: 0 36rpx 16rpx;
  gap: 24rpx;
}

.action-btn {
  height: 68rpx;
  line-height: 68rpx;
  padding: 0 28rpx;
  border-radius: 34rpx;
  background: rgba(255,255,255,0.1);
  color: #fff;
  font-size: 26rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.action-btn:active {
  background: rgba(255,255,255,0.2);
}

.action-btn.primary {
  background: #ff2d55;
}

.action-icon {
  margin-right: 8rpx;
}

/* 歌曲列表 */
.song-list {
  padding: 0 36rpx;
}

.song-item {
  display: flex;
  align-items: center;
  height: 112rpx;
}

.song-item:active {
  background: rgba(255,255,255,0.04);
  margin: 0 -36rpx;
  padding: 0 36rpx;
}

.song-num {
  width: 48rpx;
  color: rgba(255,255,255,0.4);
  font-size: 26rpx;
  text-align: center;
  flex-shrink: 0;
}

.song-cover {
  width: 68rpx;
  height: 68rpx;
  border-radius: 8rpx;
  background: #554d4f;
  flex-shrink: 0;
  margin-left: 12rpx;
}

.song-info {
  flex: 1;
  margin-left: 20rpx;
  overflow: hidden;
}

.song-name {
  color: #fff;
  font-size: 30rpx;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-singer {
  margin-top: 6rpx;
  color: rgba(255,255,255,0.4);
  font-size: 22rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-duration {
  color: rgba(255,255,255,0.35);
  font-size: 24rpx;
  font-family: monospace;
  flex-shrink: 0;
  margin-left: 16rpx;
}

.bottom-safe {
  height: 80rpx;
}
</style>
