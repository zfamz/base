import { setStore, getStore, removeStore } from '@/utils/storage.js';
const user = {
  state: {
    token: '',
    realName: '',
    username: '',
    roleID: '' // 1 管理员， 2 普通用户
  },
  getters: {
    userInfo: state => {
      return { token: state.token, realName: state.realName, username: state.username };
    }
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    },
    SET_USER_INFO: (state, data) => {
      state.token = data.token || '';
      state.realName = data.realName || '';
      state.username = data.username || '';
      state.roleID = data.roleID || 2;
    },
    STORE_USER: state => {
      setStore('yto-user', state);
    }
  },
  actions: {
    setUserInfo({ commit }, data) {
      commit('SET_USER_INFO', data);
      commit('STORE_USER');
    },
    checkLogin({ commit, state }) {
      if (state.token) {
        return Promise.resolve(true);
      } else {
        return new Promise((resolve, reject) => {
          let data = getStore('yto-user');
          if (data && data.token) {
            commit('SET_USER_INFO', data);
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    },
    logout({ commit }) {
      commit('SET_USER_INFO', {});
      removeStore('yto-user');
    }
  }
};

export default user;
