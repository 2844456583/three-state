//导入封装的axios对象
import request from "../utlis/request"

//http://localhost:8800/该路径默认是public的目录下



//==============以下都是跨域需要服务器代理==========

//查询轮播图
function getlunbo() {
    return request.get("dev-api/good/getlunbo");

}

//获取种类大轮播图
function getTypeHomeImg(type) {
    return request.get("dev-api/good/typeHomeImg?brand=" + type);
}

//获取种类小轮播图
function getTypeHomeListImg(listname) {
    return request.get("dev-api/good/typeHomelistImg?listname=" + listname);
}

//获取分页中的顶部图片
function getTypeListImg(type) {
    return request.get("dev-api/good/typeListImg?type=" + type);
}

//获取列表页中分类中的小分类的数据
function getSmallTypeListImg(listname, page, maxcount, smalltype) {
    return request.get("dev-api/good/allsmalltype", {
        params: {
            listname,
            page,
            maxcount,
            smalltype
        }
    });
}

// 获取详情页面Details页面数据
function getDetailsMessage(listname, page, maxcount) {
    return request.get("dev-api/good/alltype", {
        params: {
            listname,
            page,
            maxcount,
        },
    });
}
// 搜索传过来的关键字
function search(goodsname) {
    return request.get("dev-api/good/search", {
        params: {
            goodsname,
        },
    });
}

export default {
    //需要发送请求的方法都放在这里暴露出去
    getlunbo,
    getTypeHomeImg,
    getTypeHomeListImg,
    getDetailsMessage,
    getTypeListImg,
    getSmallTypeListImg,
    search,

}