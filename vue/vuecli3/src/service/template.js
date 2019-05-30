import axios from '@/utils/axios.js';
import qs from 'qs';

export default {
  apple() {
    return axios({
      url: '/user/register',
      method: 'post',
      data: qs.stringify(obj)
    });
  },
  test() {
    return axios({
      url: '/user/register',
      method: 'get',
      params: qs.stringify(obj)
    });
  },
  // 上传
  upload(obj) {
    return request({
      url: '/uploadIdCard/upload',
      method: 'post',
      data: obj,
      timeout: 1000 * 60 * 2,
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8'
      }
    });
  },
  // 下载
  download(url) {
    return request({
      timeout: 60000,
      url: url,
      method: 'get',
      responseType: 'blob'
    });
  },
  // download(alink).then(res => {
  //   this.loading.close();
  //   const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
  //   const downloadElement = document.createElement('a');
  //   const href = window.URL.createObjectURL(blob);
  //   downloadElement.href = href;
  //   let filename = 'filename.xlsx';
  //   downloadElement.download = filename;
  //   document.body.appendChild(downloadElement);
  //   downloadElement.click();
  //   document.body.removeChild(downloadElement); // 下载完成移除元素
  //   window.URL.revokeObjectURL(href); // 释放掉blob对象
  // });
  
  // 接口缓存
  setCache(url, sesionName, data = {}) {
    let areaData = window.sessionStorage.getItem(sesionName);
    if (areaData) {
      return new Promise((resolve, reject) => {
        resolve(JSON.parse(areaData));
      });
    }
    return request.post(url, data).then(res => {
      if (res.code === 'success') {
        window.sessionStorage.setItem(sesionName, JSON.stringify(res));
      }
      return res;
    });
  },
};
