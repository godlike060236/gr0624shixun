<template>
  <div class="findpassword">
    <h1 class="title">找回密码</h1>
    <el-form :model="form" label-width="100px">
      <el-form-item label="登录名">
        <div class="name">
          <el-input v-model="form.username"></el-input>
          <el-button plain style="float: left">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item label="验证码"
        ><el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain size="small">确定</el-button>
        <el-button style="float:right" plain size="small" @click="gologin"
          >重新登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      form: {
        username: '',
        code: '',
      },
    }
  },
  methods: {
    gologin() {
      this.$emit('update:r', 0)
    },
  },
}
</script>

<style lang="less" scoped>
.findpassword {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg) translateZ(1px);
  .title {
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
  .el-form {
    width: 90%;
    .name {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>
