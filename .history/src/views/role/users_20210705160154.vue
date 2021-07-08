<template>
  <el-transfer
    :titles="['所有用户','已选用户']"
    :data="users">
    :props={''}
  </el-transfer>
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
            },
            users: []
        }
    },
    created() {
        this.form.roleId = this.$route.query.roleId
        this.getData()
    },
    methods: {
        getData() {
            this.get(this.url.getData,{roleId: this.form.roleId}, response =>{
                this.users = response
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>>

</style>