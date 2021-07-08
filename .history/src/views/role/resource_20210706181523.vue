<template>
  <div class="container">
    <el-tree
      ref="tree"
      node-key="id"
      :data="resources"
      :props="{ label: 'name', children: 'children' }"
      show-checkbox
      highlight-current
      default-expand-all
      :default-checked-keys="values"
    ></el-tree>
    <el-button
      type="primary"
      plain
      size="small"
      style="margin-top: 10px"
      @click="save"
      >保存</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'RoleResources',
  data() {
    const module = '/ums-role-resource'
    return {
      roleId: null,
      resources: [],
      values: [],
      last: [],
      url: {
        getData: module + '/getData',
        save: module + '/save',
      },
    }
  },
  created() {
    this.roleId = this.$route.query.roleId
    this.getData()
  },
  methods: {
    getData() {
      this.get(this.url.getData, { roleId: this.roleId }, (response) => {
        this.resources = response.resources
        console.log(response)
      })
    },
    save() {
      const resourcesIds = this.$refs['tree']
        .getHalfCheckedKeys()
        .concat(this.$refs['tree'].getCheckedKeys())
      this.post(
        this.url.save,
        {
          roleId: this.roleId,
          resourcesIds: resourcesIds,
        },
        () => {}
      )
    },
  },
}
</script>

<style lang="less" scoped></style>
