'use strict';

import Vue from 'vue';
import store from '@/store';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : '/api',
  timeout: 30 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control\
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // 取消所有请求
    return null;
    // Do something before request is sent
    // store.user.token
    if (store.state.user.token) {
      config.headers.ticket = store.state.user.token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (response.status === 200) {
      return response.data;
    } else {
      Vue.prototype.showMsg(response.data.message, 'error');
    }
  },
  function(error) {
    // 自己玩总是弹窗
    return { code: true, message: 'ok' };
    let msg = '服务器出错，请联系管理员';
    if (error.response && error.response.status === 408) {
      msg = '请求超时，请联系管理员';
    }
    // console.error('请求错误接口: ', error.response.request.responseURL);
    Vue.prototype.showMsg(msg, 'error');
    // Do something with response error
    return Promise.reject(error);
  }
);

export default _axios;
