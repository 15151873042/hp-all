// 混合对象里面书写组件export default中的所有内容
// data冲突时候，取组件的data，然后合并
// 钩子函数先执行混合对象再执行组件对象
export const hunhe = {
  methods: {
    showMethod() {
      alert(this.name)
    }
  },

  mounted() {
    console.log('你好啊！')
  }
}

export const hunhe2 = {
  data() {
    return {
      x:100,
      y:200
    }
  }
}