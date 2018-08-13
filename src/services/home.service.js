import request from '../utils/request';

/* eslint-disable import/prefer-default-export */
export function loginFUNC(obj) {
  return request({
    url: 'http://api.s.jiniutech.com/users/login',
    method: 'POST',
    data: obj,
  });
}
