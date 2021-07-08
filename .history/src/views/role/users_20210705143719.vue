<template>
  <div>角色关联用户</div>
</template>

<script>
export default {
    name: 'RoleUsers',
    data() {
        const module = '/ums-role-user'
        return {
            url: {
                getData: module + '/getData'
            },
            form: {
                roleId: ''
            }
        }
    },
    created() {
        this.form.roleId = this.$route.query.roleId
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>

</style>>

</style>