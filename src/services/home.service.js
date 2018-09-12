import request from '../utils/request';

/* eslint-disable import/prefer-default-export */
export function getDatas() {
  return request({
    url: 'http://api.glsc-dev.jiniutech.com:8080/indicator/index',
    method: 'GET',
  });
}
