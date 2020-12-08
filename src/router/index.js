import Vue from "vue";
// 1.引入vue-router
import VueRouter from "vue-router";
// 实现路由跳转的六步
// 1.引入vue-router
// 2.准备组件
// 3.创建路由对象，并配置路由表
// 4.把准备好的路由对象，注入到vue实例中
// 5.设置路由导航
// 6.设置路由出口


// 2.准备组件
// 路由懒加载App.vue的一级路由
let Home = () =>
    import ("../views/Home.vue");
let Cart = () =>
    import ("../views/Cart.vue");
let Mine = () =>
    import ("../views/Mine.vue");
let Order = () =>
    import ("../views/Order.vue");
let Reg = () =>
    import ("../views/Reg.vue");
let Login = () =>
    import ("../views/Login.vue");
let Discounts = () =>
    import ("../views/Discounts.vue");
let List = () =>
    import ("../views/List.vue");
let Details = () =>
    import ("../views/Details.vue");
let ProductDetails = () =>
    import ("../views/ProductDetails.vue");
let Logoff = () =>
    import ("../views/Logoff.vue");
let Search = () =>
    import ("../views/Search.vue");

//引入列表页的二级路由
let hufuList = () =>
    import ("../components/list/hufuList.vue");
let caizhuangList = () =>
    import ("../components/list/caizhuangList.vue");
let xiangshuiList = () =>
    import ("../components/list/xiangshuiList.vue");
let toolsList = () =>
    import ("../components/list/toolsList.vue");
let manList = () =>
    import ("../components/list/manList.vue");
let xiyuList = () =>
    import ("../components/list/xiyuList.vue");
let meifaList = () =>
    import ("../components/list/meifaList.vue");
let fushiList = () =>
    import ("../components/list/fushiList.vue");


//引入商品详情页的子路由
let good = () =>
    import ("../components/productDetails/good.vue");
let comment = () =>
    import ("../components/productDetails/comment.vue");
let goodDetails = () =>
    import ("../components/productDetails/goodDetails.vue");
let contact = () =>
    import ("../components/productDetails/contact.vue");


//vue安装插件VueRouter ,不安装用window.onhashchange
Vue.use(VueRouter);

// 3.创建路由对象，并配置路由表
//配置路由表
const routes = [
    {
        path: "/home",
        name: "home",
        component: Home, //无优化的方式
        // redirect: "/details", //重定向
        // 1.首页
        meta: {
            //元信息
            ischeck: false, //不需要路由守卫
        },
    },
    {
        path: "/",
        redirect: "/home", //重定向
        // redirect: "/order",
    },
    {
        path: "/list",
        name: "list",
        component: List, //无优化的方式
        // 2.分类
        meta: {
            //元信息
            ischeck: false, //不需要路由守卫
        },
        //列表分页的二级路由表
        children: [{
                path: 'hufu',
                component: hufuList
            },
            {
                path: 'caizhuang',
                component: caizhuangList
            },
            {
                path: 'xiangshui',
                component: xiangshuiList
            },
            {
                path: 'tools',
                component: toolsList
            },
            {
                path: 'man',
                component: manList
            },
            {
                path: 'xiyu',
                component: xiyuList
            },
            {
                path: 'meifa',
                component: meifaList
            },
            {
                path: 'fushi',
                component: fushiList
            },
            {
                path: '',
                redirect: "/list/hufu"
            },

        ]
    },
    {
        path: "/discounts",
        name: "discounts",
        component: Discounts, //无优化的方式
        // 3.优惠专享
        meta: {
            //元信息
            ischeck: false, //不需要路由守卫
        },
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart, //无优化的方式
        // 4.购物袋
        meta: {
            //元信息
            ischeck: true, //不需要路由守卫
        },
    },
    {
        path: "/mine",
        name: "mine",
        component: Mine, //无优化的方式
        // 5.我的
        meta: {
            //元信息
            ischeck: true, //不需要路由守卫
        },
    },
    {
        path: "/reg",
        name: "reg",
        component: Reg, //无优化的方式
        // 6.
        meta: {
            //元信息
            ischeck: false, //不需要路由守卫
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login, //无优化的方式
        // 7.
        meta: {
            //元信息
            ischeck: false, //不需要路由守卫
        },
    },
    {
        path: "/details",
        name: "details",
        component: Details //商品列表页

    },
    {
        path: "/order",
        name: "order",
        component: Order //订单页面
            // 8.订单
    },
    {
        path: "/productDetails",
        name: "productDetails",
        component: ProductDetails, //商品详情页面

        children: [{
                path: 'good',
                component: good
            },
            {
                path: 'goodDetails',
                component: goodDetails
            },
            {
                path: 'comment',
                component: comment
            },
            {
                path: 'contact',
                component: contact
            },
            {
                path: '',
                redirect: "/productDetails/good"
            },
        ]

    },
    {
        path: "/logoff",
        name: "logoff",
        component: Logoff //退出登录
            // 9.退出登录
    },
    {
        path: "/search",
        name: "search",
        component: Search //搜索页面

    },
];

// 3.创建路由对象，并配置路由表
//注入到路由对象
const router = new VueRouter({
    mode:'history',
    routes
});

export default router;