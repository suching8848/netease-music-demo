/**
 * drawerMixin — 侧边抽屉菜单共享逻辑
 * 在所有 Tab 页面中混入即可获得统一的抽屉控制能力
 *
 * 需要页面模板中包含：
 *   <side-drawer v-model="showDrawer" @user-click="onUserClick"
 *     @item-click="onDrawerItemClick" @setting-click="onSettingClick"
 *     @more-click="onMoreClick" />
 *
 * 并在顶部 ☰ 图标绑定 @tap="openDrawer"
 */
import SideDrawer from '../components/SideDrawer/SideDrawer.vue'

export default {
  components: {
    SideDrawer
  },
  data() {
    return {
      showDrawer: false
    }
  },
  onHide() {
    this.showDrawer = false
  },
  methods: {
    /** 打开抽屉 */
    openDrawer() {
      this.showDrawer = true
    },

    /** 点击用户区 → 跳转「我的」页 */
    onUserClick() {
      this.showDrawer = false
      uni.reLaunch({ url: '/pages/mine/index' })
    },

    /** 点击菜单项 → 按 key 路由 */
    onDrawerItemClick(item) {
      this.showDrawer = false
      this.navigateByDrawerKey(item.key, item.title)
    },

    /** 点击「设置」→ 跳转设置页 */
    onSettingClick() {
      this.showDrawer = false
      uni.navigateTo({ url: '/pages/settings/index' })
    },

    /** 点击「更多」 */
    onMoreClick() {
      this.showDrawer = false
      uni.showToast({ title: '更多功能开发中', icon: 'none', duration: 1200 })
    },

    /** 抽屉菜单键 → 路由映射表 */
    navigateByDrawerKey(key, title) {
      const routes = {
        messages: '/pages/messages/index',
        cloudbean: null,
        dress: null,
        creator: null,
        'ai-song': null,
        recent: '/pages/player/index',
        timer: null,
        shop: null,
        ticket: null,
        promote: null,
        service: null
      }
      const url = routes[key]
      if (url) {
        uni.navigateTo({ url })
      } else {
        uni.showToast({ title: `"${title}" 功能开发中`, icon: 'none', duration: 1500 })
      }
    }
  }
}
