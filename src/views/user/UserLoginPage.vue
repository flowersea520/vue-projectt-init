<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          登录
        </a-button>
        <a-link href="/user/register" class="register-link">新用户注册</a-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { userLoginUsingPost } from "@/servers/api/userController";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import * as path from "path";
import { useLoginUserStore } from "@/store/userStore";

const loginUserStore = useLoginUserStore();
const router = useRouter();
const form = reactive({
  userAccount: "",
  userPassword: "",
});
const handleSubmit = async () => {
  const res = await userLoginUsingPost(form);
  console.log(res);
  if (res.data?.code === 0) {
    // fetchLoginUser就是：登录成功之后，我们更新我们的loginUser状态管理对象，（就是重新请求一次getLoginUser对象，获取最新登录的用户对象，
    // 然后更新我们原来的loginUser
    // loginUserStore.fetchLoginUser();
    // 用set也可以
    loginUserStore.setLoginUser(res.data.data);
    message.success("登录成功");
    // 跳转到主页
    router.push({
      path: "/",
      // 不会有登录页的历史记录
      replace: true,
    });
  } else {
    message.error("登录失败");
  }
};
</script>

<style scoped>
/* 新用户注册链接样式 */
.register-link {
  margin-left: auto; /* 推到容器右侧 */
  padding-left: 207px; /* 在链接和按钮之间增加一些空间 */
  text-decoration: none; /* 去除下划线 */
}
</style>
