<template>
	<div class="index">
		<div class="magazine" @click="gotoItem(firstItem.id,firstItem.buy,firstItem.name,firstItem.rank_img)">
			<div class="img">
				<img :src="firstItem.img">
				<div class="detail">
					<img src="../../../static/logo-bg.png">
					<div class="button">预览</div>
					<div class="num">{{firstItem.sale}}人已订阅</div>
				</div>
			</div>
			<div class="button-box">
				<!-- <div class="button" v-if="!firstItem.buy">开始阅读</div> -->
				<div class="button" v-if="firstItem.rank_enable" @click.stop="gotoRank(firstItem.id,firstItem.rank_img)">粉丝订阅榜</div>
				<div class="button">开始阅读</div>
			</div>
			<!--<div class="button" v-if="!firstItem.buy" @click.stop="showCodeInputPopup(firstItem.id)">使用阅读码</div>-->
		</div>
		<div class="index-list">
			<div class="menu">
				<div class="item" :class="{active:index==currentIndex}" v-for="(i,index) in menuList" :key="i.id" @click="munuItemClick(index)">{{i.value}}</div>
			</div>
			<div class="list-box">
				<div v-show="currentIndex==0">
					<div class="pro-list">
						<div class="item" v-for="(i,index) in list" v-if="index>0" :key="i.id" @click="gotoItem(i.id,i.buy,i.name,i.rank_img)">
							<div class="tag" v-if="!i.buy&&!isiOS">
								<div>购买</div>
							</div>
							<div class="cover">
								<img :src="i.img">
								<span>{{i.name}}</span>
							</div>
							<div class="intro">{{i.sale}}人订阅</div>
						</div>
					</div>
					<div class="no-data" v-if="list.length==1">暂无更多期刊...</div>
				</div>
				<div v-show="currentIndex==1">
					<div class="pro-list">
						<div class="item" v-for="i in myList" :key="i.id" @click="gotoItem(i.id,true,i.name,i.rank_img)">
							<div class="cover">
								<img :src="i.img">
								<span>{{i.name}}</span>
							</div>
							<div class="intro">{{i.sale}}人订阅</div>
						</div>
					</div>
					<div class="no-data" v-if="myList.length==0">暂无期刊...</div>
				</div>
				<div v-show="currentIndex==2">
					<div class="coupon-list" v-if="!isiOS">
						<div class="des-button" @click="viewDes">阅读码使用说明</div>
						<div class="item" v-for="i in myCodeList" :key="i.id">
							<div class="img">
								<img :src="i.img">
							</div>
							<div class="intro">
								<h3>{{i.name}}</h3>
								<div class="code">
									阅读码
									<br> {{i.code}}
								</div>
								<div class="operation">
									<div class="button" :class="{disabled:i.status}" @click="toUseCode(i.pid,i.code,i.status)">
										<template v-if="i.status">已使用</template>
										<template v-else>去使用</template>
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
		<code-input-popup ref="codeUse" :show="isCodeInputPopup" @hideCodeInputPopup="hideCodeInputPopup" @codePassed="codePassed" :code="currentUseCode" :magazineId="currentMagazineId"></code-input-popup>
		<div class="loading" :class="{'hide-loading':lodingCompleted}">
			<img src="../../../static/loding.gif">
		</div>
	</div>
</template>

