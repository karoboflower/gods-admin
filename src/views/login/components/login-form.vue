<template>
  <Form
    v-loading="loading"
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="formRegister"
  />
</template>

<script setup lang="tsx">
import type { FormSchema } from '@/components/Form';
import type { UserLoginType } from '@/api/login/types';
import type { RouteRecordRaw } from 'vue-router';

import { useI18n } from '@/hooks/web/useI18n';
import { useForm } from '@/hooks/web/useForm';
import { loginApi } from '@/api/user';
import { useAppStore } from '@/store/modules/app';
import { usePermissionStore } from '@/store/modules/permission';
import { useValidator } from '@/hooks/web/useValidator';
import { useUserStore } from '@/store/modules/user';
import { useStorage } from '@/hooks/web/useStorage';
const { setStorage } = useStorage('localStorage');
const { required } = useValidator();

const appStore = useAppStore();

const userStore = useUserStore();

const permissionStore = usePermissionStore();

const { addRoute, push } = useRouter();

const { t } = useI18n();

const rules = {
  username: [required()],
  password: [required()],
};
const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24,
    },
    formItemProps: {
      slots: {
        default: () => {
          return <h2 class="text-2xl font-bold text-center w-[100%]">{t('login.login')}</h2>;
        },
      },
    },
  },
  {
    field: 'username',
    label: t('login.username'),
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请输入用户名',
    },
  },
  {
    field: 'password',
    label: t('login.password'),
    component: 'InputPassword',
    colProps: {
      span: 24,
    },
    componentProps: {
      style: {
        width: '100%',
      },
      placeholder: '请输入密码',
      // 按下enter键触发登录
      onKeydown: (_e: any) => {
        if (_e.key === 'Enter') {
          _e.stopPropagation(); // 阻止事件冒泡
          signIn();
        }
      },
    },
  },
  {
    field: 'login',
    colProps: {
      span: 24,
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="w-[100%]">
                <base-button loading={loading.value} type="primary" class="w-[100%]" onClick={signIn}>
                  {t('login.login')}
                </base-button>
              </div>
              {/* <div class="w-[100%] mt-15px">
                <base-button class="w-[100%]" onClick={toRegister}>
                  {t('login.register')}
                </base-button>
              </div> */}
            </>
          );
        },
      },
    },
  },
]);

const initLoginInfo = () => {
  const loginInfo = userStore.getLoginInfo;
  if (loginInfo) {
    const { username, password } = loginInfo;
    setValues({ username, password });
  }
};
onMounted(() => {
  initLoginInfo();
});

const { formRegister, formMethods } = useForm();
const { getFormData, getElFormExpose, setValues } = formMethods;

const loading = ref(false);

const redirect = ref<string>('');
// 登录
const signIn = async () => {
  const formRef = await getElFormExpose();
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      const formData = await getFormData<UserLoginType>();
      loading.value = true;
      try {
        const { Result } = await loginApi(formData);
        setStorage('token', Result.access_token);
        await onLogin(Result);
      } catch (error: any) {
        ElMessage.error(error?.ErrMsg || '登录失败，请重试');
        loading.value = false;
      }
    }
  });
  return {};
};
const onLogin = async (result) => {
  userStore.setUserInfo(result);
  if (appStore.getDynamicRouter) {
    // getRole();
  } else {
    await permissionStore.generateRoutes('static').catch(() => {});
    permissionStore.getAddRouters.forEach((route) => {
      addRoute(route as RouteRecordRaw); // 动态添加可访问路由表
    });
    permissionStore.setIsAddRouters(true);
    push({ path: redirect.value || permissionStore.addRouters[0].path });
  }
};

// 获取角色信息
// const getRole = async () => {
//   const formData = await getFormData<UserLoginType>();
//   const params = {
//     roleName: formData.username,
//   };
//   const {Result: res}=
//     appStore.getDynamicRouter && appStore.getServerDynamicRouter
//       ? await getAdminRoleApi(params)
//       : await getTestRoleApi(params);
//   if (res) {
//     const routers = res.data || [];
//     userStore.setRoleRouters(routers);
//     appStore.getDynamicRouter && appStore.getServerDynamicRouter
//       ? await permissionStore.generateRoutes('server', routers).catch(() => {})
//       : await permissionStore.generateRoutes('frontEnd', routers).catch(() => {});

//     permissionStore.getAddRouters.forEach((route) => {
//       addRoute(route as RouteRecordRaw); // 动态添加可访问路由表
//     });
//     permissionStore.setIsAddRouters(true);
//     // fix me
//     push({ path: '/device/device-manage' });
//   }
// };
</script>
