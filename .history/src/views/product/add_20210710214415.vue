<template>
  <div>
    <el-steps :active="flag" align-center>
      <el-step
        v-for="item in tabs"
        :title="item.title"
        :key="item.title"
      ></el-step>
    </el-steps>
    <div style="margin-top: 30px;">
      <component
        v-for="(item, index) in tabs"
        v-show="index === flag"
        :is="item.component"
        :params="params"
        :skus="skus"
        :stocks="stocks"
        @prev="prev"
        @setStock="setStock"
        @next="next"
        @setSkus="setSkus"
        @setForm="setForm"
        @save="save"
        :key="item.title"
        style="margin-right:40px"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpuEdit',
  created() {
    this.getData()
  },
  data() {
    const module = '/pms-product'
    return {
      url: {
        add: module + '/add',
        getone: module + '/getone',
        getData: module + '/getData',
      },
      flag: 0,
      tabs: [
        { title: '基本资料', component: () => import('./components/base') },
        { title: '商品图片', component: () => import('./components/img') },
        { title: '商品属性', component: () => import('./components/spu') },
        { title: '关联SKU', component: () => import('./components/sku') },
        { title: 'SKU库存', component: () => import('./components/stock') },
        { title: '商品详情', component: () => import('./components/detail') },
      ],
      params: {},
      skus: [],
      stocks: [],
      form: {},
    }
  },
  methods: {
    getData() {
      this.get(this.url.getData, {}, (response) => {
        // 递归查找category中的children属性下是否还有值,如果没有,就将此category的children属性删除
        // 这么做的原因是级联选择框中判断此选项是否有子选项的方法与代码中的判断方法存在差异
        // 级联选择框的判断条件是判断有误children属性,而代码中的判断条件是判断children属性中是否存值
        this.delchildren(response.categorys)
        this.params = response
      })
    },
    delchildren(items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].children.length == 0) {
          delete items[i].children
        } else {
          this.delchildren(items[i].children)
        }
      }
    },
    save() {
      console.log(this.form)
      this.post(this.url.add, this.form, (response) => {
        console.log(response)
        this.$emit('update:show', false)
      })
    },
    next() {
      this.flag++
    },
    prev() {
      this.flag--
    },
    // query() {
    //   console.log(this.wydata)
    // },
    setSkus(value) {
      this.skus = value
    },
    setStock(value) {
      this.stocks = value
    },
    setForm(item) {
      for (let key in item) {
        this.form[key] = item[key]
      }
    },
  },
}
</script>

<style></style>
