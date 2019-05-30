export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getStore = name => {
  if (!name) return;
  let content = window.sessionStorage.getItem(name);
  if (content && (content.includes('{') || content.includes('['))) {
    return JSON.parse(content);
  }
  return content;
};

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};
