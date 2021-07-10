<template>
  <div>
    <el-upload
      :file-list="files"
      action="http://www.abc.com"
      list-type="picture-card"
      :auto-upload="false"
      :limit="1"
      :on-change="changefile"
      :on-remove="removefile"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'UploadOne',
  props: {
    value: {
      // object类型的默认值不可以直接写null
      // 必须写一个函数return出去
      type: File,
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
    changefile(file) {
      this.$emit('input', file.raw)
    },
    removefile() {
      this.$emit('input', null)
    },
  },
}
</script>
<style scoped lang="less"></style>
