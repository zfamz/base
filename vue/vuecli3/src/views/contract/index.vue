<template>
  <div>
    <div class="search">
      <h4>证照信息查询</h4>
      <el-form :model="form" label-width="80px">
        <el-row>
          <base-form-item label="项目">
            <el-input v-model="form.itemName" placeholder="请输入"></el-input>
          </base-form-item>
          <base-form-item label="登记时间" w100>
            <el-date-picker size="medium" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
          </base-form-item>
          <el-col :span="3" :offset="1" class="search-btn-left">
            <el-button type="primary" @click="searchBtn">查询</el-button>
            <el-button plain @click="clearForm(form)">清除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content">
      <el-row class="content-header">
        <el-col :span="24" class="toolip">
          <el-button plain @click="exportFn('/amount/downloadFile', '合约台账信息表')">导出</el-button>
        </el-col>
      </el-row>
      <div class="content-main">
        <el-table :data="tableList" row-key="id" @selection-change="handleSelectionChange" :summary-method="getSummaries" show-summary>
          <el-table-column type="selection" fixed="left" :selectable="selectInit"></el-table-column>
          <el-table-column label="序号" type="index" width="50" fixed="left">
            <template slot-scope="scope">
              <div>{{getIndex(scope.row.index)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" prop="itemName" fixed="left" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.s">{{scope.row.itemName}}</template>
            </template>
          </el-table-column>
          <el-table-column label="成本科目(费用)名称" prop="accountType"></el-table-column>
          <el-table-column label="合同编号" prop="contrNo"></el-table-column>
          <el-table-column label="合同名称" prop="contrName"></el-table-column>
          <el-table-column label="是否分期付款" prop="installment"></el-table-column>
          <el-table-column label="合同款(元)" prop="contrAmount"></el-table-column>
          <el-table-column label="甲方" prop="partyA"></el-table-column>
          <el-table-column label="已方" prop="partyB"></el-table-column>
          <el-table-column label="付款金额" prop="payAmount"></el-table-column>
          <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button type="text" @click="commonModify(scope.row.id, 'contract')" v-if="scope.row.s">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.current" :page-sizes="[10, 20, 30, 40]" :page-size.sync="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import page from '@/mixins/page.js';
import contractAPI from '@/service/contract.js'
export default {
  name: 'contract',
  mixins: [page],
  data() {
    return {
      form: {
        name: '',
        area: '',
        time: []
      },
      timeArg: {
        startTime: 'startDate',
        endTime: 'endDate'
      },
      summary: {
        count: 0, // 合同份数 
        contrAmount: 0, // 合同款
        payAmount: 0 // 付款金额
      },
      tableList: []
      // tableList: [{ id: 1, name: 'qwerty', children: [{ id: 11, name: '11' }] }, { id: 2, name: '1234567', children: [{ id: 21, name: '21' }, { id: 22, name: '22' }] }]
    };
  },
  methods: {
    selectInit(row, index) {
      return row.s;
    },
    search() {
      contractAPI.list({ ...this.formCopy, ...this.page }).then(res => {
        if (res.code === true) {
          let arr = [];
          let index = 0;
          this.summary.count = 0;
          this.summary.contrAmount = 0;
          this.summary.contrAmount = 0;
          for (let key in res.data) {
            let o = {};
            o.itemName = key;
            o.id = res.data[key][0].projectId;
            o.children = res.data[key];
            o.index = index++;
            o.s = true;
            o.count = 0; // 合同份数 
            o.contrAmount = 0;  // 合同款
            o.payAmount = 0;  // 付款金额
            for (let item of o.children) {
              o.count += 1;
              o.contrAmount += (Number(item.contrAmount) || 0);
              o.payAmount += (Number(item.payAmount) || 0);
            }
            this.summary.count += (Number(o.count) || 0);
            this.summary.contrAmount += (Number(o.contrAmount) || 0);
            this.summary.payAmount += (Number(o.payAmount) || 0);
            arr.push(o);
          }
          this.tableList = arr;
          this.page.total = res.total;
          this.checkoutSelection();
        } else {
          this.$message(res.message);
        }
      });
    },
    getSummaries(param) {
      // ['', '总计', 3, 4, 5, 6, 7, 8, 9, 10, 11]
      return ['', '总计', , , this.summary.count + '份合同', , , this.summary.contrAmount, , , this.summary.payAmount];
    }
  }
}
</script>
<style lang='scss' scoped>
</style>