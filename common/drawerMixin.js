/**
 * drawerMixin — 侧边抽屉内联逻辑
 *
 * 由于 uni-app App 端子组件渲染在独立 view 层，
 * position:fixed 不相对屏幕，抽屉必须内联到页面模板中。
 * 本 mixin 提供所有 data / watch / methods，页面只需加一行模板。
 *
 * 页面需做两件事：
 *   1. data 中声明 showDrawer: false
 *   2. 模板中加内联抽屉 HTML（见各页面底部）
 */
export default {
  data() {
    return {
      // --- 动画 ---
      drawerActive: false,

      // --- 系统信息 ---
      drawerStatusBarH: 44,
      drawerSafeBottom: 0,

      // --- 菜单 ---
      drawerMenuItems: [
        { key: 'messages',  icon: '✉', title: '我的消息',   divider: false },
        { key: 'cloudbean', icon: '☁', title: '我的云贝',   subtitle: '你的60云贝待使用', divider: false, arrow: false },
        { key: 'dress',     icon: '♛', title: '装扮中心',   subtitle: '一只小白熊来咯！', divider: false, arrow: false },
        { key: 'creator',   icon: '✦', title: '创作者中心', divider: false },
        { key: 'ai-song',   icon: '♪', title: 'AI写歌',     divider: true },
        { key: 'recent',    icon: '◷', title: '最近播放',   subtitle: '3台设备登录', divider: false, arrow: false },
        { key: 'timer',     icon: '⏳', title: '定时关闭',   divider: true },
        { key: 'shop',      icon: '♠', title: '商城',       subtitle: '艺人专辑周边上新中', divider: false, arrow: false },
        { key: 'ticket',    icon: '🎫', title: '云村有票',   divider: false },
        { key: 'promote',   icon: '📢', title: '云推歌',     divider: false },
        { key: 'service',   icon: '☏', title: '我的客服',   divider: false }
      ]
    }
  },

  watch: {
    /** 监听 showDrawer：true → 播入场，false → 播出場 */
    showDrawer(val) {
      if (val) {
        this._animateIn()
      }
    }
  },

  created() {
    const info = uni.getSystemInfoSync()
    this.drawerStatusBarH = info.statusBarHeight || 44
    const model = info.model || ''
    this.drawerSafeBottom = (model.includes('iPhone') && info.safeAreaInsets)
      ? info.safeAreaInsets.bottom : 0
  },

  beforeDestroy() {
    clearTimeout(this._drawerTimer)
  },

  methods: {
    /* ====== 打开 / 关闭 ====== */
    openDrawer() {
      this.showDrawer = true
    },

    closeDrawer() {
      this.drawerActive = false
      clearTimeout(this._drawerTimer)
      this._drawerTimer = setTimeout(() => {
        this.showDrawer = false
      }, 320)
    },

    /** 入场动画 */
    _animateIn() {
      clearTimeout(this._drawerTimer)
      this.drawerActive = false
      this.$nextTick(() => {
        this._drawerTimer = setTimeout(() => {
          this.drawerActive = true
        }, 50)
      })
    },

    /* ====== 事件处理 ====== */
    handleDrawerMaskTap() {
      this.closeDrawer()
    },

    handleDrawerUserClick() {
      this.closeDrawer()
      uni.reLaunch({ url: '/pages/mine/index' })
    },

    handleDrawerItemClick(item) {
      this.closeDrawer()
      const routes = {
        messages: '/pages/messages/index',
        recent:   '/pages/player/index'
      }
      const url = routes[item.key]
      if (url) {
        // 等关闭动画完成再跳转
        setTimeout(() => { uni.navigateTo({ url }) }, 350)
      } else {
        uni.showToast({ title: `"${item.title}" 功能开发中`, icon: 'none', duration: 1500 })
      }
    },

    handleDrawerSettingClick() {
      this.closeDrawer()
      setTimeout(() => { uni.navigateTo({ url: '/pages/settings/index' }) }, 350)
    },

    handleDrawerMoreClick() {
      this.closeDrawer()
      uni.showToast({ title: '更多功能开发中', icon: 'none', duration: 1200 })
    }
  }
}
