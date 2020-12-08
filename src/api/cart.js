//导入封装的axios对象
import request from "../utlis/request"

//新用户添加商品
function addCart(name, goodArr) {
    return request.post("dev-api/cart/addcart", `name=${name}&goodArr=${goodArr}`);

}

//查询是否有该用户和商品
function checkCartName(name) {
    return request.get("dev-api/cart/checkCartName/" + name);
}

//更新旧用户的商品数据
function updateCartGood(name, goodArr) {
    return request.put("dev-api/cart/pushcart/" + name, `goodArr=${goodArr}`);
}


export default {
    //需要发送请求的方法都放在这里暴露出去
    addCart,
    checkCartName,
    updateCartGood

}