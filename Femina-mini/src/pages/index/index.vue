<template>
  <div class="index">
    <swiper
      class="swiper-banner"
      :indicator-dots="true"
      :autoplay="false"
      :current="swiperIndex"
      :previous-margin="swiperMargin"
      :next-margin="swiperMargin"
      @change="swiperChange"
    >
      <block v-for="(item, index) in banner" :key="item.id">
        <swiper-item class="magazine" :class="{ current: swiperIndex == index }" @click="gotoItem(item)">
          <div class="img-box">
            <div class="img">
              <img :src="item.img" />
              <div class="detail">
                <img src="../../../static/logo-bg.png" />
                <div class="button">预览</div>
                <div class="num">{{ item.sale }}人已订阅</div>
              </div>
            </div>
          </div>
        </swiper-item>
      </block>
    </swiper>
    <div class="button-box">
      <div class="button" @click="gotoItem(currentSwiper)"><text>开始阅读</text></div>
      <div class="button" @click.stop="gotoRank(currentSwiper)"><text>粉丝订阅榜</text></div>
    </div>
    <div class="index-list">
      <div class="menu">
        <div class="item" :class="{ active: index == currentIndex }" v-for="(i, index) in menuList" :key="i.id" @click="munuItemClick(index)">{{ i.value }}</div>
      </div>
      <div class="list-box">
        <div v-show="currentIndex == 0">
          <div class="pro-list">
            <div class="item" v-for="i in list" :key="i.id" @click="gotoItem(i)">
              <div class="tag" v-if="!i.buy && !isiOS"><div>购买</div></div>
              <div class="cover">
                <img :src="i.img" />
                <span>{{ i.name }}</span>
              </div>
              <div class="intro">{{ i.sale }}人订阅</div>
            </div>
          </div>
          <div class="no-data" v-if="list.length == 1">暂无更多期刊...</div>
        </div>
        <div v-show="currentIndex == 1">
          <div class="pro-list">
            <div class="item" v-for="i in myList" :key="i.id" @click="gotoItem(i)">
              <div class="cover">
                <img :src="i.img" />
                <span>{{ i.name }}</span>
              </div>
              <div class="intro">{{ i.sale }}人订阅</div>
            </div>
          </div>
          <div class="no-data" v-if="myList.length == 0">暂无期刊...</div>
        </div>
        <div v-show="currentIndex == 2">
          <div class="coupon-list" v-if="!isiOS">
            <div class="des-button" @click="viewDes">阅读码使用说明</div>
            <div class="item" v-for="i in myCodeList" :key="i.id">
              <div class="img"><img :src="i.img" /></div>
              <div class="intro">
                <h3>{{ i.name }}</h3>
                <div class="code">
                  阅读码
                  <br />
                  {{ i.code }}
                </div>
                <div class="operation">
                  <div class="button" :class="{ disabled: i.status }" @click="toUseCode(i.pid, i.code, i.status)">
                    <template v-if="i.status">
                      已使用
                    </template>
                    <template v-else>
                      去使用
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="no-data" v-if="myCodeList.length==0">您暂未阅读码...</div>-->
        </div>
      </div>
    </div>
    <buy-popup :show="isBuyPopupShow" @show="buyPopupShow"></buy-popup>
    <code-input-popup
      ref="codeUse"
      :show="isCodeInputPopup"
      @hideCodeInputPopup="hideCodeInputPopup"
      @codePassed="codePassed"
      :code="currentUseCode"
      :magazineId="currentMagazineId"
    ></code-input-popup>
  </div>
</template>

