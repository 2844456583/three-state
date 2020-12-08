 //对axios进行二次封装
 import axios from "axios"
 //  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

 //得到了axios对象并且配置信息
 const request = axios.create({
     // 请求配置参考: https://github.com/axios/axios#request-config
     // 根据不同环境设置 baseURL, 最终发送请求时的URL为: baseURL + 发送请求时写URL ,
     // 比如 get('/test'), 最终发送请求是: /dev-api/test
     // baseURL: '/dev-api',
     baseURL: '/', //跨域用的基础路径
     timeout: 12000 // 请求超时超过5秒钟动态请求减少性能浪费
 })
 console.log("request111",request.get);
 export default request // 导出 axios 对象