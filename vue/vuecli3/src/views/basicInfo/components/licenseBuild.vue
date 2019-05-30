<template>
  <div class="basic-item" :class="{'close': !show}">
    <h4 class="header algin-left" @click="show=!show">
      证照信息—建设五证
      <i :class="[show? 'el-icon-arrow-down' : 'el-icon-arrow-up']"></i>
    </h4>
    <el-form ref="licenseBuild" :model="form[index]" label-width="120px" v-for="(item,index) in count" :key="item" class="form-item" :disabled="type === 'view'" v-show="show">
      <el-row>
        <base-form-item label="立项批复/备案文号" size="three" warp prop="filingNo">
          <el-input v-model="form[index].filingNo" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="环评批复文号" size="three" warp prop="eiaApprNo">
          <el-input v-model="form[index].eiaApprNo" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="建设用地规划许可证编号" size="three" warp prop="constLandNo">
          <el-input v-model="form[index].constLandNo" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="建设工程规划许可证编号" size="three" warp prop="constPlanNo">
          <el-input v-model="form[index].constPlanNo" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="建筑工程施工许可证编号" size="three" warp prop="constPermitNo">
          <el-input v-model="form[index].constPermitNo" placeholder="请输入"></el-input>
        </base-form-item>
      </el-row>
      <div class="del-template" @click="delOne(index)" v-if="type !== 'view' && index">
        <i class="el-icon-delete"></i>
      </div>
    </el-form>
    <div class="add-template" @click="addOne" v-if="type !== 'view'  && show">
      <span class="text">添加新模版</span>
      <svg-icon name="add" iconClass="add"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'licenseBuild',
  props: {
    type: {
      type: String,
      default: 'view'
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      count: 0,
      form: [],
      formTemp: {
        filingNo: '',
        eiaApprNo: '',
        constLandNo: '',
        constPlanNo: '',
        constPermitNo: ''
      },
      show: this.isShow
    }
  },
  created() {
    this.addOne();
  },
  methods: {
    addOne() {
      this.count++;
      let d = this.form[0] || this.formTemp;
      let obj = { ...d };
      this.form.push(obj);
    },
    delOne(index) {
      this.count--;
      this.form.splice(index, 1);
    },
    getForm() {
      let state = true;
      for (let i = 0; i < this.count; i++) {
        this.$refs.licenseBuild[i].validate((valid) => {
          if (!valid) {
            this.showMsg('请先将信息填写完整', 'error');
            state = false;
          }
        });
      }
      if (state) {
        return this.form;
      }
      return false
    },
    setForm(data) {
      this.form = data;
      this.count = this.form.length;
      // for (let i = 0; i < this.count; i++) {
      //   this.$refs.licenseBuild[i].resetFields();
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>