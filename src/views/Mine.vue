<template>
  <div class="content">
    <header>
      <span>我的</span>
    </header>
    <div class="msg">
      <a href="#">
        <img src="../assets/img/userImg.png" alt="" class="pic" />
      </a>
      <p class="text">{{ this.user }}</p>
      <a href="#">
        <van-icon name="envelop-o" dot />
      </a>
      <a href="#">
        <van-icon name="setting-o" class="set" @click="tologoff"/>
      </a>
    </div>
    <div class="jifen_box">
      <div class="jifen">
        <a href="#">
          <img src="../assets/img/pinkVip.png" alt="" class="pic2" />
        </a>
        <span class="text1">粉卡会员</span>
        <a href="#">
          <p class="p1">
            <span class="text2">当前积分:</span>
            <span class="text3">0</span>
          </p>
        </a>
        <a href="#">
          <p class="p2">
            <span class="text4">优惠券:</span>
            <span class="text5">0</span>
          </p>
        </a>
        <p class="p3"></p>
        <p class="p4">您仅需任意消费即可升级为白卡</p>
      </div>
    </div>
    <div class="order">
      <div class="order_top" @click="toOrder">
        <div class="left">我的订单</div>
        <a href="#" class="text6">
          所有订单
          <van-icon name="arrow" />
        </a>
      </div>
      <div class="order_bottom">
        <a href="#">
          <div class="pic">
            <img src="../assets/img/ic_to_pay.png" alt="" />
          </div>
          <div class="text7">待支付</div>
        </a>
        <a href="#">
          <div class="pic">
            <img src="../assets/img/ic_in_deal.png" alt="" />
          </div>
          <div class="text7">处理中</div>
        </a>
        <a href="#">
          <div class="pic">
            <img src="../assets/img/ic_in_delievery.png" alt="" />
          </div>
          <div class="text7">配送中</div>
        </a>
        <a href="#">
          <div class="pic">
            <img src="../assets/img/ic_deal_complete.png" alt="" />
          </div>
          <div class="text7">已完成</div>
        </a>
        <a href="#">
          <div class="pic">
            <img src="../assets/img/newReturn.png" alt="" />
          </div>
          <div class="text7">退货/售后</div>
        </a>
      </div>
    </div>
    <div class="meiwan">
      <div class="meiwan_top">
        <div class="left">美玩服务</div>
      </div>
      <div class="meiwan_bottom">
        <a href="#">
          <div class="pic">
            <img src="../assets/img/newReservationcenter.png" alt="" />
          </div>
          <div class="text7">预约中心</div>
        </a>
        <a href="#">
          <div class="pic">
            <img src="../assets/img/newClaimcenter.png" alt="" />
          </div>
          <div class="text7">申领中心</div>
        </a>
        <a href="#">
          <div class="pic">
            <img src="../assets/img/newExchangerecord.png" alt="" />
          </div>
          <div class="text7">兑换记录</div>
        </a>
        <a href="#">
          <div class="pic">
            <img src="../assets/img/newOnlineService.png" alt="" />
          </div>
          <div class="text7">在线客服</div>
        </a>
        <a href="#">
          <div class="pic pic1">
            <img src="../assets/img/newOnlineService.png" alt="" />
          </div>
          <div class="text7">在线客服</div>
        </a>
      </div>
    </div>

    <!-- 底部组件 -->
    <footer-bar></footer-bar>
  </div>
</template>

