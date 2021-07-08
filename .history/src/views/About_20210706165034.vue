<template>
  <div class="container">
    <div class="routeList-box" v-for="(item, index) in routeList" :key="index">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="item.title" :name="1">
          <el-tree
            class="el-tree"
            :data="item.list"
            :render-content="renderContent"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            @node-expand="handleExpand"
            :props="defaultProps"
            default-expand-all
          ></el-tree>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: '1',
      routeList: [
        {
          title: '授权管理后台',
          list: [
            {
              id: 1,
              label: '京店宝',
              children: [
                {
                  id: 2,
                  label: '用户分析',
                  children: [
                    {
                      id: 4,
                      label: '查询次数',
                      children: [
                        {
                          id: 7,
                          label: '页面查看权限',
                        },
                        {
                          id: 8,
                          label: '编辑',
                        },
                      ],
                    },
                    {
                      id: 5,
                      label: '次数分布',
                      children: [
                        {
                          id: 9,
                          label: '次数分布child1',
                        },
                        {
                          id: 10,
                          label: '次数分布child2',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 3,
                  label: '系统性能',
                  children: [
                    {
                      id: 6,
                      label: '所用时间',
                      children: [
                        {
                          id: 7,
                          label: '页面查看权限',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 111,
              label: '有品库',
              children: [
                {
                  id: 112,
                  label: '用户数',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  mounted() {
    this.changeCss()
  },
  methods: {
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
}
</script>
<style lang="less" scoped>
.container {
  padding: 40px;
}
.routeList-box {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  margin-bottom: 20px;
  .el-tree {
    margin: 12px 0;
  }
  /deep/.el-collapse-item__header {
    height: 40px;
    background-color: #f4f4f4;
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
