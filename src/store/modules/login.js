// import { Uploader } from "vant";
import { getCookie } from "../../utlis/auth";

let count = {
    state: {
        currentUser: getCookie('sifulan-user'),
        isLogin: getCookie('sifulan-user') != undefined,
        goodArr: getCookie('cart'),
    }, //存储数据(状态)的地方
    getters: {

    },
    mutations: {
        // 更改用户名
        setuser(state, payload) {
            state.currentUser = payload;
        },
        // 更新用户名
        uploaduser(state) {
            state.currentUser = getCookie('sifulan-user');
        },
        // 更新登录状态
        uploadisLogin(state) {
            state.isLogin = getCookie('sifulan-user')!= undefined;
        },
        //更改购物车数组
        upload(state) {
            // console.log(state.goodArr,555);
            state.goodArr = getCookie("cart");
        },
        // 更改购物车数组自传参
        upload2(state, payload) {
            state.goodArr = payload;
        }
    },
    actions: {
        changeuser(context, payload) {
            //context== store
            context.commit("setuser", payload);
        },

        //获取用户名
        getuser(context) {
            return context.commit("getuser")
        }
    }
};

export default count;