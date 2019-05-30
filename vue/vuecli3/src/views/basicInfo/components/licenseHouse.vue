<template>
  <div class="basic-item" :class="{'close': !show}">
    <h4 class="header algin-left" @click="show=!show">
      证照信息—自有房屋产权
      <i :class="[show? 'el-icon-arrow-down' : 'el-icon-arrow-up']"></i>
    </h4>
    <el-form ref="licenseHouse" :model="form[index]" label-width="80px" v-for="(item,index) in count" :key="item" class="form-item" :disabled="type === 'view'" v-show="show">
      <el-row>
        <base-form-item label="证书编号" prop="licenseNo">
          <el-input v-model="form[index].licenseNo" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="权利人" prop="rightHolder">
          <el-input v-model="form[index].rightHolder" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="用途" prop="tUse">
          <el-input v-model="form[index].tUse" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="坐落" prop="tLocation">
          <el-input v-model="form[index].tLocation" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="用地面积" prop="useArea" rule="_number">
          <el-input v-model="form[index].useArea" placeholder="请输入">
            <template slot="append">平米</template>
          </el-input>
        </base-form-item>
        <base-form-item label="使用期限" w100 prop="time">
          <el-date-picker size="medium" v-model="form[index].time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy.MM.dd"></el-date-picker>
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
  name: 'licenseHouse',
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
        licenseNo: '',
        rightHolder: '',
        tUse: '',
        tLocation: '',
        useArea: '',
        useTerm: '',
        time: ''
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
        this.form[i].useTerm = this.form[i].time.join('-')
        this.$refs.licenseHouse[i].validate((valid) => {
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
      for (let item of data) {
        item.time = [];
        if (item.useTerm) {
          item.time = item.useTerm.split('-');
        }
      }
      this.form = data;
      this.count = this.form.length;
      // for (let i = 0; i < this.count; i++) {
      //   this.$refs.licenseHouse[i].resetFields();
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>