<template>
	<div>
		<div class="dyc_filter">
			<el-input v-model="query.productId" placeholder="请输入要查询的订单"></el-input>
			<el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button>
		</div>
		<div class="clear"></div>
		<el-table :data="tableData.records" border>
			<el-table-column label="订单编号" prop="id"></el-table-column>
			<el-table-column label="用户id" prop="userId"></el-table-column>
			<el-table-column label="收货地址ID" prop="addressId"></el-table-column>
			<el-table-column label="需要支付的商品ID" prop="productIds"></el-table-column>
			<el-table-column label="是否已经发货">
				<template slot-scope="scope">
					<span v-if="scope.row.isDeliver === 1">已发货</span>
					<span v-else>未发货</span>
				</template>
			</el-table-column>
			<el-table-column label="是否已经完成订单">
				<template slot-scope="scope">
					<span v-if="scope.row.isFinish === 1">已完成</span>
					<span v-else>未完成</span>
				</template>
			</el-table-column>
			<el-table-column label="是否有效">
				<template slot-scope="scope">
					<span v-if="scope.row.active === 1">有效</span>
					<span v-else>无效</span>
				</template>
			</el-table-column>
			<el-table-column width="150px">
				<template slot-scope="scope">
					<template v-if="scope.row.active === 1">
						<el-button type="primary" plain @click="deliver(scope.row.id,1,1,0)" size="small">发货</el-button>
						<el-button type="danger" plain @click="active(scope.row.id,0,0,1)" size="small">失效</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background :current-page.sync="query.pageNo" layout="prev, pager, next" :page-count="tableData.pages"
		 @current-change="getTableData">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'OrderList',
		data() {
			const module = '/ums-order'
			return {
				tableData: [],
				url: {
					list: module + '/list',
					deliver: module + '/deliver',
					active: module + '/active',
				},
				query: {
					pageNo: 1,
					pageSize: 9,
					productId: ''
				},
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

			deliver(id, isDeliver, isFinish, active) {
				const txt = isDeliver === 1 ? '确定发货?' : '确定取消发货?'
				this.$confirm(txt, '提示', {
					type: 'warning'
				}).then(() => {
					this.post(this.url.deliver, {
						id: id,
						isDeliver: isDeliver,
						isFinish: isFinish,
						active: active
					}, () => {
						this.getTableData()
					})
				})

			},
			active(id, active, isDeliver, isFinish) {
				const txt = active === 0 ? '确定要使订单失效?' : '确定将订单恢复到有效吗?'
				this.$confirm(txt, '提示', {
					type: 'warning'
				}).then(() => {
					this.post(this.url.active, {
						id: id,
						active: active,
						isDeliver: isDeliver,
						isFinish: isFinish
					}, () => {
						this.getTableData()
					})
				})
			},
			search() {
				this.query.pageNo = 1
				this.getTableData()
			}

		}
	}
</script>

<style lang="less">
	* {
		margin: 0;
		padding: 0;
	}

	html {
		font-family: "宋体";
		font-size: 16px;
	}

	.dyc_filter {
		margin-bottom: 10px;
		.el-input {
			width: auto;
			margin-right: 15px;
		}

	}
	.clear {
		clear: both;
	}
</style>