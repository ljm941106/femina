import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
import './plugins/rem'
import './styles/index.scss'
import './plugins/swiper.min'


new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