<script>
//引入组件
import { getCookie } from "../utlis/auth";
import footerBar from "@/components/footer/footerMine.vue";
// console.log(getCookie);
export default {
  data() {
    return {
      active: 4,
      active1: 1,
      user: ""
    };
  },

  components: {
    //注册组件
    footerBar
  },

  methods: {
    tologoff(){
      this.$router.push("/logoff");
    },
    toOrder(){
      this.$router.push("/order");
    }
  },
  created() {
    // console.log(getCookie('sifulan-user'));
    // this.$store.dispatch("changeuser", getCookie('sifulan-user'));
    this.$store.commit("uploaduser");
    if (this.$store.state.login.currentUser != null) {
      // console.log(this.$store.state.login.currentUser);
      this.user = this.$store.state.login.currentUser.replace(
        /^(\d{3})\d*(\d{4})$/,
        "$1****$2"
      );
      // console.log(this.user,111);
      // console.log(this.$store, 444);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
.content {
  background-color: #f5f5f5;
  height: 90vh;
  // overflow-y: auto;
}
header {
  height: vw(88);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  span {
    font-size: vw(35);
  }
}
.msg {
  height: vw(314);
  // border: 1px solid black;
  background-color: #fff;
  padding: vw(20);
  // background-color: #58bc58;
  position: relative;
  box-sizing: border-box;
  .pic {
    width: vw(136);
    height: vw(136);
    position: absolute;
    top: vw(36);
    left: vw(62);
  }
  .text {
    font-size: vw(32);
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #000;
    line-height: vw(44);
    position: absolute;
    top: vw(79);
    left: vw(248);
  }
  .van-icon {
    position: absolute;
    height: vw(38);
    width: vw(40);
    position: absolute;
    top: vw(56);
    right: vw(110);
    font-weight: 400;
  }
  .set {
    right: vw(58);
  }
}
.jifen_box {
  height: vw(176);
  width: vw(704);
  font-family: PingFangSC-Regular\, PingFangSC;
  font-size: vw(24);
  position: absolute;
  top: vw(299);
  left: vw(24);
  border-radius: vw(12);
  background: #fff;
  z-index: 100;
  .jifen {
    height: 100%;
    width: 100%;
    background: #fff;
    // box-shadow: 0 -vw(4) vw(40) 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgb(231, 228, 228);
    border-radius: vw(12);
    position: relative;
    .pic2 {
      height: vw(34);
      width: vw(54);
      position: absolute;
      top: vw(46);
      left: vw(40);
    }
    .text1 {
      height: vw(40);
      width: vw(160);
      position: absolute;
      top: vw(43);
      left: vw(94);
      font-size: vw(28);
      font-family: PingFangSC-Medium\, PingFangSC;
      font-weight: 500;
      color: #000;
      line-height: vw(40);
      text-indent: vw(16);
    }
    .p1 {
      height: vw(60);
      width: vw(248);
      position: absolute;
      top: vw(26);
      left: vw(254);
      .text2 {
        font-size: vw(24);
        font-weight: 400;
        color: #9b9b9b;
        line-height: vw(34);
        display: inline-block;
        margin: vw(22) 0 0;
      }
      .text3 {
        font-size: vw(44);
        font-weight: 500;
        color: #000;
        line-height: vw(60);
        text-indent: vw(16);
        display: inline-block;
      }
    }
    .p2 {
      height: vw(60);
      width: vw(202);
      position: absolute;
      top: vw(26);
      right: 0;
      .text4 {
        font-size: vw(24);
        font-weight: 400;
        color: #9b9b9b;
        line-height: vw(34);
        display: inline-block;
        margin: vw(22) 0 0;
      }
      .text5 {
        font-size: vw(44);
        font-weight: 500;
        color: #000;
        line-height: vw(60);
        text-indent: vw(16);
        display: inline-block;
      }
    }
    .p3 {
      height: vw(6);
      width: vw(624);
      border-radius: vw(9);
      background: #bbb;
      position: absolute;
      top: vw(102);
      left: vw(40);
    }
    .p4 {
      height: auto;
      width: vw(624);
      position: absolute;
      top: vw(120);
      left: vw(40);
      font-size: vw(20);
      font-family: PingFangSC-Regular\, PingFangSC;
      font-weight: 400;
      color: #9b9b9b;
      line-height: vw(28);
    }
  }
}
.order {
  height: auto;
  width: vw(704);
  background: #fff;
  border-radius: vw(16);
  padding-bottom: vw(20);
  margin: vw(94) vw(24) vw(26) vw(22);
  .order_top {
    height: vw(88);
    width: vw(628);
    margin-right: vw(38);
    margin-left: vw(38);
    border-bottom: vw(2) solid #ddd;
    position: relative;
    .left {
      font-size: vw(30);
      font-weight: 400;
      color: #060606;
      line-height: vw(42);
      position: absolute;
      top: vw(28);
      right: 0;
      bottom: 0;
      left: vw(12);
    }
    .text6 {
      width: vw(155);
      font-size: vw(28);
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: #999;
      line-height: vw(40);
      position: absolute;
      top: vw(30);
      right: vw(6);
      bottom: 0;
    }
  }
  .order_bottom {
    box-sizing: border-box;
    padding-top: vw(36);
    padding-left: 0;
    height: vw(144);
    width: 100%;
    background: #fff;
    // border: 1px solid black;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .pic {
        width: vw(60);
        height: vw(60);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text7 {
        font-size: vw(24);
        color: #999;
      }
    }
  }
}
.meiwan {
  height: auto;
  width: vw(704);
  background: #fff;
  border-radius: vw(16);
  padding-bottom: vw(20);
  margin: vw(9) vw(24) vw(26) vw(22);
  .meiwan_top {
    height: vw(88);
    width: vw(628);
    margin-right: vw(38);
    margin-left: vw(38);
    border-bottom: vw(2) solid #ddd;
    position: relative;
    .left {
      font-size: vw(30);
      font-weight: 400;
      color: #060606;
      line-height: vw(42);
      position: absolute;
      top: vw(28);
      right: 0;
      bottom: 0;
      left: vw(12);
    }
  }
  .meiwan_bottom {
    box-sizing: border-box;
    padding-top: vw(36);
    padding-left: 0;
    height: auto;
    width: 100%;
    background: #fff;
    // border: 1px solid black;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: vw(175);
      .pic {
        width: vw(80);
        height: vw(80);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .pic1 {
        padding-top: vw(36);
      }
      .text7 {
        font-size: vw(24);
        color: #999;
      }
    }
  }
}
</style>