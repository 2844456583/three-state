<template>
  <div>
    <!-- 头部导航 -->
    <header>
      <div class="left">
        <i @click="gotoback"></i>
      </div>
      <div class="middle">
        <i></i>
        <span v-for="(item, index) in datalist" :key="index">
          <em
            :class="{ selectcolor: currentPath == item.path }"
            @click="gotodetais(item.path)"
            >{{ item.title }}</em
          >
        </span>
        <i></i>
      </div>
      <div class="right">
        <van-icon name="ellipsis" />
      </div>
    </header>

    <!-- 内容部分 -->
    <div class="content">
      <router-view></router-view>
    </div>

    <!-- 底部部分 -->
    <footer>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="goodsnum"
          @click="gocart"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addCart"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="quickBuy"
        />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import cartApi from "@/api/cart.js";
import { setToken, setUser, setCookie, getCookie } from "../utlis/auth";
export default {
  data() {
    return {
      goodsnum: 0,
      currentPath: "",

      //获取当前的登录用户名
      name: this.$store.state.login.currentUser,

      //当前选中的商品信息
      goodArr: [],
      goodObj: {},

      //添加到订单的信息
      orderData: {},

      datalist: [
        {
          title: "商品",
          path: "/productDetails/good"
        },
        {
          title: "详情",
          path: "/productDetails/goodDetails"
        },
        {
          title: "评价",
          path: "/productDetails/comment"
        }
      ]
    };
  },
  components: {},
  created() {
    this.goodObj = { ...this.$route.query };

    this.goodData = this.$route.query;
    this.currentPath = this.$route.path;
    this.goodtotal();
  },

  methods: {
    // 计算有多少个商品
    goodtotal() {
      if (this.$store.state.login.goodArr != []) {
        this.goodsnum = JSON.parse(this.$store.state.login.goodArr).length;
      } else {
        this.goodsnum = 0;
      }
    },
    //返回上一层
    gotoback() {
      this.$router.back();
    },
    gocart() {
      this.$router.push("/cart");
    },

    //加入购物车按钮
    addCart() {
      cartApi.checkCartName(this.name).then(res => {
        //该用户已存在
        if (res.data.code) {
          // 获取到该用户的商品数据goodsData
          var goodsData = res.data.data[0].goodArr.replace(/\'/g, '"');
          if (goodsData != []) {
            goodsData = JSON.parse(goodsData);
          }else{
            goodsData = [];
          }
          // console.log(goodsData);
          //判断商品是否被添加过
          let isadd = goodsData.some(item => {
            return item.title == this.goodObj.title;
          });
          let idx;
          goodsData.forEach((item, index) => {
            if (item.title == this.goodObj.title) {
              idx = index;
              return;
            }
          });

          //如果被添加过那就添加数量
          if (isadd) {
            goodsData[idx]["count"] = goodsData[idx].count + 1;
            goodsData = JSON.stringify(goodsData).replace(/\"/g, "'");
            cartApi.updateCartGood(this.name, goodsData);
            this.$toast.success({
              message: "已加入购物车",
              position: top
            });
          } else {
            //旧用户添加商品
            this.goodObj["ischeck"] = false;
            this.goodObj["count"] = 1;
            goodsData.push(this.goodObj);
            goodsData = JSON.stringify(goodsData).replace(/\"/g, "'");
            cartApi.updateCartGood(this.name, goodsData);
            this.$toast.success({
              message: "已加入购物车",
              position: top,
            });
            cartApi
              .checkCartName(this.$store.state.login.currentUser)
              .then(req => {
                // console.log(req, 111);
                if (req.data.code == "1") {
                  var n = req.data.data[0].goodArr.replace(/'/g, '"');
                  // console.log(JSON.parse(n), 222);
                  setCookie("cart", n, 7);
                  this.$store.commit("upload");
                  // console.log(this.$store.state.login.goodArr,333);
                  if (this.$store.state.login.goodArr != "") {
                    this.goodArr = JSON.parse(this.$store.state.login.goodArr);
                  }
                } else {
                  this.$store.commit("upload2", []);
                }
              })
              .catch(err => {
                console.log(err);
              });
            this.goodsnum++;
          }
        } else {
          // 新用户添加商品数据
          this.goodObj["ischeck"] = false;
          this.goodObj["count"] = 1;
          this.goodArr.push(this.goodObj);
          this.goodArr = JSON.stringify(this.goodArr).replace(/\"/g, "'");

          cartApi.addCart(this.name, this.goodArr + "").then(res => {
            this.$toast.success({
              message: "已加入购物车",
              position: top
            });
          });
        }
      });
    },

    //立即购买按钮
    quickBuy() {
      this.addCart();
      setTimeout(()=>{
        this.$router.push("/cart");
      },200)
    },

    //在详情页继续走下个子路由传参
    gotodetais(path) {
      this.$router.replace({ path, query: this.goodData });
    }
  },
  watch: {
    $route: {
      deep: true,
      handler(newval) {
        this.currentPath = this.$route.path;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
header {
  width: 100vw;
  height: 7vh;
  line-height: 7vh;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #fef;
  .left {
    flex: 1;
    height: 7vh;
    text-align: center;
    display: flex;
    align-items: center;

    i {
      margin: 0 auto;
      display: block;

      width: 6vh;
      height: 6vh;
      background: #fff url("../assets/img/mobile_pdp.png");
      background-size: vw(1000);
      background-position: 4px 4px;
    }
  }
  .middle {
    flex: 4;
    height: 100%;
    display: flex;
    align-items: center;
    i {
      flex: 1;
    }
    em {
      font-style: normal;
    }
    //选中时候的样式
    .selectcolor {
      font-weight: bold;
      color: #1b1b1b;
      padding-bottom: vw(32);
      border-bottom: 2px solid #1b1b1b;
    }

    span {
      flex: 1;
      text-align: center;
      color: #ccc;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.content {
  width: 100vw;
  height: 85vh;
}
</style>