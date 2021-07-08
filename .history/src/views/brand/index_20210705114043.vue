<template>
  <div class="index">
    <div class="gr-filter">
      <el-input class="special" v-model="query.name" placeholder="请输入品牌名"></el-input>
      <el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button>
      <el-button size='medium' type="primary" plain icon="el-icon-plus" style="float: right" @click="add">添加品牌
      </el-button>
      <div class="clear"></div>
    </div>
    <el-table :data="tableData.records" border style="width: 100%">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="角色名" prop="name"></el-table-column>
      <el-table-column label="是否有效" prop="active">
        <template slot-scope="scope">
          <span v-if="scope.row.active === 1">有效</span>
          <span v-else>无效</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="操作">
        <template slot-scope="scope" style="text-align: center">
          <template v-if="scope.row.active === 1">
            <el-button type="primary" plain @click="chg(scope.row.id)" size="small">修改</el-button>
            <el-button type="danger" plain @click="del(scope.row.id,0)" size="small">删除</el-button>
          </template>
          <template v-else>
            <el-button type="primary" plain @click="del(scope.row.id,1)" size="small">恢复用户状态</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="position">
      <el-dialog width="550px" :title="userDialog.title" :visible.sync="userDialog.show">
        <UserEdit v-if="userDialog.show" :show.sync="userDialog.show" @getTableData="getTableData"
                  :id="userDialog.id"></UserEdit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import UserEdit from './edit'

export default {
  name: "userList",
  data() {
    const baseUrl = '/pms-brand'
    return {
      tableData: [],
      query: {
        pageNo: 1,
        pageSize: 10,
        name: ''
      },
      url: {
        list: baseUrl + '/list',
        delete: baseUrl + '/del'
      },
      userDialog: {
        title: '',
        show: false,
        id: null
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.get(this.url.list, this.query, response => {
        this.tableData = response
      })
    },
    search() {
      this.query.pageNo = 1
      this.getTableData()
    },
    add() {
      this.userDialog.id = null
      this.userDialog.title = '添加用户'
      this.userDialog.show = true
    },
    chg(id) {
      this.userDialog.id = id
      this.userDialog.show = true
      this.userDialog.title = '修改用户'
    },
    del(id, active) {
      const text = active === 0 ? '确定真的要删除该数据吗?' : '确定真的要恢复该数据吗?'
      this.$confirm(text, '提示', {type: 'warning'}).then(() => {
        this.post(this.url.delete, {id: id, active: active}, () => {
          this.getTableData()
        })
      })
    }
  },
  components: {
    UserEdit
  }
}
</script>

<style scoped>
.position {
  margin-top: 10px;
  text-align: center;
}
</style>