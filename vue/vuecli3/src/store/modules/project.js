const project = {
  state: {
    status: {
      0: '待建',
      1: '在建',
      2: '完工',
      3: '废弃',
      color_0: '#F5BB33',
      color_1: '#BF4F4F',
      color_2: '#57BF4F',
      color_3: '#909399'
    },
    isUpdate: false,
    projectId: '',
    dealStatus: 0b101010101010 // 存储deal页面的操作状态
  },
  mutations: {
    SET_DEAL_STATUS: (state, data) => {
      state.dealStatus = data;
    },
    SET_PROJECT_ID: (state, id) => {
      state.projectId = id;
    },
    SET_ISUPDATE: (state, status) => {
      state.isUpdate = status;
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view);
    }
  }
};

export default project;
