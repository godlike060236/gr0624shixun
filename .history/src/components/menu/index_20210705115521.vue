<template>
  <el-menu background-color="#D3DCE6" :router="true">
    <el-submenu index="1">
      <template slot="title">用户和权限</template>
      <el-menu-item index="/user">用户管理</el-menu-item>
      <el-menu-item index="/role">页面2</el-menu-item>
      <el-menu-item>页面3</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">导航2</template>
      <el-menu-item index="/brand">页面1</el-menu-item>
      <el-menu-item>页面2</el-menu-item>
      <el-menu-item>页面3</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'menuSide'
}
</script>

<style scoped lang="less">

</style>