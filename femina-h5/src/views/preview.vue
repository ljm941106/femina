<template>
  <div class="preview">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide days" v-for="i in previewList" :key="i.id" @click="videoPlay(i.cate,i.video)">
          <!--:style="'background-image:url('+i.img+')'"-->
          <!--<img :src="i.img" :style="'transform: translateY(' + (clientHeightheight-812) + 'px)'" />-->
          <img :src="i.img" />
          <img class="icon-white-play" src="../assets/whitePlay.png" v-if="i.cate==2" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <video id='theVideo' class="video" :class="{'video-play':isVideoPlay}" controls="controls">
      <source :src="videoUrl" type="video/mp4"></source>
      <source :src="videoUrl" type="video/mp4"></source>
      <source :src="videoUrl" type="video/ogg"></source>
      <source :src="videoUrl" type="video/webm"></source>
      当前浏览器不支持 video直接播放，点击这里下载视频：
      <a :href="videoUrl">下载视频</a>
    </video>
  </div>
</template>

<script>
  import api from '../service/api';
  import 'swiper/dist/css/swiper.min.css'
  import Swiper from 'swiper/dist/js/swiper.min.js'
  export default {
    name: 'preview',
    data() {
      return {
        previewList: [],
        videoUrl: '',
        isVideoPlay: false,
        shareImg: require("../assets/share-logo.jpeg"),
      }
    },
    created() {
      this.init()
    },
    async mounted() {
      //    this.clientHeightheight = document.body.clientHeight;
      window.innerWidth
      let swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
        observer: true,
        on: {
          transitionEnd: function() {},
        },
      })
      // let wxjsConfigRes = await this.$http.post(this, api.getWxjsConfig, {
      //   data: this.$route.fullPath.substring(1)
      // });
      // if(wxjsConfigRes.code == 0) {
      //   wx.config({
      //     //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //     appId: wxjsConfigRes.data.appId, // 必填，公众号的唯一标识
      //     timestamp: wxjsConfigRes.data.timestamp, // 必填，生成签名的时间戳
      //     nonceStr: wxjsConfigRes.data.nonceStr, // 必填，生成签名的随机串
      //     signature: wxjsConfigRes.data.signature, // 必填，签名，见附录1
      //     jsApiList: ["chooseWXPay", "updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      //   });
      //   this.$nextTick(() => {
      //     let shareData = {
      //       title: '指尖阅读，要你好看，伊周GO！',
      //       desc: '伊周电子刊，有声有色，你想看的都在这里',
      //       link: window.location.href,
      //       imgUrl: 'http://yizhou.25bsx.com/share-logo.jpeg',
      //       success: function() {
      //         //分享成功
      //       }
      //     }
      //     wx.onMenuShareTimeline(shareData)
      //     wx.onMenuShareAppMessage(shareData)
      //     wx.ready(function() {
      //       wx.updateAppMessageShareData(shareData)
      //       wx.updateTimelineShareData(shareData)
      //     })
      //   })
      // }

    },
    methods: {
      async init() {
        let res = await this.$http.post(this, api.preview, {
          magazine_id: this.$route.query.id
        })
        if(res.code == 0) {
          this.previewList = res.data.list;
          this.previewList.forEach(i => {
            if(i.cate == 2) {
              //            this.videoUrl = i.video;
            }
          })
        }
      },
      videoPlay(cate, videoUrl) {
        if(cate == 2) {
          this.videoUrl = videoUrl;
          //        this.isVideoPlay = true;
          let theVideo = document.getElementById("theVideo");
          theVideo.load()
          this.$nextTick(() => {
            theVideo.play()
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/mixin';
  .video {
    position: absolute;
    left: -10000px;
    top: -10000px;
    &.video-play {
      position: fixed;
      z-index: 100;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
    }
  }
  
  .preview {
    .swiper-container {
      width: 100%;
      height: 100vh;
      .swiper-slide {
        position: relative;
        overflow: hidden;
      }
      .icon-white-play {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1.28rem;
        height: 1.28rem;
      }
      .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
      }
      .swiper-pagination-bullet-active {
        background: $pcolor;
      }
      img {
        width: 100%;
      }
    }
  }
</style>