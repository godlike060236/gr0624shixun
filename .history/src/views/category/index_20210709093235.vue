<template>
  <div class="index">
    <div class="gr-filter">
      <el-button
        size="medium"
        type="primary"
        plain
        icon="el-icon-plus"
        style="float: right"
        @click="add(0, 1)"
        >添加品牌
      </el-button>
      <div class="clear"></div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      row-key="id"
      default-expand-all
    >
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="分类名称" prop="name"></el-table-column>
      <el-table-column label="层级" prop="level"></el-table-column>
      <el-table-column label="前端地址" prop="frontUrl"></el-table-column>
      <el-table-column label="后端地址" prop="backUrl"></el-table-column>
      <el-table-column label="上级id" prop="parentId"></el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.active === 1">有效</span>
          <span v-else>失效</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    const baseUrl = '/pms-category'
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
    add(parentId, level) {},
  },
}
</script>

<style scoped></style>
