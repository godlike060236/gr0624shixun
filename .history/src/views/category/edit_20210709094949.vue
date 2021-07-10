<template>
  <div style="text-align: left;margin: 10px">
    <el-form ref="userForm" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="分类名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" plain @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryEdit',
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  created() {
    if (this.id) {
      this.getOne()
    }
  },
  data() {
    const baseUrl = '/pms-category'
    return {
      url: {
        save: baseUrl + '/add',
        getone: baseUrl + '/getone',
        update: baseUrl + '/update',
      },
      form: {
        name: '',
        firstLetter: '',
        file: null,
      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入品牌名', trigger: 'blur' },
          { min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' },
        ],
        firstLetter: [
          { required: true, message: '请输入首字母', trigger: 'blur' },
          { min: 1, max: 1, message: '只能一个字符', trigger: 'blur' },
        ],
        file: [],
      },
    }
  },
  methods: {
    save() {
      this.$refs['userForm'].validate((flag) => {
        if (flag) {
          this.post(this.id ? this.url.save, this.form, () => {
            this.$emit('update:show', false)
            this.$emit('getTableData')
          })
        }
      })
    },
    getOne() {
      this.get(this.url.getone, { id: this.id }, (response) => {
        for (let key in this.form) {
          this.form[key] = response[key]
        }
        this.form.id = response.id
        this.fileList.push({
          name: response.logo,
          url: this.img(response.logo),
        })
      })
    },
    uploadFile(file) {
      this.form.file = file.raw
    },
    removeFile() {
      this.form.file = null
    },
  },
}
</script>

<style scoped></style>
