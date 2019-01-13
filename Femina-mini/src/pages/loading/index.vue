<template>
  <div class="loading">
    <img src="../../../static/loding.gif" />
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import api from '../../utils/api'
  export default {
    components: {},
    data() {
      return {}
    },
    onShow() {
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/main'
        })
      }, 3000)
    },
    methods: {},
  }
</script>

<style lang="scss">
  @import "../../mixin";
  .loading {
    position: relative;
    width: 100vw;
    height: 100vh;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>