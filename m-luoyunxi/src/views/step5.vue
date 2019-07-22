<template>
  <div class="swiper-page step5">
    <head-top></head-top>
    <div class="icon-to-top" v-show="currentIndex == 0" @click="showIntro2" :class="{active: isIntro2Show}">
      <img src="../img/to-top.png" alt="" />
    </div>
    <div class="text text1" :class="{active: text1Show && currentIndex == 0}">
      <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/6a78652c0ccb5d3614ab74171050ebba.png" />
    </div>
    <div class="text intro1 wow fadeInLeft" v-show="currentIndex == 0" data-wow-duration="1.5s" data-wow-delay="0s">
      <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/3f725bdf1f4e3bdb0bc036713f2f1123.png" />
    </div>
    <div class="intro2" :class="{active: isIntro2Show}">
      <img
        class="bg"
        src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/3d42aeee093b3eefa4cb6c28c844223f.png"
        alt=""
      />
      <img
        class="img"
        src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/0e86b5103cb7095640acaaeada681df1.png"
        alt=""
      />
    </div>
    <div class="text text2" :class="{active: text2Show && currentIndex == 1}">
      <img
        src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/af3d5ae623465c15bd650f01c423f28e.png"
        alt=""
      />
    </div>
    <div class="text text3" :class="{active: text3Show && currentIndex == 2}">
      <img
        src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/1b4811701b1f3cf3bb4a109ed1233437.T%20%E9%BB%91%E8%89%B2%E7%9A%AE%E5%A4%B9%E5%85%8B%20Common%20Gender%20%E5%8D%8A%E6%A1%86%E7%9C%BC%E9%95%9C%20Ermen"
      />
    </div>
    <div class="text text4" :class="{active: text4Show && currentIndex == 3}">
      <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/16a5eb9a271ac3aeac032360b7853c3a.png" />
    </div>
    <!-- 音频 -->
    <div class="audio" v-show="currentIndex == 1">
      <audio id="audio" controls src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/video/2019072101.mp3"></audio>
    </div>
    <!-- 视频 -->
    <div @click="showVideo2" style="position: absolute;top: 6rem;left: 1rem;z-index: 10;" v-show="currentIndex == 3">
      <img src="../img/step3-play-white.png" style="width: 0.7rem;" />
    </div>
    <div class="video2" v-if="isVideoShow && currentIndex == 3">
      <video id="video2" controls="controls" width="100%" preload>
        <source src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/video/2019072103.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img
            class="img"
            :class="{init: img1Init}"
            src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/ed185d437b880a444b71d596bb05b9b0.jpg"
          />
        </div>
        <div class="swiper-slide">
          <img
            class="img img2"
            :class="{init: img2Init}"
            src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/7912f66a20d4310da984ce3afbbf9476.jpg"
          />
        </div>
        <div class="swiper-slide">
          <img
            class="img"
            :class="{init: img3Init}"
            src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/990832617f01b09a749f14eb99f822b1.jpg"
          />
        </div>
        <div class="swiper-slide" @click="hideVideo">
          <img
            class="img"
            :class="{init: img4Init}"
            src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/11d8a83fb216f4f1b07067e1d612a223.jpg"
          />
        </div>
      </div>
    </div>
    <div class="swiper-button-prev" @click="prevPage"><img src="../img/swiper-prev.png" /></div>
    <div class="swiper-button-next" @click="nextPage"><img src="../img/swiper-next.png" /></div>
  </div>
