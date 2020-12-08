<template>
  <div>
    <!-- 头部组件 -->
    <header-home></header-home>

    <!-- 轮播组件 -->
    <div class="zhong">
      <!-- 最大的轮播图 -->
      <lunbo-home></lunbo-home>

      <!-- 导航分类 -->
      <grid-bar></grid-bar>

      <!-- 护肤栏位 -->
      <hufu-bar></hufu-bar>

      <!-- 彩妆栏位 -->
      <caizhuang-bar :isload="flag['1']"></caizhuang-bar>

      <!-- 香水栏位-->
      <xiangshui-bar :isload="flag['2']"></xiangshui-bar>

      <!-- 工具栏位 -->
      <tools-bar :isload="flag['3']"></tools-bar>

      <!-- 男士栏位 -->
      <man-bar :isload="flag['4']"></man-bar>

      <!-- 洗浴护体栏位 -->
      <xiyu-bar :isload="flag['5']"></xiyu-bar>

      <!-- 美发护发栏位 -->
      <meifa-bar :isload="flag['6']"></meifa-bar>

      <!-- 肤食栏位 -->
      <fushi-bar :isload="flag['7']"></fushi-bar>
    </div>

    <!-- 底部组件 -->
    <footer-bar></footer-bar>
  </div>
</template>

<script>
//引入组件
// import headerHome from "@/components/header/headerHome.vue";
import headerHome from "../components/header/headerHome.vue";
import lunboHome from "../components/lunbo/lunboHome.vue";
import footerBar from "../components/footer/footerHome.vue";
import gridBar from "../components/middle/grid.vue";
import hufuBar from "../components/middle/hufu.vue";
import caizhuangBar from "../components/middle/caizhuang.vue";
import xiangshuiBar from "../components/middle/xiangshui.vue";
import toolsBar from "../components/middle/tools.vue";
import manBar from "../components/middle/man.vue";
import xiyuBar from "../components/middle/xiyu.vue";
import meifaBar from "../components/middle/meifa.vue";
import fushiBar from "../components/middle/fushi.vue";

const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  data() {
    return {
      active: 0,

      //默认开始下面不加载数据
      flag: {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
        "7": false
      },

      index: 1,
      hufu: false
    };
  },
  created() {
    this.$store.commit("uploadisLogin");
  },
  //测滚动条加载数据（懒加载数据）
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll);
    });
  },
  destroyed() {
    this.$nextTick(function() {
      window.removeEventListener("scroll", this.onScroll);
    });
  },
  components: {
    //注册组件
    headerHome,
    lunboHome,
    footerBar,
    gridBar,
    hufuBar,
    caizhuangBar,
    xiangshuiBar,
    toolsBar,
    manBar,
    xiyuBar,
    meifaBar,
    fushiBar
  },

  methods: {
    // 获取滚动条当前的位置
    getScrollTop() {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    // 获取当前可视范围的高度
    getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      }
      return clientHeight;
    },

    // 获取文档完整的高度
    getScrollHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
    },
    // 滚动事件触发下拉加载
    onScroll() {
      // console.log(1);
      // console.log(this.getScrollHeight(),this.getClientHeight(),this.getScrollTop());
      if (
        this.getScrollHeight() - this.getClientHeight() - this.getScrollTop() <=
        1
      ) {
        //延时加载防止抖动
        // console.log("hahhahha");
        delay(() => {
          this.flag[this.index + ""] = true;
          this.index += 1;
        }, 300);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
.zhong {
  // height: 4200px;
  //   overflow: scroll;

  overflow-y: auto;
  &:-webkit-scrollbar {
    display: none;
    height: 0 !important;
  }
}
</style>