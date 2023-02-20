export default {
  install(Vue, x, y,z){
    console.log(x, y,z)
    // 设置全局过滤器

    // 设置全局指令

    // 设置全局混入
    Vue.mixin({
      data() {
        return {
          x:100,
          y:200
        }
      }
    })

    // 给Vue原型上添加一个方法（vm和vc就都能用了）
    Vue.prototype.hello = () => {
      alert('你好啊')
    }
  }
}