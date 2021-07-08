<template>
  <div class="container">
    <el-tree
      class="el-tree"
      ref="tree"
      node-key="id"
      :data="resources"
      :props="{ label: 'name', children: 'children' }"
      show-checkbox
      highlight-current
      default-expand-all
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
        save: module + '/save',
      },
    }
  },
  mounted() {
    this.changeCss()
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
    handleExpand() {
      //节点被展开时触发的事件
      //因为该函数执行在renderContent函数之前，所以得加this.$nextTick()
      this.$nextTick(() => {
        this.changeCss()
      })
    },
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
  },
}
</script>

<style lang="less" scoped></style>
