var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();

fly.config.baseURL = "https://ssl-yizhou.25bsx.com";
fly.config.baseURL = "http://yizhou.congcong2014.cn";

fly.interceptors.request.use((config, promise) => {
  return config;
});

fly.interceptors.response.use(
  response => {
    return response.data;
  },
  (error, promise) => {
    wx.showToast({
      title: err.message,
      icon: "none"
    });
    return promise.resolve(error);
  }
);

export default fly;
