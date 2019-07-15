<template>
  <div class="home">
    <!-- <head-top :back="false" :backColor="backColor"></head-top> -->
    <div class="swiper-container main-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide p1">
          <div class="img logo" :class="{small: isVideoShow}">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/cdabff03751cca38a58b976c50da82dd.png" />
          </div>
          <div class="img heart " v-if="!isVideoShow" @click="showVideo">
            <div style="height: 1.35rem;">
              <img class="wow zoomIn" data-wow-duration="1.5s" src="../img/heart.png" v-if="!isLoading" />
            </div>
          </div>
          <div class="video" :class="{active: isVideoShow}">
            <video width="100%" autoplay="autoplay">
              <source src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/video/20190715-v1.mp4" type="video/mp4" />
            </video>
          </div>
          <div class="img all-person" :class="{small: isVideoShow}"><img src="../img/all-white.jpg" /></div>
        </div>
        <div class="swiper-slide main1">
          <div class="main1-logo" :class="{active: main1Actived}">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/95905aa00b4a0c0b1fb1c087db053c8f.png" />
          </div>
          <div class="main1-img">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/a3912774b1011b648c47e113bb4b6cf8.png" />
            <!-- <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/16e92117a412d8a9a8a74edce061c3b9.png" /> -->
          </div>
        </div>
        <div class="swiper-slide main2" style="background: none;">
          <div class="main2-logo" :class="{active: !isIntroShow}" style="height: 4.21rem;"></div>
          <div class="main2-logo" @click="toggleAllIntro" :class="{active: isIntroShow}">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/0dc08e98d2d75db8c09bd38e636df120.png" alt="" />
          </div>
          <ul :class="['list' + listChange]">
            <li class="item1">
              <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/5d89683745f87372646bf15906827ec4.jpg" />
            </li>
            <li class="item2">
              <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/a61db26c5c3069c27b2408093e0e1f24.jpg" />
            </li>
            <li class="item3">
              <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/f56f8e49bdba2148a5a80002fbccde38.jpg" />
            </li>
            <li class="item4">
              <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/572b6678604f2564e2dc491f861d0807.jpg" />
            </li>
            <li class="item5">
              <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/127c007e9133faa33303a7eccbbc2318.jpg" />
            </li>
            <li class="item6">
              <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/d71734ddf50c438db87f926b08df4a89.jpg" />
            </li>
            <li class="item7"></li>
            <li class="item8">
              <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/dcf10536dbd0c86407befd8abf5e8e20.jpg" />
            </li>
            <li class="item9"></li>
          </ul>
          <div class="play" @click="playVideo2()">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/5eed8a431b3ef0166b8c2cf14b35bc2c.png" />
            <span>点击播放</span>
          </div>
          <video width="100%" id="video2">
            <source src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/video/20190715-v2.mp4" type="video/mp4" />
          </video>
          <div class="top" @click="toggleAllIntro()">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/5725dc0712bed14b673589cb6b8f6562.png" />
          </div>
          <div class="intro" :class="{active: isIntroShow}">
            <p>
              在“养成系爱豆”当道的浮躁娱乐圈中，他们的出现可以说是特别的。虽然才出道半年，但是七位成员在站上舞台之前的故事很长，他们在毫无喘息的日子里不断努力，在无数的等待和挑战后，以威神V之名拭亮了耀眼的青
            </p>
            <p>
              回顾这半年，威神V不断地刷新着自己的纪录，追求着更好的音乐，每一位成员也尽情绽放自己，展现出了沉淀数年练习的实力。
            </p>
            <p>
              七人组合在现在的偶像组合中可能人数不算多，所以威神V努力做到让每一位成员都有独立闪耀的时刻，无论是在综艺节目中，还是在专业的道路上，每一位成员都展现出了自己的不可替代性，他们鲜明的个性使得所有人都很突出。七人七色的他们，各自在组合中担当着自己的角色，共同努力朝着更高更大的舞台奔去。
            </p>
          </div>
        </div>
        <div class="swiper-slide main-angel" style="background: #b80410;">
          <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/2e6eb729ae0c331e84b5d35db2d14460.jpg" />
          <!-- <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/e4ea2695c3f2e4101303bd1a89aed127.jpg" /> -->
          <div class="angel-con">
            <div class="text" :class="{active: isSlideToAngel}">
              <img
                src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/3fc516d16e97a98b28e2b61b6fb22e75.png"
              />
            </div>
            <div class="angel" :class="{active: isSlideToAngel, ['arrow' + arrowIndex]: isAngelRotate}">
              <img
                src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/426e8f10a176c24b7cfaab6bfd7e1fb2.png"
              />
            </div>
            <div class="text2" :class="{active: isSlideToAngel}">
              <img
                src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/ac9471dc6fefea3fe0e339fdca452725.png"
              />
            </div>
          </div>
          <!-- 心 -->
          <ul>
            <li
              v-for="(i, index) in 7"
              :class="{active: isSlideToAngel, shoot: isHeartShoot && index == arrowIndex}"
              @click="arrowHeart(index)"
              :key="'heart' + index"
            >
              <img
                src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/caeceac560b9f2b84faa46f22880a9a6.png"
              />
            </li>
          </ul>
          <div class="arrow" :class="{['arrow' + arrowIndex]: isArrowShow, show: isArrowShow, active: isArrowActive}">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/7e3064c2781a6d09db98d9d82e2edaca.png" />
          </div>
        </div>
        <div class="swiper-slide mian-con">
          <div class="swiper-container person-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(i, index) in personList" :key="i.name">
                <img :src="i.img" />
                <div class="chat" @click="showChatCon(index)"><img src="../img/chat.png" /></div>
                <!-- <div class="top" @click="showIntroCon(index)">
                  <img
                    src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/5725dc0712bed14b673589cb6b8f6562.png"
                  />
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide p1">
          <div class="img logo small">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/cdabff03751cca38a58b976c50da82dd.png" />
          </div>
          <div class="video active">
            <video width="100%" preload="auto">
              <source src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/video/20190715-v3.mp4" type="video/mp4" />
            </video>
          </div>
          <div class="img all-person small"><img src="../img/all-white.jpg" /></div>
        </div>
      </div>
    </div>
    <!-- 主要的前后 -->
    <div class="swiper-prev" @click="backToMain" v-show="isShowBack">
      <img v-show="backColor == 'white'" src="../img/back-white.png" />
      <img v-show="backColor == 'black'" src="../img/back-black.png" />
    </div>
    <div class="swiper-prev-new" v-if="isShowSwiperNext"><img src="../img/person-next.png" /></div>
    <div class="swiper-next-new" v-if="isShowSwiperNext"><img src="../img/person-next.png" /></div>
    <!-- 人物的前后 -->
    <div class="person-swiper-navigation" v-show="isPersonSwiperShow">
      <div class="person-swiper-prev"><img src="../img/person-next.png" /></div>
      <div class="person-swiper-next"><img src="../img/person-next.png" /></div>
    </div>
    <!-- 人物的介绍text -->
    <div class="person-text-con" v-show="isPersonSwiperShow">
      <template v-for="(i, index) in personList">
        <div
          class="text wow slideInLeft"
          data-wow-duration="1.5s"
          :key="i.name"
          v-show="personActiveIndex == index"
          :style="{width: i.textImgWidth + 'rem'}"
        >
          <img :src="i.textImg" />
        </div>
      </template>
    </div>
    <div class="person-text-hand" v-show="isPersonSwiperShow" @click="showIntroCon">
      <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/346b2563b771bbabad7b1cd292663fdb.png" />
    </div>
    <!-- 采访界面 -->
    <div class="swiper-prev-person" v-show="currentPersonIndex > -1" @click="backToPersonSwiper">
      <img src="../img/back-black.png" />
    </div>
    <div class="chat-con" v-show="currentPersonIndex > -1 && isShowChat">
      <div class="chat-item" v-for="(i, index) in chatCon" :key="i.name" v-show="index == currentPersonIndex">
        <div class="chat-logo"><img :src="i.logo" :style="{width: i.logoWidth + 'rem'}" /></div>
        <div class="chat-list">
          <div
            class="item wow"
            v-for="(k, kIndex) in i.list"
            :key="k.url"
            :class="{slideInLeft: kIndex % 2 == 1, slideInRight: kIndex % 2 == 0}"
            data-wow-duration="1s"
            :data-wow-delay="kIndex + 's'"
          >
            <img :src="k.url" :style="{width: k.width + 'rem'}" />
          </div>
        </div>
      </div>
      <div class="chat-bottom-con">
        <div class="chat-bottom"><img src="../img/interview-bottom.jpg" width="100%" /></div>
      </div>
    </div>
    <!-- 人物介绍界面 -->
    <div class="person-intro" :class="{active: currentPersonIndex > -1 && isShowIntro}">
      <div class="item" v-for="(i, index) in personList" :key="i.name" v-show="index == currentPersonIndex">
        <img :src="i.img" />
        <img class="person-logo" :src="i.logo" :style="{width: i.logoWidth + 'rem'}" />
        <p v-for="t in i.text">{{ t }}</p>
      </div>
    </div>
    <div class="loading-container" v-if="isLoading">
      <div class="loading-content">
        <div class="loading-progress"><div class="line" :style="{width: loadingProgress + '%'}"></div></div>
        <!-- <ul>
          <li v-show="loadingIndex > -1">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/0c9bb48e0be4fa4880bb4bc80e160730.png" />
          </li>
          <li v-show="loadingIndex > 0">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/68ce1618f757fd60f3bb890b90024d26.png" />
          </li>
          <li v-show="loadingIndex > 1">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/a6bece2a2295382cd73cad5cec159eb4.png" />
          </li>
          <li v-show="loadingIndex > 2">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/c6842f9b2b95e6d825882d08cd32c594.png" />
          </li>
          <li v-show="loadingIndex > 3">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/236236f8603cf2dc1d56b4087593ff3d.png" />
          </li>
          <li v-show="loadingIndex > 4">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/1873919d4dd90b35b1b35ad84699ebd4.png" />
          </li>
          <li v-show="loadingIndex > 5">
            <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/5543d249f077463e8f96ac68b73c396a.png" />
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/head.vue";
import data from "../plugins/data.json";
export default {
  name: "home",
  components: {headTop},
  data() {
    return {
      isLoading: true, //加载中...
      loadingIndex: 10,
      loadingProgress: 0,
      isShowBack: false, //回退
      isShowSwiperNext: true, //main下一页
      isVideoShow: false, //展示视频
      main1Actived: false,
      listChange: 1,
      isIntroShow: false,
      isSlideToAngel: false,
      arrowIndex: 0,
      isAngelRotate: false,
      isArrowShow: false,
      isArrowActive: false,
      isHeartShoot: false,
      isPersonSwiperShow: false,
      personList: data["person-list"],
      chatCon: data["chat-con"],
      currentPersonIndex: -1, //用于显示采访内容的index
      personActiveIndex: 0, //当前活动的人物index
      isShowChat: false,
      isShowIntro: false
    };
  },
  computed: {
    backColor() {
      if (this.personActiveIndex == 2) {
        return "white";
      } else {
        return "black";
      }
    }
  },
  created() {
    let inter = setInterval(() => {
      this.loadingIndex++;
      if (this.loadingIndex > 6) {
        clearInterval(inter);
      }
    }, 500);
    let inter1 = setInterval(() => {
      this.loadingProgress = this.loadingProgress + 1;
      if (this.loadingProgress > 60) {
        clearInterval(inter1);
      }
    }, 40);
    window.onload = () => {
      console.log(+new Date());
      let inter2 = setInterval(() => {
        this.loadingProgress = this.loadingProgress + 1;
        if (this.loadingProgress > 87) {
          clearInterval(inter2);
          this.isLoading = false;
        }
      }, 40);
    };
  },
  destroy() {
    clearInterval(inter);
    clearInterval(inter1);
  },
  mounted() {
    const _this = this;
    this.mainSwiper = new Swiper(".main-swiper", {
      // direction: "vertical",
      autoHeight: true, //高度随内容变化
      navigation: {
        nextEl: ".swiper-next-new",
        prevEl: ".swiper-prev-new"
      },
      on: {
        init: function() {
          _this.personSwiper = new Swiper(".person-swiper", {
            navigation: {
              nextEl: ".person-swiper-next",
              prevEl: ".person-swiper-prev"
            },
            nested: true,
            on: {
              slideChangeTransitionStart: function() {
                _this.personActiveIndex = this.activeIndex;
              }
            }
          });
        },
        slideChangeTransitionStart: function() {
          console.log(this.activeIndex);
          if (this.activeIndex != 0) {
            // _this.isVideoShow = false;
          }
          // 显示返回
          if (this.activeIndex == 4) {
            _this.isShowBack = true;
          } else {
            _this.isShowBack = false;
          }
          // icon为白色
          if (this.activeIndex == 1 || this.activeIndex == 3) {
            _this.main1Actived = true;
          } else {
          }
          //图片切换
          let main2Count = 0;
          if (this.activeIndex == 2) {
            let interval = setInterval(() => {
              if (_this.listChange < 3) {
                _this.listChange++;
              } else {
                _this.listChange = 1;
              }
              main2Count++;
              if (main2Count == 6) {
                clearInterval(interval);
              }
            }, 2000);
          }
          //切换到了天使页面
          if (this.activeIndex == 3) {
            _this.isSlideToAngel = true;
          }
          //人物浏览界面
          if (this.activeIndex == 4) {
            console.log("到人物界面");
            _this.isShowSwiperNext = false;
            _this.isPersonSwiperShow = true;
          } else {
            _this.isShowSwiperNext = true;
            _this.isPersonSwiperShow = false;
          }
        }
      }
    });
  },
  methods: {
    showVideo() {
      this.isVideoShow = true;
    },
    playVideo2() {
      document.getElementById("video2").play();
    },
    toggleAllIntro() {
      this.isIntroShow = !this.isIntroShow;
    },
    arrowHeart(index) {
      console.log(index);
      this.isAngelRotate = true;
      this.arrowIndex = index;
      setTimeout(() => {
        this.isArrowShow = true;
        setTimeout(() => {
          this.isArrowActive = true;
          setTimeout(() => {
            // this.isSlideToAngel = false;
            this.isHeartShoot = true;
            setTimeout(() => {
              this.mainSwiper.slideTo(4, 1000, false); //切换到第一个slide，速度为1秒

              let targetIndex = index;
              if (index == 5) targetIndex = 1;
              if (index == 1) targetIndex = 2;
              if (index == 2) targetIndex = 3;
              if (index == 6) targetIndex = 4;
              if (index == 4) targetIndex = 5;
              if (index == 3) targetIndex = 6;
              this.isShowBack = true;
              this.personSwiper.slideTo(targetIndex, 1000, false);
              //重置
              this.arrowIndex = 0;
              this.isArrowShow = false;
              this.isArrowActive = false;
              this.isHeartShoot = false;
            }, 1000);
          }, 1000);
        }, 100);
      }, 1000);
    },
    showChatCon(index) {
      this.isShowIntro = false;
      this.isShowChat = true;
      this.isShowBack = false;
      this.currentPersonIndex = index;
    },
    showIntroCon() {
      this.isShowIntro = true;
      this.currentPersonIndex = this.personActiveIndex;
    },
    backToPersonSwiper() {
      this.currentPersonIndex = -1;
      this.isShowChat = false;
      this.isShowBack = true;
    },
    backToMain() {
      this.isPersonSwiperShow = false;
      this.mainSwiper.slideTo(3, 1000, false);
    }
  }
};
</script>
