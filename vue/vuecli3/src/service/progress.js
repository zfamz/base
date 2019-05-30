import axios from '@/utils/axios.js';
import { clearApiData as clear } from '@/utils/fiterData.js';
import qs from 'qs';

const qsy = qs.stringify;

export default {
  // 获取项目进度列表
  list(data) {
    return axios({
      url: '/progress/list',
      method: 'post',
      data: qsy(clear(data))
    });
  }
};
