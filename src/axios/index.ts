import { useStorage } from '@/hooks/web/useStorage';
import { uironRequest } from '@uiron/hooks';
const { getStorage } = useStorage('localStorage');
const { VITE_GLOB_API_URL, VITE_API_HEAD_APP_ID,VITE_API_HEAD_API_KEY } = import.meta.env;
import { useUserStore } from '@/store/modules/user';
import CryptoJS from 'crypto-js';

function generate32BitRandom() {
  // 创建一个32位的TypedArray
  const array = new Uint32Array(1);

  // 使用加密安全的随机数生成器填充数组
  window.crypto.getRandomValues(array);

  // 返回生成的32位随机数
  return array[0] + 'a';
}

export const defHttp = uironRequest({
  requestOptions: {
    appId: VITE_API_HEAD_APP_ID,
    whiteList: ['/login'],
    apiUrl: VITE_GLOB_API_URL,
    setToken: async (config) => {
      const access_token = getStorage('token');
      config.headers.Authorization = `Motern ${access_token}`;
      const times = new Date().getTime();
      const requestId = generate32BitRandom();
      const sign = CryptoJS.MD5(requestId + times + VITE_API_HEAD_API_KEY).toString();
      config.headers.requestId = requestId;
      config.headers.Timestamp = times;
      config.headers.Sign = sign;
      config.headers['Xi-App-Id'] = VITE_API_HEAD_APP_ID;
      return config;
    },
  },
  transform: {
    responseInterceptorsCatch: (error: any) => {
      // Handle errors globally
      console.error('Response error:', error);
      if (error?.status === 401) {
        const userStore = useUserStore();
        userStore.reset();
      }
    },
  },
});
export default defHttp;
