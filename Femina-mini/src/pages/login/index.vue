<template>
  <div class="login">
    <div class="logo-box">
      <div class="logo">
        <img src="../../../static/newlogo.png" style="width: 102rpx;height: 118rpx;" />
      </div>
      <p>伊周GO</p>
    </div>
    <div class="button-box">
      <p>请完成微信授权以继续使用</p>
      <button class="button" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">微信授权用户信息</button>
    </div>
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import api from '../../utils/api'
  export default {
    components: {},
    data() {
      return {
        code: '',
        pid: '',
      }
    },
    onShow() {
      this.token = this.$root.$mp.query.token;
    },
    methods: {
      onGotUserInfo(e) {
      	wx.showLoading()
        const _this = this;
        if(e.mp.detail.errMsg.indexOf('fail') > 0) return;
        this.login(e.mp.detail)
      },
      login(detail) {
        const _this = this;
        wx.login({
          async success(res) {
            if(res.code) {
              fly.post(api.login, {
                code: res.code,
                data: detail.encryptedData,
                iv: detail.iv
              }).then(data => {
              	wx.hideLoading()
                if(data.code == 0) {
                  let token = data.data.token;
                  wx.setStorageSync('token', token);
                  wx.setStorageSync('userId', data.data.user_id);
                  wx.showToast({
                    title: '登录成功',
                    icon: 'none'
                  })
                  setTimeout(() => {
                    wx.navigateBack();
                  }, 1500)
                } else if(data.code == 200) {
                  wx.getUserInfo({
                    success(detail) {
                      _this.login(detail)
                    }
                  })
                } else {
                  wx.showToast({
                    title: '系统繁忙，请稍候重试',
                    icon: 'none'
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          },
        })
      }
    },
    async onPullDownRefresh() {
      wx.stopPullDownRefresh()
    },
  }
</script>

<style lang="scss">
  @import "../../mixin";
  .login {
    p {
      text-align: center;
    }
    .logo-box {
      margin-top: 180rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .logo {
        width: 120rpx;
        height: 120rpx;
        border: 1rpx solid #c7c7c7;
        border-radius: 15rpx;
        text-align: center;
      }
      p {
        margin-top: 25rpx;
        font-weight: bold;
      }
    }
    .button-box {
      margin-top: 220rpx;
      p {
        color: #677293;
        font-size: 28rpx;
        text-align: center;
        display: block;
      }
      .button {
        width: 80%;
        line-height: 90rpx;
        margin: 30rpx auto 0;
        background: #45aa32;
        color: #FFFFFF;
        border-radius: 10rpx;
      }
    }
  }
</style>