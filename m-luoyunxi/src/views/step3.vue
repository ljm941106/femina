<template>
  <div class="swiper-page step3 ">
    <head-top></head-top>
    <div class="icon-to-top" v-show="currentIndex == 1 && !text1Show" @click="showText1"><img src="../img/to-top.png" alt="" /></div>
    <div class="text text1" :class="{ active: text0Show && currentIndex == 0 }"><img src="../img/text-3-1.png" /></div>
    <div class="text text2" :class="{ active: text1Show && currentIndex == 1 }"><img src="../img/text3-2.png" alt="" /></div>
    <div class="text text3" :class="{ active: text2Show && currentIndex == 2 }"><img src="../img/text3-3.png" alt="" /></div>
    <div class="text text4" :class="{ active: text3Show && currentIndex == 3 }"><img src="../img/text3-4.png" alt="" /></div>
    <div class="text text5" :class="{ active: text4Show && currentIndex == 4 }"><img src="../img/text3-5.png" alt="" /></div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img class="img" :class="{ init: img0Init }" src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/327fa954346c7ac11494f3e313238e07.jpg" />
        </div>
        <div class="swiper-slide" @click="hideText1">
          <img class="img" :class="{ init: img1Init }" src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/bac1b9adc94ad15899452cb9b87fa5ba.jpg" />
        </div>
        <div class="swiper-slide">
          <img class="img" :class="{ init: img2Init }" src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/8de0c3b0c6facb5933c11a8ad24f220a.jpg" />
        </div>
        <div class="swiper-slide">
          <img class="img" :class="{ init: img3Init }" src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/a5a3cb56cf7844005fb5c0358132e97d.jpg" />
        </div>
        <div class="swiper-slide" @click="hideVide1()">
          <img class="img" :class="{ init: img4Init }" src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/833777b6c020a8cf9f862018687894d1.jpg" />
          <div class="icon-video play" @click.stop="showVideo1"><img src="../img/step3-play.png" /></div>
        </div>
      </div>
    </div>
    <div class="swiper-button-prev" @click="prevPage"><img src="../img/swiper-prev.png" /></div>
    <div class="swiper-button-next" @click="nextPage"><img src="../img/swiper-next.png" /></div>
    <div class="video1" v-show="isVideo1Show">
      <video id="video1" controls="controls" width="100%" preload><source src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/video/2019072102.mp4" type="video/mp4" /></video>
    </div>
  </div>
</template>

<script>
import '../plugins/swiper.min';
import headTop from '../components/head.vue';
export default {
  name: 'step3',
  components: { headTop },
  data() {
    return {
      currentIndex: 0,

      text0Show: false,
      img0Init: false,

      text1Show: false,
      img1Init: false,

      text2Show: false,
      img2Init: false,

      text3Show: false,
      img3Init: false,

      text4Show: false,
      img4Init: false,

      isVideo1Show: false
    };
  },
  created() {},
  mounted() {
    document.getElementById('video1').addEventListener('ended', () => {
      this.isVideo1Show = false;
    });
    const _this = this;
    let timeout;
    let touchStartX;
    let touchEndX;
    this.mySwiper = new Swiper('.swiper-container', {
      effect: 'fade',
      speed: 1000,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      // loop: true,
      on: {
        init: function() {
          _this.text0Show = true;
          _this.img0Init = true;
          timeout = setTimeout(() => {
            _this.text0Show = false;
          }, 4000);
        },
        touchStart(event) {
          touchStartX = event.changedTouches[0].screenX;
        },
        touchEnd(event) {
          touchEndX = event.changedTouches[0].screenX;
          if (touchEndX - touchStartX < -100 && _this.mySwiper.isEnd) {
          } else if (touchEndX - touchStartX > 100 && _this.mySwiper.isBeginning) {
            _this.$router.go(-1);
          }
        },
        slideChangeTransitionEnd: function() {},
        slideChangeTransitionStart: function() {
          _this.isVideo1Show = false;
          _this.text0Show = false;
          _this.text1Show = false;
          _this.text2Show = false;
          _this.text3Show = false;
          _this.text4Show = false;
          _this.currentIndex = this.activeIndex;

          if (this.activeIndex == 1) {
            _this.text1Show = true;
            _this.img1Init = true;
            setTimeout(() => {
              _this.text1Show = false;
            }, 4000);
          }
          if (this.activeIndex == 2) {
            _this.text2Show = true;
            _this.img2Init = true;
            setTimeout(() => {
              _this.text2Show = false;
            }, 4000);
          }
          if (this.activeIndex == 3) {
            _this.text3Show = true;
            _this.img3Init = true;
            setTimeout(() => {
              _this.text3Show = false;
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
    showText1() {
      this.text1Show = true;
    },
    hideText1() {
      this.text1Show = false;
    },
    showVideo1() {
      console.log('show');
      this.isVideo1Show = true;
    },
    hideVide1() {
      console.log('hide');
      this.isVideo1Show = false;
    },
    nextPage() {
      if (this.mySwiper.isEnd) {
      }
    },
    prevPage() {
      if (this.mySwiper.isBeginning) {
        this.$router.go(-1);
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
.step3 {
  .video1 {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
  .text {
    position: fixed;
    z-index: 10;
    transition: 2s;
  }
  .text1 {
    left: 0.65rem;
    bottom: 1.18rem;
    width: 3.735rem;
    opacity: 0;
    &.active {
      opacity: 1;
    }
  }
  .text2 {
    text-align: center;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-top: 0.64rem;
    padding-bottom: 0.8rem;
    background: rgba(54, 46, 43, 0.6);
    bottom: -7.275rem;
    &.active {
      bottom: 0;
    }
    img {
      width: 5.835rem;
    }
  }
  .text3 {
    right: 0.65rem;
    top: 1.75rem;
    width: 3.74rem;
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
    bottom: 1.175rem;
    left: 0.65rem;
    opacity: 0;
    width: 3.6rem;
    &.active {
      opacity: 1;
    }
  }
  .play {
    width: 0.695rem;
    position: absolute;
    left: 0.65rem;
    top: 9.2rem;
    z-index: 100;
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
  }
}
</style>
