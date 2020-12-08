<template>
  <div>
    <header>
      <a href="#">
        <img class="logo" src="../assets/img/shape.png" alt @click="go()" />
      </a>
      <span class="text">购物车</span>
      <a href="#"></a>
    </header>
    <div class="cont" v-if="goodArr.length!=0">
      <div class="content" v-for="(item, index) in goodArr" :key="item.title">
        <div class="left">
          <van-checkbox
            v-model="item.ischeck"
            shape="square"
            checked-color="black"
            icon-size="16px"
            @click="changecheck(index)"
          ></van-checkbox>
        </div>
        <a href="#" class="pic_outside">
          <img :src="item.url" alt class="pic" />
        </a>
        <div class="right">
          <a href="#" class="text">{{ item.title }}</a>
          <!-- <van-cell is-link @click="showPopup">规格:套装</van-cell>
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '70%' }"
            closeable
            close-icon-position="top-right"
          ></van-popup>-->
          <span class="float_right">限购10件</span>
          <div class="message">
            <span>{{ item.price }}</span>
            <div class="msg">
              <div class="zero_div" @click="delgood(index)">删除</div>
              <div class="fir_div" @click="sub(index)">-</div>
              <div class="two_div">{{ item.count }}</div>
              <div class="thr_div" @click="add(index)">+</div>
            </div>
          </div>
          <!-- <div class="lastbutton" v-if="bool1">
            <span class="del">删除</span>
            <span class="com" @click="changebol1">完成</span>
          </div>
          <div class="lastbutton" v-if="!bool1">
            <span class="eidt" @click="changebol1">编辑</span>
          </div>-->
        </div>
      </div>
    </div>
    <div class="kkry" v-if="goodArr.length==0" @click="toList">
      <img src="../assets/img/20201009112111.png" alt="">
    </div>
    <div class="foot">
      <van-submit-bar
        :price="totalprice()"
        button-text="结算"
        @submit="onSubmit"
      >
        <van-checkbox v-model="allcheck">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import cart from "../api/cart";
