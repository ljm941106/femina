<template>
  <scroll-view scroll-y style="height:100vh" class="buy-middle">
    <div class="main-img">
      <div class="img">
        <img :src="data.group_img">
      </div>
    </div>
    <!-- <div class="name-list"> -->
    <radio-group class="name-list" @change="radioChange">
      <label class="item" v-for="i in data.group" :key="i.id">
        <radio :value="i.id" style="display:none"/>
        <div class="img" :class="{active:choseValue==i.id}">
          <img :src="i.head_img">
        </div>
        <strong>{{i.name}}</strong>
        <span>{{i.total}}本订阅</span>
      </label>
    </radio-group>
    <div class="button-box">
      <div class="button button-whole" @click="buy">购买</div>
    </div>
  </scroll-view>
</template>

<script>
export default {
  components: {},
  props: {
    data: {}
  },
  data() {
    return {
      choseValue: ""
    };
  },
  mounted() {},
  onShow() {},
  methods: {
    radioChange(e) {
      this.choseValue = e.mp.detail.value;
      this.data.group.forEach(i => {
        if (this.choseValue == i.id) {
          this.name = i.name;
        }
      });
    },
    buy() {
      if (this.choseValue == "") {
        wx.showToast({
          title: "请选择成员",
          icon: "none",
          duration: 2000
        });
        return;
      }
      this.$emit("groupChose", this.choseValue, this.name);
    }
  }
};
</script>

<style lang="scss">
.buy-middle {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  min-height: 100vh;
  background: #ffffff;
  .main-img {
    padding: 30rpx 30rpx;
    .img {
      width: calc(100vw - 60rpx);
      height: calc(56.25vw - 33.75rpx);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .main {
    display: flex;
    padding: 50rpx 30rpx;
    .flex-left {
      width: 306rpx;
      text-align: center;
      .img {
        width: 306rpx;
        height: 408rpx;
        img {
          width: 100%;
          height: 100%;
        }
      }
      h2 {
        font-size: 36rpx;
        font-weight: bold;
        white-space: nowrap;
      }
    }
    .flex-right {
      margin-left: 45rpx;
      position: relative;
      width: 323rpx;
      .img-bg {
        position: absolute;
        top: 5rpx;
        left: -139rpx;
      }
      h2 {
        position: relative;
        line-height: 47rpx;
        font-size: 32rpx;
        margin-top: 33rpx;
        z-index: 9;
        font-weight: bold;
      }
      p {
        font-size: 26rpx;
        width: 300rpx;
        margin-top: 40rpx;
        text-align: justify;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 8;
        overflow: hidden;
      }
    }
  }
  .name-list {
    border-top: 20rpx solid #dedede;
    padding: 30rpx;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -40rpx;
    .item {
      width: calc(690rpx / 3);
      margin-bottom: 40rpx;
      .img {
        margin: 0 auto;
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        overflow: hidden;
        border: 10rpx solid transparent;
        &.active {
          border-color: #67c9bb;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      strong {
        margin-top: 8rpx;
        text-align: center;
        display: block;
        font-weight: bold;
        font-size: 32rpx;
      }
      span {
        line-height: 40rpx;
        display: block;
        text-align: center;
        color: #858585;
      }
    }
  }
  .button-box {
    height: 100rpx;
  }
  .button-whole {
    position: fixed;
    left: 30rpx;
    bottom: 20rpx;
    border: 4rpx solid #c8191d;
    box-shadow: 0 3rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
    height: 80rpx;
    width: 690rpx;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c8191d;
    background: #ffffff;
    font-size: 38rpx;
    font-weight: bold;
  }
}
</style>
