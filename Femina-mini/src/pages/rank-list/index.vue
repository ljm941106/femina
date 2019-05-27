<template>
  <div class="rank-list-page">
    <div class="rank-banner">
      <img :src="banner" style="width:750rpx;height:550rpx">
    </div>
    <div class="cutdown" :class="{'cutdown-end':!isCutdownShow&&cutdownRender}">
      <template v-if="isCutdownShow">
        <span>距离结束还剩：</span>
        <em>{{cutdown.day}}</em>天
        <em>{{cutdown.hour}}</em>小时
        <em>{{cutdown.minute}}</em>分
        <em>{{cutdown.second}}</em>秒
      </template>
      <div class="cutdown-end-text" v-else>活动已结束</div>
    </div>

    <div class="rank-con">
      <div class="top-list">
        <div v-for="(i,index) in topList" class="item-top" :class="{first:index==0}" :key="i.id">
          <div class="img">
            <div class="icon">
              <img v-if="index==0" src="../../../static/icon-rank-top.png">
              <img v-if="index==1" src="../../../static/icon-rank-top-2.png">
              <img v-if="index==2" src="../../../static/icon-rank-top-3.png">
            </div>
            <img :src="i.head_img">
            <div class="tag">TOP {{index+1}}</div>
          </div>
          <div class="name">{{i.nickname}}</div>
          <div class="num">{{i.total}}本订阅</div>
        </div>
      </div>
      <div class="normal-list">
        <div class="item" v-for="i in list" :key="i.id" v-if="index>2">
          <div class="index">{{index+1}}</div>
          <div class="img">
            <img :src="i.head_img">
          </div>
          <div class="name">{{i.nickname}}</div>
          <div class="num">{{i.total}}本订阅</div>
        </div>
      </div>
      <div class="rank-load-more" @click="loadPage2" v-if="isShowLoadPage2">加载更多</div>
    </div>
  </div>
</template>

<script>
import fly from "../../utils/fly";
import api from "../../utils/api";
export default {
  components: {},
  data() {
    return {
      banner: "",
      cutdownOriginal: 0,
      cutdown: {
        day: "",
        hour: "",
        minute: "",
        second: ""
      },
      list: [],
      topList: [],
      page: 1,
      isShowLoadPage2: false,
      cutdownRender: false,
      isCutdownShow: false
    };
  },
  onLoad() {
    //token
    this.token = wx.getStorageSync("token");
    //id
    this.magazineId = this.$mp.query.id;
    //mpvue设计权限，暂未修复，所以需要重置一下数据
    this.reset();
    //初始化数据
    this.init();
  },
  async onPullDownRefresh() {
    wx.showLoading();
    this.page = 1;
    this.list = [];
    this.topList = [];
    this.initRank();
    wx.stopPullDownRefresh();
    wx.hideLoading();
  },
  async onReachBottom() {
    // if (this.page < 2) return;
    // if (this.page == 1 && this.currentSize < 10) return;
    // if (this.page > 2 && this.currentSize < 50) return;
    // if (this.page == 11) return;
    // wx.showLoading();
    // this.page++;
    // let res = await fly.get(api.rank, {
    //   magazine_id: this.magazineId,
    //   page: this.page
    // });
    // if (res.code == 0) {
    //   this.list = this.list.concat(res.data.list);
    //   if (this.list.length > 500) {
    //     this.list.splice(500);
    //   }
    // }
    // wx.hideLoading();
  },
  onShow() {
    //			let magazineId = this.$mp.query.id;
    //			let oldMagazineId = wx.getStorageSync("magazineId");
    //			if(magazineId != oldMagazineId) {
    //				this.magazineId = this.$mp.query.id;
    //				this.page = 1;
    //				this.topList = [];
    //				this.init();
    //				wx.setStorageSync("magazineId", this.magazineId);
    //			}
  },
  methods: {
    reset() {
      this.banner = "";
      this.cutdownOriginal = 0;
      this.cutdown = {
        day: "",
        hour: "",
        minute: "",
        second: ""
      };
      this.list = [];
      this.topList = [];
      this.page = 1;
      this.isShowLoadPage2 = false;
      this.cutdownRender = false;
      this.isCutdownShow = false;
    },
    async init() {
      this.initRank();
      this.initCutdown();
    },
    //排行榜
    async initRank() {
      let res = await fly.get(api.rank, {
        magazine_id: this.magazineId,
        page: this.page,
        token: this.token
      });
      if (res.code == 0) {
        this.list = this.list.concat(res.data.list);
        // this.currentSize = res.data.list;
        if (this.list && this.list.length > 3) {
          for (let index = 0; index < 3; index++) {
            this.topList.push(this.list[index]);
          }
        } else if (this.list && this.list.length <= 3) {
          this.list.forEach(item => {
            this.topList.push(item);
          });
        }
        if (this.list.length < 10) {
          this.isShowLoadPage2 = false;
        } else {
          this.isShowLoadPage2 = true;
        }
      }
    },
    //倒计时和banner图
    async initCutdown() {
      let cutdownRes = await fly.get("api/index/rank_time", {
        magazine_id: this.magazineId,
        token: this.token
      });
      if (cutdownRes.code == 0) {
        this.banner = cutdownRes.data.rank_img; //banner
        this.cutdownOriginal = cutdownRes.data.remaining_time; //倒计时
        this.cutdownRender = true;
        if (this.cutdownOriginal > 0) {
          this.isCutdownShow = true;
        } else {
          this.isCutdownShow = false;
        }
        this.cutdownCount();
        this.cutdownInterval = setInterval(() => {
          this.cutdownCount();
        }, 1000);
      }
    },
    //倒计时方法
    cutdownCount() {
      this.cutdownOriginal--;
      this.cutdown.day = parseInt(this.cutdownOriginal / 60 / 60 / 24);
      this.cutdown.hour = parseInt(
        (this.cutdownOriginal - this.cutdown.day * 60 * 60 * 24) / 60 / 60
      );
      this.cutdown.minute = parseInt(
        (this.cutdownOriginal -
          this.cutdown.hour * 60 * 60 -
          this.cutdown.day * 60 * 60 * 24) /
          60
      );
      this.cutdown.second = parseInt(
        this.cutdownOriginal -
          this.cutdown.hour * 60 * 60 -
          this.cutdown.day * 60 * 60 * 24 -
          this.cutdown.minute * 60
      );
    },
    async loadPage2() {
      wx.showLoading();
      this.page++;
      let res = await fly.get(api.rank, {
        magazine_id: this.magazineId,
        page: this.page
      });
      if (res.code == 0) {
        this.list = this.list.concat(res.data.list);
      }
      wx.hideLoading();
      this.isShowLoadPage2 = false;
    }
  },
  onShareAppMessage: function(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "指尖阅读，要你好看，伊周GO！",
      path:
        "/pages/index/main?id=" +
        this.magazineId +
        "&name=" +
        this.$mp.query.name,
      success: function(res) {},
      fail: function(res) {
        // 转发失败
      }
    };
  },
  onHide() {
    clearInterval(this.cutdownInterval);
  },
  onUnload() {
    clearInterval(this.cutdownInterval);
  }
};
</script>

