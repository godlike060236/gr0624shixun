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
        >添加分类
      </el-button>
      <div class="clear"></div>
    </div>
    <el-table :data="tableData" border style="width: 100%" row-key="id">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="分类名称" prop="name"></el-table-column>
      <el-table-column label="层级" prop="level"></el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.active === 1">有效</span>
          <span v-else>失效</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      width="550px"
      :title="categoryDialog.title"
      :visible.sync="categoryDialog.show"
    >
      <CategoryEdit
        v-if="categoryDialog.show"
        :show.sync="categoryDialog.show"
        @getTableData="getTableData"
        :id="categoryDialog.id"
        :parentId="categoryDialog.parentId"
        :level="categoryDialog.level"
      ></CategoryEdit>
    </el-dialog>
  </div>
</template>

<script>
import CategoryEdit from './edit'
export default {
  name: 'CategoryList',
  data() {
    const baseUrl = '/pms-category'
    return {
      tableData: [],
      url: {
        list: baseUrl + '/list',
      },
      categoryDialog: {
        title: '',
        show: false,
        id: null,
        parentId: null,
        level: null,
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
    add(parentId, level) {
      this.categoryDialog.parentId = parentId
      this.categoryDialog.level = level
      this.categoryDialog.id = null
      ;(this.categoryDialog.title = '添加分类'),
        (this.categoryDialog.show = true)
    },
  },
  components: {
    CategoryEdit,
  },
}
</script>

<style scoped></style>