<script>
import fly from '../../utils/fly';
import api from '../../utils/api';
import buyPopup from '../../components/common/buy-popup';
import codeInputPopup from '../../components/common/code-input-popup';
export default {
  components: {
    buyPopup,
    codeInputPopup
  },
  data() {
    return {
      menuList: [
        {
          id: 'all',
          value: '全部杂志',
          icon: require('../../../static/icon-home.png'),
          iconActive: require('../../../static/icon-homed.png')
        },
        {
          id: 'purchased',
          value: '我的杂志',
          icon: require('../../../static/icon-coupon-list.png'),
          iconActive: require('../../../static/icon-coupon-listd.png')
        },
        {
          id: 'code',
          value: '阅读码',
          icon: require('../../../static/icon-purchase.png'),
          iconActive: require('../../../static/icon-purchased.png')
        }
      ],
      banner: [],
      swiperIndex: 0,
      swiperMargin: 0,
      currentSwiper: '',
      list: [],
      firstItem: '',
      myList: [], //我已购买的期刊
      myCodeList: [],
      currentIndex: 0,
      isBuyPopupShow: false,
      isCodeInputPopup: false,
      currentUseCode: '',

      indexPage: 1,
      myPage: 1,
      codePage: 1,

      isiOS: false,
      webViewSrc: ''
    };
  },
  mounted() {
    const systemRes = wx.getSystemInfoSync();
    if (systemRes.system.indexOf('iOS') > -1) this.isiOS = true;
    this.swiperMargin = (systemRes.windowWidth / 750) * 55 + 'px';
    if (this.$mp.query.id) {
      wx.navigateTo({
        url: '/pages/preview/main?id=' + this.$mp.query.id + '&name=' + this.$mp.query.name
      });
    }
    this.timeStart = +new Date();
  },
  onShow() {
    this.token = wx.getStorageSync('token');
    if (this.list.length == 0) {
      this.initList();
    }
  },
  async onPullDownRefresh() {
    this.indexPage = 1;
    this.myPage = 1;
    this.codePage = 1;
    this.initList();
    wx.stopPullDownRefresh();
  },
  async onReachBottom() {
    wx.showLoading();
    switch (this.currentIndex) {
      case 0:
        if (this.list.length % 20 == 0) {
          this.indexPage++;
          let indexRes = await fly.post(api.getList, {
            token: this.token,
            page: this.indexPage
          });
          this.list = this.list.concat(indexRes.data.list);
        }
        break;
      case 1:
        if (this.myList.length % 20 == 0) {
          this.myPage++;
          let myRes = await fly.post(api.getList, {
            token: this.token,
            page: this.myPage
          });
          this.myList = this.myList.concat(myRes.data.list);
        }
        break;
      case 2:
        if (this.myCodeList.length % 20 == 0) {
          this.codePage++;
          let codeRes = await fly.post(api.getCode, {
            token: this.token,
            page: this.codePage
          });
          this.myCodeList = this.myCodeList.concat(codeRes.data.list);
        }
        break;
      default:
        break;
    }
    wx.hideLoading();
  },
  methods: {
    async initList() {
      fly
        .post(api.getBanner, {
          token: this.token
        })
        .then(data => {
          this.banner = data.data.list;
          this.currentSwiper = this.banner[0];
        });
      //      wx.showLoading()
      this.indexPage = 1;
      this.myPage = 1;
      this.codePage = 1;
      //所有产品
      fly
        .post(api.getList, {
          token: this.token
        })
        .then(listRes => {
          this.list = listRes.data.list;
          this.firstItem = this.list[0];
          //        wx.hideLoading()
        });
    },
    async munuItemClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 1:
          if (this.myList.length == 0) {
            //已经购买的期刊
            let myListRes = await fly.post(api.getMyList, {
              token: this.token
            });
            if (myListRes.code == 500) {
              wx.navigateTo({
                url: '/pages/login/main'
              });
              return;
            }
            this.myList = myListRes.data.list;
          }
          break;
        case 2:
          if (this.myCodeList.length == 0) {
            //已经购买的阅读码
            let myCodeListRes = await fly.post(api.getCode, {
              token: this.token
            });
            if (myCodeListRes.code == 500) {
              wx.navigateTo({
                url: '/pages/login/main'
              });
              return;
            }
            this.myCodeList = myCodeListRes.data.list;
          }
          break;
        default:
          break;
      }
    },
    buyPopupShow(flag) {
      this.isBuyPopupShow = flag;
    },
    hideCodeInputPopup() {
      this.isCodeInputPopup = false;
      this.currentUseCode = '';
      this.currentMagazineId = '';
    },
    showCodeInputPopup(magazineId) {
      this.currentMagazineId = magazineId;
      this.isCodeInputPopup = true;
    },
    gotoItem(item) {
      wx.navigateTo({
        url: '/pages/preview/main' + '?id=' + item.id + '&name=' + item.name
      });
      wx.setStorageSync('rankBanner', item.rank_img);
    },
    gotoRank(item) {
      if (item.rank_enable) {
        wx.setStorageSync('rankBanner', item.rank_img);
        wx.navigateTo({
          url: '/pages/rank-list/main?id=' + item.id
        });
      } else {
        wx.showToast({
          title: '暂未开启排行榜',
          icon: 'none',
          duration: 2000
        });
      }
    },
    async toUseCode(magazineId, code, status) {
      if (status) return;
      this.isCodeInputPopup = true;
      this.currentUseCode = code;
      this.currentMagazineId = magazineId;
    },
    //阅读码兑换成功
    codePassed() {
      this.initList();
    },
    viewDes() {
      wx.navigateTo({
        url: '/pages/description/main?type=use'
      });
    },
    swiperChange(e) {
      this.swiperIndex = e.mp.detail.current;
      this.currentSwiper = this.banner[this.swiperIndex];
    }
  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '指尖阅读，要你好看，伊周GO！',
      path: '/pages/index/main',
      success: function(res) {},
      fail: function(res) {
        // 转发失败
      }
    };
  }
};
</script>

<style lang="scss">
@import '../../mixin';

