import axios from '@/utils/axios.js';
import { clearApiData as clear } from '@/utils/fiterData.js';
import qs from 'qs';

const qsy = qs.stringify;

export default {
  // 查询合约信息
  list(data) {
    return axios({
      url: '/amount/all',
      method: 'post',
      data: qsy(clear(data))
    });
  }
};
