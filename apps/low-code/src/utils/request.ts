import { $cmpHttp } from '@libs/cmp';
import { message } from 'antd';
import Axios, { AxiosPromise } from 'axios';
import qs from 'qs';

const axios = Axios.create({
  baseURL: '/apis',
  timeout: 60000,
  responseType: 'json',
  withCredentials: true, // 配置允许跨域携带cookie
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Request-Type': 'novacloud',
    token: localStorage.getItem('token'),
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    if (status >= 200 && status < 300) {
      return data;
    }
    return Promise.reject(response);
  },
  (error) => {
    const { data, status } = error.response;
    if (status === 400) {
      message.error(data.message || '请求参数错误！');
    } else if (status === 401) {
      message.error('未登录，正在跳转登录！');
      $cmpHttp
        .post(
          { method: 'getThirdPartAuthUrl', source: 'nova_passport' },
          'desk'
        )
        .then((res: any) => {
          if (res.code === 200) {
            window.location.href = res.retObj.authorizeUrl;
          } else {
            message.error(res.msg);
          }
        });
      return;
    } else if (status === 403) {
      message.error('无权限访问！');
    } else if (status === 404) {
      message.error('请求资源不存在！');
    } else if (status >= 500) {
      message.error(data.message || '服务器内部错误！请联系管理员！');
    } else {
      message.error(data.message);
    }
    return Promise.reject(error.response);
  }
);

type RequestMethods = (
  url: string,
  params?: any,
  options?: any
) => AxiosPromise;

export const $http: {
  get: RequestMethods;
  post: RequestMethods;
  put: RequestMethods;
  delete: RequestMethods;
} = {
  get: (url: string, params: any, options: any) => {
    return axios.get(url, { params, ...options });
  },
  post: (url: string, data: any, options: any) => {
    return axios.post(url, data, options);
  },
  put: (url: string, data: any, options: any) => {
    return axios.put(url, data, options);
  },
  delete: (url: string, params: any, options: any) => {
    return axios.delete(url, { params, ...options });
  },
};
