<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/oj-logo.svg" class="logo" />
          <div>judgehub</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <!--        访问子路由，然后子路由页面嵌套在父路由的关键就是：这个在父路由的这个路由出口-->
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/flowersea520" target="_blank">
          @copyright by lxc
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
  margin-top: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  position: sticky;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
  text-align: center;
}
</style>
<script></script>
