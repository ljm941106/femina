<template>
	<div class="home">
		<head-top :back="false" :backColor="backColor"></head-top>
		<div class="swiper-container main-swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide p1">
					<div class="img logo" :class="{small: isVideoShow}">
						<img
							src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/cdabff03751cca38a58b976c50da82dd.png"
						/>
					</div>
					<div
						class="img heart wow zoomIn"
						v-if="!isVideoShow && isLoading"
						data-wow-duration="1.5s"
						@click="showVideo"
					>
						<img src="../img/heart.png" alt="" />
					</div>
					<div class="video" :class="{active: isVideoShow}">
						<video width="100%" height="" autoplay>
							<source
								src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/6169b03a75a569c605fadb566fe2c056.mp4"
								type="video/mp4"
							/>
						</video>
					</div>
					<div class="img all-person" :class="{small: isVideoShow}"><img src="../img/all-white.jpg" /></div>
				</div>
				<div
					class="swiper-slide main1"
					style="background: url(http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/1f6ef7f9769afeec23845a8c7b835a57.jpg) center top no-repeat / cover;"
				>
					<div class="main1-logo" :class="{active: main1Actived}">
						<img
							src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/95905aa00b4a0c0b1fb1c087db053c8f.png"
						/>
					</div>
				</div>
				<div class="swiper-slide main2" style="background: none;">
					<div class="main2-logo" @click="toggleAllIntro" :class="{active: isIntroShow}">
						<img
							src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/0dc08e98d2d75db8c09bd38e636df120.png"
							alt=""
						/>
					</div>
					<ul :class="['list' + listChange]">
						<li class="item1">
							<img
								src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/5d89683745f87372646bf15906827ec4.jpg"
							/>
						</li>
						<li class="item2">
							<img
								src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/a61db26c5c3069c27b2408093e0e1f24.jpg"
							/>
						</li>
						<li class="item3">
							<img
								src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/f56f8e49bdba2148a5a80002fbccde38.jpg"
							/>
						</li>
						<li class="item4">
							<img
								src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/572b6678604f2564e2dc491f861d0807.jpg"
							/>
						</li>
						<li class="item5">
							<img
								src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/127c007e9133faa33303a7eccbbc2318.jpg"
							/>
						</li>
						<li class="item6">
							<img
								src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/d71734ddf50c438db87f926b08df4a89.jpg"
							/>
						</li>
						<li class="item7"></li>
						<li class="item8">
							<img
								src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/dcf10536dbd0c86407befd8abf5e8e20.jpg"
							/>
						</li>
						<li class="item9"></li>
					</ul>
					<div class="play" @click="gotoVideoPlay">
						<img
							src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/5eed8a431b3ef0166b8c2cf14b35bc2c.png"
						/>
						<span>点击播放</span>
					</div>
					<div class="intro" :class="{active: isIntroShow}">
						<p>
							在“养成系爱豆”当道的浮躁娱乐圈中，他们的出现可以说是特别的。虽然才出道半年，但是七位成员在站上舞台之前的故事很长，他们在毫无喘息的日子里不断努力，在无数的等待和挑战后，以威神V之名拭亮了耀眼的青春。
						</p>
						<p>
							回顾这半年，威神V不断地刷新着自己的纪录，追求着更好的音乐，每一位成员也尽情绽放自己，展现出了沉淀数年练习的实力。
						</p>
						<p>
							七人组合在现在的偶像组合中可能人数不算多，所以威神V努力做到让每一位成员都有独立闪耀的时刻，无论是在综艺节目中，还是在专业的道路上，每一位成员都展现出了自己的不可替代性，他们鲜明的个性使得所有人都很突出。七人七色的他们，各自在组合中担当着自己的角色，共同努力朝着更高更大的舞台奔去。
						</p>
					</div>
				</div>
				<div
					class="swiper-slide main-angel"
					style="background: url(http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/1f6ef7f9769afeec23845a8c7b835a57.jpg) center top no-repeat / cover;"
				>
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
					<div
						class="arrow"
						:class="{['arrow' + arrowIndex]: isArrowShow, show: isArrowShow, active: isArrowActive}"
					>
						<img
							src="http://static-yizhou.oss-cn-beijing.aliyuncs.com/magazine/7e3064c2781a6d09db98d9d82e2edaca.png"
						/>
					</div>
				</div>
				<div class="swiper-slide mian-con">
					<div class="swiper-container person-swiper">
						<div class="swiper-wrapper">
							<div class="swiper-slide">slider1</div>
							<div class="swiper-slide">slider2</div>
							<div class="swiper-slide">slider3</div>
							<div class="swiper-slide">slider4</div>
							<div class="swiper-slide">slider5</div>
							<div class="swiper-slide">slider6</div>
							<div class="swiper-slide">slider7</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="swiper-prev" v-show="isShowBack">
			<img v-show="backColor == 'white'" src="../img/back-white.png" />
			<img v-show="backColor == 'black'" src="../img/back-black.png" />
		</div>
		<div class="swiper-next"><img src="../img/next-black.png" /></div>
	</div>
</template>

<script>
import headTop from "../components/head.vue";
export default {
	name: "home",
	components: {headTop},
	data() {
		return {
			isShowBack: false,
			backColor: "black",
			isLoading: true,
			isVideoShow: false,
			main1Actived: false,
			listChange: 1,
			isIntroShow: false,
			isSlideToAngel: false,
			arrowIndex: 0,
			isAngelRotate: false,
			isArrowShow: false,
			isArrowActive: false,
			isHeartShoot: false
		};
	},
	mounted() {
		const _this = this;
		this.mainSwiper = new Swiper(".main-swiper", {
			direction: "vertical",
			navigation: {
				nextEl: ".swiper-next",
				prevEl: ".swiper-prev"
			},
			on: {
				init: function() {
					this.personSwiper = new Swiper(".person-swiper", {
					});
				},
				slideChangeTransitionStart: function() {
					console.log(this.activeIndex);
					if (this.activeIndex != 0) {
						_this.isVideoShow = false;
					}
					// 显示返回
					if (this.activeIndex > 0) {
						_this.isShowBack = true;
					} else {
						_this.isShowBack = false;
					}
					// icon为白色
					if (this.activeIndex == 1 || this.activeIndex == 3) {
						_this.backColor = "white";
						_this.main1Actived = true;
					} else {
						_this.backColor = "black";
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
				}
			}
		});
	},
	methods: {
		showVideo() {
			this.isVideoShow = true;
		},
		gotoVideoPlay() {
			this.mainSwiper.slideTo(0, 1000, false); //切换到第一个slide，速度为1秒
			this.isVideoShow = true;
		},
		toggleAllIntro() {
			this.isIntroShow = !this.isIntroShow;
		},
		arrowHeart(index) {
			console.log("arrow");
			this.isAngelRotate = true;
			this.arrowIndex = index;
			setTimeout(() => {
				this.isArrowShow = true;
				setTimeout(() => {
					this.isArrowActive = true;
					setTimeout(() => {
						this.isSlideToAngel = false;
						this.isHeartShoot = true;
						setTimeout(() => {
							this.mainSwiper.slideTo(4, 1000, false); //切换到第一个slide，速度为1秒
						}, 1000);
					}, 1000);
				}, 100);
			}, 1000);
		}
	}
};
</script>
