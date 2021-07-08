<template>
  <div class="over">
    <el-tree
      class="tree"
      ref="tree"
      node-key="id"
      :data="resources"
      :props="{ label: 'name', children: 'children' }"
      default-expand-all
      show-checkbox
      iodent="0"
      highlight-current
      :render-content="renderContent"
      @node-expand="handleExpand"
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
    save() {
      console.log(this.$$refs['tree'].getCkeckedKeys())
    },
    //节点被展开时触发的事件
    handleExpand() {
      //因为该函数执行在renderContent函数之前，所以得加定时
      setTimeout(() => {
        this.changeCss()
      }, 10)
    },
    // 内容区渲染后执行 判断底层 赋 class
    renderContent(h, { node, data, store }) {
      //树节点的内容区的渲染 Function
      let classname = ''
      // 由于项目中有三级菜单也有四级级菜单，就要在此做出判断
      if (node.level === 3) {
        classname = 'foo'
      }
      if (node.level === 2 && node.childNodes.length === 0) {
        classname = 'foo'
      }
      return h(
        'p',
        {
          class: classname,
        },
        node.label
      )
    },
    changeCss() {
      var levelName = document.getElementsByClassName('foo') // levelname是上面的最底层节点的名字
      // console.log(levelName);
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
.tree /deep/ .el-tree-node {
  position: relative;
  padding-left: 16px;
}

.tree /deep/ .el-tree-node__children {
  padding-left: 16px;
}

.tree /deep/ .el-tree-node :last-child:before {
  height: 38px;
}

.tree /deep/ .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container /deep/ .el-tree > .el-tree-node:after {
  border-top: none;
}

.tree /deep/ .el-tree-node:before {
  content: '';
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree /deep/ .el-tree-node:after {
  content: '';
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree /deep/ .el-tree-node:before {
  border-left: 1px dashed #4386c6; //指示线的样式和颜色粗细
  bottom: 0px;
  height: 100%;
  top: -26px;
  width: 1px;
}

.tree /deep/ .el-tree-node:after {
  border-top: 1px dashed #4386c6; //指示线的样式和颜色粗细
  height: 20px;
  top: 12px;
  width: 24px;
}
</style>
