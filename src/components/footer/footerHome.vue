<template>
  <footer>
    <van-tabbar v-model="active" active-color="#000">
      <van-tabbar-item
        v-for="(item) in list"
        :key="item.id"
        :icon="item.icon"
        @click="goto(item.path)"
      >{{item.name}}</van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      active: 0,
      list: [
        {
          id: 1,
          name: "首页",
          path: "/home",
          icon: "wap-home-o"
        },
        {
          id: 2,
          name: "分类",
          path: "/list",
          icon: "todo-list-o"
        },
        {
          id: 3,
          name: "优惠专享",
          path: "/discounts",
          icon: "bill-o"
        },
        {
          id: 4,
          name: "购物袋",
          path: "/cart",
          icon: "shopping-cart-o"
        },
        {
          id: 5,
          name: "我的",
          path: "/mine",
          icon: "manager-o"
        }
      ]
    };
  },

  components: {},

  methods: {
    goto(path) {
      this.$router.push(path);
      // console.log(this.$route);
    }
  }
  // watch: {
  //   $route: {
  //     deep: true,
  //     handler(newRoute){
  //       // console.log(newRoute);
  //       this.list.forEach(item => {
  //         if(item.path == newRoute.path){
  //           this.active=item.id - 1;
  //         }
  //       });
  //     }
  //   }
  // },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
footer {
  .van-tabbar {
    height: vw(130);

    .van-tabbar-item {
      color: #bbb;
    }
    .van-tabbar-item__icon {
      font-size: vw(30);
    }
  }
}
</style>