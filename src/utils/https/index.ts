import httpInstance from "./request";
import config from "../../../config/api.js";
import { getToken, setToken } from "../token";
import Taro from "@tarojs/taro";

let loadingCount = 0; // loading次数
let timeOutBtnShow = false;
const { BASE_API, BASE_URL, } = config;

// 初始化httpInstance，并返回一个httpInstance的实例
const http = httpInstance.create({
  timeout: 60000,
  baseURL: `${BASE_URL}${BASE_API}`,
});

// 请求前拦截，一般进行一些权限的校验，如加入token或其他请求头
http.interceptors.request.use(
  async (config) => {
    if (config.loading || config.loadingText) {
      loadingCount++;
      Taro.showLoading({
        title: config.loadingText || "加载中",
        mask: true,
      });
    }
    if (!config.method) {
      config.method = "GET";
    }
    config.method = config.method.toUpperCase();
    if (!config.header) {
      config.header = {};
    }
    // 记录请求参数
    config.requestData = {
      ...config.data,
    };
    config.data = config.data;
    config.url = `${config.baseURL}/` + config.api;
    // 设置请求头token
    let token = getToken();
    if (token?.jwtConfig) {
      const header = token?.jwtConfig?.headerKey;
      const tk = token?.jwtConfig?.headerPrefix + " " + token?.tokenData?.token;
      config.header[header] = tk;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// 响应前拦截，一般进行响应数据的过来，判断是不是成功的响应
http.interceptors.response.use(
  async (response) => {
    if (response.config.loading || response.config.loadingText) {
      loadingCount--;
      if (loadingCount === 0) {
        Taro.hideLoading();
      }
    }
    const config = JSON.parse(JSON.stringify(response.config));
    const resData = response.data;
    if (response.statusCode === 200) {
      const resData = response.data;
      // Aes.decrypt(AES_KEY, IV, response.data.data);
      console.info("请求参数", {
        method: config.api,
        data: config.requestData,
      });
      console.info("响应参数", resData);
      if (resData.code === 200) {
        return {
          data: resData.data,
          msg: resData.msg,
          code: resData.code,
        };
      } else {
        return {
          data: resData.data || {},
          msg: resData.msg,
          code: resData.code,
        };
      }
    } else {
      if (response.statusCode === 401) {
        console.log("没有权限");
      }
      return Promise.reject(resData);
    }
    return response.data;
  },
  (error) => {
    console.log("请求出错", error);
    if (
      error?.response?.config?.loading ||
      error?.response?.config?.loadingText
    ) {
      loadingCount--;
      if (loadingCount === 0) {
        Taro.hideLoading();
      }
    }

    if (error?.error?.errMsg?.indexOf("timeout") > -1 && !timeOutBtnShow) {
      timeOutBtnShow = true;
      Taro.showModal({
        content: "当前网络不稳定，请稍后重试",
        showCancel: false,
        success: () => {
          timeOutBtnShow = false;
        },
      });
    }

    if (error?.response?.statusCode === 404) {
      console.log("请求接口不存在");
    }
    return Promise.reject(error);
  }
);

export default http;
