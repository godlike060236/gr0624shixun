<template>
  <div style="text-align: left;margin: 10px">
    <el-form ref="userForm" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="品牌名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="首字母" prop="firstLetter">
        <el-input v-model="form.firstLetter"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="file">
        <el-upload action="http" list-type="picture-card" :auto-upload="false" :limit="1"
                   :on-change="uploadFile" :on-remove="removeFile" :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" plain @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "edit",
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  created() {
    if (this.id) {
      this.url.save = '/ums-user/update'
      this.getOne()
    } else {
      this.rules.file.push({required: true, message: '请上传头像', trigger: 'blur'})
    }
  },
  data() {
    const baseUrl = '/ums-user'
    return {
      url: {
        save: baseUrl + '/add',
        getone: baseUrl + '/getone'
      },
      form: {
        loginName: '',
        rawPassword: '',
        phone: '',
        email: '',
        file: null
      },
      fileList: [],
      rules: {
        loginName: [
          {required: true, message: '请输入登录名', trigger: 'blur'},
          {min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur'}
        ],
        rawPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 100, message: '不能超过20个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 1, max: 11, message: '不能超过20个字符', trigger: 'blur'},
          {pattern: /^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/, message: '手机号格式错误', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 1, max: 50, message: '不能超过20个字符', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        file: []
      }
    }
  },
  methods: {
    save() {
      this.$refs['userForm'].validate((flag) => {
        console.log(flag)
        if (flag) {
          this.post(this.url.save, this.form, () => {
            this.$emit('update:show', false)
            this.$emit('getTab_leData')
          })
        }
      })
    },
    getOne() {
      this.get(this.url.getone, {id: this.id}, response => {
        for (let key in this.form) {
          this.form[key] = response[key]
        }
        this.form.id = response.id
        this.fileList.push({
          name: response.icon,
          url: this.img(response.icon)
        })
      })
    },
    uploadFile(file) {
      this.form.file = file.raw
    },
    removeFile() {
      this.form.file = null;
    }
  }
}
</script>

<style scoped>

</style>