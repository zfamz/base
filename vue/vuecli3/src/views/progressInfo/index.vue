<template>
  <div>
    <div class="search">
      <h4>进度信息查询</h4>
      <el-form :model="form" label-width="80px">
        <el-row>
          <base-form-item label="项目">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </base-form-item>
          <base-form-item label="月份" w100>
            <el-select v-model="form.month" placeholder="请选择" filterable multiple clearable>
              <el-option :label="item+'月'" :value="item" v-for="item in count" :key="item"></el-option>
            </el-select>
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
          <el-button plain @click="exportFn('/progress/export','项目进度信息表')">导出</el-button>
        </el-col>
      </el-row>
      <div class="content-main">
        <el-table :data="tableList" :header-cell-style="align" :cell-style="align" border @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="序号" type="index" prop="name" width="50" fixed="left" :index="getIndex"></el-table-column>
          <el-table-column label="项目名称" prop="name" fixed="left"></el-table-column>
          <el-table-column :label="item+'月'" prop="name" v-for="(item,index) in 12" :key="index">
            <template slot-scope="scope">
              <template v-if="scope.row[monthD[index]]">
                <template v-for="(list,i) in scope.row[monthD[index]].split('-=-')">
                  <p :key="i" :class="[~list.indexOf('紧急')? 'bg-urgency':'bg-normal']" style="padding:5px">
                    <span v-if="~list.indexOf('紧急')">&diams;</span> {{ formatContent(list)}}
                  </p>
                </template>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="commonModify(scope.row.projectId, 'plantime')">修改</el-button>
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
import progressAPI from '@/service/progress.js';
export default {
  name: 'progressInfo',
  mixins: [page],
  data() {
    return {
      count: 12,
      form: {
        name: '',
        month: [],
        time: []
      },
      monthD: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
      tableList: []
    };
  },
  methods: {
    search() {
      let query = { ...this.formCopy };
      query.month = query.month.join(',');
      progressAPI.list({ ...query, ...this.page }).then(res => {
        if (res.code === true) {
          this.tableList = res.data;
          this.page.total = res.total;
          this.checkoutSelection();
        } else {
          this.$message(res.message);
        }
      });
    },
    formatContent(text) {
      text = text.replace(/\|.*?\|/, '');
      return text;
    }
  }
}
</script>
<style lang='scss' scoped>
.bg-normal {
  // word-wrap: break-word;
  // white-space: nowrap;
  color: #606266;
  background: #c4f6c0;
}
.bg-urgency {
  color: #e05757;
  background: #fcf5d8;
}
</style>