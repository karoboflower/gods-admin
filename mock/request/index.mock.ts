import { SUCCESS_CODE } from '@/constants';

const timeout = 600000;

export default [
  {
    url: '/request/1',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-1',
      };
    },
  },
  {
    url: '/request/2',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-2',
      };
    },
  },
  {
    url: '/request/3',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-3',
      };
    },
  },
  {
    url: '/request/4',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-4',
      };
    },
  },
  {
    url: '/request/5',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-5',
      };
    },
  },
  {
    url: '/request/expired',
    method: 'get',
    timeout: 0,
    response: () => {
      return {
        code: 401,
        message: 'token expired',
      };
    },
  },
];
