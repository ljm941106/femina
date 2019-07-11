<template>
	<div class="head-top">
		<div class="back wow fadeIn" data-wow-duration="1.5s" data-wow-delay="0s" v-if="back" @click="goBack">
			<img v-if="backColor == 'black'" src="../img/back-black.png" />
			<img v-if="backColor == 'white'" src="../img/back-white.png" />
		</div>
		<div
			class="icon-music wow fadeIn"
			:class="{disabled: musicDisabled}"
			data-wow-duration="1.5s"
			data-wow-delay="0s"
			@click="toggelMusic"
		>
			<img v-if="backColor == 'black'" src="../img/music-black.png"  />
			<img v-if="backColor == 'white'" src="../img/music-white.png"  />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import '../plugins/card.js'
export default {
	name: "home",
	props: {
		back: {
			type: Boolean,
			default: true
		},
		backColor: {
			type: String,
			default: "white"
		}
	},
	components: {},
	created() {},
	data() {
		return {
			musicDisabled: false
		};
	},
	methods: {
		toggelMusic() {
			this.musicDisabled = !this.musicDisabled;
		},
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
<style lang="scss">
.head-top {
	position: fixed;
	z-index: 10;
	left: 0;
	top: 0.825rem;
	padding: 0 0.6rem;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 0.6rem;
	.back {
		width: 0.435rem;
		height: 0.6rem;
		left: 0.6rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.icon-music {
	width: 0.36rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 0.6rem;
	&.disabled::after {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		height: 0.6rem;
		left: 0.08rem;
		top: 0;
		content: "\\";
		font-size: 0.58rem;
		color: #d6d7d7;
	}
}
</style>
