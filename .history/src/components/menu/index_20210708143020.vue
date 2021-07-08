<template>
  <el-menu background-color="#D3DCE6" :router="true">
    <el-submenu v-for="item in menu" :key="item.id" :index="item.frontUrl"
      ><template slot="title">
        {{ item.name }}
      </template>
      <el-menu-item
        v-for="child in item.children"
        :key="child.id"
        :index="child.frontUrl"
        >{{ child.name }}</el-menu-item
      >
    </el-submenu>
    <!-- <el-submenu index="1">
      <template slot="title">用户和权限</template>
      <el-menu-item index="/user">用户管理</el-menu-item>
      <el-menu-item index="/role">角色管理</el-menu-item>
      <el-menu-item index="/resource">权限管理</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">品牌和商品</template>
      <el-menu-item index="/brand">品牌管理</el-menu-item>
      <el-menu-item>分类管理</el-menu-item>
      <el-menu-item>商品管理</el-menu-item>
    </el-submenu> -->
  </el-menu>
</template>

<script>
export default {
  name: 'menuSide',
  data() {
    return {
      menu: [],
    }
  },
  created() {
    this.menu = this.$store.getters.GET_MENU
  },
}
</script>

<style scoped lang="less"></style>
