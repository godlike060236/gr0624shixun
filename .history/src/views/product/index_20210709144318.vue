<template>
  <div>
    <div class="gr-filter">
      <el-button
        size="medium"
        type="primary"
        plain
        icon="el-icon-plus"
        style="float: right"
        @click="add"
        >添加商品</el-button
      >
      <div class="clear"></div>
    </div>
    <el-table :data="tableData.records" border>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="属性名" prop="name"></el-table-column>
      <el-table-column width="150px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            @click="update(scope.row.id)"
            size="mini"
            >修改</el-button
          >
          <el-button
            type="danger"
            plain
            @click="del(scope.row.id, 0)"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      width="750px"
      :title="userDialog.title"
      :visible.sync="userDialog.show"
      :close-on-click-modal="false"
    >
      <component
        v-if="userDialog.show"
        :is="userDialog.component"
        :show.sync="userDialog.show"
        :id="userDialog.id"
        :categoryId="query.categoryId"
        @getTableData="getTableData"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    const module = '/pms-product'
    return {
      tableData: [],
      url: {
        list: module + '/list',
        del: module + '/del',
      },
      query: {
        pageNo: 1,
        pageSize: 8,
      },
      userDialog: {
        show: false,
        title: '',
        component: () => import('./add'),
        id: null,
      },
    }
  },
  created() {
    this.query.categoryId = parseInt(this.$route.query.categoryId)
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.get(this.url.list, this.query, (response) => {
        this.tableData = response
      })
    },
    add() {
      this.userDialog.id = null
      this.userDialog.show = true
      this.userDialog.title = '添加商品'
    },
    update(id) {
      this.userDialog.id = id
      this.userDialog.show = true
      this.userDialog.title = '修改spu'
    },
    del(id, active) {
      const txt =
        active === 0
          ? '确定真的要删除该数据吗?'
          : '确定真的要将数据恢复到有效吗?'
      this.$confirm(txt, '提示', { type: 'warning' }).then(() => {
        this.post(this.url.del, { id: id, active: active }, () => {
          this.getTableData()
        })
      })
    },
    search() {
      this.query.pageNo = 1
      this.getTableData()
    },
    users(roleId) {
      this.$router.push({
        path: '/roleusers',
        query: {
          roleId: roleId,
        },
      })
    },
    resources(roleId) {
      this.$router.push({
        path: '/roleresource',
        query: {
          roleId: roleId,
        },
      })
    },
  },
}
</script>

<style></style>
