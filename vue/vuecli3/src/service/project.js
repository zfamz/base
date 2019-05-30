import axios from '@/utils/axios.js';
import { clearApiData as clear } from '@/utils/fiterData.js';
import qs from 'qs';

const qsy = qs.stringify;

export default {
  // 获取项目列表
  list(data) {
    return axios({
      url: '/project/list',
      method: 'post',
      data: qsy(clear(data))
    });
  },
  // 添加项目的所有信息
  add(data) {
    return axios({
      url: '/admin/add',
      method: 'post',
      data: qsy(data)
    });
  },
  // 修改项目信息
  set(data) {
    return axios({
      url: '/admin/set',
      method: 'post',
      data: qsy(data)
    });
  },
  // 修改项目
  remove(data) {
    return axios({
      url: '/admin/project/remove',
      method: 'post',
      data: qsy(data)
    });
  },
  // 获取项目所有信息
  detail(data) {
    return axios({
      url: '/admin/getallbyid',
      method: 'post',
      data: qsy(clear(data))
    });
  },
  // 下载
  export(url, param) {
    return axios({
      timeout: 60000,
      url: url,
      method: 'get',
      params: param,
      responseType: 'blob'
    });
  }
};
