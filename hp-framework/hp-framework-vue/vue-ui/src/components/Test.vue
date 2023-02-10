<template>
  <div>
    <el-button @click="send">点击</el-button>
    <Child></Child>
  </div>
</template>

<script>
import axios from "axios";
import Child from "@/components/Child";

export default {
  name: "Test",
  components: {Child},

  created() {
    console.log('parent created')
  },

  mounted() {
    console.log('parent mounted')
  },


  methods: {
    async send() {
      // setTimeout(() => {
      //   console.log("first")
      //   setTimeout(() => {
      //     console.log("second")
      //     setTimeout(() => {
      //       console.log("third")
      //     }, 3000)
      //   }, 2000)
      // }, 1000)



      // new Promise(function (resolve, reject) {
      //   console.log(1111);
      //   resolve(2222);
      // }).then(function (value) {
      //   throw "aaaaaaaaaaa"
      // }).then(function (value) {
      //   console.log(value);
      // }).then(function (value) {
      //   console.log(value);
      //   throw "An error";
      // }).catch(function (err) {
      //   console.log(err);
      // });


      // new Promise((resolve, reject) => {
      //   // let a = b + c
      //   // resolve(10)
      //   // reject(20)
      //   console.log("不管是resolve还是reject我都会接着运行")
      //   return 1111;
      // }).then(res => {
      //   console.log('then', res)
      // }).catch(err => {
      //   console.log('catch', err)
      // }).finally(() => {
      //   console.log('finally')
      // })




      // 原生ajax
      // let xhr = new XMLHttpRequest();
      // xhr.open("GET", '/dev-api/test/cookie/get', false) // 同步ajax请求
      // // xhr.open("GET", '/dev-api/test/timeout/100', false) // 同步ajax请求
      // xhr.send();
      // let responseText = xhr.responseText; // 如果是同步ajax请求，会在此处阻塞住，等待服务器响应之后才会往下执行
      // console.log('responseText', responseText)


      // 原生axios
      axios.get("/dev-api/test/cookie/get")

      //// axios发送请求
      // let result = await this.$api.test.dataForm({age: 10, name: '张三'})
      // console.log('我是结果', result)
    }
  },
}
</script>

<style scoped>

</style>