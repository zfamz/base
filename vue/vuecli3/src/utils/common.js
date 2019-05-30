import Vue from 'vue';

let timer = null;
// 同一时间只提示一个信息
Vue.prototype.showMsg = function(content, type = 'info', duration = 3000) {
  if (!timer) {
    Vue.prototype.$message({ message: content, type: type, duration: duration });
    timer = setTimeout(() => {
      timer = null;
    }, duration);
  }
};
