<template>
  <div class="item">
    <video
      class="video"
      id="videoPlay"
      :direction="direction"
      @fullscreenchange="fullscreenchange"
      @ended="videoEnd"
      :src="videoUrl"
      controls
      @play="onVideoplay"
    />
    <swiper
      v-if="render"
      class="swiper"
      :indicator-dots="indicatorDots"
      duration="300"
      @change="swiperChange"
    >
      <block v-for="i in detail" :key="i.img">
        <swiper-item class="swiper-item" @click="playVideo(i.cate,i.video,i.direction)">
          <!--<img mode="aspectFill" :src="i.img" :style="{transform: 'translateY(' + (windowHeight-(i.height/2)-50) + 'rpx)',width:i.width+'rpx',height:i.height+'rpx'}" />-->
          <img mode="widthFix" :src="i.img">
        </swiper-item>
      </block>
    </swiper>
    <div v-if="render" @click="playCurrentVideo">
      <img v-if="isCurrentVideo" class="play-icon" src="../../../static/whitePlay.png">
    </div>
    <div class="swiper-indicator">{{swiperCurrentIndex+1}}/{{detail.length}}</div>
    <div class="item-button-box" :class="[{single:isiOS}]">
      <span class="button" :class="{single:isiOS}" v-if="isBuy" @click="gotoDetail">开始阅读</span>
      <span class="button" :class="{single:isiOS}" v-else @click="showCodeInputPopup(id)">使用阅读码</span>
      <span class="button" v-if="!isiOS" @click="showBuyPopup">
        <template v-if="isBuy">再次购买</template>
        <template v-else>购买阅读</template>
      </span>
    </div>
    <div class="rank-icon" v-if="isRank" @click.stop="gotoRank(id)">
      <img src="../../../static/icon_rank.png">
    </div>
    <buy-popup
      :show="isBuyPopupShow"
      @hideBuyPopup="hideBuyPopup"
      :magazineId="id"
      :buyTitle="buyTitle"
      @buySuccess="buySuccess"
    ></buy-popup>
    <code-input-popup
      ref="codeUse"
      :show="isCodeInputPopup"
      @hideCodeInputPopup="hideCodeInputPopup"
      @codePassed="codePassed"
      :code="currentUseCode"
      :magazineId="currentMagazineId"
    ></code-input-popup>
  </div>
</template>

