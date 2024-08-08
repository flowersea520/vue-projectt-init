<template>
  {{ JSON.stringify(loginUserStore.loginUser) }}
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuItemClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="titleBar">
            <img class="logo" src="../assets/oj-logo.svg" />
            <div class="title">judgehub</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="loginUserStore.loginUser.id">
        {{ loginUserStore.loginUser.userName ?? "无名" }}
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { routes } from "../router/routes";
import { computed, ref } from "vue";
// 调用状态管理对象，获取用户的信息，显示在页面当中
import { useLoginUserStore } from "../store/userStore";
import checkAccess from "@/access/checkAccess";

const loginUserStore = useLoginUserStore();
// 要高亮的菜单项
const selectedKeys = ref(["/"]);
const router = useRouter();
// 这个routes路由数组对象 将其筛选一下, 将隐藏的路由过滤出去
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 路由跳转后，自动更新选中的菜单项
// 同步高亮原理：首先点击菜单项 => 触发点击事件，跳转更新路由 => 更新路由后，同步去更新菜单栏的高亮状态。
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuItemClick = (key: string) => {
  router.push({
    // key 表示被点击的菜单项目的路径，然后通过 router.push 进行跳转。因此，key 实际上并不是直接与路由绑定的，而是通过 doMenuItemClick 函数将 key 转换为实际的路径。
    path: key,
  });
};
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
  height: 100%;
}

.title {
  margin-left: 16px;
  color: #444;
}

.logo {
  height: 48px;
}
</style>