</template>
<script>
import "../plugins/swiper.min";
import headTop from "../components/head.vue";
export default {
  name: "step3",
  components: {headTop},
  data() {
    return {
      currentIndex: 0,
      text1Show: false,
      img1Init: false,
      img2Init: false,
      text2Show: false,
      isIntro2Show: false,
      text3Show: false,
      img3Init: false,
      text4Show: false,
      img4Init: false,
      isVideoShow: false
    };
  },
  created() {},
  mounted() {
    const _this = this;
    let timeout;
    let touchStartX;
    let touchEndX;
    this.mySwiper = new Swiper(".swiper-container", {
      effect: "fade",
      speed: 1000,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      // loop: true,
      on: {
        touchStart(event) {
          touchStartX = event.changedTouches[0].screenX;
        },
        touchEnd(event) {
          touchEndX = event.changedTouches[0].screenX;
          if (touchEndX - touchStartX < -100 && _this.mySwiper.isEnd) {
            _this.$router.push("end");
          } else if (touchEndX - touchStartX > 100 && _this.mySwiper.isBeginning) {
            _this.$router.go(-1);
          }
        },
        init: function() {
          _this.text1Show = true;
          _this.img1Init = true;
          timeout = setTimeout(() => {
            _this.text1Show = false;
          }, 4000);
          // console.log("当前的slide序号是" + this.activeIndex);
          // this.emit("transitionEnd"); //在初始化时触发一次transitionEnd事件，需要先设置transitionEnd
        },
        slideChangeTransitionEnd: function() {
          // console.log(this.activeIndex);
        },
        slideChangeTransitionStart: function() {
          console.log(this.activeIndex);
          _this.text1Show = false;
          _this.text3Show = false;
          _this.text4Show = false;
          _this.text5Show = false;
          _this.currentIndex = this.activeIndex;
          if (this.activeIndex != 3) {
            let video2 = document.getElementById("video2");
            if (video2) video2.pause();
            _this.isVideoShow = false;
          }
          if (this.activeIndex != 1) {
            let audio = document.getElementById("audio");
            if (audio) audio.pause();
          }
          if (this.activeIndex == 1) {
            _this.text2Show = true;
            _this.img2Init = true;
            setTimeout(() => {
              _this.text2Show = false;
            }, 4000);
          }
          if (this.activeIndex == 2) {
            _this.text3Show = true;
            _this.img3Init = true;
            setTimeout(() => {
              _this.text3Show = false;
            }, 4000);
          }
          if (this.activeIndex == 3) {
            _this.text4Show = true;
            _this.img4Init = true;
            setTimeout(() => {
              _this.text4Show = false;
            }, 4000);
          }
          if (this.activeIndex == 4) {
            _this.text4Show = true;
            _this.img4Init = true;
            setTimeout(() => {
              _this.text4Show = false;
            }, 4000);
          }
        },
        slideChange: function() {}
      }
    });
  },
  methods: {
    showIntro2() {
      this.isIntro2Show = !this.isIntro2Show;
    },
    showVideo2() {
      this.isVideoShow = true;
    },
    hideVideo() {
      this.isVideoShow = false;
    },
    nextPage() {
      if (this.mySwiper.isEnd) {
        this.$router.push("end");
      }
    },
    prevPage() {
      if (this.mySwiper.isBeginning) {
        this.$router.push("step4");
      }
    }
  }
};
</script>
<style lang="scss">
.fade3-enter-active,
.fade3-leave-active {
  transition: opacity 2s;
}
.fade3-enter, .fade3-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.step5 {
  .text {
    position: fixed;
    z-index: 9;
    transition: 2s;
  }
  .text1 {
    top: 1.9rem;
    right: 0.65rem;
    width: 2.68rem;
    opacity: 0;
    &.active {
      opacity: 1;
    }
  }
  .intro1 {
    position: absolute;
    top: 4.4rem;
    left: 1.5rem;
    width: 4.37rem;
  }
  .intro2 {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    background: #fff;
    width: 100%;
    height: 100vh;
    opacity: 0;
    transition: opacity 1s;
    &.active {
      z-index: 10;
      opacity: 1;
    }
    .bg {
      width: 100vw;
      height: 15rem;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
    }
    .img {
      width: 5.75rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 6rem;
    }
  }
  .text2 {
    opacity: 0;
    right: 0.65rem;
    top: 1.9rem;
    opacity: 0;
    transition: 1s;
    &.active {
      opacity: 1;
    }
    img {
      width: 3.39rem;
    }
  }
  .text3 {
    bottom: 1.15rem;
    left: 0.65rem;
    width: 4.28rem;
    opacity: 0;
    &.active {
      opacity: 1;
    }
  }
  .text4 {
    top: 1.96rem;
    right: 0.65rem;
    opacity: 0;
    width: 3.585rem;
    &.active {
      opacity: 1;
    }
  }
  .text5 {
    top: 1.7rem;
    right: 0.65rem;
    opacity: 0;
    width: 3.63rem;
    &.active {
      opacity: 1;
    }
  }
  .play {
    width: 0.695rem;
    position: fixed;
    left: 0.835rem;
    top: 9.145rem;
    z-index: 10;
  }
  .swiper-slide {
    overflow: hidden;
    .img {
      transition: 2s;
      transform: scale(1.1);
      &.init {
        transform: scale(1);
      }
    }
    .img2 {
      transform: scale(1.5);
      // transform-origin: right center;
      &.init {
        transform: scale(1);
      }
    }
  }
  .audio {
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    bottom: 1.2rem;
    z-index: 10;
    img {
      width: 0.7rem;
    }
  }
  .video2 {
    position: fixed;
    left: 0;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
  }
}
</style>
