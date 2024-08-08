<template>
  <div id="app">
    <!--    可以使用 <template> 标签来定义组件的结构和内容。这里的代码用于根据不同的路由路径动态渲染不同的布局组件。-->
    <template v-if="route.path.startsWith('/user')">
      <!--      <UserLayout />-->
      <router-view></router-view>
    </template>

    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
/**
 * 全局初始化函数，有全局单次调用的代码都可以写在这里
 */
const doInit = () => {
  console.log("doInit");
};
onMounted(() => {
  doInit();
});
</script>

<style>
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;
}

nav a {
  color: #2c3e50;
  font-weight: bold;
}
</style>
