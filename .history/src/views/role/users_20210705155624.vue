<template>
  <el-transfer
    :titles="['']">

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
            }
        }
    },
    created() {
        this.form.roleId = this.$route.query.roleId
        this.getData()
    },
    methods: {
        getData() {
            this.get(this.url.getData,{roleId: this.form.roleId}, response =>{
                console.log(response)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>>

</style>