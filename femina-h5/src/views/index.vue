<template>
  <div class="index">
    <div class="logo-con">
      <h2>伊周电子刊·订阅</h2>
      <div class="logo">
        <img :src="banner" />
      </div>
    </div>
    <div class="shop">
      <div class="menu">
        <div class="item" :class="{active:index==currentIndex}" v-for="(i,index) in menuList" :key="i.id" @click="menuItemClick(index)">
          {{i.value}}
          <!--<img :src="i.img" v-if="index!=currentIndex" />
          <img :src="i.imgActive" v-if="index==currentIndex" />-->
        </div>
      </div>
      <div class="list-con">
        <div class="pro-list" v-show="currentIndex==0">
          <div class="item-first">
            <div class="img">
              <img :src="firstItem.img" />
            </div>
            <div class="intro">
              <div class="new"><img src="../assets/icon-hot.png" style="width: .25rem;height: .3rem;" />&nbsp;NEW</div>
              <h3>{{firstItem.name}}</h3>
              <div class="detail">
                <span>￥{{price}}</span>
                <i>销量:{{firstItem.sale}}</i>
              </div>
              <div class="operation">
                <div class="button" @click="preview(firstItem.id)">预览</div>
                <div class="button" @click="showBuyModal(firstItem.id,firstItem.name,firstItem.buy)">
                  <template v-if="firstItem.buy">再次购买</template>
                  <template v-else>购买阅读码</template>
                </div>
              </div>
            </div>
          </div>
          <div class="item" v-for="(i,index) in proList" v-if="index>0">
            <div class="img">
              <img :src="i.img" />
            </div>
            <div class="intro">
              <h3>{{i.name}}</h3>
              <div class="detail-box">
                <div class="detail">
                  <span>￥{{price}}</span>
                  <i>销量:{{i.sale}}</i>
                </div>
                <div class="operation">
                  <div class="button" @click="preview(i.id)">预览</div>
                  <div class="button" @click="showBuyModal(i.id,i.name,i.buy)">
                    <template v-if="i.buy">再次购买</template>
                    <template v-else>购买阅读码</template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="coupon-list" v-show="currentIndex==1">
          <div class="des-button" @click="viewDes">阅读码使用说明</div>
          <div class="item" v-for="i in codeList">
            <div class="img">
              <img :src="i.img" />
            </div>
            <div class="intro">
              <h3>{{i.name}}</h3>
              <div class="code">阅读码：<i :id="'clipboard'+i.id"> {{i.code}}</i></div>
              <div class="operation">
                <!--<div class="button">使用说明</div>-->
                <div class="button clipboard-button" :data-clipboard-target="'#clipboard'+i.id" :class="{disabled:i.status}">
                  <template v-if="i.status">已使用</template>
                  <template v-else>去使用</template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<transition name='slide'>-->
    <div class="modal-con" v-if="isBuyModal">
      <div class="modal-b" @click="hideModal"></div>
      <div class="modal">
        <h3>{{buyTitle}}</h3>
        <div class="buy-list">
          <label class="item" v-for="i in buyDetailInfo">
              <input type="radio" v-model="codeId" :value="i.id" @change="radioChnage"/>
              <span>× {{i.num}}本</span>
              <span>￥{{i.price / 100}}</span>
            </label>
          <div class="custom">
            其它数量：
            <input type="text" v-model.number="customNum" @input="inputChange" />&nbsp;本
            <span>￥{{custumPrice}}</span>
          </div>
          <div class="button-box">
            <div class="button" @click="hideModal">取消</div>
            <div class="button" @click="submitBuyCode">
              <span v-show='!submiting'>确认购买</span>
              <spinner type="ios-small" v-show='submiting'></spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-if="isLoading">
      <img src="../assets/loding.gif" />
    </div>
    <!--</transition>-->
  </div>
</template>