<script>
	import fly from "../../utils/fly";
	import api from "../../utils/api";
	import buyPopup from "../../components/common/buy-popup";
	import codeInputPopup from "../../components/common/code-input-popup";
	export default {
		components: {
			buyPopup,
			codeInputPopup
		},
		data() {
			return {
				menuList: [{
						id: "all",
						value: "全部杂志",
						icon: require("../../../static/icon-home.png"),
						iconActive: require("../../../static/icon-homed.png")
					},
					{
						id: "purchased",
						value: "我的杂志",
						icon: require("../../../static/icon-coupon-list.png"),
						iconActive: require("../../../static/icon-coupon-listd.png")
					},
					{
						id: "code",
						value: "阅读码",
						icon: require("../../../static/icon-purchase.png"),
						iconActive: require("../../../static/icon-purchased.png")
					}
				],
				list: [],
				firstItem: "",
				myList: [], //我已购买的期刊
				myCodeList: [],
				currentIndex: 0,
				isBuyPopupShow: false,
				isCodeInputPopup: false,
				currentUseCode: "",

				indexPage: 1,
				myPage: 1,
				codePage: 1,

				lodingCompleted: false,
				isiOS: false
			};
		},
		mounted() {
			const systemRes = wx.getSystemInfoSync();
			if(systemRes.system.indexOf("iOS") > -1) this.isiOS = true;
//			wx.removeStorageSync("magazineId")
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
			switch(this.currentIndex) {
				case 0:
					if(this.list.length % 20 == 0) {
						this.indexPage++;
						let indexRes = await fly.get(api.getList, {
							token: this.token,
							page: this.indexPage
						});
						this.list = this.list.concat(indexRes.data.list);
					}
					break;
				case 1:
					if(this.myList.length % 20 == 0) {
						this.myPage++;
						let myRes = await fly.get(api.getList, {
							token: this.token,
							page: this.myPage
						});
						this.myList = this.myList.concat(myRes.data.list);
					}
					break;
				case 2:
					if(this.myCodeList.length % 20 == 0) {
						this.codePage++;
						let codeRes = await fly.get(api.getCode, {
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
		onShow() {
			this.timeStart = +new Date();
			this.token = wx.getStorageSync("token");
			this.initList();
		},
		methods: {
			async initList() {
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

				this.$nextTick(() => {
					if(+new Date() - this.timeStart > 3000) {
						this.lodingCompleted = true;
					} else {
						setTimeout(() => {
							this.lodingCompleted = true;
						}, 3000);
					}
				});
			},
			async munuItemClick(index) {
				this.currentIndex = index;
				switch(index) {
					case 1:
						if(this.myList.length == 0) {
							//已经购买的期刊
							let myListRes = await fly.post(api.getMyList, {
								token: this.token
							});
							if(myListRes.code == 500) {
								wx.navigateTo({
									url: "/pages/login/main"
								});
								return;
							}
							this.myList = myListRes.data.list;
						}
						break;
					case 2:
						if(this.myCodeList.length == 0) {
							//已经购买的阅读码
							let myCodeListRes = await fly.post(api.getCode, {
								token: this.token
							});
							if(myCodeListRes.code == 500) {
								wx.navigateTo({
									url: "/pages/login/main"
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
				this.currentUseCode = "";
				this.currentMagazineId = "";
			},
			showCodeInputPopup(magazineId) {
				this.currentMagazineId = magazineId;
				this.isCodeInputPopup = true;
			},
			gotoItem(id, isBuy, name, banner) {
				wx.setStorageSync("payPopupTitle", name);
				if(isBuy == 0) {
					isBuy = false;
				} else {
					isBuy = true;
				}
				wx.navigateTo({
					url: "/pages/preview/main?buy=" + isBuy + "&id=" + id + "&name=" + name
				});
				wx.setStorageSync("rankBanner", banner);
			},
			gotoRank(id, banner) {
				wx.setStorageSync("rankBanner", banner);
				wx.navigateTo({
					url: "/pages/rank-list/main?id=" + id
				});
			},
			async toUseCode(magazineId, code, status) {
				if(status) return;
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
					url: "/pages/description/main?type=use"
				});
			}
		},
		onShareAppMessage: function(res) {
			if(res.from === "button") {
				// 来自页面内转发按钮
				console.log(res.target);
			}
			return {
				title: "指尖阅读，要你好看，伊周GO！",
				path: "/pages/index/main",
				success: function(res) {},
				fail: function(res) {
					// 转发失败
				}
			};
		}
	};
</script>

<style lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 1s;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	
	@import "../../mixin";
	.loading {
		position: fixed;
		left: 0;
		top: 0;
		background: #ffffff;
		width: 100vw;
		height: 100vh;
		opacity: 1;
		&.hide-loading {
			display: none;
		}
		img {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
	
	.index {
		.magazine {
			display: flex;
			padding: 40rpx 0;
			flex-direction: column;
			align-items: center;
			.img {
				width: 612rpx;
				height: 816rpx;
				position: relative;
				img {
					width: 612rpx;
					height: 816rpx;
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
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
					}
					.button {
						width: 150rpx;
						padding: 0;
						line-height: 56rpx;
						margin: 110rpx auto 8rpx;
						border-color: #ffffff;
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
			.button-box {
				padding: 0 30rpx;
				width: 100%;
				display: flex;
				justify-content: space-around;
			}
			.button {
				text-align: center;
				margin-top: 40rpx;
				border: $pcolor solid 3rpx;
				border-radius: 6rpx;
				padding: 12rpx 20rpx;
				color: $pcolor;
				align-items: center;
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
							content: "";
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
					width: 330rpx;
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
						}
					}
					.cover {
						display: flex;
						flex-direction: column;
						align-items: center;
						background: $bcolor;
						padding-top: 12rpx;
						img {
							width: 306rpx;
							height: 408rpx;
						}
						span {
							line-height: 60rpx;
							color: #ffffff;
							font-weight: bold;
						}
					}
					.intro {
						text-align: right;
						font-size: 30rpx;
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