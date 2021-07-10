<template>
	<div>
		<el-form ref="form" :rules="rules" :model="form" label-width="100px">
			<el-form-item label="商品图片" prop="file">
				<uploadone v-model="form.file"></uploadone>
			</el-form-item>
			<el-form-item label="商品相册" prop="files">
				<uploadmore v-model="form.files"></uploadmore>
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
  name: 'ImgForm',
  data() {
    return {
			form: {
				file: null,
				files: []
			},
			rules: {
				file: [
					{required: true, message: '请上传图片', trigger: 'blur'}
				],
				files: [
					{required: true, message: '请上传相册', trigger: 'blur'}
				]
			}
    }
  },
  methods: {
		next() {
			this.$refs['form'].validate(valid => {
				if(valid) {
					this.$emit('setForm',this.form)
					this.$emit('next')
				}
			})
		},
		prev() {
			this.$emit('prev')
		}
  }
}
</script>
<style scoped lang="less">
</style>
