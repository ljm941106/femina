<template>
  <div class="buy-middle">
    <div class="main">
      <div class="flex-left">
        <div class="img">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560273813612&di=b9d55ff08c8e128cbba457b926f4d104&imgtype=0&src=http%3A%2F%2Fpic21.nipic.com%2F20120617%2F9828806_155801095348_2.jpg"
            alt
          >
        </div>
        <h2>期刊名字后方可撒谎</h2>
      </div>
      <div class="flex-right">
        <div class="title">
          <div class="img-bg">
            <img src="../../../static/buy-middle-flag.png" style="width:464rpx;height:75rpx;">
          </div>
          <h2>期刊内容介绍</h2>
        </div>
        <p>把握、控制。指有组织、有计划、有标准的完成某项活动或工作，表示有很大的信心和很强的成功机率把握、控制。指有组织、有计划、有标准的完成某项活动或工作，表示有很大的信心和很强的成功机率把握、控制。指有组织、有计划、有标准的完成某项活动或工作，表示有很大的信心和很强的成功机率</p>
      </div>
    </div>
    <div class="name-list">
      <div class="item">
        <div class="img">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560273813612&di=b9d55ff08c8e128cbba457b926f4d104&imgtype=0&src=http%3A%2F%2Fpic21.nipic.com%2F20120617%2F9828806_155801095348_2.jpg"
            alt
          >
        </div>
        <strong>人名1</strong>
        <span>123本订阅</span>
      </div>
    </div>
    <div class="button-box">
      <div class="button button-whole">购买</div>
    </div>
  </div>
</template>

<script>
import fly from "../../utils/fly";
import api from "../../utils/api";
import buyPopup from "../../components/common/buy-popup";
import codeInputPopup from "../../components/common/code-input-popup";
export default {
  components: {
    buyPopup,
    codeInputPopup
  },
  data() {
    return {};
  },
  mounted() {},
  onShow() {},
  methods: {},
  onShareAppMessage: function(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "指尖阅读，要你好看，伊周GO！",
      path: "/pages/index/main",
      success: function(res) {},
      fail: function(res) {
        // 转发失败
      }
    };
  }
};
</script>

<style lang="scss">
.buy-middle {
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
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100rpx;
    width: 100%;
  }
  .button-whole {
    border: 4rpx solid #c8191d;
    box-shadow: 0 3rpx 20rpx 2rpx rgba(0, 0, 0, 0.1);
    margin: 10rpx auto;
    width: 690rpx;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80rpx;
    color: #c8191d;
    background: #ffffff;
    font-size: 38rpx;
    font-weight: bold;
  }
}
</style>