<script>
import fly from "../../utils/fly";
import api from "../../utils/api";
import buyPopup from "../../components/common/buy-popup";
import codeInputPopup from "../../components/common/code-input-popup";
export default {
  components: {
    buyPopup,
    codeInputPopup
  },
  data() {
    return {
      id: "",
      isBuy: false,
      isRank: false,
      detail: "",
      swiperCurrentIndex: 0,
      isCurrentVideo: false,
      indicatorDots: false, //swiper指示点
      isBuyPopupShow: false, //购买弹窗
      isCodeInputPopup: false, //输入code弹窗
      videoUrl: "",
      isiOS: false,
      windowHeight: "",
      buyTitle: "",
      render: false
    };
  },
  mounted() {
    const systemRes = wx.getSystemInfoSync();
    if (systemRes.system.indexOf("iOS") > -1) this.isiOS = true;
  },
  onShow() {
    const systemRes = wx.getSystemInfoSync();
    this.windowHeight = systemRes.windowHeight;
    this.init();
  },
  methods: {
    async init() {
      wx.showLoading();
      const _this = this;
      this.id = this.$mp.query.id;

      this.buyTitle = this.$mp.query.name;
      this.token = wx.getStorageSync("token");
      let res = await fly.post(api.preview, {
        token: wx.getStorageSync("token"),
        magazine_id: this.id
      });
      if (res.code == 0) {
        this.detail = res.data.list;
        this.isBuy = res.data.buy;
        this.isRank = res.data.rank_enable;
        this.render = true;
        wx.hideLoading();
        //        this.detail.forEach(i => {
        //          wx.getImageInfo({
        //            src: i.img,
        //            success(res) {
        //              i.width = res.width;
        //              i.height = res.height;
        //              _this.render = true;
        //              console.log(i)
        //            }
        //          })
        //        })
      }
    },
    //已经购买过了显示详情
    swiperChange(e) {
      this.swiperCurrentIndex = e.mp.detail.current;
      this.isCurrentVideo = this.detail[this.swiperCurrentIndex].cate == 2;
      if (this.isCurrentVideo) {
        this.videoUrl = this.detail[this.swiperCurrentIndex].video;
        this.direction = this.detail[this.swiperCurrentIndex].direction;
      }
    },
    hideBuyPopup() {
      this.isBuyPopupShow = false;
    },
    showBuyPopup() {
      this.isBuyPopupShow = true;
    },
    hideCodeInputPopup() {
      this.isCodeInputPopup = false;
    },
    showCodeInputPopup(id) {
      this.isCodeInputPopup = true;
      this.currentMagazineId = id;
    },
    //阅读码通过
    codePassed() {
      this.isCodeInputPopup = false;
      this.isBuy = true;
      this.gotoDetail();
    },
    gotoDetail() {
      wx.navigateTo({
        url: "/pages/item/main?id=" + this.id + "&name=" + this.buyTitle
      });
    },
    //购买成功
    buySuccess() {
      this.isBuyPopupShow = false;
      const _this = this;
      let modalcontent = "购买成功，是否立即使用";
      if (_this.isBuy) modalcontent = "购买成功";
      wx.showModal({
        title: "提示",
        content: modalcontent,
        async success(res) {
          if (res.confirm) {
            if (_this.isBuy) return;
            let getCodeRes = await fly.post(api.getCurrentCode, {
              token: _this.token,
              magazine_id: _this.id
            });
            if (getCodeRes.code == 0) {
              _this.isBuyPopupShow = false; //关掉购买弹窗
              _this.isCodeInputPopup = true; //打开阅读码输入弹窗
              _this.currentMagazineId = _this.id; //给定当前期刊id
              _this.currentUseCode = getCodeRes.data.code; //给定购买的阅读码
            }
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      });
    },
    playCurrentVideo() {
      wx.showLoading({
        title: "视频加载中..."
      });
      setTimeout(() => {
        this.theVideo = wx.createVideoContext("videoPlay");
        this.theVideo.play();
      }, 500);
    },
    //视频播放
    playVideo(cate, video, direction) {
      //      console.log(video) return;
      if (cate == 1) return;
      this.direction = direction;
      this.videoUrl = video;

      wx.showLoading({
        title: "视频加载中..."
      });
      setTimeout(() => {
        this.theVideo = wx.createVideoContext("videoPlay");
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
      this.theVideo = wx.createVideoContext("videoPlay");
      this.theVideo.exitFullScreen();
      this.theVideo.stop();
    },
    //退出全屏播放之后暂停视频播放
    fullscreenchange(e) {
      if (!e.mp.detail.fullScreen) {
        this.theVideo = wx.createVideoContext("videoPlay");
        this.theVideo.pause();
      }
    },
    gotoRank(id, banner) {
      wx.navigateTo({
        url: "/pages/rank-list/main?id=" + id
      });
    }
  },
  onUnload() {
    this.swiperCurrentIndex = 0;
    this.detail = "";
  },
  onShareAppMessage: function(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "指尖阅读，要你好看，伊周GO！",
      path: "/pages/preview/main?id=" + this.id + "&name=" + this.buyTitle,
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
@import "../../mixin";
.item {
  position: relative;
  .swiper {
    height: calc(100vh - 100rpx);
    background: #333;
    position: relative;
    img {
      width: 100%;
    }
    .swiper-item {
      overflow: scroll;
    }
  }
  .play-icon {
    position: fixed;
    left: 50%;
    top: calc(50% - 50rpx);
    transform: translate(-50%, -50%);
    width: 128rpx;
    height: 128rpx;
  }
  .swiper-indicator {
    position: fixed;
    left: 0;
    bottom: 100rpx;
    width: 100%;
    padding-right: 20rpx;
    line-height: 70rpx;
    text-align: right;
    color: #ffffff;
  }
  .item-button-box {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
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
      content: "";
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