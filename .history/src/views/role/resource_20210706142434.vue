<template>
  <div>
    <el-tree
      ref="tree"
      node-key="id"
      :data="resources"
      :props="{ label: 'name', children: 'children' }"
      default-expand-all
      show-checkbox
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
      url: {
        getData: module + '/getData',
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
      })
    },
  },
}
</script>

<style></style>
