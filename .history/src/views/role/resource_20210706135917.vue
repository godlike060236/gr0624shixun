<template>
  <div>关联资源</div>
</template>

<script>
export default {
  name: 'RoleResources',
  data() {
    const module = '/ums-role-resource'
    return {
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
        console.log(response)
      })
    },
  },
}
</script>

<style></style>
