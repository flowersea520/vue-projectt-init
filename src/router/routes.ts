import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import AdminPage from "@/views/AdminPage.vue";
import NoAuthPage from "@/views/NoAuthPage.vue";
import HidePage from "@/views/HidePage.vue";
import ACCESS_ENUM from "@/access/ACCESS_ENUM";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginPage from "@/views/user/UserLoginPage.vue";
import UserRegisterPage from "@/views/user/UserRegisterPage.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "浏览题目",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "管理页面",
    component: AdminPage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  // 这种结构在前端路由中被称为嵌套路由或子路由。您配置了一个主路由路径为 /user，并为其指定了一个布局组件 UserLayout。
  // 然后，在这个主路由下，您定义了两个子路由，分别是 /user/login 和 /user/register。
  // 这样的设计允许您在同一个布局下展示不同的子页面，从而实现页面的结构化组织。
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      // 当访问path: "/user/login",路由的时候，UserLoginPage,嵌套在父级的UserLayout中
      // 当我访问子路由的时候，他会嵌套在这个父路由的组件上
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginPage,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterPage,
      },
    ],
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: HidePage,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "没有权限",
    component: NoAuthPage,
  },
  {
    path: "/about",
    name: "关于我的",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView,
  },
];
