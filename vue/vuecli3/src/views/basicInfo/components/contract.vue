<template>
  <div class="basic-item" :class="{'close': !show}">
    <h4 class="header algin-left" @click="show=!show">
      合约台账
      <i :class="[show? 'el-icon-arrow-down' : 'el-icon-arrow-up']"></i>
    </h4>
    <el-form ref="contractBase" :model="form[index]" label-width="80px" v-for="(item,index) in count" :key="item" class="form-item" :disabled="type === 'view'" v-show="show">
      <el-row>
        <base-form-item label="成本科目名称" warp prop="accountType">
          <el-input v-model="form[index].accountType" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="合同编号" prop="contrNo">
          <el-input v-model="form[index].contrNo" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="合同名称" prop="contrName">
          <el-input v-model="form[index].contrName" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="合同额" prop="contrAmount" rule="_number">
          <el-input v-model="form[index].contrAmount" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="是否分期付款" warp prop="installment">
          <el-input v-model="form[index].installment" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="甲方" prop="partyA">
          <el-input v-model="form[index].partyA" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="乙方" prop="partyB">
          <el-input v-model="form[index].partyB" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="签订日期" w100 prop="signTime">
          <el-date-picker v-model="form[index].signTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </base-form-item>
        <base-form-item label="累计已支付金额" warp prop="area" rule="_number">
          <el-input v-model="form[index].area" placeholder="请输入">
            <template slot="append">元</template>
          </el-input>
        </base-form-item>
        <base-form-item label="本期付款金额" warp prop="payAmount" rule="_number">
          <el-input v-model="form[index].payAmount" placeholder="请输入">
            <template slot="append">元</template>
          </el-input>
        </base-form-item>
        <base-form-item label="本期付款日期" w100 warp prop="payTime">
          <el-date-picker v-model="form[index].payTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </base-form-item>
        <base-form-item label="付款比例" prop="payScale">
          <el-input v-model="form[index].payScale" placeholder="请输入"></el-input>
        </base-form-item>
        <base-form-item label="结算金额" prop="settleAmount" rule="_number">
          <el-input v-model="form[index].settleAmount" placeholder="请输入">
            <template slot="append">元</template>
          </el-input>
        </base-form-item>
        <base-form-item label="未付金额" prop="unpaidAmount" rule="_number">
          <el-input v-model="form[index].unpaidAmount" placeholder="请输入">
            <template slot="append">元</template>
          </el-input>
        </base-form-item>
        <base-form-item label="备注" size="two" prop="remark" rule="none">
          <el-input v-model="form[index].remark" placeholder="请输入"></el-input>
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
  name: 'contractBase',
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
        accountType: '',
        contrNo: '',
        contrName: '',
        contrAmount: '',
        installment: '',
        partyA: '',
        partyB: '',
        signTime: '',
        area: '', // 累计已支付金额
        payAmount: '',
        payTime: '',
        payScale: '',
        settleAmount: '',
        unpaidAmount: '',
        remark: ''
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
      let index = 0;
      for (let key in d) {
        if (index > 7) {
          d[key] = '';
        }
        index += 1;
      }
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
        this.$refs.contractBase[i].validate((valid) => {
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
      //   this.$refs.contractBase[i].resetFields();
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>