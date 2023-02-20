<template>
  <div>
    <h2 @click="showMethod">学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
// import {hunhe, hunhe2} from "@/mixin";

export default {
  name: "School",
  data() {
    return {
      name:'麻省理工',
      address:'北京',
      x:666
    }
  },
  // mixins: [hunhe, hunhe2] // 局部混入
}
</script>

<style scoped>

</style>