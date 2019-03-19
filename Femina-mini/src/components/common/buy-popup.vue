<template>
  <div class="buy-popup" v-show="show">
    <!--<transition name="fade">-->
    <div class="popup-bg" @click="hide"></div>
    <!--</transition>-->
    <!--<transition name="slide">-->
    <div class="popup-content">
      <h3>{{buyTitle}}</h3>
      <div class="buy-list">
        <radio-group class="radio-group" @change="radioChange">
          <label class="item" v-for="item in codeList" :key="item.id">
		        <radio :value="item.id" :checked="item.checked"/> 
		        <span>× {{item.num}}本</span>
          	<span>￥{{item.price / 100}}</span>
		      </label>
        </radio-group>
        <div class="custom">
          其它数量：
          <input type="text" v-model.number="customNum" @input="inputChange" />&nbsp;本
          <span>￥{{custumPrice}}</span>
        </div>
        <div class="button-box">
          <div class="button" @click="hide">取消</div>
          <div class="button" @click="submit">确认购买</div>
        </div>
      </div>
    </div>
    <!--</transition>-->
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import api from '../../utils/api'
  export default {
    components: {},
    props: {
      show: {
        default: false,
        type: Boolean
      },
      magazineId: {},
      buyTitle: {} //购买的杂志的标题
    },
    data() {
      return {
        codeList: [], //code列表
        price: '', //杂志价格
        customNum: 0, //用户输入的数量
        customNumSubmit: 0, //用于上传的数量
        custumPrice: 0, //用户输入计算出的价格
        codeId: '', //选择id
      }
    },
    watch: {},
    mounted() {
      this.init();
    },
    onShow() {
      this.init();
    },
    methods: {
      init() {
        this.info = wx.getStorageSync('config');
        if(!this.info) return;
        this.codeList = this.info.price_list;
        this.price = this.info.price / 100;
        this.codeId = this.codeList[0].id;
        this.$set(this.codeList[0], 'checked', true);
      },
      hide() {
        this.$emit('hideBuyPopup');
      },
      radioChange(e, index) {
        console.log(e.mp.detail.value)
        this.codeList.forEach(i => {
          i.checked = false;
          if(i.id == e.mp.detail.value) i.checked = true;
        })
        this.codeId = e.mp.detail.value;
        this.customNum = 0;
        this.customNumSubmit = '';
      },
      inputChange() {
        this.codeList.forEach(i => {
          i.checked = false;
        })
        if(this.customNum > 100) {
          wx.showToast({
            title: '一次购买数量不应超过100',
            icon: 'none',
            duration: 2000
          })
          this.customNum = 100;
        }
        this.codeId = '';
        this.custumPrice = (this.customNum * this.price).toFixed(2)
        this.customNumSubmit = this.customNum;

      },
      async submit() {
        wx.showLoading()
        const _this = this;
        let res = await fly.post(api.pay, {
          token: wx.getStorageSync('token'),
          price_id: this.codeId,
          nums: this.customNumSubmit,
          magazine_id: this.magazineId
        })
        wx.hideLoading()
        if(res.code == 500) {
          wx.navigateTo({
            url: '/pages/login/main'
          })
          return;
        }
        let payInfo = res.data;
        wx.requestPayment({
          timeStamp: payInfo.timeStamp,
          nonceStr: payInfo.nonceStr,
          package: payInfo.package,
          signType: 'MD5',
          paySign: payInfo.paySign,
          success(res) {
            _this.$emit('buySuccess')
          },
          fail(res) {}
        })
      }
    },

  }
</script>

<style lang="scss">
  @import "../../mixin";
  .fade-enter-active,
  .fade-leave-active {
    transition: 1s;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: .3s;
  }
  
  .slide-enter,
  .slide-leave-to {
    transform: translateY(100%);
  }
  
  .buy-popup {
    .popup-content {
      z-index: 100;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #ffffff;
      padding: 20rpx 70rpx 60rpx;
      h3 {
        text-align: center;
        font-size: 36rpx;
        height: 120rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }
      .item {
        display: flex;
        align-items: center;
        height: 60rpx;
        border-bottom: 1px solid #d1d1d1;
        height: 80rpx;
        input[type=radio] {
          background: url(../../../static/cirlce-r.png) no-repeat center / cover;
          width: 38rpx;
          height: 38rpx;
          border-radius: 50%;
          margin-right: 20prpx;
          &:checked {
            background-image: url(../../../static/circle-c.png);
          }
        }
        span {
          width: 120rpx;
          margin-right: 30rpx;
          font-size: 30rpx;
        }
      }
      .custom {
        height: 100rpx;
        display: flex;
        align-items: center;
        input {
          height: 60rpx;
          width: 100rpx;
          border: 1px solid #d1d1d1;
          text-align: center;
        }
        span {
          margin-left: 40rpx;
        }
      }
      .button-box {
        margin-top: 30rpx;
        display: flex;
        justify-content: space-around;
        .button {
          width: 200rpx;
          height: 60rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #333333;
          border-radius: 6rpx;
          font-weight: bold;
          &:nth-child(2) {
            color: $pcolor;
            border-color: $pcolor;
          }
        }
      }
    }
  }
</style>