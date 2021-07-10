<template>
  <div>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
      style="height:300px"
    >
      <el-form-item label="商品分类" prop="categoryId">
        <el-cascader
          v-model="form.categoryId"
          :options="params.categorys"
          :props="{ label: 'name', value: 'id' }"
          @change="change"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        v-for="item in form.spus"
        :key="item.name"
        :label="item.name"
      >
        <el-input v-model="item.value"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:200px">
        <el-button @click="prev">上一步</el-button>
        <el-button type="primary" size="small" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  props: {
    params: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  created() {},
  data() {
    return {
      form: {
        categoryId: [],
        spus: [],
      },
      rules: {
        categoryId: [
          { required: true, message: '请选择商品分类', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    prev() {
      this.$emit('prev')
    },
    next() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          for (let i = 0; i < this.form.spus.length; i++) {
            if (!this.form.spus[i].value) {
              this.$message.error('必须输入所有属性值')
              return
            }
          }
          const spus = []
          for (let i = 0; i < this.form.spus.length; i++) {
            spus.push(JSON.stringify(this.form.spus[i]))
          }
          console.log(spus)
          this.$emit('setForm', {
            categoryId: this.form.categoryId,
            spus: spus,
          })
          this.$emit('next')
        }
      })
    },
    query() {},
    change(categoryId) {
      this.form.spus = []
      this.get(
        '/pms-product/getAttr',
        { categoryIds: categoryId },
        (response) => {
          console.log(response)
          for (let i = 0; i < response.spus.length; i++) {
            this.form.spus.push({ name: response.spus[i].name, value: '' })
          }
          for (let i = 0; i < response.skus.length; i++) {
            response.skus[i].value = []
            response.skus[i].addval = ''
          }
          this.$emit('setSkus', response.skus)
        }
      )
    },
  },
}
</script>
<style scoped lang="less">
.el-input {
  width: 40%;
}
</style>
