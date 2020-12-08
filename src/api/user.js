//导入封装的axios对象
import request from "../utlis/request"
//1.用户注册
function reg(name,possword) {
    // return request.post("dev-api/user/regist", 
    // JSON.stringify({
    //     name,
    //     possword,
    // }),
    // {headers:{'Content-Type':'application/x-www-form-urlencoded'}})
    return request.post("dev-api/user/regist", `name=${name}&password=${possword}`);
    // return request({
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     method: 'post',
    //     url: 'dev-api/user/regist',
    //     data: {
    //       name,
    //       possword,
    //     }
    //   });
}
// function reg(username, password) {
//   return request.post("/user/reg", {
//     username,
//     password,
//   });
// }
// 2.检查用户名是否存在
function checkName(username) {
    return request.get("dev-api/user/checkname", {
        params: {
            name: username,
        }
    });
}
// 3.用户登录
function login(username,password){
    return request.get("dev-api/user/login",{
        params: {
            name: username,
            password,
        }
    })
}
// 4.检验token
function checkToken(token) {
    return request.get("dev-api/user/verify", {
      params: {
        token,
      },
    });
  }
export default {
    reg,
    checkName,
    login,
    checkToken,
}
// 获取公共用户名
// function getPublicName(){
//     return request.put("dev-api/user/public",{

//     })
// }