<template>
  <div>
    <h1 style="margin-left:500px">详情页</h1>
    <el-button style="margin-left:500px" @click="handlerClick" >router去首页</el-button>
    <el-button @click="handlerClick2" >location.href去首页</el-button>
  </div>
</template>

<script>
export default {
  name: "Detail",

  methods: {
    handlerClick() {
      this.$router.push('/index')
    },

    handlerClick2() {
      location.href='/index'
    }
  }
}
</script>

<style scoped>

</style>