<template>
  <div>
    <el-transfer
      v-model="form.userIds"
      :titles="['所有用户', '已选用户']"
      :data="users"
      :props="{
        key: 'id',
        label: 'loginName',
      }"
    >
    </el-transfer>
    <el-button
      type="primary"
      style="margin-top: 10px"
      plain
      size="small"
      @click="save"
      >保存</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'RoleUsers',
  data() {
    const module = '/ums-role-user'
    return {
      url: {
        getData: module + '/getData',
        save: module + '/save',
      },
      form: {
        roleId: '',
        userIds: [],
      },
      users: [],
    }
  },
  created() {
    this.form.roleId = this.$route.query.roleId
    this.getData()
  },
  methods: {
    getData() {
      this.get(this.url.getData, { roleId: this.form.roleId }, (response) => {
        this.users = response
        for (let i = 0; i < response.values.length; i++) {
          this.form.userIds.
        }
      })
    },
    save() {
      this.post(this.url.save, this.form, () => {
        this.$router.push('/role')
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
