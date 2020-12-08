//导入封装的axios对象
import request from "../utlis/request"
// 旧用户修改订单商品
function oldchange (name,goodArr){
    return request.put("dev-api/order/pushorder/" + name,`goodArr=${goodArr}`);
}
// 新用户添加商品到订单
function addGoods(name,goodArr){
    return request.post("dev-api/order/addorder",`name=${name}&goodArr=${goodArr}`);
}

// 查询订单是否有该用户信息
function query(name){
    return request.get("dev-api/order/checkOrderName/" + name)
}
export default{
    addGoods,
    query,
    oldchange,
}