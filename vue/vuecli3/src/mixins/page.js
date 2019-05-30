import projectAPI from '@/service/project.js';
export default {
  data() {
    return {
      page: {
        current: 1,
        size: 20,
        total: 100
      },
      multipleSelection: [],
      selectedIds: new Set(),
      tableDateName: 'tableList',
      tableRefName: 'multipleTable',
      formCopy: {},
      timeArg: {
        startTime: 'startTime',
        endTime: 'endTime'
      },
      align: {
        'text-align': 'center'
      }
    };
  },
  created() {
    this.copyForm();
    this.search && this.search();
    // console.log('name:', this.$options.name);
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'basicDeal') {
      next(vm => {
        if (vm.$store.state.project.isUpdate) {
          vm.search();
        }
      });
    } else {
      next();
    }
  },
  methods: {
    searchBtn() {
      this.page.current = 1;
      this.copyForm();
      this.clearSelection();
      this.search();
    },
    commonModify(id, type) {
      let obj = {
        // baseInfo: 0b101010101010, // view关
        licenseuse: 0b101010100110,
        licensehouse: 0b101010011010,
        licensebuild: 0b101001101010,
        plantime: 0b100110101010,
        contract: 0b011010101010
      };
      this.$store.commit('SET_DEAL_STATUS', obj[type]);
      this.$store.commit('SET_PROJECT_ID', id);
      this.$router.push('/basic/deal');
    },
    handleCurrentChange() {
      this.storeSelection();
      this.search();
    },
    handleSizeChange() {
      this.storeSelection();
      this.search();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val || [];
    },
    checkoutSelection() {
      let _self = this;
      if (!this.selectedIds.size) return;
      let d = this[this.tableDateName];
      if (d && d.length) {
        d.map(item => {
          if (_self.selectedIds.has(item.id)) {
            _self.$nextTick(() => {
              _self.$refs[_self.tableRefName].toggleRowSelection(item, true);
            });
          }
        });
      }
    },
    storeSelection() {
      let _self = this;
      if (this.selectedIds.size) {
        let ids = this.multipleSelection.map(item => item.id);
        let d = this[this.tableDateName];
        if (d && d.length) {
          d.map(item => {
            if (ids.includes(item.id)) {
              _self.selectedIds.add(item.id);
            } else {
              if (_self.selectedIds.has(item.id)) {
                _self.selectedIds.delete(item.id);
              }
            }
          });
        }
      } else {
        this.multipleSelection.map(item => _self.selectedIds.add(item.id));
      }
    },
    clearSelection() {
      this.selectedIds.clear(this.selectedIds.keys());
    },
    // 复制一份表单用于查询
    copyForm() {
      this.form && (this.formCopy = JSON.parse(JSON.stringify(this.form)));
      if (this.formCopy && this.formCopy.time) {
        if (this.formCopy.time.length > 0) {
          this.formCopy[this.timeArg.startTime] = this.formCopy.time[0] || '';
          this.formCopy[this.timeArg.endTime] = this.formCopy.time[1] || '';
        }
      }
    },
    clearForm(form) {
      for (let key in form) {
        if (typeof form[key] === 'string') {
          form[key] = '';
        } else if (typeof form[key] === 'boolean') {
          form[key] = false;
        } else if (typeof form[key] === 'object') {
          form[key] = [];
        } else {
          form[key] = '';
        }
      }
    },
    getIndex(index) {
      return this.page.size * (this.page.current - 1) + index + 1 || '';
    },
    exportLink(url, type = false) {
      this.storeSelection();
      let ids = Array.from(this.selectedIds);
      if (!ids.length) {
        this.showMsg('请先选择要导出的数据', 'warning');
        return;
      }
      let downloadElement = document.createElement('a');
      let href = `/api${url}?idlist=${ids.join()}`;
      if (type) {
        href += '&licenseType=' + type;
      }
      downloadElement.href = href;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement); // 下载完成移除元素
    },
    exportFn(url, filename, type = false) {
      this.storeSelection();
      let ids = Array.from(this.selectedIds);
      if (!ids.length) {
        this.showMsg('请先选择要导出的数据', 'warning');
        return;
      }
      let query = {};
      query.idlist = ids.join();
      if (type) {
        query.licenseType = type;
      }
      projectAPI.export(url, query).then(res => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        });
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        // let filename = 'filename.xlsx';
        downloadElement.download = filename + '.xlsx';
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      });
    },
    confirmFn(callback, option = {}) {
      let config = {
        ...{
          title: '提示',
          message: '即将执行删除, 是否继续?',
          sureText: '确定',
          cancelText: '取消',
          type: 'warning'
        },
        ...option
      };
      this.$confirm(config.message, config.title, {
        confirmButtonText: config.sureText,
        cancelButtonText: config.cancelText,
        type: 'warning'
      })
        .then(() => {
          callback();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
