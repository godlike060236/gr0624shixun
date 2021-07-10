<template>
  <div>
    <el-upload
      :file-list="files"
      action="http://www.abc.com"
      list-type="picture-card"
      :multiple="true"
      :auto-upload="false"
      :limit="limit"
      :on-change="changefile"
      :on-remove="changefile"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'UploadMore',
  props: {
    value: {
      type: Array,
      default: () => {
        return null
      },
    },
    fileList: {
      type: Array,
      default: () => {
        return []
      },
    },
    limit: {
      type: Number,
      default: 5,
    },
  },
  created() {
    this.files = this.fileList
  },
  data() {
    return {
      files: [],
    }
  },
  methods: {
    // uploadfile和removefile
    changefile(file, fileList) {
      // 待上传的文件数据并不是filelist中的file
      // 而是filelist中的file中的raw属性值
      const array = []
      for (let i = 0; i < fileList.length; i++) {
        array.push(fileList[i].raw)
      }
      this.$emit('input', array)
    },
  },
}
</script>
<style scoped lang="less"></style>