<script>
  import { Spinner } from 'vux'
  import db from '../service/db';
  import api from '../service/api';
  import 'swiper/dist/css/swiper.min.css';
  import Swiper from 'swiper/dist/js/swiper.min.js';
  import Clipboard from 'clipboard'
  export default {
    name: 'index',
    components: {
      Spinner
    },
    data() {
      return {
        menuList: [{
          id: 'shop',
          value: '全部',
          img: require('../assets/icon-shop.png'),
          imgActive: require('../assets/icon-shoped.png')
        }, {
          id: 'coupon-list',
          value: '阅读码',
          img: require('../assets/icon-coupon-list.png'),
          imgActive: require('../assets/icon-coupon-listd.png')
        }],
        proList: [], //产品列表
        firstItem: '', //第一个项目列表
        codeList: [], //code列表
        price: '', //杂志价格
        infoBuy: '', //购买说明
        infoUse: '', //使用说明
        banner: '',
        currentIndex: 0, //menu当前index
        //购买
        buyTitle: '', //购买的杂志的标题
        customNum: 0,
        custumPrice: 0,
        codeId: '',
        isBuyModal: false,
        submiting: false,
        isLoading: true,
      };
    },
    async activated() {
      let res = await this.$http.post(this, api.getList, {
        token: db.get('token')
      })
      if(res.code == 0) {
        this.proList = res.data.list;
        this.firstItem = this.proList[0]
      }
      //我的阅读码列表
      let codeRes = await this.$http.post(this, api.getCode, {
        token: db.get('token')
      })
      if(codeRes.code == 0) {
        this.codeList = codeRes.data.list;
      }
    },
    created() {
      this.timeStart = +new Date();
      this.init();
    },
    async mounted() {
      this.$nextTick(() => {
        const _this = this;
        let clipboard = new Clipboard('.clipboard-button');
        clipboard.on('success', function(e) {
          _this.$vux.confirm.show({
            title: '提示',
            content: `阅读码:${e.text} 已复制到粘贴版`,
            onCancel() {},
            onConfirm() {}
          })
          e.clearSelection();
        });
        clipboard.on('error', function(e) {
          //        console.error('Action:', e.action);
          //        console.error('Trigger:', e.trigger);
          //        alert('请选择“拷贝”进行复制!')
        });
      })
      //微信支付配置
      let wxjsConfigRes = await this.$http.post(this, api.getWxjsConfig);
      if(wxjsConfigRes.code == 0) {
        wx.config({
          //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: wxjsConfigRes.data.appId, // 必填，公众号的唯一标识
          timestamp: wxjsConfigRes.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: wxjsConfigRes.data.nonceStr, // 必填，生成签名的随机串
          signature: wxjsConfigRes.data.signature, // 必填，签名，见附录1
          jsApiList: ["chooseWXPay", "updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        this.$nextTick(() => {
          let shareData = {
            title: '指尖阅读，要你好看，伊周GO！',
            desc: '伊周电子刊，有声有色，你想看的都在这里',
            link: window.location.href,
            imgUrl: 'http://yizhou.25bsx.com/share-logo.jpeg',
            success: function() {
              //分享成功
            }
          }
          wx.onMenuShareTimeline(shareData)
          wx.onMenuShareAppMessage(shareData)
          wx.ready(function() {
            wx.updateAppMessageShareData(shareData)
            wx.updateTimelineShareData(shareData)
          })
        })
      }
    },
    methods: {
      async init() {
        //配置，banner图，统一的价格，购买说明，使用说明以及购买选项
        let configRes = await this.$http.post(this, api.config)
        if(configRes.code == 0) {
          let info = configRes.data
          this.price = info.price / 100;
          this.banner = info.h5_banner;
          this.buyDetailInfo = info.price_list;
          this.codeId = this.buyDetailInfo[0].id;

          this.infoBuy = info.buy;
          db.set('infoBuy', this.infoBuy)
          this.infoUse = info.use;
          db.set('infoUse', this.infoUse)
        }
        //产品列表
        let res = await this.$http.post(this, api.getList, {
          token: db.get('token')
        })
        if(res.code == 0) {
          this.proList = res.data.list;
          this.firstItem = this.proList[0]
        }
        this.$nextTick(() => {
          if(+new Date() - this.timeStart > 3000) {
            this.isLoading = false;
          } else {
            setTimeout(() => {
              this.isLoading = false;
            }, 3000)
          }
        })

      },
      async getCodeList() {
        //我的阅读码列表
        let codeRes = await this.$http.post(this, api.getCode, {
          token: db.get('token')
        })
        if(codeRes.code == 0) {
          this.codeList = codeRes.data.list;
        }
      },
      menuItemClick(index) {
        this.currentIndex = index;
        if(index == 1 && this.codeList.length == 0) {
          this.getCodeList()
        }
      },
      preview(id) {
        this.$router.push({
          path: '/preview',
          query: {
            id: id
          }
        });
      },
      showBuyModal(id, value, isBuy) {
        this.proId = id;
        this.buyTitle = value;
        this.isBuyModal = true;
        this.isBuy = isBuy;
      },
      hideModal() {
        this.isBuyModal = false;
      },
      radioChnage() {
        this.customNum = 0;
        this.custumPrice = 0;
        this.customNumSubmit = '';
      },
      inputChange() {
        if(this.customNum > 100) {
          this.$vux.toast.show({
            text: '一次购买数量不应超过100',
            type: 'text',
            width: '13em',
            position: 'bottom'
          })
          this.customNum = 100
        }
        this.custumPrice = (this.customNum * this.price).toFixed(2);
        this.customNumSubmit = this.customNum;
        this.codeId = '';
      },
      async submitBuyCode() {
        if(this.submiting) return;
        this.submiting = true;
        const _this = this;
        if(!this.codeId && !this.customNumSubmit) {
          this.$vux.toast.show({
            text: '请选择或填写需购买数量',
            type: 'text',
            width: '13em',
            position: 'bottom'
          })
          this.submiting = false;
          return
        }
        let res = await this.$http.post(this, api.pay, {
          token: db.get('token'),
          price_id: this.codeId,
          nums: this.customNumSubmit,
          magazine_id: this.proId
        })
        _this.submiting = false;
        if(res.code == 0) {
          let wxPaydata = res.data
          wx.ready(function() {
            wx.chooseWXPay({
              timestamp: wxPaydata.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: wxPaydata.nonceStr, // 支付签名随机串，不长于 32 位
              package: wxPaydata.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: wxPaydata.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: wxPaydata.paySign, // 支付签名
              success: function(res) {
                _this.getCodeList() //刷新阅读码礼包
                _this.isBuyModal = false; //关闭购买弹窗
                let confirmContent = '购买成功，是否立即使用';
                if(_this.isBuy) confirmContent = '购买成功';
                _this.$vux.confirm.show({
                  title: '提示',
                  content: confirmContent,
                  onCancel() {},
                  async onConfirm() {
                    if(_this.isBuy) return;
                    let getCodeRes = await _this.$http.post(_this, api.getCurrentCode, {
                      token: db.get('token'),
                      magazine_id: _this.proId
                    })
                    if(getCodeRes.code == 0) {
                      let useCodeRes = await _this.$http.post(_this, api.useCode, {
                        token: db.get('token'),
                        magazine_id: _this.proId,
                        code: getCodeRes.data.code
                      })
                      if(useCodeRes.code == 0) {
                        _this.getCodeList()
                        _this.$vux.toast.show({
                          text: '阅读码使用成功，可立即前往小程序阅读',
                          type: 'text',
                          width: '12em'
                        })
                      }
                    }
                  }
                })
              },
              fail: function(res) {

              }
            })
            wx.error(function(res) {
              //            alert("调用微信jsapi返回的状态:" + res.errMsg);
            })
          })
        }
      },
      //查看说明
      viewDes() {
        this.$router.push({
          path: '/description',
          query: {
            type: 'code'
          }
        })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../styles/mixin';
  .loading {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: #FFFFFF;
    img {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
    }
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s;
  }
  
  .slide-enter,
  .slide-leave-to {
    transform: translateY(100%);
  }
  
  .index {
    .vux-spinner {
      stroke: $pcolor
    }
    .logo-con {
      padding: 0.5rem 0.3rem;
      h2 {
        font-size: 0.4rem;
        font-weight: bold;
      }
      .logo {
        margin-top: 0.4rem;
        text-align: center;
        img {
          width: 4.33rem;
          height: 1.92rem;
        }
      }
    }
    .modal-con {
      .modal-b {
        z-index: 99;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
      }
      .modal {
        z-index: 100;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #ffffff;
        padding: 0.2rem 0.7rem 0.6rem;
        h3 {
          text-align: center;
          font-size: 0.36rem;
          height: 1.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }
        .item {
          display: flex;
          align-items: center;
          height: 0.6rem;
          border-bottom: 1px solid #d1d1d1;
          height: 0.8rem;
          input[type='radio'] {
            background: url(../assets/cirlce-r.png) no-repeat center / cover;
            width: 0.38rem;
            height: 0.38rem;
            border-radius: 50%;
            margin-right: 0.2rem;
            &:checked {
              background-image: url(../assets/circle-c.png);
            }
          }
          span {
            width: 1.2rem;
            margin-right: 0.3rem;
            font-size: 0.3rem;
          }
        }
        .custom {
          height: 1rem;
          display: flex;
          align-items: center;
          input {
            height: 0.6rem;
            width: 1rem;
            border: 1px solid #d1d1d1;
            text-align: center;
          }
          span {
            margin-left: 0.4rem;
          }
        }
        .button-box {
          margin-top: 0.3rem;
          display: flex;
          justify-content: space-around;
          .button {
            width: 2rem;
            height: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #333333;
            border-radius: 0.06rem;
            font-weight: bold;
            &:nth-child(2) {
              color: $pcolor;
              border-color: $pcolor;
            }
          }
        }
      }
    }
    .shop {
      border-top: 0.2rem solid #dedede;
      .menu {
        justify-content: space-around;
        display: flex;
        .item {
          position: relative;
          color: #333;
          width: 50%;
          text-align: center;
          line-height: 1rem;
          border-bottom: 1px solid #d1d1d1;
          &.active {
            /*border-color: $pcolor;*/
            color: $pcolor;
            &:after {
              content: '';
              display: block;
              position: absolute;
              left: 50%;
              bottom: -1px;
              width: 100%;
              height: 2px;
              transform: translateX(-50%);
              background: $pcolor;
            }
          }
          img {
            width: 0.49rem;
            height: 0.47rem;
          }
          &:nth-child(2) img {
            width: 0.47rem;
            height: 0.46rem;
          }
        }
      }
    }
    .list-con {
      margin-top: 0.4rem;
      .pro-list {
        .item-first {
          position: relative;
          padding: 0 0.4rem 0.6rem;
          display: flex;
          justify-content: space-between;
          .img {
            width: 3.06rem;
            height: 4.08rem;
            flex-shrink: 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .intro {
            width: 3.3rem;
            padding-top: 0.65rem;
            .new {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-weight: bold;
              img {
                margin-top: -1px;
              }
            }
            h3 {
              font-size: 0.36rem;
              font-weight: bold;
              height: 1.2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 0.12rem;
            }
            .detail {
              height: 0.5rem;
              display: flex;
              justify-content: space-around;
              align-items: center;
              span {
                color: $pcolor;
                font-size: 0.32rem;
              }
              i {
                font-size: 0.24rem;
              }
            }
            .operation {
              margin-top: 0.4rem;
              display: flex;
              justify-content: space-around;
              .button {
                border-radius: 0.06rem;
                border: 1px solid $pcolor;
                width: 1.5rem;
                line-height: 0.56rem;
                text-align: center;
                color: $pcolor;
                font-size: 0.24rem;
                &:nth-child(1) {
                  color: #333;
                  border-color: #333;
                }
              }
            }
          }
          &:after {
            position: absolute;
            z-index: -1;
            left: 0;
            top: 1.1rem;
            content: '';
            display: block;
            background: #b1b1b1;
            width: 100%;
            height: 3.3rem;
          }
        }
        .item {
          width: 6.1rem;
          margin: 0 auto;
          border-top: 1px solid #d1d1d1;
          display: flex;
          justify-content: space-between;
          padding: 0.3rem 0;
          .img {
            width: 2.448rem;
            height: 3.264rem;
            flex-shrink: 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .intro {
            width: 3.3rem;
            height: 3rem;
            h3 {
              font-size: 0.36rem;
              font-weight: bold;
              height: 1.2rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .detail-box {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              height: 1.6rem;
              .detail {
                width: 1.3rem;
                flex-direction: column;
                display: flex;
                span {
                  color: $pcolor;
                  font-size: 0.32rem;
                }
                i {
                  font-size: 0.24rem;
                }
              }
              .operation {
                width: 1.5rem;
                .button {
                  border-radius: 0.06rem;
                  border: 1px solid $pcolor;
                  width: 1.5rem;
                  line-height: 0.56rem;
                  text-align: center;
                  color: $pcolor;
                  font-size: 0.24rem;
                  &:nth-child(1) {
                    color: #333;
                    border-color: #333;
                    margin-bottom: 0.2rem;
                  }
                }
              }
            }
          }
        }
      }
      .coupon-list {
        .des-button {
          width: 5rem;
          line-height: 0.6rem;
          text-align: center;
          border: 1px solid #999;
          border-radius: 0.06rem;
          margin: 0.2rem auto;
          font-weight: bold;
          color: #777;
        }
        .item {
          width: 6.1rem;
          padding: 0.3rem .12rem;
          border-bottom: 1px solid #d1d1d1;
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          .img {
            width: 2.448rem;
            height: 3.264rem;
            flex-shrink: 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .intro {
            height: 2.66rem;
            width: calc(100% - 2.08rem);
            padding-left: 0.2rem;
            h3 {
              font-size: 0.36rem;
              font-weight: bold;
              height: 1.2rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .code {
              text-align: center;
            }
            .operation {
              margin-top: 0.4rem;
              display: flex;
              width: 100%;
              justify-content: space-around;
              .button {
                border-radius: 0.06rem;
                border: 1px solid #333333;
                width: 1.4rem;
                line-height: 0.56rem;
                text-align: center;
                color: #333333;
                font-size: 0.24rem;
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
  }
</style>