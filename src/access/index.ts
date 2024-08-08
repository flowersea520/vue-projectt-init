import router from "@/router";
import { useLoginUserStore } from "@/store/userStore";
import ACCESS_ENUM from "@/access/ACCESS_ENUM";
import checkAccess from "@/access/checkAccess";

/**
 * 这段代码的好处就是在每次路由导航时进行权限校验，确保用户访问的页面是他们有权限查看的。
 * 在router.beforeEach中：
权限校验：每次导航到一个新页面时，代码会检查用户的权限。如果页面需要特定的权限，但用户没有相应的权限，导航将会被重定向到登录页面或无权限页面。
用户状态检查：在权限校验之前，还会确保用户的登录状态已经被获取（例如通过fetchLoginUser函数）。如果用户未登录或登录状态未获取，则会自动尝试获取用户状态。
 * 这种实现方式能有效地保护应用中的受限页面，确保只有授权用户能够访问特定的页面。
 */
// todo 记得后续做一下笔记，地址栏输入路由地址后这里先经过request请求拦截器后，来到这里进入页面前，进行权限校验
router.beforeEach(async (to, from, next) => {
  // 获取当前登录用户
  const loginUserStore = useLoginUserStore();
  let loginUser = loginUserStore.loginUser;

  // 如果之前没有尝试获取过登录用户信息，才自动登录（之前没有 向后端请求获取 登录用户信息的接口）
  // if左边的条件肯定是满足的，因为我们会给ref一个初始对象，但是没给userRole属性
  // 这也是我们的设计所在，就是如果没有这个属性，说明我们就是没登陆的；
  if (!loginUser || !loginUser.userRole) {
    // 如果loginUser为null或者undifinded，
    // 或者 没有 userRole属性值，说明之前没有获取过用户信息，调用接口请求用户角色如果是未登录，则走后续代码，自动登录
    // 加 await 是为了等待用户登录成功并获取到值后，再执行后续操作
    await loginUserStore.fetchLoginUser();
    loginUser = loginUserStore.loginUser;
  }

  // 当前页面需要的权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必须登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登录，跳转到登录页面（实现自动登录逻辑）
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
    }
    // 如果已经登录了，判断权限是否足够，如果不足，跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
