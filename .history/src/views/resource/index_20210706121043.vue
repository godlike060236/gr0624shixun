<template>
  <div class="index">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="资源名" prop="name"></el-table-column>
      <el-table-column label="资源类别" prop="type"></el-table-column>
      <el-table-column label="前端地址" prop="frontUrl"></el-table-column>
      <el-table-column label="后端地址" prop="backUrl"></el-table-column>
      <el-table-column label="上级id" prop="parentId"></el-table-column>
      <el-table-column label="是否有下级" prop="hasChildren"></el-table-column>
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
}
</script>

<style scoped></style>
