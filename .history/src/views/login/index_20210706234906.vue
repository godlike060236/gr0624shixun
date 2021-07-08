<template>
  <div class="login_main">
    <div class="content">
      <component :is="loginform"></component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {},
  computed: {
    loginform() {
      return () => import('./loginForm')
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.login_main {
  height: 100vh;
  background: linear-gradient(12deg, #02cbee, #5502ee, #9702ee);
  display: flex;
  .content {
    width: 500px;
    height: 300px;
    background: #ffffff;
    margin: auto;
    border-radius: 35px;
    position: relative;
  }
}
</style>
