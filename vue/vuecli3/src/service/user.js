import axios from '@/utils/axios.js';
import { clearApiData as clear } from '@/utils/fiterData.js';
import qs from 'qs';

const qsy = qs.stringify;
export default {
  // 获取用户列表
  list(data) {
    return axios({
      url: '/user/list',
      method: 'post',
      data: qsy(clear(data))
    });
  },
  // 新增用户信息
  add(data) {
    return axios({
      url: '/user/add',
      method: 'post',
      data: qsy(clear(data))
    });
  },
  // 修改用户
  remove(data) {
    return axios({
      url: '/user/remove',
      method: 'post',
      data: qsy(clear(data))
    });
  },
  // 修改用户信息
  set(data) {
    return axios({
      url: '/user/set',
      method: 'post',
      data: qsy(clear(data))
    });
  },
  // 登录
  login(data) {
    return axios({
      url: '/auth/login',
      method: 'post',
      data: qsy(clear(data))
    });
  },
  // 登出
  logout(data) {
    return axios({
      url: '/auth/logout',
      method: 'post',
      data: qsy(clear(data))
    });
  }
};
