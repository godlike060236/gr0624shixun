<template>
  <div>
    <h1 class="title">欢迎登录</h1>
    <el-form :model="form" label-width="100px">
      <el-form-item label="登录名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"
        ><el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  form: {
    username: '',
    password: '',
  },
}
</script>

<style lang="less" scoped>
.title {
}
</style>
