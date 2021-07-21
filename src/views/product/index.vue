<template>
  <div>
    <div class="gr-filter">
      <el-button type="primary" plain icon="el-icon-plus" style="float: right;" @click="add"></el-button>
      <div class="clear"></div>
    </div>
    <el-table
        :data="tableData.records"
        border>

      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="属性名" prop="name"></el-table-column>
      <el-table-column label="单价" prop="price"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.newStatus === 1">新品</span>
          <span v-else>非新品</span>
          <span v-if="scope.row.hotStatus === 1">热卖</span>
          <span v-else>非热卖</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <el-image
              style="width: 80px; height: 80px"
              :src="img(scope.row.img)"
              fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="是否上架">
        <template slot-scope="scope">
          <span v-if="scope.row.publishStatus === 1">上架</span>
          <span v-else>下架</span>
        </template>
      </el-table-column>
      <el-table-column width="150px">
        <template slot-scope="scope">
          <template v-if="scope.row.publishStatus === 0">
            <el-button type="danger" plain @click="publish(scope.row.id,1)" size="mini">上架</el-button>
          </template>
          <template v-else>
            <el-button type="danger" plain @click="publish(scope.row.id,0)" size="small">下架</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        :current-page.sync="query.pageNo"
        layout="prev, pager, next"
        :page-count="tableData.pages"
        @current-change="getTableData">
    </el-pagination>
    <el-dialog
        width="750px"
        :title="userDialog.title"
        :visible.sync="userDialog.show"
        :close-on-click-modal="false">
      <component
          v-if="userDialog.show"
          :is="userDialog.component"
          :show.sync="userDialog.show"
          :id="userDialog.id"
          :categoryId="query.categoryId"
          @getTableData="getTableData"></component>
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
      url:{
        list: module + '/backList',
        publish: module +'/publish'
      },
      query: {
        pageNo: 1,
        pageSize: 8
      },
      userDialog: {
        show: false,
        title: '',
        component: () => import('./add'),
        id: null
      }
    }
  },
  created() {
    this.query.categoryId = parseInt(this.$route.query.categoryId)
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.get(this.url.list,this.query, response => {
        this.tableData = response
      })
    },
    add() {
      this.userDialog.id = null
      this.userDialog.show = true
      this.userDialog.title = '添加商品'
    },
    publish(id,publishStatus) {
      const txt = publishStatus === 1 ? '确定上架?' : '确定下架?'
      this.$confirm(txt,'提示',{type: 'warning'}).then(()=>{
        this.post(this.url.publish,{id: id, publishStatus: publishStatus}, () => {
          this.getTableData()
        })
      })
    },
    search(){
      this.query.pageNo = 1
      this.getTableData()
    },
  }
}
</script>

<style lang="less" scoped>
.position {
  margin-top: 10px;
  text-align: center;
}
</style>
