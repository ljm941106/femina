<template>
  <div class="item detail">
    <web-view v-if="webViewSrc" :src="webViewSrc" @load="webViewLoad"></web-view>
    <template v-else>
      <video class="video" id="videoPlay" :direction="direction" @fullscreenchange="fullscreenchange" @ended="videoEnd" :src="videoUrl" controls @play="onVideoplay" />
      <swiper v-if="render" class="swiper" :indicator-dots="indicatorDots" duration="300" @change="swiperChange">
        <block v-for="i in detail" :key="i.img">
          <swiper-item class="swiper-item" @click="playVideo(i.cate, i.video, i.direction)">
            <!--<img mode="aspectFill" :src="i.img" :style="{transform: 'translateY(' + (windowHeight-(i.height/2)) + 'rpx)',width:i.width+'rpx',height:i.height+'rpx'}" />-->
            <img mode="widthFix" :src="i.img" />
          </swiper-item>
        </block>
      </swiper>
      <div v-if="render" @click="playCurrentVideo"><img v-if="isCurrentVideo" class="play-icon" src="../../../static/whitePlay.png" /></div>
      <div class="swiper-indicator">{{ swiperCurrentIndex + 1 }}/{{ detail.length }}</div>
      <!-- <div class="rank-icon" @click.stop="gotoRank(id)">
      <img src="../../../static/icon_rank.png">
      </div>-->
    </template>
  </div>
</template>

<script>
import fly from '../../utils/fly';
import api from '../../utils/api';
export default {
  components: {},
  data() {
    return {
      id: '',
      detail: '',
      swiperCurrentIndex: 0,
      isCurrentVideo: false,
      indicatorDots: false, //swiper指示点
      videoUrl: '',
      windowHeight: '',
      render: true,
      webViewSrc: ''
    };
  },
  mounted() {
    const systemRes = wx.getSystemInfoSync();
    this.windowHeight = systemRes.windowHeight;
  },
  onLoad() {
    this.init();
    wx.hideTabBar();
  },
  methods: {
    async init() {
      wx.showLoading();
      const _this = this;
      this.id = this.$mp.query.id;
      console.log(this.id);
      if (!this.id) {
        this.webViewSrc = this.$mp.query.url;
        return;
      }
      this.buyTitle = this.$mp.query.name;
      this.token = wx.getStorageSync('token');
      let res = await fly.post(api.itemDetail, {
        token: this.token,
        magazine_id: this.id
      });
      wx.hideLoading();
      if (res.code == 0) {
        this.detail = res.data.list;
        this.render = true;
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 2000);
      }
    },
    webViewLoad() {
      wx.hideLoading();
    },
    swiperChange(e) {
      this.swiperCurrentIndex = e.mp.detail.current;
      this.isCurrentVideo = this.detail[this.swiperCurrentIndex].cate == 2;
      if (this.isCurrentVideo) {
        this.videoUrl = this.detail[this.swiperCurrentIndex].video;
        this.direction = this.detail[this.swiperCurrentIndex].direction;
      }
    },
    playCurrentVideo() {
      wx.showLoading({
        title: '视频加载中...'
      });
      setTimeout(() => {
        this.theVideo = wx.createVideoContext('videoPlay');
        this.theVideo.play();
      }, 500);
    },
    //视频播放
    playVideo(cate, video, direction) {
      if (cate == 1) return;
      this.direction = direction;
      this.videoUrl = video;

      wx.showLoading({
        title: '视频加载中...'
      });
      setTimeout(() => {
        this.theVideo = wx.createVideoContext('videoPlay');
        this.theVideo.play();
      }, 500);
    },
    //全屏
    onVideoplay() {
      let direction = 0;
      if (this.direction == 1) {
        direction = 90;
      }
      this.theVideo.requestFullScreen({
        direction: direction
      });
      wx.hideLoading();
    },
    //视频播放结束，退出全屏并停止播放
    videoEnd() {
      this.theVideo = wx.createVideoContext('videoPlay');
      this.theVideo.exitFullScreen();
      this.theVideo.stop();
    },
    //退出全屏播放之后暂停视频播放
    fullscreenchange(e) {
      if (!e.mp.detail.fullScreen) {
        this.theVideo = wx.createVideoContext('videoPlay');
        this.theVideo.pause();
      }
    },
    gotoRank(id, banner) {
      wx.setStorageSync('rankBanner', banner);
      wx.navigateTo({
        url: '/pages/rank-list/main?id=' + id
      });
    }
  },
  onUnload() {
    this.swiperCurrentIndex = 0;
    this.detail = '';
    this.webViewSrc = '';
  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '指尖阅读，要你好看，伊周GO！',
      path: '/pages/preview/main?id=' + this.id + '&name=' + this.buyTitle,
      success: function(res) {},
      fail: function(res) {
        // 转发失败
      }
    };
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  }
};
</script>

<style lang="scss">
@import '../../mixin';
.item.detail {
  .swiper {
    height: 100vh;
    background: #333;
    position: relative;
    img {
      width: 100%;
    }
    .swiper-item {
      position: relative;
      overflow: scroll;
    }
  }
  .play-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 128rpx;
    height: 128rpx;
  }
  .swiper-indicator {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-right: 20rpx;
    line-height: 70rpx;
    text-align: right;
    color: #ffffff;
    &.bottom {
      bottom: 0;
    }
  }
  .item-button-box {
    position: relative;
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    background: $pcolor;
    &.none {
      display: none;
    }
    &.single:after {
      content: none;
    }
    &:after {
      position: absolute;
      content: '';
      display: block;
      width: 1px;
      background: #ffffff;
      height: 60rpx;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .button {
      width: 50%;
      line-height: 100rpx;
      text-align: center;
      color: #ffffff;
      &.single {
        width: 100%;
      }
    }
  }
}

.rank-icon {
  position: fixed;
  left: 40rpx;
  bottom: 150rpx;
  width: 144.5rpx;
  height: 184rpx;
  animation: rankIcon 1.5s ease-in-out infinite;
  img {
    width: 100%;
    height: 100%;
  }
}

@keyframes rankIcon {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
