import baseURL from "./base-config";

// 指定后端返回的基本数据类型
export interface ResponseConfig<T> {
  code: number;
  message: string;
  data: T;
}

// import { showLoading, hideLoading } from "~~/loading";
const fetch = (url: string, options?: any): Promise<any> => {
  const { $router } = useNuxtApp();
  let reqUrl = "";
  if (/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
    reqUrl = url;
  } else {
    reqUrl = baseURL + url;
  }
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, {
      onRequest({ options }) {
        // showLoading();
      },
      onResponse({ response }) {
        // hideLoading();
      },
      onResponseError({ response }) {},
      ...options,
    })
      .then(({ data, error }) => {
        if (error.value) {
          reject(error.value);
          return;
        }
        resolve(data.value);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export default new (class Http {
  get<T = any>(url: string, params?: any): Promise<T> {
    return fetch(url, { method: "get", params, server: true });
  }

  post<T = any>(url: string, body?: any): Promise<T> {
    return fetch(url, { method: "post", body, server: true });
  }

  put<T = any>(url: string, body?: any): Promise<T> {
    return fetch(url, { method: "put", body, server: true });
  }

  delete<T = any>(url: string, body?: any): Promise<T> {
    return fetch(url, { method: "delete", body, server: true });
  }
})();
