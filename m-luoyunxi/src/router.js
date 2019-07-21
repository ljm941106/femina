import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";
import Copyright from "./views/copyright.vue";
import Step2 from "./views/step2.vue";
import Step3 from "./views/step3.vue";
import Step4 from "./views/step4.vue";
import Step5 from "./views/step5.vue";
import End from "./views/end.vue";

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
		}, {
      path: "/step3",
      name: "step3",
      component: Step3
		}, {
      path: "/step4",
      name: "step4",
      component: Step4
		}, {
      path: "/step5",
      name: "step5",
      component: Step5
		}, {
      path: "/end",
      name: "end",
      component: End
		}
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
