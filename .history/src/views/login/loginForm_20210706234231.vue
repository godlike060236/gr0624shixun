<template>
  <div>
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
export default {}
</script>

<style></style>
