<template>
  <div class="end">
    <head-top backColor="black"></head-top>
    <img
      class="bg"
      src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/2fd7c544af7a5869153dc1410862f7ee.png"
    />
    <div class="video3">
      <video id="video3" controls="controls" width="100%" preload>
        <source src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/video/2019072103.mp4" type="video/mp4" />
      </video>
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
  created() {}
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
