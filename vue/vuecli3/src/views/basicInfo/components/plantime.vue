<template>
  <div class="basic-item" :class="{'close': !show}">
    <h4 class="header algin-left" @click="show=!show">
      开竣工日期-进度信息
      <i :class="[show? 'el-icon-arrow-down' : 'el-icon-arrow-up']"></i>
    </h4>
    <el-form ref="plantime" :model="form[index]" label-width="80px" v-for="(item,index) in count" :key="item" class="form-item" :disabled="type === 'view'" v-show="show">
      <el-row>
        <base-form-item label="计划开工" w100 v-if="index === 0" prop="startTime">
          <el-date-picker v-model="form[index].startTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </base-form-item>
        <base-form-item label="计划竣工" w100 v-if="index === 0" prop="endTime">
          <el-date-picker v-model="form[index].endTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </base-form-item>
        <base-form-item label="" size="two" v-if="index === 0">
          <div style="height: 40px"></div>
        </base-form-item>
        <base-form-item label="月份" w100 prop="month">
          <el-date-picker v-model="form[index].month" type="month" placeholder="选择月份"></el-date-picker>
        </base-form-item>
        <base-form-item label="重要程度" w100 prop="status">
          <el-select v-model="form[index].status" placeholder="请选择" clearable>
            <el-option label="普通" value="普通"></el-option>
            <el-option label="紧急" value="紧急"></el-option>
          </el-select>
        </base-form-item>
        <base-form-item label="本月进度说明" size="two" warp prop="remark">
          <el-input type="textarea" v-model="form[index].remark" placeholder="请输入"></el-input>
        </base-form-item>
      </el-row>
      <div class="del-template" @click="delOne(index)" v-if="type !== 'view' && index">
        <i class="el-icon-delete"></i>
      </div>
    </el-form>
    <div class="add-template" @click="addOne" v-if="type !== 'view' && show">
      <span class="text">新增月份进度</span>
      <svg-icon name="add" iconClass="add"></svg-icon>
    </div>
  </div>
</template>

<script>
const monthMap = {
  january: '01',// '一月',
  february: '02',// '二月',
  march: '03',// '三月',
  april: '04',// '四月',
  may: '05',// '五月',
  june: '06',// '六月',
  july: '07',// '七月',
  august: '08',// '八月',
  september: '09',// '九月',
  october: '10',// '十月',
  november: '11',// '十一月',
  december: '12',// '十二月',
};
const monthD = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
export default {
  name: 'plantime',
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
        startTime: '',
        endTime: '',
        month: '',
        status: '',
        remark: ''
      },
      show: this.isShow,
      lineSeparator: '%',
      attrSeparator: '|',

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
        this.$refs.plantime[i].validate((valid) => {
          if (!valid) {
            this.showMsg('请先将信息填写完整', 'error');
            state = false;
          }
        });
      }
      if (!state) {
        return state;
      }
      let data = {}
      data.startTime = this.form[0].startTime;
      data.endTime = this.form[0].endTime;
      for (let item of this.form) {
        let d = new Date(item.month);
        let y = d.getFullYear();
        let m = d.getMonth();
        !data[monthD[m]] && (data[monthD[m]] = []);
        let str = `${y}${this.attrSeparator}${item.status}${this.attrSeparator}${item.remark}`;
        data[monthD[m]].push(str);
      }
      for (let key in data) {
        if (data[key].join) {
          data[key] = data[key].join(this.lineSeparator)
        }
      }
      return [data];
    },
    setForm(data) {
      this.form = [];
      let lineSeparator = '-=-';
      let attrSeparator = '|';
      for (let key in monthMap) {
        let d = data[key];
        if (!d) { continue; }
        let arr = d.split(this.lineSeparator);
        for (let i of arr) {
          let attr = i.split(this.attrSeparator);
          let obj = {
            startTime: data.startTime,
            endTime: data.endTime,
            month: attr[0] + '-' + monthMap[key],
            status: attr[1],
            remark: attr[2]
          };
          this.form.push(obj);
        }
      }
      this.count = this.form.length;
      // for (let i = 0; i < this.count; i++) {
      //   this.$refs.plantime[i].resetFields();
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>