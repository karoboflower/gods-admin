import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { Layout } from '@/utils/routerHelper';
import { useI18n } from '@/hooks/web/useI18n';
import { NO_RESET_WHITE_LIST } from '@/constants';
const { t } = useI18n();

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    name: 'RedirectWrap',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/redirect/redirect.vue'),
        meta: {},
      },
    ],
    meta: {
      hidden: true,
      noTagsView: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true,
    },
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/personal-center',
    name: 'Personal',
    meta: {
      title: t('router.personal'),
      hidden: true,
      canTo: true,
    },
    children: [
      {
        path: 'personal-center',
        component: () => import('@/views/personal/personal-center/index.vue'),
        name: 'PersonalCenter',
        meta: {
          title: t('router.personalCenter'),
          hidden: true,
          canTo: true,
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true,
    },
  },
];

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/coach',
    name: 'Manage',
    meta: {
      title: '系统管理',
      icon: 'vi-eos-icons:admin',
      alwaysShow: true,
    },
    children: [
       {
        path: 'user',
        component: () => import('@/views/manage/user/index.vue'),
        name: 'UserManage',
        meta: {
          title: '用户管理',
        },
      },
      {
        path: 'coach',
        component: () => import('@/views/manage/coach/index.vue'),
        name: 'CoachManage',
        meta: {
          title: '助教管理',
        },
      },
     
      {
        path: 'order',
        component: () => import('@/views/manage/order/index.vue'),
        name: 'OrderManage',
        meta: {
          title: '订单管理',
        },
      },
     
      {
        path: 'withdraw',
        component: () => import('@/views/manage/withdraw/index.vue'),
        name: 'WithdrawManage',
        meta: {
          title: '提现管理',
        },
      },
       {
        path: 'customer',
        component: () => import('@/views/manage/customer/index.vue'),
        name: 'CustomerManage',
        meta: {
          title: '客服管理',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: [...(constantRouterMap as RouteRecordRaw[])],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const resetRouter = (): void => {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
};

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};

export default router;
