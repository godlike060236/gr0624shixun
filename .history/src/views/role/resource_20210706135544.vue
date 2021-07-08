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
  created() {},
  methods,
}
</script>

<style></style>
