<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      style="margin-right:40px"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="标准价格" prop="price">
        <el-input v-model="form.price" placeholder="请输入标准价格"></el-input>
      </el-form-item>
      <el-form-item label="关联品牌" prop="brandId">
        <el-select v-model="form.brandId" placeholder="请选择品牌" filterable>
          <el-option
            v-for="item in params.brands"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="form.keywords" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    params: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      form: {
        name: '',
        price: '',
        brandId: null,
        keywords: '',
      },
      brands: [],
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [
          { required: true, message: '请输入标准价格', trigger: 'blur' },
          {
            pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: '请输入正确的价格',
            trigger: 'blur',
          },
        ],
        brandId: [{ required: true, message: '请选择品牌', trigger: 'blur' }],
      },
    }
  },
  methods: {
    next() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('setForm', this.form)
          this.$emit('next')
        }
      })
    },
  },
}
</script>
<style scoped lang="less"></style>
