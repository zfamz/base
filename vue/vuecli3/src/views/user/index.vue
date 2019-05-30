<template>
  <div>
    <section class="search">
      <h4>用户管理查询</h4>
      <el-form :model="form" label-width="80px">
        <el-row>
          <base-form-item label="用户名">
            <el-input v-model="form.realname" placeholder="请输入"></el-input>
          </base-form-item>
          <base-form-item label="工号">
            <el-input v-model.number="form.username" placeholder="请输入"></el-input>
          </base-form-item>
          <el-col :span="3" :offset="1" class="search-btn-left">
            <el-button type="primary" @click="searchBtn">查询</el-button>
            <el-button plain @click="clearForm(form)">清除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <section class="content">
      <el-row class="content-header" type="flex" justify="space-between">
        <el-col :span="24" class="toolip">
          <el-button type="primary" @click="deal('', 'add')">新增</el-button>
          <!-- <el-button plain @click="modifyDialogShow = true">修改</el-button> -->
          <!-- <el-button plain @click="del">删除</el-button> -->
        </el-col>
      </el-row>
      <div class="content-main">
        <!-- :header-cell-style="align" :cell-style="align" border -->
        <el-table :data="tableList">
          <el-table-column label="序号" type="index" width="50" prop="name" fixed="left" :index="getIndex"></el-table-column>
          <el-table-column label="用户名" prop="realName"></el-table-column>
          <el-table-column label="工号" prop="username"></el-table-column>
          <el-table-column label="权限" prop="roleID"></el-table-column>
          <el-table-column label="登记时间" prop="createTime" :formatter="formatter"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="deal(scope.row, 'modify')">修改</el-button>
              <el-button type="text" @click="deal(scope.row.id, 'del')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.current" :page-sizes="[10, 20, 30, 40]" :page-size.sync="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
      </div>
    </section>
    <section>
      <el-dialog :visible.sync="addDialogShow" center width="38%">
        <p slot="title" class="dialog-header algin-left"> 新增</p>
        <div class="dialog-content">
          <el-form ref="addForm" :model="addForm" label-width="80px">
            <el-row>
              <base-form-item size="two" label="用户名" prop="realName">
                <el-input v-model="addForm.realName" placeholder="请输入"></el-input>
              </base-form-item>
              <base-form-item size="two" label="工号" prop="username">
                <el-input v-model="addForm.username" placeholder="请输入"></el-input>
              </base-form-item>
              <base-form-item size="two" label="权限" prop="roleID">
                <el-select v-model="addForm.roleID">
                  <el-option label="管理员" value="1"></el-option>
                  <el-option label="普通用户" value="2"></el-option>
                </el-select>
              </base-form-item>
              <base-form-item size="two" label="密码" rule="_pwd" prop="password" :errPosition="false">
                <el-input v-model="addForm.password" placeholder="请输入" show-password></el-input>
              </base-form-item>
            </el-row>
          </el-form>
        </div>
        <span slot="footer">
          <el-button plain @click="addDialogShow = false">取消</el-button>
          <el-button type="primary" @click="submit('add')">提交</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="modifyDialogShow" center width="38%">
        <p slot="title" class="dialog-header algin-left"> 修改</p>
        <div class="dialog-content">
          <el-button-group style="margin-bottom:20px;">
            <el-button @click="isModifyPWD = false" :class="{active:!isModifyPWD}">用户信息</el-button>
            <el-button @click="isModifyPWD = true" :class="{active:isModifyPWD}">密码修改</el-button>
          </el-button-group>
          <el-form ref="mForm1" :model="addForm" label-width="80px" v-show="!isModifyPWD">
            <el-row>
              <base-form-item size="two" label="用户名" prop="realName">
                <el-input v-model="addForm.realName" placeholder="请输入"></el-input>
              </base-form-item>
              <base-form-item size="two" label="工号" prop="username">
                <el-input v-model="addForm.username" placeholder="请输入"></el-input>
              </base-form-item>
              <base-form-item size="two" label="权限" prop="roleID">
                <el-select v-model="addForm.roleID">
                  <el-option label="管理员" value="1"></el-option>
                  <el-option label="普通用户" value="2"></el-option>
                </el-select>
              </base-form-item>
            </el-row>
          </el-form>
          <el-form ref="mForm2" :model="pwdForm" label-width="80px" v-show="isModifyPWD">
            <el-row>
              <base-form-item size="two" label="用户名">
                <el-input v-model="pwdForm.realName" placeholder="请输入" disabled></el-input>
              </base-form-item>
              <base-form-item size="two" label="工号">
                <el-input v-model="pwdForm.username" placeholder="请输入" disabled></el-input>
              </base-form-item>
              <base-form-item size="two" label="输入密码" rule="_pwd" prop="password" :errPosition="false">
                <el-input v-model="pwdForm.password" placeholder="请输入" show-password></el-input>
              </base-form-item>
              <base-form-item size="two" label="确认密码">
                <el-input v-model="pwdForm.repeatPWD" placeholder="请输入" show-password></el-input>
              </base-form-item>
            </el-row>
          </el-form>
        </div>
        <span slot="footer">
          <el-button plain @click="modifyDialogShow = false">取消</el-button>
          <el-button type="primary" @click="submit(isModifyPWD?'pwd':'modify')">提交</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import page from '@/mixins/page.js';
