<template>
  <div class="findpassword">
    <h1 class="title">找回密码</h1>
    <el-form :model="form" label-width="100px">
      <el-form-item label="登录名">
        <el-input v-model="form.username"></el-input>
        <el-button plain>获取验证码</el-button>
      </el-form-item>
      <el-form-item label="密码"
        ><el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain size="small">登录</el-button>
        <el-button style="float:right" plain size="small">找回密码</el-button>
      </el-form-item>
    </el-form>
  </div></template
>

<script>
export default {
  name: 'findPassword',
  data() {
    return {
      form: {},
    }
  },
}
</script>

<style lang="less" scoped>
.findpassword {
  .title {
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
  .el-form {
    width: 90%;
    .el-input {
      width: auto;
      margin-right: ;
    }
  }
}
</style>
