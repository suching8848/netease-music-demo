<template>
  <view class="page">
    <!-- 顶部导航区 — 状态栏 + 标题栏统一背景 -->
    <view class="header-wrap">
      <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
      <view class="top">
        <view class="back" @tap="goBack">‹</view>
        <view class="top-title">学生账号登录</view>
        <view class="placeholder"></view>
      </view>
    </view>

    <view class="logo-box">
      <view class="logo">♪</view>
      <view class="title">云音乐</view>
      <view class="sub">使用学号、姓名和密码登录</view>
    </view>

    <view class="card">
      <view class="row">
        <text class="label">学号</text>
        <input
          v-model="studentId"
          class="input"
          type="number"
          placeholder="请输入学号"
          placeholder-class="ph"
        />
      </view>

      <view class="row">
        <text class="label">姓名</text>
        <input
          v-model="studentName"
          class="input"
          placeholder="请输入姓名"
          placeholder-class="ph"
        />
      </view>

      <view class="row">
        <text class="label">密码</text>
        <input
          v-model="password"
          class="input"
          password
          placeholder="请输入密码"
          placeholder-class="ph"
        />
      </view>

      <view class="agree" @tap="agree = !agree">
        <view class="ck" :class="{ on: agree }">✓</view>
        <text>我已阅读并同意《用户协议》《隐私政策》</text>
      </view>

      <button class="btn" @tap="handleLogin">登录</button>
      <button class="demo" @tap="fillDemo">一键填入测试账号</button>
    </view>

    <view class="tip">
      <view>账号示例：2024000000</view>
      <view>用户名示例：学生姓名</view>
      <view>默认密码示例：123456</view>
    </view>
  </view>
</template>

<script>
import { STUDENT, LOGIN_KEY } from '../../common/data.js'

export default {
  data() {
    return {
      statusBarHeight: 44,
      studentId: '',
      studentName: '',
      password: '',
      agree: false
    }
  },
  created() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    fillDemo() {
      this.studentId = STUDENT.id
      this.studentName = STUDENT.name
      this.password = STUDENT.password
      this.agree = true
    },
    handleLogin() {
      if (!this.studentId || !this.studentName || !this.password) {
        uni.showToast({ title: '请完整填写信息', icon: 'none' })
        return
      }

      if (!this.agree) {
        uni.showToast({ title: '请先同意协议', icon: 'none' })
        return
      }

      if (
        this.studentId !== STUDENT.id ||
        this.studentName !== STUDENT.name ||
        this.password !== STUDENT.password
      ) {
        uni.showToast({ title: '学号、姓名或密码错误', icon: 'none' })
        return
      }

      uni.setStorageSync(LOGIN_KEY, {
        id: STUDENT.id,
        name: STUDENT.name
      })

      uni.showToast({ title: '登录成功', icon: 'success' })

      setTimeout(() => {
        uni.reLaunch({ url: '/pages/mine/index' })
      }, 800)
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #5a5053 0%, #665D5F 40%, #4a4245 100%);
  padding: 0 40rpx;
}

/* 顶部导航区 — 状态栏 + 标题栏统一深色背景，消除割裂黑边 */
.header-wrap {
  margin: 0 -40rpx;
  padding: 0 40rpx;
  background: rgba(40, 35, 37, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.top {
  height: 96rpx;
  display: flex;
  align-items: center;
  color: #fff;
}
.back {
  width: 90rpx;
  font-size: 72rpx;
  line-height: 1;
}
.top-title {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
  font-weight: 700;
}
.placeholder {
  width: 90rpx;
}
.logo-box {
  margin-top: 58rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  background: #ff1935;
  color: #fff;
  font-size: 90rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18rpx 34rpx rgba(0,0,0,.20);
}
.title {
  margin-top: 30rpx;
  color: #fff;
  font-size: 52rpx;
  font-weight: 700;
  letter-spacing: 4rpx;
}
.sub {
  margin-top: 14rpx;
  color: rgba(255,255,255,.62);
  font-size: 27rpx;
}
.card {
  margin-top: 62rpx;
  background: #746B6D;
  border-radius: 30rpx;
  padding: 18rpx 32rpx 38rpx;
  box-shadow: 0 18rpx 38rpx rgba(0,0,0,.16);
}
.row {
  height: 104rpx;
  border-bottom: 1rpx solid rgba(255,255,255,.08);
  display: flex;
  align-items: center;
}
.label {
  width: 104rpx;
  color: #fff;
  font-size: 29rpx;
  font-weight: 700;
}
.input {
  flex: 1;
  height: 104rpx;
  color: #fff;
  font-size: 29rpx;
}
.ph {
  color: rgba(255,255,255,.38);
}
.agree {
  margin-top: 32rpx;
  display: flex;
  align-items: center;
  color: rgba(255,255,255,.62);
  font-size: 23rpx;
}
.ck {
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(255,255,255,.55);
  margin-right: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  font-size: 22rpx;
}
.ck.on {
  background: #ff1935;
  border-color: #ff1935;
  color: #fff;
}
.btn {
  margin-top: 40rpx;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 46rpx;
  background: linear-gradient(135deg, #ff2d55, #ff6b81);
  color: #fff;
  font-size: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(255, 45, 85, 0.35);
  font-weight: 700;
  text-align: center;
}
.demo {
  margin-top: 22rpx;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 40rpx;
  background: rgba(255,255,255,.10);
  color: rgba(255,255,255,.76);
  font-size: 26rpx;
  text-align: center;
}
.tip {
  margin-top: 34rpx;
  color: rgba(255,255,255,.42);
  font-size: 22rpx;
  line-height: 38rpx;
  text-align: center;
}
</style>