.index {
  .swiper-banner {
    height: 916rpx;
  }
  .button-box {
    margin: -20rpx auto 30rpx;
    height: 126rpx;
    width: 612rpx;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    .button {
      position: relative;
      color: $pcolor;
      width: 233.8rpx;
      height: 112rpx;
      display: flex;
      justify-content: center;
      padding-top: 46.2rpx;
      font-size: 33.6rpx;
       background: url("https://mini.yizhou.com.cn/public/icon/index-bg-none.png") center / cover;
      &:nth-child(2) {
         background-image: url("https://mini.yizhou.com.cn/public/icon/index-bg-rank.png");
        text {
          margin-left: 28rpx;
        }
      }
      span {
        font-weight: bold;
        line-height: 1;
      }
    }
  }
  .magazine {
    display: flex;
    padding: 40rpx 0;
    flex-direction: column;
    align-items: center;
    &.current {
      .img {
        width: 612rpx;
        height: 816rpx;
        box-shadow: 0 0 10rpx 2rpx rgba(0, 0, 0, 0.2);
      }
    }
    .img-box {
      width: 612rpx;
      height: 816rpx;
      position: relative;
    }
    .img {
      width: 581.4rpx;
      height: 775.2rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.3s;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .detail {
        position: absolute;
        left: 50%;
        bottom: 20rpx;
        transform: translateX(-50%);
        width: 430rpx;
        height: 256rpx;
        img {
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .button {
          position: relative;
          width: 150rpx;
          padding: 0;
          line-height: 56rpx;
          margin: 110rpx auto 8rpx;
          border: #ffffff 1rpx solid;
          border-radius: 6rpx;
          text-align: center;
          color: #ffffff;
          font-size: 30rpx;
        }
        .num {
          width: 340rpx;
          margin: 0 auto;
          height: 30rpx;
          color: #ffffff;
          font-size: 24rpx;
          text-align: right;
        }
      }
    }
  }
  .index-list {
    border-top: 20rpx #dedede solid;
    /*padding-top: 20rpx;*/
    .menu {
      /*padding: 0 30rpx;*/
      justify-content: space-between;
      display: flex;
      .item {
        /*width: 200rpx;
          height: 80rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2rpx solid #333;
          border-radius: 6rpx;*/
        position: relative;
        width: calc(100% / 3);
        text-align: center;
        line-height: 100rpx;
        border-bottom: 1rpx solid #d1d1d1;
        &.single {
          width: 100%;
        }
        &.active {
          /*border-color: $pcolor;*/
          color: $pcolor;
          &:after {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            bottom: -1rpx;
            width: 100%;
            height: 2rpx;
            transform: translateX(-50%);
            background: $pcolor;
          }
        }
        img {
          width: 50rpx;
          height: 49rpx;
        }
        &:nth-child(2) img {
          width: 46rpx;
          height: 41rpx;
        }
        &:nth-child(3) img {
          width: 47rpx;
          height: 46rpx;
        }
      }
    }
  }
  .list-box {
    margin-top: 40rpx;
    .pro-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 30rpx;
      .item {
        position: relative;
        width: 306rpx;
        margin-bottom: 40rpx;
        overflow: hidden;
        .tag {
          display: block;
          position: absolute;
          font-size: 24rpx;
          top: -1rpx;
          right: 0;
          width: 0;
          height: 0;
          color: #ffffff;
          display: flex;
          margin-top: 0.1rpx;
          align-items: flex-end;
          border-width: 50rpx;
          border-style: solid;
          border-color: transparent;
          border-top-color: $pcolor;
          border-right-color: $pcolor;
          div {
            position: absolute;
            width: 50rpx;
            font-size: 22rpx;
          }
        }
        .cover {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 306rpx;
            height: 408rpx;
          }
          span {
            line-height: 60rpx;
            color: #434343;
            font-weight: bold;
          }
        }
        .intro {
          text-align: center;
          font-size: 24rpx;
          color: #999;
        }
      }
    }
    .coupon-list {
      .des-button {
        width: 500rpx;
        line-height: 60rpx;
        text-align: center;
        border: 1px solid #999;
        border-radius: 6rpx;
        margin: 40rpx auto 10rpx;
        color: #777;
      }
      .item {
        width: 610rpx;
        padding: 30rpx 12rpx 30rpx;
        border-bottom: 1px solid #d1d1d1;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        .img {
          height: 326.4rpx;
          width: 244.8rpx;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .intro {
          height: 326.4rpx;
          width: calc(100% - 244.8rpx);
          h3 {
            font-size: 36rpx;
            font-weight: bold;
            height: 100rpx;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .code {
            text-align: center;
          }
          .operation {
            margin-top: 40rpx;
            display: flex;
            width: 100%;
            justify-content: space-around;
            .button {
              border-radius: 6rpx;
              border: 1px solid #333333;
              width: 140rpx;
              line-height: 56rpx;
              text-align: center;
              font-size: 24rpx;
              &.active {
                color: $pcolor;
                border-color: $pcolor;
              }
              &.disabled {
                background: #e3e3e3;
                border-color: #bcb8b8;
                color: #bcb8b8;
              }
            }
          }
        }
      }
    }
  }
  .no-data {
    text-align: center;
    color: #999999;
    font-size: 28rpx;
    line-height: 60rpx;
  }
}
</style>
