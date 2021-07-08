<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.gr-filter {
  margin-bottom: 10px;
}

.clear {
  clear: both;
}

body .el-table th.gutter {
  display: table-cell !important;
}

body .el-table colgroup.gutter {
  display: table-cell !important;
}
</style>