import order from "../api/order";
import { setToken, setUser, setCookie, getCookie } from "../utlis/auth";
// console.log(cart);
export default {
  data() {
    return {
      goodArr: [],
      goodArr2: [],
      currentUser: this.$store.state.login.currentUser,
      // total: 3050,
      // checked: false,
      // goodArrLength: this.goodArr.length,
      // bool1: false,
      // num: 15,
      // price: 20
    };
  },

  components: {},
  created() {
    // 当初次加载页面的时候就请求数据
    cart
      .checkCartName(this.$store.state.login.currentUser)
      .then(req => {
        if (req.data.code == "1") {
          var n = req.data.data[0].goodArr.replace(/'/g, '"');
          setCookie("cart", n, 7);
          this.$store.commit("upload");
          if (this.$store.state.login.goodArr != "") {
            this.goodArr = JSON.parse(this.$store.state.login.goodArr);
            // 取数据库返回来的<之前的数据
            this.goodArr.forEach(item => {
              item.price = item.price.split("<")[0];
              // console.log(item.price);
            })
          }
        } else {
          this.$store.commit("upload2", []);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    toList(){
      this.$router.push("./list");
    },
    // 用于确认是否要删除此商品
    delgood(index) {
      this.$dialog
        .confirm({
          // title: "标题",
          message: "你确定删除此商品吗？"
        })
        .then(() => {
          this.delgoods(index);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除的时候就要更改数据库
    delgoods(index) {
      this.goodArr.splice(index, 1);
      this.change();
    },
    // 更改数据库数据的一个封装函数，提供多次调用
    change() {
      var n = JSON.stringify(this.goodArr).replace(/\"/g, "'");
      cart
        .updateCartGood(this.$store.state.login.currentUser, n)
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 计算总价
    totalprice() {
      let total = 0;
      this.goodArr.forEach(item => {
        if (item.ischeck == true) {
          total += parseFloat(item.price.split("￥")[1]) * item.count;
        }
      });
      return total * 100;
    },
    add(index) {
      if (this.goodArr[index].count >= 10) {
        return;
      }
      this.goodArr[index].count++;
      this.change();
    },
    sub(index) {
      if (this.goodArr[index].count <= 1) {
        return;
      }
      this.goodArr[index].count--;
      this.change();
    },
    changecheck(index) {
      this.change();
    },
    onSubmit() {
      // 过滤ischecked为真的数据
      this.goodArr2 = this.goodArr.filter(item => {
        return item.ischeck == true
      });
      var n = JSON.stringify(this.goodArr2).replace(/\"/g, "'");
      // order.addGoods(this.currentUser,n)
      // .then(res => {
      //   console.log(res.data);
      // });
      // 查询是否存在这个用户
      order.query(this.currentUser)
      .then(res => {
        // 如果res.data.code为真则这个用户存在
        if(res.data.code){
          order.oldchange(this.currentUser,n)
          .then(req =>{
            // console.log(2);
          })
        }else{
          // 反之则不存在
          order.addGoods(this.currentUser,n)
          .then(rea => {
            // console.log(3);
          })
        }
        this.$router.push("./order");
      })
      .catch(err => {
        console.log(err);
      })
      // order.oldchange(this.currentUser,n)
      // .then(res => {
      //   console.log(res);
      // })
    },
    go() {
      this.$router.go(-1);
    }
  },
  computed: {
    allcheck: {
      // 二级控制一级
      get() {
        let arr = [];
        this.goodArr.forEach(item => {
          let bool = item.ischeck;
          arr.push(bool);
        });
        // console.log(arr);
        return arr.every(item => item == true);
      },
      // 一级控制二级
      set(val) {
        // console.log(this.goodsList[0].goods[0].subchecked);
        this.goodArr.forEach(item => {
          item.ischeck = val;
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
header {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 5;
  top: 0;
  height: vw(50);
  padding: vw(18) vw(30) vw(17) vw(30);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: vw(1) solid rgb(228, 222, 222);
  .logo {
    width: vw(40);
    height: vw(40);
  }
  .text {
    font-size: vw(36);
  }
}
.cont {
  margin-top: vw(88);
  background-color: #f5f5f5;
  height: vw(1145);
  overflow-y: scroll;
}
.kkry{
  width: 100vw;
  height: vw(1235);
  background-color: #f5f5f5;
  img{
    width: 100%;
  }
}
.content {
  padding: vw(38) 0 vw(18) 0;
  background-color: #fff;
  margin-bottom: vw(20);
  width: 100vw;
  display: flex;
  align-items: center;
  .left {
    width: vw(72);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }
  .pic_outside {
    margin-right: vw(20);
    width: vw(180);
      height: vw(180);
    .pic {
      width: vw(180);
      height: vw(180);
    }
  }
  .right {
    width: vw(454);
    font-size: vw(24);
    height: vw(186);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    .float_right {
      text-align: right;
    }
    .message {
      height: vw(46);
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      line-height: vw(42);
      .msg {
        display: flex;
        width: vw(210);
        height: vw(42);
        text-align: center;
        line-height: vw(42);
        div {
          border: vw(1) solid #666;
        }
        .zero_div {
          flex: 3;
          border: none;
        }
        .fir_div {
          flex: 2;
          font-size: vw(40);
        }
        .two_div {
          flex: 3;
        }
        .thr_div {
          flex: 2;
          font-size: vw(40);
        }
      }
    }
    .lastbutton {
      text-align: right;
      color: #9d9d9d;
      .del {
        border-right: 1px solid #9d9d9d;
        padding-right: vw(15);
      }
      .com {
        padding-left: vw(15);
      }
    }
  }
}
.foot {
  .van-submit-bar__bar {
    padding-right: 0;
    border-top: vw(1) solid rgb(199, 196, 196);

    .van-button--round {
      border-radius: 0;
      height: vw(100);
    }
  }
}
</style>