import axios from '@/utils/axios.js';
import { clearApiData as clear } from '@/utils/fiterData.js';
import qs from 'qs';

const qsy = qs.stringify;

export default {
  // 查询所有的证照信息
  list(data) {
    return axios({
      url: '/license/all',
      method: 'post',
      data: qsy(clear(data))
    });
  }
};
