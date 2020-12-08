import Vue from "vue";
import App from "./App.vue";
import router from "./router"; //安装脚手架顺便把router安装好,文件夹下有index.js默认可以省略不写，引入是js可以省略不写，引入index.js,index都可省略不写
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';

Vue.use(Lazyload);

Vue.use(Vant);

import { AddressEdit } from 'vant';


Vue.use(AddressEdit);


//引入md5加密插件
import md5 from "js-md5";
Vue.prototype.$md5 = md5;

import VueResource from 'vue-resource';
Vue.use(VueResource);

import "./permission";
// Vue.config.productionTip = false;
// 消息提示的环境配置，是否为生产环境：
// false 开发环境(development)：Vue会提供很多警告来方便调试代码。
// true 生产环境(production)：警告却没有用，反而会增加应用的体积
Vue.config.productionTip = process.env.NODE_ENV === 'production';

// 4.把准备好的路有对象，注入到vue实例中
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");