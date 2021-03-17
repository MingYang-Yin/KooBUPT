<template>
  <div>
    <el-menu :default-active=1 class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index=1 @click="goTo('/menu/addClass')">手动添加</el-menu-item>
      <el-menu-item index=2 @click="goTo('/menu/addClass/importTeacher')">导入文件</el-menu-item>
    </el-menu>

    <div><!--放置页面主体内容-->
      <router-view id="homepage_view"></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'addClass',
    methods:{
      goTo (path) {
        this.$router.push(path);
      }
    }
  }
</script>

<style scoped>

</style>