<style lang="scss">
.rank-list-page {
  .rank-con {
    margin: 75rpx auto 0;
    width: 600rpx;
    .top-list {
      position: relative;
      height: 300rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .item-top {
      width: 154rpx;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      &.first {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        .tag {
          width: 150rpx;
          height: 40rpx;
          border-radius: 20rpx;
        }
        .img {
          width: 140rpx;
          height: 140rpx;
          .icon {
            position: absolute;
            right: -28rpx;
            top: -42rpx;
            width: 73rpx;
            height: 70rpx;
          }
        }
      }
      &:nth-child(2) {
        .tag {
          border-color: #d8d8d8;
          color: #d8d8d8;
        }
      }
      &:nth-child(3) {
        .tag {
          border-color: #cb6600;
          color: #cb6600;
        }
      }
      .img {
        position: relative;
        width: 120rpx;
        height: 120rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }
        .icon {
          position: absolute;
          right: -12rpx;
          top: -37rpx;
          width: 56rpx;
          height: 53rpx;
        }
      }
      .tag {
        bottom: -10rpx;
        position: absolute;
        width: 126rpx;
        height: 36rpx;
        border-radius: 18rpx;
        font-size: 28rpx;
        border: 2rpx solid #ffd125;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffd125;
        background: #ffffff;
      }
      .name {
        margin-top: 20rpx;
        line-height: 40rpx;
        width: 100%;
        font-size: 26rpx;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .num {
        line-height: 40rpx;
        font-size: 24rpx;
        color: #858585;
        text-align: center;
      }
    }
  }
  .normal-list {
    margin-top: 20rpx;
    .item {
      border-bottom: 1rpx solid #dedede;
      display: flex;
      height: 100rpx;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      .index {
        width: 60rpx;
        font-size: 24rpx;
        color: #858585;
      }
      .img {
        width: 75rpx;
        height: 75rpx;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .name {
        padding-left: 20rpx;
        width: 265rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size: 26rpx;
      }
      .num {
        padding-right: 20rpx;
        width: 200rpx;
        font-size: 24rpx;
        color: #858585;
        text-align: right;
      }
    }
  }
}

.rank-load-more {
  font-size: 28rpx;
  color: #c8191d;
  text-align: center;
  line-height: 80rpx;
}
.cutdown {
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  border-top: #aaaaaa solid 2rpx;
  border-bottom: #aaaaaa solid 2rpx;
  &.cutdown-end {
    background: #aaaaaa;
  }
  span {
    color: #858585;
  }
  em {
    background: #fc580d;
    width: 40rpx;
    height: 40rpx;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 4rpx;
  }
  .cutdown-end-text {
    color: #ffffff;
  }
}
</style>