<template>
  <div style="text-align: left;margin: 10px">
    <el-form ref="userForm" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="品牌名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="首字母" prop="firstLetter">
        <el-input v-model="form.firstLetter"></el-input>
      </el-form-item>
      <el-form-item label="品牌图片" prop="file">
        <uploadone v-model="form.file" :fileList="fileList"></uploadone>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" plain @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BrandEdit',
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  created() {
    if (this.id) {
      this.url.save = '/pms-brand/update'
      this.getOne()
    } else {
      this.rules.file.push({
        required: true,
        message: '请上传头像',
        trigger: 'blur',
      })
    }
  },
  data() {
    const baseUrl = '/pms-brand'
    return {
      url: {
        save: baseUrl + '/add',
        getone: baseUrl + '/getone',
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
          this.post(this.url.save, this.form, () => {
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
  },
}
</script>

<style scoped></style>
