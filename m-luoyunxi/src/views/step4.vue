<template>
  <div class="swiper-page step4">
    <head-top></head-top>
    <div class="icon-to-top" @click="showText" v-show="iconToTopShow" :class="{active: isIntro1Show || isIntro3Show}">
      <img src="../img/to-top.png" />
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/705a56a2d5f6fe1b8cbb19a88b0b47e4.jpg" />
        </div>
        <div class="swiper-slide big-img" ref="slide2">
          <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/6572ea1f5862afff97acd4f6f785caee.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/830b26f3299ec7606e676abbf9429c7b.jpg" />
        </div>
        <div class="swiper-slide big-img" ref="slide4">
          <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/f3f59f3c6bac674ff9d70a89c0342b08.jpg" />
        </div>
      </div>
    </div>
    <div class="swiper-button-prev" @click="prevPage"><img src="../img/swiper-prev.png" /></div>
    <div class="swiper-button-next" @click="nextPage"><img src="../img/swiper-next.png" /></div>
    <div class="intro1" :class="{active: isIntro1Show && swiperActiveIndex == 0}">
      <div class="img">
        <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/f3ae5c290354d965ab119592af47c4f6.jpg" />
      </div>
      <div class="intro-con">
        <div class="text-img">
          <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/0405b933625c0cb73f325a86c4456505.png" />
        </div>
        <div class="col-img">
          <img
            src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/895a89fcf65cb15a6ee6520db42524aa.T%20%E9%BB%91%E8%89%B2%E5%8D%B0%E8%8A%B1T%E6%81%A4%20Zadig%26Voltaire%20from%20I"
          />
        </div>
      </div>
    </div>
    <div class="intro2" :class="{active: isIntro2Show && swiperActiveIndex == 1}">
      <img
        src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/c2f155ff23547f096c507cb5d8accf80.T%20%E9%BB%91%E8%89%B2%E5%8D%B0%E8%8A%B1T%E6%81%A4%20Zadig%26Voltaire%20from%20I"
      />
    </div>
    <div class="intro1" :class="{active: isIntro3Show && swiperActiveIndex == 2}">
      <div class="img">
        <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/f4972c8329522af7534539ce882bc345.jpg" />
      </div>
      <div class="intro-con">
        <div class="text-img">
          <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/80b882e0b997e78ca186d9fd3e69f5f8.png" />
        </div>
        <div class="col-img">
          <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/5a0b25704521d88a1b6855e7dbca5901.png" />
        </div>
      </div>
    </div>
    <div class="intro4" :class="{active: isIntro4Show && swiperActiveIndex == 3}">
      <img
        class="text-img"
        src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/f9a79e78c00368c699dd5c2997c39013.png"
        alt=""
      />
      <img
        class="icon-video"
        src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/d276fa568ec3c9a1b64a7d2d7b7179c6.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import '../plugins/card.js'
import headTop from "../components/head.vue";
export default {
  name: "home",
  components: {headTop},
  data() {
    return {
      swiperActiveIndex: 0,
      iconToTopShow: true,
      isIntro1Show: false,
      isIntro2Show: false,
      isIntro3Show: false,
      isIntro4Show: false
    };
  },
  created() {},
  mounted() {
    console.log(document.documentElement.clientWidth * 2.247);
    let sctollLeft = document.documentElement.clientWidth * 2.247;
    const _this = this;
    let touchStartX;
    let touchEndX;
    this.mySwiper = new Swiper(".swiper-container", {
      effect: "fade",
      speed: 1000,
      // height: "auto",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
        touchStart(event) {
          touchStartX = event.changedTouches[0].screenX;
        },
        touchEnd(event) {
          touchEndX = event.changedTouches[0].screenX;
          if (touchEndX < touchStartX && _this.mySwiper.isEnd) {
            _this.$router.push("step5");
          }
        },
        slideChangeTransitionStart: function() {
          _this.swiperActiveIndex = this.activeIndex;
          if (_this.swiperActiveIndex == 0 || _this.swiperActiveIndex == 2) {
            _this.iconToTopShow = true;
          } else {
            _this.iconToTopShow = false;
          }
          if (_this.swiperActiveIndex == 1) {
            let inter = setInterval(() => {
              _this.$refs.slide2.scrollTo({
                top: 0,
                left: sctollLeft
              });
              if (_this.$refs.slide2.scrollLeft >= sctollLeft - 1) {
                clearInterval(inter);
                _this.isIntro2Show = true;
              }
            }, 10);
          }
          if (_this.swiperActiveIndex == 3) {
            let inter = setInterval(() => {
              _this.$refs.slide4.scrollTo({
                top: 0,
                left: sctollLeft
              });
              if (_this.$refs.slide4.scrollLeft >= sctollLeft - 1) {
                clearInterval(inter);
                _this.isIntro4Show = true;
              }
            }, 10);
          }
        }
      }
    });
  },
  methods: {
    showText() {
      if (this.swiperActiveIndex == 0) {
        this.isIntro1Show = !this.isIntro1Show;
      }
      if (this.swiperActiveIndex == 2) {
        this.isIntro3Show = !this.isIntro3Show;
      }
    },
    nextPage() {
      if (this.mySwiper.isEnd) {
        this.$router.push("step4");
      }
    },
    prevPage() {
      if (this.mySwiper.isBeginning) {
        this.$router.push("step3");
      }
    }
  }
};
</script>
<style lang="scss">
.step4 {
  position: relative;
  .swiper-container {
    height: 216.53vw;
  }
  .big-img {
    overflow: scroll;
    transition: 2s;
    img {
      width: auto;
      height: 100%;
      max-width: initial;
    }
    &.swiper-slide-active {
      scroll-behavior: smooth;
    }
  }
  .intro1 {
    width: 100vw;
    min-height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background: #fff;
    transition: 1s;
    z-index: -1;
    opacity: 0;
    &.active {
      opacity: 1;
      z-index: 10;
    }
    .intro-con {
      overflow: scroll;
    }
    & > div {
      text-align: center;
    }
    .img img {
      width: 100%;
    }
    .text-img {
      margin-top: 1rem;
      margin-bottom: 1.12rem;
      text-align: center;
      img {
        width: 5.825rem;
      }
    }
    .col-img {
      text-align: left;
      img {
        margin-left: 0.8rem;
        width: 3.57rem;
      }
    }
  }
  .intro2 {
    position: fixed;
    width: 100%;
    height: 0.6rem;
    left: 0.65rem;
    bottom: 1.2rem;
    opacity: 0;
    transition: 1s;
    z-index: -1;
    img {
      width: 3.57rem;
    }
    &.active {
      opacity: 1;
      z-index: 10;
    }
  }
  .intro4 {
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    .text-img {
      width: 2.835rem;
      position: absolute;
      top: 1.7rem;
      right: 0.65rem;
    }
    .icon-video {
      position: absolute;
    }
  }
}
</style>
