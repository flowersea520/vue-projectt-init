import ACCESS_ENUM from "@/access/ACCESS_ENUM";

/**
 *  检查权限的方法（判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限（这里给个默认值，表示需要有的权限是NOT_LOGIN，需要未登录的权限说明他已经登录了）
 * needAccess是从 路由对象中拿到meta，在拿到access的值
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前登录用户具有的权限（如果没有loginUser，则表示未登录，返回false）
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  console.log(loginUserAccess, needAccess, "aaa");
  // 如果需要的权限是NOT_LOGIN，那么我需要NOT_LOGIN权限, 所以返回true，这个用户是有权限的（就是普通的路由对象）
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    // 这里需要理解一下：就是如果需要的权限是 未登录NOT_LOGIN，
    // 那么说明：我有这个权限，我不需要任何user, admin权限，所以返回true，这个用户是有权限的
    // 其实就是对应传过来的 路由对象的access中如果没有meta的access属性的话，就让他在菜单栏中显示而已的操作
    // 这也是给默认值的作用
    return true;
  }
  // 如果需要的权限是user，那么我需要user权限, 所以返回true，这个用户是有权限的
  if (needAccess === ACCESS_ENUM.USER) {
    // 需要的权限是user，但是，当前登录用户是NOT_LOGIN，说明没有登录，所以返回false，这个用户没有权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果需要的权限是admin，那么我需要admin权限, 所以返回true，这个用户是有权限的
  if (needAccess === ACCESS_ENUM.ADMIN) {
    // 如果当前登录用户的权限不是admin，那么返回false，这个用户没有权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};
// 如果就一个变量要导出，直接export default就好了
export default checkAccess;