import userAPI from '@/service/user.js';
import dayjs from 'dayjs';
export default {
  name: 'user',
  mixins: [page],
  data() {
    return {
      form: {
        realname: '',
        username: ''
      },
      addForm: {
        realName: '',
        username: '',
        roleID: '',
        password: '',
      },
      pwdForm: {
        realName: '',
        username: '',
        password: '',
        repeatPWD: ''
      },
      tableList: [],
      operateId: '',
      addDialogShow: false,
      modifyDialogShow: false,
      isModifyPWD: false
    };
  },
  methods: {
    search() {
      userAPI.list({ ...this.formCopy, ...this.page }).then(res => {
        if (res.code === true) {
          this.tableList = res.data;
          this.page.total = res.total;
          this.checkoutSelection();
        } else {
          this.$message(res.message);
        }
      });
    },
    submit(type) {
      let obj = {
        add: 'addForm',
        modify: 'mForm1',
        pwd: 'mForm2'
      }
      this.$refs[obj[type]].validate((valid) => {
        if (!valid) {
          this.showMsg('请先将信息填写完整', 'error');
          return false;
        } else {
          let query = { ...this.addForm };
          switch (type) {
            case 'add':
              userAPI.add(this.addForm).then(res => {
                if (res.code === true) {
                  this.showMsg('新增成功', 'success')
                  this.searchBtn();
                  this.addDialogShow = false;
                } else {
                  this.$message(res.message);
                }
              })
              break;
            case 'modify':
              delete query['password'];
              userAPI.set({ id: this.operateId, ...query }).then(res => {
                if (res.code === true) {
                  this.showMsg('修改成功', 'success')
                  this.search();
                  this.modifyDialogShow = false;
                } else {
                  this.$message(res.message);
                }
              })
              break;
            case 'pwd':
              if (this.pwdForm.repeatPWD !== this.pwdForm.password) {
                this.showMsg('两次密码不一致', 'error');
                return;
              }
              userAPI.set({ id: this.operateId, password: this.pwdForm.password }).then(res => {
                if (res.code === true) {
                  this.showMsg('修改密码成功', 'success')
                  this.modifyDialogShow = false;
                } else {
                  this.$message(res.message);
                }
              })
              break;
          }
        }
      });
    },
    deal(id, type) {
      switch (type) {
        case 'add':
          this.addDialogShow = true;
          this.clearForm(this.addForm);
          break;
        case 'del':
          this.operateId = id;
          this.confirmFn(this.del)
          break;
        case 'modify':
          this.clearForm(this.addForm);
          let row = id;
          this.operateId = row.id;
          this.addForm.realName = row.realName;
          this.addForm.username = row.username;
          this.pwdForm.realName = row.realName;
          this.pwdForm.username = row.username;
          this.addForm.roleID = row.roleID;
          this.modifyDialogShow = true;
          break;
      }
    },
    del() {
      userAPI.remove({ id: this.operateId }).then(res => {
        if (res.code === true) {
          this.showMsg('删除成功', 'success');
          this.search();
        } else {
          this.$message(res.message);
        }
      })
    },
    formatter(row, column, cellValue, index) {
      return dayjs(cellValue).format('YYYY-MM-DD');
    }
  }
}
</script>
<style lang='scss' scoped>
</style>