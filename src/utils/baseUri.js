/* eslint-disable import/no-mutable-exports */

let baseUri;

if (window.MOCK_STOCKS_NET_ENV === 'product') {
  baseUri = 'http://api.glsc.jiniutech.com:8080';
} else {
  baseUri = 'http://api.glsc-dev.jiniutech.com:8080';
  // baseUri = 'http://192.168.3.84:8080';
}

export default baseUri;
