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
      <el-row class="content-header" type="flex" justify="space-between">
        <el-col :span="12" class="toolip-left">
          <el-button-group>
            <el-button @click="handleTab('use')" :class="{active: showType === 'use'}">自有土地使用权</el-button>
            <el-button @click="handleTab('house')" :class="{active: showType === 'house'}">自有房屋产权</el-button>
            <el-button @click="handleTab('build')" :class="{active: showType === 'build'}">建设五证</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="4" class="toolip">
          <el-button plain @click="exportFn('/license/downloadFile',showType === 'use'? '自有土地使用权表' : showType === 'house'? '自有房屋产权表': '建设五证表',showType === 'use'? 1 : showType === 'house'? 2: 3 )">导出</el-button>
        </el-col>
      </el-row>
      <div class="content-main">
        <el-table ref="multipleTable" row-key="id" :data="tableList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" fixed="left" :selectable="selectInit"></el-table-column>
          <el-table-column label="序号" type="index" fixed="left">
            <template slot-scope="scope">
              <div>{{getIndex(scope.row.index)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" fixed="left" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.s">{{scope.row.itemName}}</template>
            </template>
          </el-table-column>
          <el-table-column :label="item.label" :prop="item.prop" :fixed="item.fixed ? item.fixed : false" v-for="(item,index) in tbody[showType]" :key="index"></el-table-column>
          <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope" v-if="scope.row.s">
              <el-button type="text" @click="commonModify(scope.row.id, 'license'+showType)">修改</el-button>
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
import licenseAPI from '@/service/license.js'
export default {
  name: 'licenseInfo',
  mixins: [page],
  data() {
    return {
      form: {
        itemName: '',
        time: []
      },
      timeArg: {
        startTime: 'startDate',
        endTime: 'endDate'
      },
      tbody: {
        use: [
          // { label: '项目名称', prop: 'itemName', fixed: 'left' },
          { label: '证书编号', prop: 'licenseNo' },
          { label: '权利人', prop: 'rightHolder' },
          { label: '取得方式', prop: 'obtainType' },
          { label: '用途', prop: 'use' },
          { label: '座落', prop: 'location' },
          { label: '用地面积(平方米)', prop: 'useArea' },
          { label: '使用期限', prop: 'useTerm' },
        ],
        house: [
          // { label: '项目名称', prop: 'itemName', fixed: 'left' },
          { label: '证书编号', prop: 'licenseNo' },
          { label: '权利人', prop: 'rightHolder' },
          { label: '用途', prop: 'use' },
          { label: '座落', prop: 'location' },
          { label: '用地面积(平方米)', prop: 'useArea' },
          { label: '使用期限', prop: 'useTerm' },
        ],
        build: [
          // { label: '项目名称', prop: 'itemName', fixed: 'left' },
          { label: '环评批复文号', prop: 'eiaApprNo' },
          { label: '建设用地规划许可证编号', prop: 'constLandNo' },
          { label: '建设工程规划许可证编号', prop: 'constPlanNo' },
          { label: '建筑工程施工许可证编号 ', prop: 'constPermitNo' },
          { label: '登记时间', prop: 'registTime' }
        ]
      },
      tableList: [{ name: 'qwerty' }, { name: '1234567' }],
      showType: 'use', // use 自由土地使用权, house 自有房屋产权, build 建设五证
    };
  },
  methods: {
    selectInit(row, index) {
      return row.s;
    },
    search() {
      let query = { ...this.formCopy };
      let o = { use: 1, house: 2, build: 3 };
      query.licenseType = o[this.showType];
      licenseAPI.list({ ...query, ...this.page }).then(res => {
        if (res.code === true) {
          let arr = [];
          let index = 0;
          for (let key in res.data) {
            let o = {};
            o.itemName = key;
            o.id = res.data[key][0].projectId;
            o.children = res.data[key];
            o.index = index++;
            o.s = true;
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
    handleTab(type) {
      this.showType = type;
      this.searchBtn();
    }
  }
}
</script>
<style lang='scss' scoped>
</style>