<template>
  <div class="home">
    <canvas class="cover-modal" id="js_lottery"></canvas>
    <div class="img logo">
      <img src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/db6314449c20ece53124225859412b87.png" />
    </div>
    <div class="red-point">
      <img src="images/redpoint.png" />
    </div>
    <!-- 开始 -->
    <!-- <div class="container">
			<div class="s1-game wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.5s"><span>游</span></div>
    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import '../plugins/card.js'
export default {
  name: "home",
  components: {},
  created() {
    new WOW().init();
    let img = new Image();
    let underImg = require("../../public/img/cover.jpg");
    let modalImg = require("../../public/img/modal.jpg");
    img.src = modalImg;
    img.onload = function() {
      var lottery = new LotteryCard(document.getElementById("js_lottery"), {
        // eslint-disable-line
        cover: img
      });
      lottery.on("start", function() {
        lottery.setResult("http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/2f8f85541a4ad940841c37ca79a75453.jpg");
      });
      lottery.on("end", function() {
        setTimeout(function() {}, 5000);
      });
      window.lottery = lottery;
    };
  }
};
</script>
