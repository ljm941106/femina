<template>
  <div class="home">
    <head-top :back="false"></head-top>
    <canvas class="cover-modal" id="js_lottery"></canvas>
    <transition name="fade">
      <div class="img logo" v-if="canvasEnd && !timeout">
        <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/db6314449c20ece53124225859412b87.png" />
      </div>
    </transition>
    <div class="red-point" v-if="canvasEnd && !timeout" @click="gotoCopyright"><img src="../img/redpoint.png" /></div>
    <div class="hand-point" v-if="!touched"><img src="../img/hand.png" alt /></div>
    <div class="on-the-top" v-if="timeout">
      <div class="text-youxi">
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.5s">
          <img src="../img/text-you.png" alt />
        </div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="1s">
          <img src="../img/text-xi.png" alt />
        </div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="1.5s">
          <img src="../img/text-shao.png" alt />
        </div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="2s">
          <img src="../img/text-nian.png" alt />
        </div>
      </div>
      <div class="text-level">
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="2.5s">L</div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="3s">e</div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="3.5s">v</div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="4s">e</div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="4.5s">l</div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="5s">u</div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="5.5s">p</div>
      </div>
      <div class="text-luo">
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="6s">
          <img src="../img/text-luo.png" alt />
        </div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="6.5s">
          <img src="../img/text-yun.png" alt />
        </div>
        <div class="wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="7s">
          <img src="../img/text-xii.png" alt />
        </div>
      </div>

      <div class="icon-com" @click="showCom"><img src="../img/comunication.png" alt /></div>
      <div class="icon-next" @click="gotoNext"><img src="../img/next.png" alt /></div>
      <div class="text-com" v-if="isComShow">
        <div class="quotation wow fadeInRight" data-wow-duration="1.5s" data-wow-delay="0s">
          <img src="../img/quotation-l.png" alt />
        </div>
        <div class="xiang wow fadeInRight" data-wow-duration="1.5s" data-wow-delay="0.5s">
          <img src="../img/text-xiang.png" alt />
        </div>
        <div class="lai wow fadeInRight" data-wow-duration="1.5s" data-wow-delay="1s">
          <img src="../img/text-lai.png" alt />
        </div>
        <div class="quotation wow fadeInRight" data-wow-duration="1.5s" data-wow-delay="1.5s">
          <img src="../img/quotation.png" alt />
        </div>
      </div>
    </div>
    <!-- 开始 -->
    <!-- <div class="container">
			<div class="s1-game wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.5s"><span>游</span></div>
    </div>-->
  </div>
</template>

<script>
import headTop from "../components/head.vue";
export default {
  name: "home",
  components: {headTop},
  data() {
    return {
      touched: false,
      canvasEnd: false,
      timeout: false,
      isComShow: false
    };
  },
  created() {
    let img = new Image();
    let wWidth = document.documentElement.clientWidth;
    let coverImg = require(`../img/cover${wWidth}.jpg`);
    img.src = coverImg;
    img.onload = () => {
      var lottery = new LotteryCard(document.getElementById("js_lottery"), {
        // eslint-disable-line
        cover: img
      });
      lottery.on("start", () => {
        this.touched = true;
        lottery.setResult(
          "http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/2f8f85541a4ad940841c37ca79a75453.jpg"
        );
      });
      lottery.on("end", () => {
        this.canvasEnd = true;
        setTimeout(() => {
          this.timeout = true;
        }, 5000);
      });
      window.lottery = lottery;
    };
  },
  methods: {
    gotoCopyright() {
      this.$router.push("/copyright");
    },
    showCom() {
      this.isComShow = true;
    },
    gotoNext() {
      this.$router.push("/step2");
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.cover-modal {
  width: 100vw;
  height: calc(3248vw / 15);
  background-size: cover;
  position: absolute;
  z-index: 9;
}

.logo {
  z-index: 9;
  position: absolute;
  left: 0;
  top: 0;
  width: calc((627 / 1500) * 100vw);
}

.red-point {
  z-index: 9;
  position: absolute;
  left: calc(147 / 1500 * 100vw);
  top: calc(1097 / 1500 * 100vw);
  width: calc(57 / 1500 * 100vw);
  animation: scalePoint 1.778s infinite;
}
.hand-point {
  position: absolute;
  z-index: 10;
  top: calc(1738 / 3248 * 100vh);
  right: calc(315 / 1500 * 100vw);
  width: calc(120 / 1500 * 100vw);
  animation: handPoint 1.778s infinite;
}
.on-the-top {
  z-index: 10;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.text-youxi {
  position: absolute;
  top: 1.39rem;
  left: 0.89rem;
  display: flex;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.725rem;
    width: 0.685rem;
    margin-right: 0.075rem;
  }
}
.text-level {
  position: absolute;
  top: 2.1rem;
  display: flex;
  left: 0.89rem;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.75rem;
    font-size: 0.85rem;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    margin-right: 0.02rem;
    &:nth-child(6) {
      margin-left: 0.2rem;
    }
  }
}
.text-luo {
  position: absolute;
  top: 3rem;
  display: flex;
  left: 1.8rem;
  & > div {
    width: 0.82rem;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }
}

.icon-com {
  position: absolute;
  top: 5.38rem;
  left: 1.94rem;
  width: 0.5rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  animation: scaleCom 2s infinite;
}
.icon-next {
  position: absolute;
  bottom: 0.91rem;
  right: 1.14rem;
  width: 0.31rem;
  height: 0.455rem;
  display: flex;
  align-items: center;
  animation: nextMove 2s infinite;
}
.text-com {
  position: absolute;
  bottom: 3.6rem;
  left: 1.7rem;
  font-size: 0.38rem;
  color: #fff;
  padding-right: 0.45rem;
  .quotation {
    width: 0.555rem;
    margin-bottom: 0.1rem;
    &:first-child {
      transform: rotateY(180deg);
    }
    &:last-child {
      position: absolute;
      right: 0;
    }
  }
  .xiang {
    width: 4.04rem;
    margin-left: 0.555rem;
    margin-bottom: 0.1rem;
  }
  .lai {
    margin-bottom: 0.1rem;
    margin-left: 3.56rem;
    width: 1.035rem;
  }
}
</style>
