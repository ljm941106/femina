<script>
import fly from './utils/fly';
import api from './utils/api';
export default {
  async created() {
    // 调用API从本地缓存中获取数据
    fly.get(api.config).then(configRes => {
      if (configRes.code == 0) {
        let info = configRes.data;
        wx.setStorageSync('config', info);
      }
    });

    // setTimeout(() => {
    //   let token = wx.getStorageSync('token');
    //   if (!token) {
    //     wx.navigateTo({
    //       url: '/pages/login/main'
    //     });
    //   } else {
    //     let res = fly
    //       .post(api.getMyList, {
    //         token: token
    //       })
    //       .then(res => {
    //         if (res.code == 500) {
    //           wx.navigateTo({
    //             url: '/pages/login/main'
    //           });
    //         }
    //       });
    //   }
    // }, 1000);
  }
};
</script>

<style lang="scss">
div,
view,
swiper-item {
  box-sizing: border-box;
  font-size: 28rpx;
}

.popup-bg {
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.video {
  position: absolute;
  left: -10000px;
  top: -10000px;
}
/* this rule will be remove */

* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
