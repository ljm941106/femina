<template>
  <div id="app">
    <keep-alive><router-view v-if="$route.meta.keepAlive" /></keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import db from "./service/db";
import api from "./service/api";
export default {
  name: "App",
  data() {
    return {
      shareImg: require("./assets/share-logo.jpeg")
    };
  },
  async created() {
    //登录
    let currentUrl = window.location;
    if (!currentUrl) return;
    let token = db.get("token");
    let codeIndex = currentUrl.href.indexOf("code");
    if (codeIndex > 0) {
      //跳转登录之后
      let codeEnd = currentUrl.href.indexOf("&state=");
      let code = currentUrl.href.substring(codeIndex + 5, codeEnd);
      let loginRes = await this.$http.post(this, api.getH5Token, {
        code: code
      });
      if (loginRes.code == 0) {
        db.set("token", loginRes.data.token);
        db.set("userId", loginRes.data.user_id);
        this.$router.replace("/");
      }
    } else if (!token) {
      //没有登录，去跳转登录页面
      currentUrl.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${api.appid}&redirect_uri=${
        api.domain
      }/&response_type=code&scope=snsapi_userinfo&state=NlQ8alv8LFlTN2Vyw4q2#wechat_redirect`;
    } else {
      //我的阅读码列表
      let codeRes = await this.$http.post(this, api.getCode, {
        token: token
      });
      if (codeRes.code == 500) {
        //token过期，去跳转登录界面
        currentUrl.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${api.appid}&redirect_uri=${
          api.domain
        }/&response_type=code&scope=snsapi_userinfo&state=NlQ8alv8LFlTN2Vyw4q2#wechat_redirect`;
      }
    }
  }
};
</script>

<style></style>
