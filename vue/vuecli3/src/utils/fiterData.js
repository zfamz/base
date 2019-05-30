// 处理一些数据

const replaceList = new Map([['current', 'page'], ['size', 'pageSize']]);
// 处理api的请求数据
export const clearApiData = function(obj) {
  for (let key in obj) {
    if (!obj[key] || key === 'total' || key === 'time') {
      delete obj[key];
    }
    if (replaceList.has(key)) {
      obj[replaceList.get(key)] = obj[key];
      delete obj[key];
    }
  }
  return obj;
};
