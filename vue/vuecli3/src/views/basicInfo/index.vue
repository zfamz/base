<template>
  <div>
    <div class="search">
      <h4>基本信息查询</h4>
      <el-form :model="form" label-width="80px">
        <el-row>
          <base-form-item label="区域">
            <el-input v-model="form.region" placeholder="请输入"></el-input>
          </base-form-item>
          <base-form-item label="归属">
            <el-input v-model="form.ownerShip" placeholder="请输入"></el-input>
          </base-form-item>
          <base-form-item label="项目">
            <el-input v-model="form.itemName" placeholder="请输入"></el-input>
          </base-form-item>
          <base-form-item label="所属公司">
            <el-input v-model="form.company" placeholder="请输入"></el-input>
          </base-form-item>
          <base-form-item label="登记时间" w100>
            <el-date-picker size="medium" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
          </base-form-item>
          <el-col :span="3" class="search-btn">
            <el-button type="primary" @click="searchBtn">查询</el-button>
            <el-button plain @click="clearForm(form)">清除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content">
      <el-row class="content-header">
        <el-col :span="24" class="toolip">
          <el-button type="primary" @click="handleInfo('add')">新增</el-button>
          <!-- <el-button plain @click="handleInfo('modify')">修改</el-button> -->
          <el-button plain @click="importDialog = true">导入</el-button>
          <el-button plain @click="exportFn('/project/export', '项目基础信息表')">导出</el-button>
          <el-button plain @click="handleInfo('remove')">作废</el-button>
        </el-col>
      </el-row>
      <div class="content-main">
        <el-table ref="multipleTable" :data="tableList" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="序号" type="index" width="50" prop="name" :index="getIndex"></el-table-column>
          <el-table-column label="项目简称" prop="shotName"></el-table-column>
          <el-table-column label="购买时间" prop="purchaseTime"></el-table-column>
          <el-table-column label="使用期限" prop="expirTime"></el-table-column>
          <el-table-column label="实际亩数" prop="actArea"></el-table-column>
          <el-table-column label="建筑面积" prop="constrArea"></el-table-column>
          <el-table-column label="土地费(万元)" prop="landFee"></el-table-column>
          <el-table-column label="立项金额(万元)" prop="itemAmount"></el-table-column>
          <el-table-column label="登记时间" prop="registTime"></el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <span :style="{color: pStatus['color_'+scope.row.status]}">{{pStatus[scope.row.status]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="开竣工日期">
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row.id, 'plantime')">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="证照">
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row.id, 'license')">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="合约台账">
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row.id, 'contract')">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row.id, 'mofify')">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.current" :page-sizes="[10, 20, 30, 40]" :page-size.sync="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
      </div>
    </div>
    <section>
      <el-dialog :visible.sync="importDialog" center width="40%">
        <p slot="title" class="dialog-header algin-left"> 导入</p>
        <div class="import-menu">
          <span style="font-weight: bold;">选取文件</span>
          <el-upload ref="upload" accept=".xls,.xlsx" :on-change='fileChange' :show-file-list="false" :file-list="fileList" :headers="ticket" :multiple="false" action="/api/file/upload" :on-success="onSuccess" :on-error="onError" :auto-upload="false">
            <div slot="trigger" class="upload-btn"> {{fileName}} </div>
          </el-upload>
          <el-button plain @click="tempDownload">模板下载</el-button>
        </div>
        <span slot="footer">
          <el-button plain @click="importDialog = false">取消</el-button>
          <el-button type="primary" @click="fileUpload">提交</el-button>
        </span>
      </el-dialog>
      <!-- <el-dialog :visible.sync="importDialog" class="algin-left" title="导入" width="40%">
        <div class="import-menu">
          <el-upload ref="upload" accept=".xls,.xlsx" :on-change='fileChange' :file-list="fileList" :multiple="false" action="/api/file/upload" :on-success="onSuccess" :auto-upload="false">
            <el-button slot="trigger" class="upload-btn"> 选择文件 </el-button>
            <a class="download_a" download href="api/file/download">模板下载</a>
          </el-upload>
          <el-button type="primary" @click="fileUpload">执行导入</el-button>
        </div>
      </el-dialog> -->
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import page from '@/mixins/page.js';
import projectAPI from '@/service/project.js'
import { debug } from 'util';
import { escape } from 'querystring';
export default {
  name: 'basic',
  mixins: [page],
  data() {
    return {
      form: {
        region: '',
        ownerShip: '',
        itemName: '',
        company: '',
        time: []
      },
      tableList: [],
      importDialog: false,
      fileList: [],
      fileName: '请先选择文件'
    };
  },
  computed: {
    ...mapState({
      pStatus: state => state.project.status,
      roleID: state => state.user.roleID,
      token: state => state.user.token
    }),
    ticket() {
      if (this.token) {
        return { ticket: this.token }
      } else {
        return {}
      }
    }
  },
  methods: {
    search() {
      projectAPI.list({ ...this.formCopy, ...this.page }).then(res => {
        if (res.code === true) {
          this.tableList = res.data;
          this.page.total = res.total;
          this.checkoutSelection();
        } else {
          this.$message(res.message);
        }
      });
    },
    handleInfo(type) {
      switch (type) {
        case 'add':
          this.$store.commit('SET_DEAL_STATUS', 'add');
          break;
        case 'modify':
          this.$store.commit('SET_DEAL_STATUS', 0b010101010101);
          break;
        case 'remove':
          this.storeSelection();
          let ids = Array.from(this.selectedIds);
          if (!ids.length) {
            this.showMsg('请先选择要删除的数据', 'warning');
            return;
          }
          this.confirmFn(this.del)
          return;
          break;
      }
      this.$router.push('/basic/deal')
    },
    del() {
      projectAPI.remove({ idlist: Array.from(this.selectedIds).join() }).then(res => {
        if (res.code === true) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.clearSelection();
          this.search();
        } else {
          this.$message(res.message);
        }
      });
    },
    detail(id, type) {
      this.$store.commit('SET_PROJECT_ID', id);
      // baseInfo: 1, licenseUse: 2, licenseHouse: 3, licenseBuild: 4, plantime: 5, contract: 6 
      switch (type) {
        case 'plantime':
          this.$store.commit('SET_DEAL_STATUS', 0b101110101010);
          break;
        case 'license':
          this.$store.commit('SET_DEAL_STATUS', 0b101010101110);
          break;
        case 'contract':
          this.$store.commit('SET_DEAL_STATUS', 0b111010101010);
          break;
        case 'mofify':
          if (this.roleID === 2) {
            this.showMsg('很抱歉，你没有权限修改项目信息', 'error');
            return;
          }
          this.$store.commit('SET_DEAL_STATUS', 0b010101010101);
          break;
      }
      this.$router.push('/basic/deal')
    },
    tempDownload() {
      projectAPI.export('/file/download', {}).then(res => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        });
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        // let filename = 'filename.xlsx';
        downloadElement.download = '导入模板.xlsx';
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      });
    },
    onSuccess(res) {
      if (res.code === true) {
        this.showMsg('上传成功', 'success');
      } else {
        this.showMsg(res.message, 'error');
      }
    },
    onError(err) {
      this.showMsg(err.message, 'error');
    },
    fileUpload() {
      if (!this.$refs.upload.uploadFiles.length) {
        this.showMsg('请先选择文件');
      }
      this.$refs.upload.submit();
    },
    fileChange(file) {
      // console.log('fileList: ', file.name);
      this.fileName = file.name;
      this.$refs.upload.uploadFiles = [file];
    },
  }
}
</script>
<style lang='scss' scoped>
.import-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  // height: 70px;
  .label {
    color: #f1f1f1;
  }
  .upload-btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    width: 326px;
    height: 36px;
    padding-left: 15px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: rgba(161, 165, 173, 1);
  }
  .download_a {
    color: #ffc107;
    text-decoration: none;
    margin-left: 2em;
    height: 0;
  }
}
</style>