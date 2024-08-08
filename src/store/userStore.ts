import { defineStore } from "pinia";
import { ref } from "vue";
import ACCESS_ENUM from "@/access/ACCESS_ENUM";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getLoginUserUsingGet } from "@/servers/api/userController";

/**
 * 登录用户信息全局状态
 */
export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: "未登录",
    // 这里就不给userRole了，因为要区分是否请求了后端接口，我们请求后端接口失败了会返回这个userRole为未登录状态
    // userRole: ACCESS_ENUM.NOT_LOGIN,
  });

  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser;
  }

  /**
   *  向后端请求获取 登录用户信息的接口
   */
  async function fetchLoginUser() {
    // 如果是后端登录成功后，我们调用这个方法，相对于获取了最新的用户登录信息，
    // 然后存到我们的loginUser用户全局状态存储当中去（就是变相的修改了loginUser存储状态对象）
    const res = await getLoginUserUsingGet();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    } else {
      // 调用了后端接口，如果获取用户信息失败，我们就给起userRole（说明我们请求了后端接口）
      loginUser.value = { userRole: ACCESS_ENUM.NOT_LOGIN };
    }
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
