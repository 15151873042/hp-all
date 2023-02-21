
export default {
  install(Vue, options) {
    console.log(typeof options)
    console.log("我使用了字典插件")

    Vue.mixin({
      data() {

      }
    })
  }
}