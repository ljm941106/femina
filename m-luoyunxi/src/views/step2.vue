<template>
  <div class="step2">
    <!-- <head-top></head-top> -->
    <div class="img">
      <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/485f517097a22b20a291bd39c7b3a6bb.jpg" />
    </div>
    <div class="point p1" @click="goto('/step3')">
      <img class="icon-red-point" src="../img/redpoint.png" alt="" />
      <img class="icon-red-point-a" src="../img/redpointarrow.png" alt="" />
    </div>
    <div class="point p2" @click="goto('/step4')">
      <img class="icon-red-point" src="../img/redpoint.png" alt="" />
      <img class="icon-red-point-a" src="../img/redpointarrow.png" alt="" />
    </div>
    <div class="point p3" @click="goto('/step5')">
      <img class="icon-red-point" src="../img/redpoint.png" alt="" />
      <img class="icon-red-point-a" src="../img/redpointarrow.png" alt="" />
    </div>
    <div class="text-step2 wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay="0s">
      <img src="../img/text-step2.png" />
    </div>
  </div>
</template>

<script>
import headTop from "../components/head.vue";
export default {
  name: "home",
  components: {headTop},
  created() {},
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss">
.step2 {
  width: 100vw;
  overflow-x: hidden;
  .point {
    position: absolute;
    left: 1.96rem;
    top: 5.77rem;
    height: 0.67rem;
    width: 0.635rem;
    animation: scaleCom 2s infinite;
    .icon-red-point {
      position: absolute;
      top: 0;
      left: 0;
    }
    .icon-red-point-a {
      position: absolute;
      top: 0.135rem;
      left: 0.13rem;
    }
    &.p2 {
      top: 9.715rem;
      left: 0.625rem;
    }
    &.p3 {
      top: 12.32rem;
      left: auto;
      right: 0.21rem;
      transform: rotateY(180deg);
      animation: scaleRedPoint 2s infinite;
    }
  }
  .text-step2 {
    position: fixed;
    left: 0.65rem;
    bottom: 1rem;
    width: 1.69rem;
  }
}
@keyframes scaleRedPoint {
  0% {
    transform: scale(1) rotateY(180deg);
  }

  50% {
    transform: scale(1.2) rotateY(180deg);
  }

  100% {
    transform: scale(1) rotateY(180deg);
  }
}
</style>
