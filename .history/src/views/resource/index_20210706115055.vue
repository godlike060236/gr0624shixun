<template>
  <div class="index">
    <div class="gr-filter">
      <el-input
        class="special"
        v-model="query.name"
        placeholder="请输入用户名"
      ></el-input>
      <el-button type="primary" plain icon="el-icon-search" @click="search"
        >查询</el-button
      >
      <el-button
        size="medium"
        type="primary"
        plain
        icon="el-icon-plus"
        style="float: right"
        @click="add"
        >添加用户
      </el-button>
      <div class="clear"></div>
    </div>
    <el-table :data="tableData.records" border style="width: 100%">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="登录名" prop="loginName"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 75px; height: 75px"
            :src="img(scope.row.icon)"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="是否有效" prop="active">
        <template slot-scope="scope">
          <span v-if="scope.row.active === 1">有效</span>
          <span v-else>无效</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="操作">
        <template slot-scope="scope" style="text-align: center">
          <template v-if="scope.row.active === 1">
            <el-button
              type="primary"
              plain
              @click="chg(scope.row.id)"
              size="small"
              >修改</el-button
            >
            <el-button
              type="danger"
              plain
              @click="del(scope.row.id, 0)"
              size="small"
              >删除</el-button
            >
          </template>
          <template v-else>
            <el-button
              type="primary"
              plain
              @click="del(scope.row.id, 1)"
              size="small"
              >恢复用户状态</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UserEdit from './edit'
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
