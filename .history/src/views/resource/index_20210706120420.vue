<template>
  <div class="index">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="资源名" prop="loginName"></el-table-column>
      <el-table-column label="资源类别" prop="phone"></el-table-column>
      <el-table-column label="资源地址" prop="email"></el-table-column>
      <el-table-column label="后端地址" prop="id"></el-table-column>
      <el-table-column label="上级id" prop="loginName"></el-table-column>
      <el-table-column label="是否有下级" prop="phone"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ResourceList',
  data() {
    const baseUrl = '/ums-resource'
    return {
      tableData: [],
      url: {
        list: baseUrl + '/list',
      },
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.get(this.url.list, this.query, (response) => {
        this.tableData = response
      })
    },
  },
  components: {
    UserEdit,
  },
}
</script>

<style scoped></style>
