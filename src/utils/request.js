import axios from 'axios';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/* eslint-disable no-restricted-syntax,guard-for-in,consistent-return */
export default function request(options, formType = 'FORM') {
  // formType，post请求的数据类型，默认FORM格式，可选项JSON、FORM
  const { url, method, data } = options;
  let Authorization;

  if (data && data.authorization) {
    Authorization = data.authorization;
  } else {
    Authorization = window.localStorage.getItem('mock_stocks_authorization');
  }

  if (method === 'GET') {
    return axios({
      timeout: 10000,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization },
      url,
      method,
      params: data,
    })
      .then(checkStatus)
      .catch((error) => {
        if (error) {
          alert('网络故障');
          // TODO, show error
        }
        console.log('request error', error);
      });
  } else if (method === 'POST') {
    let DATA;
    if (formType === 'JSON') {
      DATA = data;
    } else {
      const params = new URLSearchParams();
      for (const x in data) {
        params.append(x, data[x]);
      }
      DATA = params;
    }

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (url !== 'http://api.s.jiniutech.com/users/login') {
      headers.Authorization = Authorization;
    }

    return axios({
      timeout: 10000,
      headers,
      url,
      method,
      data: DATA,
    })
      .then(checkStatus)
      .catch((error) => {
        if (error) {
          alert('网络故障.');// TODO, show error
        }
        console.log('request error', error);
      });
  }
}
