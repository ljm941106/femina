<template>
  <div class="description">
    <h2 v-if="type=='use'">阅读码使用说明</h2>
    <rich-text v-if="type=='use'" :nodes="infoUse"></rich-text>
  </div>
</template>

<script>
import fly from "../../utils/fly";
import api from "../../utils/api";
export default {
  components: {},
  data() {
    return {
      type: "",
      infoUse: ""
    };
  },
  onShow() {
    this.type = this.$mp.query.type;

    let result = wx.getStorageSync("config").use;
    const regex = new RegExp("<img", "gi");
    result = result.replace(regex, `<img mode="widthFix" class="img"`);
    this.infoUse = result;
  },
  methods: {}
};
</script>

<style lang="scss">
@import "../../mixin";
.description {
  padding: 20rpx 30rpx;
  h2 {
    text-align: center;
    font-size: 40rpx;
    font-weight: bold;
  }
  rich-text {
    max-width: 100%;
  }
  .img {
    max-width: 100%;
    margin: 20rpx auto;
  }
}
</style>