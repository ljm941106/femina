<template>
	<div class="home">
		<head-top :back="false" backColor="black"></head-top>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide p1">
					<div class="img logo" :class="{small: isVideoShow}"><img src="../img/yizhou-wei.png" alt="" /></div>
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
					<div class="img all-person" :class="{small: isVideoShow}">
						<img src="../img/all-white.jpg" alt="" />
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
			isVideoShow: false
		};
	},
	mounted() {
		var mySwiper = new Swiper(".swiper-container", {
			direction: "vertical",
			navigation: {
				nextEl: ".swiper-next",
				prevEl: ".swiper-prev"
			}
		});
	},
	methods: {
		showVideo() {
			this.isVideoShow = true;
		}
	}
};
</script>
<style lang="scss">
.home {
	.swiper-container {
		height: 100vh;
	}
	.swiper-prev {
		position: fixed;
		z-index: 10;
		width: 0.435rem;
		height: 0.6rem;
		left: 0.6rem;
		top: 0.825rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.swiper-next {
		position: fixed;
		z-index: 10;
		width: 0.66rem;
		left: 50%;
		bottom: 0.2rem;
		transform: translateX(-50%);
	}
	.swiper-slide {
		&.p1 {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-bottom: 5.5vh;
			padding-top: 1vh;
		}
	}
	.img {
		text-align: center;
		img {
			transition: 2s;
		}
	}
	.logo {
		flex-shrink: 1;
		&.small {
			img {
				max-width: 3.72rem;
			}
		}
		img {
			max-width: 4.65rem;
		}
	}
	.heart {
		margin: 1vh 0;
		img {
			width: 1.425rem;
		}
	}
	.video {
		flex-shrink: 0;
		height: 0;
		width: 0;
		transition: height 2s;
		margin: 1vh 0;
		&.active {
			width: 100%;
			height: initial;
		}
	}
	.all-person {
		flex-shrink: 1;
		&.small {
			img {
				max-width: 5.6rem;
			}
		}
		img {
			max-width: 7rem;
		}
	}
}
</style>
