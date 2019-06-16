<template>
  <div class="buy-middle">
    <div class="main-img">
      <div class="img">
        <img :src="data.group_img">
      </div>
    </div>
    <div class="name-list">
      <div class="item" v-for="(i,index) in data.group" :key="i.id" @click="choose(i,index)">
        <div class="img" :class="{active:index==currentIndex}">
          <img :src="i.head_img">
        </div>
        <strong>{{i.name}}</strong>
        <span>{{i.total}}本订阅</span>
      </div>
    </div>
    <div class="button-box">
      <div class="button button-whole" @click="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: {}
  },
  data() {
    return {
      choseValue: "",
      currentIndex: null
    };
  },
  mounted() {},
  onShow() {},
  methods: {
    choose(item, index) {
      this.choseValue = item.id;
      this.name = item.name;
      this.currentIndex = index;
    },
    buy() {
      if (this.choseValue == "") {
        this.$vux.toast.show({
          text: "请选择成员",
          type: "text"
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
  z-index: 9;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background: #ffffff;
  .main-img {
    padding: 0.3rem 0.3rem;
    .img {
      width: calc(100vw - 0.6rem);
      height: calc(56.25vw - 0.3375rem);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .main {
    display: flex;
    padding: 0.5rem 0.3rem;
    .flex-left {
      width: 3.06rem;
      text-align: center;
      .img {
        width: 3.06rem;
        height: 4.08rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      h2 {
        font-size: 0.36rem;
        font-weight: bold;
        white-space: nowrap;
      }
    }
    .flex-right {
      margin-left: 0.45rem;
      position: relative;
      width: 3.23rem;
      .img-bg {
        position: absolute;
        top: 0.05rem;
        left: -1.39rem;
      }
      h2 {
        position: relative;
        line-height: 0.47rem;
        font-size: 0.32rem;
        margin-top: 0.33rem;
        z-index: 9;
        font-weight: bold;
      }
      p {
        font-size: 0.26rem;
        width: 3rem;
        margin-top: 0.4rem;
        text-align: justify;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 8;
        overflow: hidden;
      }
    }
  }
  .name-list {
    border-top: 0.2rem solid #dedede;
    padding: 0.3rem;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -0.4rem;
    .item {
      width: calc(6.9rem / 3);
      margin-bottom: 0.4rem;
      .img {
        margin: 0 auto;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        overflow: hidden;
        border: 0.1rem solid transparent;
        &.active {
          border-color: #67c9bb;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      strong {
        margin-top: 0.08rem;
        text-align: center;
        display: block;
        font-weight: bold;
        font-size: 0.32rem;
      }
      span {
        line-height: 0.4rem;
        display: block;
        text-align: center;
        color: #858585;
      }
    }
  }
  .button-box {
    height: 1rem;
  }
  .button-whole {
    position: fixed;
    left: 0.3rem;
    bottom: 0.2rem;
    border: 0.04rem solid #c8191d;
    box-shadow: 0 0.03rem 0.2rem 0.02rem rgba(0, 0, 0, 0.1);
    height: 0.8rem;
    width: 6.9rem;
    border-radius: 0.08rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c8191d;
    background: #ffffff;
    font-size: 0.38rem;
    font-weight: bold;
  }
}
</style>
