<template>
  <div class="login">
    <div class="login-box">
      <div class="login-form" v-show="!ding">
        <p class="login-header">账号登录
          <span class="other-type clearfix" @click="ding = !ding">钉钉扫码登录></span>
        </p>
        <div class="form-item">
          <el-input placeholder="账号" v-model="form.username">
            <p slot="prefix" style="margin: 7px 12px;">
              <svg-icon name="user" iconClass="login-icon"></svg-icon>
            </p>
          </el-input>
        </div>
        <div class="form-item">
          <el-input placeholder="密码" v-model="form.password" show-password>
            <p slot="prefix" style="margin: 7px 12px;">
              <svg-icon name="password" iconClass="login-icon"></svg-icon>
            </p>
          </el-input>
        </div>
        <div class="remember clearfix">
          <el-checkbox v-model="form.isRemember">记住我</el-checkbox>
        </div>
        <div class="submit-btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
      <div class="login-form" v-if="ding">
        <p class="login-header" style="margin-bottom: 0">钉钉扫码登录
          <span class="other-type clearfix" @click="ding = !ding">账号登录></span>
        </p>
        <div class="qr-code" id="ding">
          <!-- <div class="qr-box">
          </div> -->
        </div>
        <remote-js js-url="//g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js" @load-js-finish="apple"></remote-js>
        <!-- <p class="footer">钉钉App - 首页右上角加号 - 扫一扫</p> -->
      </div>
    </div>
    <!--<remote-js key="123" js-url='http://g.alicdn.com/sd/ncpc/nc.js?t=2015052012' @load-js-finish='loadRongJs'></remote-js>-->
    <!-- <script src="//g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js"></script> -->
  </div>
</template>

<script>
import remoteJs from '@/components/remote';
import userAPI from '@/service/user.js';
export default {
  components: { remoteJs },
  data() {
    return {
      ding: false,
      form: {
        username: '',
        password: '',
        isRemember: false
      }
    };
  },
  created() {
    let username = localStorage.getItem('username', this.form.username);
    if (username) {
      this.form.username = username;
      this.form.isRemember = true;
    }

  },
  mounted() {
    var hanndleMessage = function (event) {
      var origin = event.origin;
      // console.log("origin", event);
      if (origin == "https://login.dingtalk.com") { //判断是否来自ddLogin扫码事件。
        var loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        // console.log("loginTmpCode", loginTmpCode);
      }
    };
    if (typeof window.addEventListener != 'undefined') {
      window.addEventListener('message', hanndleMessage, false);
    } else if (typeof window.attachEvent != 'undefined') {
      window.attachEvent('onmessage', hanndleMessage);
    }
  },
  methods: {
    apple() {
      var appid = 'dingoa3sotoe06b7c6nhln';
      var redirect_uri = 'http://csproject.yto.net.cn:7473/auth/ddlogin';
      // var redirect_uri = '/DDLoginApi?id=test001';
      var dingurl = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirect_uri}`;
      var obj = DDLogin({
        id: "ding",//这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
        goto: encodeURIComponent(dingurl), //请参考注释里的方式
        style: "border:none;background-color:#FFFFFF;",
        width: "300",
        height: "350"
      });
    },
    login() {
      // this.$router.push('/basic');
      userAPI.login(this.form).then(res => {
        if (res.code === true) {
          let data = res.user;
          data.token = res.message;
          this.$store.dispatch('setUserInfo', data);
          if (this.form.isRemember) {
            localStorage.setItem('username', this.form.username);
          } else {
            localStorage.removeItem('username');
          }
          this.$router.push('/basic');
        } else {
          this.showMsg(res.message, 'error');
        }
      });
    }
  }
}
</script>
<style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("../../assets/images/login_bg@2x.png") no-repeat;
  background-size: 100% 100%;
  .login-box {
    width: 360px;
    height: 380px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    .login-form /deep/ {
      padding: 10px 30px;
      .login-icon {
        height: 20px;
        width: 20px;
      }
      .el-input--prefix .el-input__inner {
        padding-left: 52px;
      }
      .login-header {
        text-align: left;
        font-size: 20px;
      }
      .form-item {
        margin: 15px 0;
      }
      .other-type {
        float: right;
        font-size: 16px;
        cursor: pointer;
        color: rgba(12, 126, 240, 1);
      }
      .remember {
        float: left;
        margin-bottom: 18px;
      }
      .submit-btn {
        .el-button {
          width: 100%;
        }
      }
      .qr-code {
        margin: 0;
        height: auto;
        width: 100%;
        .qr-box {
          width: 180px;
          height: 180px;
          margin: 10px auto;
        }
      }
      .footer {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}
</style>