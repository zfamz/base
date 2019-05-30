<template>
  <div class="container">
    <!-- <el-input v-model="temp"></el-input>
    <el-button @click="apple">apple</el-button> -->
    <base-info ref='baseInfo' :type="type['baseInfo']" :isShow="isShow['baseInfo']"></base-info>
    <license-use ref='licenseUse' :type="type['licenseUse']" :isShow="isShow['licenseUse']"></license-use>
    <license-house ref='licenseHouse' :type="type['licenseHouse']" :isShow="isShow['licenseHouse']"></license-house>
    <license-build ref='licenseBuild' :type="type['licenseBuild']" :isShow="isShow['licenseBuild']"></license-build>
    <plantime ref='plantime' :type="type['plantime']" :isShow="isShow['plantime']"></plantime>
    <contract ref='contract' :type="type['contract']" :isShow="isShow['contract']"></contract>
    <div class="footer">
      <el-button plain @click="$router.back()">{{operateText ? '取消': '返回'}}</el-button>
      <el-button type="primary" @click="submit" v-if="operateText">{{operateText}}</el-button>
    </div>
  </div>
</template>

<script>
import baseInfo from './components/base.vue';
import licenseUse from './components/licenseUse.vue';
import licenseHouse from './components/licenseHouse.vue';
import licenseBuild from './components/licenseBuild.vue';
import plantime from './components/plantime.vue';
import contract from './components/contract.vue';
import projectAPI from '@/service/project.js';
import { mapState } from 'vuex';

export default {
  name: 'basicDeal',
  components: { baseInfo, licenseUse, licenseHouse, licenseBuild, plantime, contract },
  data() {
    return {
      // temp: '0b010101010101',
      // add 新增 0, modify 修改 1, view 查看 2
      // 1|0 开|关， 1|0 view| modity, 01 modify开
      type: { baseInfo: 'add', licenseUse: 'add', licenseHouse: 'add', licenseBuild: 'add', plantime: 'add', contract: 'add' },
      isShow: { baseInfo: true, licenseUse: true, licenseHouse: true, licenseBuild: true, plantime: true, contract: true },
      classify: { 0: 'modify', 1: 'view' },
      formMap: {
        baseInfo: 'listProject', licenseUse: 'listLicense1', licenseHouse: 'listLicense2', licenseBuild: 'listLicense3', plantime: 'listProgress', contract: 'listAmount'
      },
      operateText: '新增'
    };
  },
  computed: {
    ...mapState({
      dealStatus: state => state.project.dealStatus,
      pID: state => state.project.projectId
    })
  },
  created() {
    this.$store.commit('SET_ISUPDATE', false);
    this.setStatus();
  },
  methods: {
    updateStatus(status) {
      this.$store.commit('SET_DEAL_STATUS', +status);
      this.setStatus();
    },
    setStatus() {
      let status = this.dealStatus;
      if (status === 'add') {
        return;
      }
      this.setData();
      let flag = true;
      for (let key in this.type) {
        let t = status % 4;
        let s = Number(t & 2);
        if (flag && !s) {
          this.operateText = '更新';
          flag = false;
        }
        this.type[key] = this.classify[s];
        this.isShow[key] = Boolean(1 & t)
        status = status >> 2;
      }
      if (flag) {
        this.operateText = false;
      }
    },
    setData() {
      if (!this.pID) {
        this.$router.back();
        return;
      }
      projectAPI.detail({ id: this.pID }).then(res => {
        if (res.code === true) {
          for (let key in this.formMap) {
            if (this.$refs[key].setForm) {
              let k = this.formMap[key];
              if (~k.indexOf('License')) {
                k = 'l' + k.substr(5);
              }
              let d = res.data[k];
              if (d) {
                if (Object.prototype.toString.call(d) === "[object Array]" && !d.length) {
                  this.showMsg('项目数据不完整', 'error');
                  continue;
                }
                this.$refs[key].setForm(d);
              } else {
                this.showMsg('项目数据不完整', 'error');
                continue;
              }
            } else {
              console.error(key, '的setForm函数为空');
            }
          }
        } else {
          this.$message(res.message);
        }
      });
    },
    submit() {
      let data = this.getParam();
      if (!data) return;
      switch (this.operateText) {
        case '新增':
          projectAPI.add(data).then(res => {
            if (res.code === true) {
              this.showMsg('新增成功', 'success')
              this.$store.commit('SET_ISUPDATE', true);
              this.$router.back();
            } else {
              this.$message(res.message);
            }
          })
          break;
        case '更新':
          data.projectId = this.pID;
          projectAPI.set(data).then(res => {
            if (res.code === true) {
              this.showMsg('修改成功', 'success')
              let status = this.dealStatus;
              status = status | 0b101010101010;
              this.updateStatus(status);
              this.$store.commit('SET_ISUPDATE', true);
            } else {
              this.$message(res.message);
            }
          })
          break;
      }
    },
    getParam() {
      let data = {};
      let flag = false;
      for (let key in this.formMap) {
        let arr = this.$refs[key].getForm();
        if (!arr || flag) {
          !flag && (flag = true);
          continue;
        };
        for (let i in arr) {
          let item = arr[i];
          for (let k1 in item) {
            let k = `${this.formMap[key]}[${i}].${k1}`;
            data[k] = item[k1];
          }
        }
      }
      if (flag) return false;
      return data;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>