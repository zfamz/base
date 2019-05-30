<template>
  <div class="basic-item" :class="{'close': !show}">
    <h4 class="header algin-left" @click="show=!show">
      基本信息
      <i :class="[show ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"></i>
    </h4>
    <el-form ref="baseInfo" :model="form" label-width="80px" :disabled="type === 'view'" v-show="show">
      <el-row>
        <base-form-item label="立项编号" prop="itemNo">
          <el-input v-model="form.itemNo" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="项目简称" prop="shotName">
          <el-input v-model="form.shotName" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="项目名称" prop="itemName">
          <el-input v-model="form.itemName" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="区域" prop="region">
          <el-input v-model="form.region" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="归属" prop="ownerShip">
          <el-input v-model="form.ownerShip" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="所属公司" prop="company">
          <el-input v-model="form.company" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="地块位置" prop="location">
          <el-input v-model="form.location" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="用地性质" prop="landUse">
          <el-input v-model="form.landUse" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="购买时间" w100 prop="purchaseTime">
          <el-date-picker v-model="form.purchaseTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </base-form-item>
        <base-form-item label="使用期限" w100 prop="expirTime">
          <el-date-picker v-model="form.expirTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </base-form-item>
        <base-form-item label="实际亩数" prop="actArea" rule="_number">
          <el-input v-model="form.actArea" placeholder="请输入">
            <template slot="append">亩</template>
          </el-input>
        </base-form-item>
        <base-form-item label="建筑面积" prop="constrArea" rule="_number">
          <el-input v-model="form.constrArea" placeholder="请输入">
            <template slot="append">平米</template>
          </el-input>
        </base-form-item>
        <base-form-item label="立项金额" prop="itemAmount" rule="_number">
          <el-input v-model="form.itemAmount" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="土地费" prop="landFee" rule="_number">
          <el-input v-model="form.landFee" placeholder="请输入">
            <template slot="append">万元</template>
          </el-input>
        </base-form-item>
        <base-form-item label="状态" w100 prop="status">
          <el-select v-model="form.status" placeholder="请选择" clearable>
            <template v-for="(item,index) in $store.state.project.status">
              <el-option :label="item" :value="index" :key="index" v-if="index < 4"></el-option>
            </template>
          </el-select>
        </base-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'baseInfo',
  props: {
    type: {
      type: String,
      default: 'view',
    },
    isShow: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      form: {
        itemNo: '',
        shotName: '',
        itemName: '',
        region: '',
        ownerShip: '',
        company: '',
        location: '',
        landUse: '',
        purchaseTime: '',
        expirTime: '',
        actArea: '',
        landUse: '',
        itemAmount: '',
        landFee: '',
        status: ''
      },
      show: this.isShow
    }
  },
  methods: {
    getForm() {
      let state = true;
      this.$refs.baseInfo.validate((valid) => {
        if (!valid) {
          this.showMsg('请先将信息填写完整', 'error');
          state = false;
        }
      });
      if (state) {
        return [this.form];
      }
      return false
    },
    setForm(data) {
      this.form = { ...this.form, ...data };
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-item {
  border-bottom: 1px dashed #d6d6d6;
  padding-bottom: 10px;
}
</style>