<template>
	<div>
		<el-form label-width="100px">
			<el-form-item  v-for="item in skus" :key="item.id" :label="item.name">
				<template v-if="item.addType ===1">
					<el-input v-model="item.addval" style="width: auto;margin-right: 20px;"></el-input> <el-button @click="addItem(item)">添加</el-button>
				</template>
				<el-checkbox-group v-model="item.value">
					<el-checkbox v-for="opt in item.inputList.split('\n')" :key="opt" :label="opt"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item>
				<el-button @click="prev">上一步</el-button>
				<el-button type="primary" size="small" @click="next">下一步</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
  name: 'SkuForm',
	props: {
		skus: {
			type: Array,
			default: () => {return []}
		}
	},
  data() {
    return {
    }
  },
  methods: {
		prev() {
			this.$emit('prev')
		},
		next() {
			for(let i = 0; i < this.skus.length; i++) {
				if(this.skus[i].value.length === 0) {
					this.$message.error(this.skus[i].name + '必须选择值')
					return
				}
			}
			let arrayall = []
			for(let i = 0; i < this.skus[0].value.length; i++) {
				const arr = []
				arr.push({name: this.skus[0].name,value: this.skus[0].value[i]})
				arrayall.push(arr)
			} 
			if(this.skus.length > 1) {
				const array = arrayall
				arrayall = []
				for(let i = 0; i < array.length; i++) {
					for(let j = 0; j < this.skus[1].value.length; j++) {
						const arr = []
						for(let k = 0; k < array[i].length; k++) {
							arr.push(array[i][k])
						}
						arr.push({name: this.skus[1].name, value: this.skus[1].value[j]})
						arrayall.push({skuList: arr, stock: 0, price: 0})
					}
				}
			}
			this.$emit('setStock',arrayall)
			const skus = []
			for(let i = 0; i < this.skus.length; i++) {
				skus.push(JSON.stringify(this.skus[i]))
			}
			this.$emit('setForm',{skus: skus})
			this.$emit('next')
		},
		query() {
			console.log(this.skus)
		},
		addItem(item){
			item.inputList += '\n' + item.addval
			item.addval = ''
		}
  }
}
</script>
<style scoped lang="less">
</style>
