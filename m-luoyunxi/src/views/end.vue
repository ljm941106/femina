<template>
  <div class="swiper-page end">
    <head-top backColor="black"></head-top>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img
            class="bg"
            src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/2fd7c544af7a5869153dc1410862f7ee.png"
          />
          <div class="video3">
            <video id="video3" controls="controls" width="100%" preload>
              <source src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/video/2019072104.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/b0dc318f3361dc9fc13bf56d1ef12956.jpg" />
        </div>
      </div>
    </div>
    <!-- <div class="swiper-button-prev" @click="prevPage"><img src="../img/swiper-prev.png" /></div> -->
    <!-- <div class="swiper-button-next" @click="nextPage"><img src="../img/swiper-next.png" /></div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import '../plugins/card.js'
import headTop from "../components/head.vue";
export default {
  name: "home",
  components: {headTop},
  created() {},
  mounted() {
    const _this = this;
    let touchStartX;
    let touchEndX;
    this.mySwiper = new Swiper(".swiper-container", {
      effect: "fade",
      speed: 1000,
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
          } else if (touchEndX > touchStartX && _this.mySwiper.isBeginning) {
            _this.$router.go(-1);
          }
        },
        slideChangeTransitionEnd() {
          if (this.activeIndex == 1) {
            document.getElementById("video3").pause();
          }
        }
      }
    });
  },
  methods: {
    nextPage() {},
    prevPage() {
      if (this.mySwiper.isBeginning) {
        this.$router.push("step5");
      }
    }
  }
};
</script>
<style lang="scss">
.end {
  width: 100%;
  .bg {
    width: 100%;
  }
  .video3 {
    position: absolute;
    top: 4.9rem;
  }
}
</style>
