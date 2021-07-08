<template>
  <div>
    <el-transfer
      v-model="userIds"
      :titles="['所有用户', '已选用户']"
      :data="users"
      :props="{
        key: 'id',
        label: 'loginName',
      }"
    >
    </el-transfer>
    <el-button type="primary"
  </div>
</template>

<script>
export default {
  name: "RoleUsers",
  data() {
    const module = "/ums-role-user";
    return {
      url: {
        getData: module + "/getData",
      },
      form: {
        roleId: "",
        userIds: [],
      },
      users: [],
    };
  },
  created() {
    this.form.roleId = this.$route.query.roleId;
    this.getData();
  },
  methods: {
    getData() {
      this.get(this.url.getData, { roleId: this.form.roleId }, (response) => {
        this.users = response;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
