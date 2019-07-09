import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";
import Copyright from "./views/copyright.vue";
import Step2 from "./views/step2.vue";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		}, {
			path: "/copyright",
			name: "copyright",
			component: Copyright
		}, {
			path: "/step2",
			name: "step2",
			component: Step2
		},
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
