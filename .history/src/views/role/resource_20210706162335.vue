<template>
  <div class="main">
    <el-tree
      class="el-tree"
      ref="tree"
      node-key="id"
      :data="resources"
      :props="{ label: 'name', children: 'children' }"
      show-checkbox
      highlight-current
      :render-content="renderContent"
      default-expand-all
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
        save: module + '/save',
      },
    }
  },
  created() {
    this.roleId = this.$route.query.roleId
    this.getData()
    this.changeCss()
  },
  mounted() {
    renderContent(h, { node, data, store }) {
      //树节点的内容区的渲染 Function
      let classname = ''
      // 由于项目中有三级菜单也有四级级菜单，就要在此做出判断
      if (node.level === 4) {
        classname = 'foo'
      }
      if (node.level === 3 && node.childNodes.length === 0) {
        classname = 'foo'
      }
      return h(
        'p',
        {
          class: classname,
        },
        node.label
      )
    }
  },
  methods: {
    getData() {
      this.get(this.url.getData, { roleId: this.roleId }, (response) => {
        this.resources = response.resources
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
        (response) => {}
      )
    },
    changeCss() {
      var levelName = document.getElementsByClassName('foo') // levelname是上面的最底层节点的名字
      for (var i = 0; i < levelName.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        levelName[i].parentNode.style.cssFloat = 'left' // 最底层的节点，包括多选框和名字都让他左浮动
        levelName[i].parentNode.style.styleFloat = 'left'
        levelName[i].parentNode.onmouseover = function() {
          this.style.backgroundColor = '#fff'
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin-bottom: 20px;
  .el-tree {
    margin: 12px 0;
  }
  /deep/.el-collapse-item__header {
    height: 40px;
    padding: 0 10px;
  }
  /deep/.el-icon-arrow-right:before {
    color: #409eff;
  }
}
/deep/ .el-tree-node__content::before {
  content: '';
  padding-left: 10px;
}
/deep/.el-checkbox__input {
  margin-right: 6px;
}
</style>
