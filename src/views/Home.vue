<template>
  <el-container class="wrap">
    <el-aside width="200px">
      <menuSide></menuSide>
    </el-aside>
    <el-container>
      <el-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menuSide from '../components/menu'

export default {
  name: 'Home',
  components: {
    menuSide
  }
}
</script>

<style lang="less">

.wrap {
  margin: 0;
  padding: 0;
  height: 100vh;
  .special {
    width: auto;
    margin-right: 10px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
}

</style>
