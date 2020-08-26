<template>
  <div class="code-input-popup" v-if="show">
    <div class="popup-bg" @click="hide"></div>
    <div class="popup-content">
      <div class="code-input-box">
        <h2>输入阅读码</h2>
        <input type="text" v-model="currentCode" />
        <div class="button" @click="submitCode">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import fly from "../../utils/fly";
import api from "../../utils/api";
export default {
  components: {},
  props: {
    show: {
      default: false,
      type: Boolean
    },
    code: {
      default: "",
      type: String
    },
    magazineId: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      currentCode: "",
      currentMagazineId: ""
    };
  },
  onShow() {
    this.currentCode = "";
  },
  watch: {
    code(value) {
      console.log("code:" + this.code);
      this.currentCode = this.code;
    },
    magazineId(value) {
      console.log("id：" + this.magazineId);
      this.currentMagazineId = this.magazineId;
    }
  },
  methods: {
    hide() {
      this.$emit("hideCodeInputPopup");
    },
    async submitCode() {
      if (!this.currentCode) {
        wx.showToast({
          title: "请填写阅读码",
          icon: "none",
          duration: 3000
        });
        return;
      }
      if (!this.currentMagazineId) {
        wx.showToast({
          title: "未获取到杂志,请稍后重试",
          icon: "none",
          duration: 3000
        });
        return;
      }
      wx.showLoading();
      let res = await fly.post(api.useCode, {
        token: wx.getStorageSync("token"),
        magazine_id: this.currentMagazineId || wx.getStorageSync("currentMagazineId"),
        code: this.currentCode
      });
      wx.hideLoading();
      if (res.code == 500) {
        wx.navigateTo({
          url: "/pages/login/main"
        });
        return;
      }
      if (res.code == 0) {
        this.$emit("hideCodeInputPopup");
        this.$emit("codePassed");
        wx.showToast({
          title: "阅读码兑换成功",
          icon: "none",
          duration: 3000
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 3000
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../mixin";
.code-input-popup {
  .popup-content {
    z-index: 100;
    position: fixed;
    left: 50%;
    top: 50%;
    width: 61.8%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 10rpx;
    overflow: hidden;
    .code-input-box {
      border-top: 4rpx solid $pcolor;
      h2 {
        text-align: center;
        line-height: 100rpx;
        font-weight: bold;
      }
      input {
        width: 80%;
        height: 60rpx;
        border-radius: 30rpx;
        background: #e3e3e3;
        padding: 0 10rpx;
        text-align: center;
        margin: 0 auto;
      }
      .button {
        margin-top: 60rpx;
        text-align: center;
        color: #ffffff;
        background: $pcolor;
        line-height: 80rpx;
      }
    }
  }
}
</style>
