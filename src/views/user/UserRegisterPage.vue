<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
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
      <a-form-item field="checkPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请确认你的密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          注册
        </a-button>
        <a-link href="/user/login" class="login-link">老用户登录</a-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { userRegisterUsingPost } from "@/servers/api/userController";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const router = useRouter();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});
const handleSubmit = async () => {
  const res = await userRegisterUsingPost(form);
  console.log(res);
  if (res.data?.code === 0) {
    message.success("注册成功，请快快登录叭");
    // 注册成功让他跳转到 登录页登录
    // 跳转到主页
    router.push({
      path: "/user/login",
      // 不会有登录页的历史记录
      replace: true,
    });
  } else {
    message.error("注册失败");
  }
};
</script>

<style scoped>
.login-link {
  margin-left: auto; /* 推到容器右侧 */
  padding-left: 180px; /* 在链接和按钮之间增加一些空间 */
  text-decoration: none; /* 去除下划线 */
}
</style>
